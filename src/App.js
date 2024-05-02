import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteAll() {
    if (window.confirm("Are you sure you want to delete all items?")) {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheck={handleToggleItem}
        onDeleteAll={handleDeleteAll}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 🎒</h1>;
}

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

function PackingList({ items, onDeleteItem, onCheck, onDeleteAll }) {
  const [sortBy, setSortBy] = useState("packed");
  const handleSort = function (event) {
    setSortBy(event.target.value);
  };

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onCheck={onCheck}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={handleSort}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed items</option>
        </select>
        <button onClick={onDeleteAll}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onCheck }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onCheck(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list</em>
      </footer>
    );

  // Derived state
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const packedPercent = numItems > 0 ? (numPacked / numItems) * 100 : 0;
  return (
    <footer className="stats">
      <em>
        {packedPercent === 100
          ? "You got everything! lets go on a trip 🎉"
          : `You have ${numItems} items in your list, and you already packed ${numPacked} (${packedPercent}%)`}
      </em>
    </footer>
  );
}

export default App;
