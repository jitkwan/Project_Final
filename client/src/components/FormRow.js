const FormRow = ({ date, type, name, value, handleChange, labelText }) => {
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
          className='form-input'
        />
      </div>
    )
  }
  
  export default FormRow
  