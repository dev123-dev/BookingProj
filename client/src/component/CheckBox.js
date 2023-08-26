export default function CheckBox({ category, addLevels, removeLevels }) {
  const checkboxHandler = (e, category) => {
    const { checked } = e.target;
    if (checked) {
      addLevels(category);
    } else {
      removeLevels(category);
    }
  };

  return (
    <div className="checkbox-container">
      <input
        id={category._id}
        type="checkbox"
        value={category.categoryName}
        onChange={(e) => checkboxHandler(e, category)}
      />
      <label htmlFor={category._id}>{category.categoryWithCount}</label>
    </div>
  );
}
