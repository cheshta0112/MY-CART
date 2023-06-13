import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "firebase/compat/app";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
    this.db = firebase.firestore();
  }

  // componentDidMount() {
  //   firebase
  //     .firestore()
  //     .collection("products")
  //     .get()
  //     .then(snapshot => {
  //       const products = snapshot.docs.map(doc => {
  //         const data = doc.data();
  //         data["id"] = doc.id;
  //         return data;
  //       });
  //       this.setState({ products: products, loading: false });
  //     });
  // }



  //fetching all the products
  componentDidMount() {
    this.db
      .collection("products")
      //.where("price", "==", 99)
      // .where("title", "", "watch")
      // .orderBy("price", "desc")
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ products: products, loading: false });
      });
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // });

    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({ qty: products[index].qty + 1 })
      .then(() => {
        console.log("Document updated sucessfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    //   if (products[index].qty === 0) {
    //     return;
    //   }
    //   products[index].qty -= 1;

    //   this.setState({
    //     products,
    //   });
    // };

    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({ qty: products[index].qty - 1 })
      .then(() => {
        console.log("Document updated sucessfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((product) => product.id !== id);

    // this.setState({
    //   products: items,
    // });
    const docRef = this.db.collection("products").doc(id);
    docRef
      .delete()
      .then(() => {
        console.log("Deleted successfully");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  getcountOfCartItems = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  getcartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;

    products.map((product) => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return "";
    });

    return cartTotal;
  };

  // addProduct = () => {
  //   this.db
  //     .collection("products")
  //     .add({
  //       img: "https://tse1.mm.bing.net/th?id=OIP.nFjzEy6ZoRXDCcknn4VyzgHaHa&pid=ImgDet&rs=1",
  //       price: 900,
  //       qty: 3,
  //       title: "Washing Machine",
  //     })
  //     .then((docRef) => {
  //       docRef.get().then((snapshot) => {
  //         console.log("Product has been added", snapshot.data());
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />
        {/* <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a Product
        </button> */}

        <Cart
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          products={products}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20, textAlign: "center" }}>
          TOTAL : {this.getcartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
