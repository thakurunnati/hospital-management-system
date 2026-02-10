import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_MEDICINE } from "../Redux/Constants";
import "../stylesheets/MedicineForm.css";

export default function MedicineForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    manufacturer: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ADD_MEDICINE,
      payload: { id: Date.now(), ...form },
    });
    setForm({
      name: "",
      price: "",
      quantity: "",
      manufacturer: "",
    });
    alert("Medicine added successfully!");
  };

  return (
    <form className="medicine-form" onSubmit={handleSubmit}>
      <h2>Add Medicine</h2>

      <div className="form-group">
        <label>Medicine Name</label>
        <input
          type="text"
          placeholder="Medicine Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Price (₹)</label>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          required
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
          required
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Manufacturer</label>
        <input
          type="text"
          placeholder="Manufacturer"
          value={form.manufacturer}
          onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
          required
        />
      </div>

      <button type="submit">Add Medicine</button>
    </form>
  );
}