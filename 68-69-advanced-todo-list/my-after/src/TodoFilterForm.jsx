export default function TodoFilterForm() {
  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <label>
        <input type="checkbox" />
        Hide Completed
      </label>
    </div>
  );
}
