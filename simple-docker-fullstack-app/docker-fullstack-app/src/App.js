import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItemsFromServer();
  }, []);

  async function getAllItemsFromServer() {
    try {
      const response = await axios.get("http://localhost:8000/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  async function getItemFromServer() {
    try {
      const response = await axios.get(`http://localhost:8000/items/${itemId}`);
      console.log("Response = ", response);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  async function postItemToServer() {
    try {
      const item = {
        name: itemName,
        description: itemDescription,
      };
      await axios.post("http://localhost:8000/items", item);
      await getAllItemsFromServer();
    } catch (error) {
      console.error("Error posting data", error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-container">
          <input
            type="text"
            placeholder="Item ID"
            onChange={(e) => setItemId(e.target.value)}
          />
          <button onClick={getItemFromServer}>Fetch Item</button>
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Item Name"
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Description"
            onChange={(e) => setItemDescription(e.target.value)}
          />
          <button onClick={postItemToServer}>Create Item</button>
        </div>

        <h2>All Items:</h2>
        {items.map((item, index) => (
          <div key={index} className="item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
