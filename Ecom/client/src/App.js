import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5002/products");
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5002/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const buyProduct = async (product) => {
    await axios.post("http://localhost:5002/buy", {
      productName: product.name,
      price: product.price
    });

    setMessage(`✅ Purchased ${product.name}`);
    fetchOrders();
  };

  const cancelOrder = async (id) => {
    await axios.delete(`http://localhost:5002/orders/${id}`);
    fetchOrders();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Segoe UI"
    }}>
      <div style={{
        width: "500px",
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ textAlign: "center" }}>🛒 E-Commerce Store</h2>

        {/* Products */}
        <h3>Products</h3>
        {products.map((p) => (
          <div key={p._id} style={card}>
            <h4>{p.name}</h4>
            <p>₹ {p.price}</p>

            <button onClick={() => buyProduct(p)} style={buyBtn}>
              Buy
            </button>
          </div>
        ))}

        {/* Orders */}
        <h3 style={{ marginTop: "20px" }}>My Orders</h3>
        {orders.length === 0 && <p>No orders yet</p>}

        {orders.map((o) => (
          <div key={o._id} style={card}>
            <h4>{o.productName}</h4>
            <p>₹ {o.price}</p>

            <button onClick={() => cancelOrder(o._id)} style={cancelBtn}>
              Cancel
            </button>
          </div>
        ))}

        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>
    </div>
  );
}

const card = {
  border: "1px solid #ddd",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px"
};

const buyBtn = {
  background: "green",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px"
};

const cancelBtn = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px"
};

export default App;