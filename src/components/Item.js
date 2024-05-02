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

export default Item;
