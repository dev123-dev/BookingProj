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
    <div className="checkbox-container custom-checkbox">
      <label htmlFor={category._id} style={{ cursor: "pointer" }}>
        <input
          id={category._id}
          type="checkbox"
          value={category.categoryName}
          style={{ cursor: "pointer" }}
          onChange={(e) => checkboxHandler(e, category)}
        />
        &nbsp;&nbsp;
        {category.categoryWithCount}
      </label>
    </div>
  );
}
