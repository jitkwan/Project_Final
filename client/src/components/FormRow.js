const FormRow = ({ date, type, name, value, handleChange, labelText, min }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          date={date}
          onChange={handleChange}
          min={min}
          className='form-input'
        />
      </div>
    )
  }
  
  export default FormRow
  