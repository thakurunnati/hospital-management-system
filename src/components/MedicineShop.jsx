import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_MEDICINE, ADD_PURCHASE_HISTORY } from "../Redux/Constants";
import "../stylesheets/MedicineShop.css";

export default function MedicineShop() {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.medicines);
  const patients = useSelector((state) => state.patients);
  
  const [selectedPatient, setSelectedPatient] = useState("");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) && med.quantity > 0
  );

  const handleAddToCart = (medicine) => {
    if (medicine.quantity <= 0) {
      alert("Medicine out of stock!");
      return;
    }

    const existingItem = cart.find((item) => item.id === medicine.id);
    if (existingItem) {
      if (existingItem.quantity < medicine.quantity) {
        setCart(
          cart.map((item) =>
            item.id === medicine.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        alert("Not enough stock!");
      }
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (medicineId) => {
    setCart(cart.filter((item) => item.id !== medicineId));
  };

  const handleQuantityChange = (medicineId, newQuantity) => {
    const medicine = medicines.find((m) => m.id === medicineId);
    if (newQuantity > medicine.quantity) {
      alert("Not enough stock!");
      return;
    }
    if (newQuantity <= 0) {
      handleRemoveFromCart(medicineId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === medicineId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const patient = patients.find((p) => p.id.toString() === selectedPatient);

    // Create purchase record
    const purchase = {
      id: Date.now(),
      patientId: selectedPatient,
      patientName: patient.name,
      medicines: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
      totalAmount: calculateTotal(),
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
    };

    // Update medicine quantities
    cart.forEach((item) => {
      const medicine = medicines.find((m) => m.id === item.id);
      dispatch({
        type: UPDATE_MEDICINE,
        payload: {
          ...medicine,
          quantity: medicine.quantity - item.quantity,
        },
      });
    });

    // Add to purchase history
    dispatch({
      type: ADD_PURCHASE_HISTORY,
      payload: purchase,
    });

    setCart([]);
    setSelectedPatient("");
    setSearchTerm("");
    alert("Purchase completed successfully!");
  };

  return (
    <div className="medicine-shop">
      <div className="shop-container">
        <div className="shop-left">
          <div className="shop-header">
            <h2>Medicine Shop</h2>
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-box"
            />
          </div>

          <div className="medicines-grid">
            {filteredMedicines.length === 0 ? (
              <p className="no-medicines">No medicines available</p>
            ) : (
              filteredMedicines.map((medicine) => (
                <div key={medicine.id} className="medicine-card">
                  <div className="medicine-header">
                    <h4>{medicine.name}</h4>
                    <span className="price">₹{medicine.price}</span>
                  </div>
                  <div className="medicine-details">
                    <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
                    <p><strong>Stock:</strong> <span className={medicine.quantity <= 5 ? 'low-stock' : ''}>{medicine.quantity}</span></p>
                  </div>
                  <button
                    className="btn-add-cart"
                    onClick={() => handleAddToCart(medicine)}
                    disabled={medicine.quantity <= 0}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="shop-right">
          <div className="cart-section">
            <h3>Shopping Cart</h3>
            
            <div className="patient-select">
              <label>Select Patient</label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
              >
                <option value="">-- Select Patient --</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-info">
                        <h5>{item.name}</h5>
                        <p className="item-price">₹{item.price}</p>
                      </div>
                      <div className="item-quantity">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="qty-btn"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              Number(e.target.value)
                            )
                          }
                          className="qty-input"
                          min="1"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>
                      <div className="item-subtotal">
                        <p>₹{item.price * item.quantity}</p>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="btn-remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </>
            )}

            <button
              className="btn-checkout"
              onClick={handleCheckout}
              disabled={cart.length === 0 || !selectedPatient}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}