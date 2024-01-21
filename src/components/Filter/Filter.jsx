import style from './Filter.module.css';
function Filter({ value, onChangeFilter }) {
  return (
    <div className={style.filter}>
      <label>
        Find contacts by name
        <input type="text" value={value} onChange={onChangeFilter} />
      </label>
    </div>
  );
}

export default Filter;
