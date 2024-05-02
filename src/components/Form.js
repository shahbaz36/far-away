import { useState } from "react";

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = function (event) {
    event.preventDefault();
    //If there is no description, we don't want to add an item
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    //Reset the form
    setDescription("");
    setQuantity(1);
  };

  const handleQuantityChange = function (event) {
    setQuantity(event.target.value * 1);
  };

  const handleDescriptionChange = function (event) {
    setDescription(event.target.value);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip ?</h3>
      <select value={quantity} onChange={handleQuantityChange}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button>Add</button>
    </form>
  );
}

export default Form;
