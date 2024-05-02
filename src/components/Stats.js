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

export default Stats;
