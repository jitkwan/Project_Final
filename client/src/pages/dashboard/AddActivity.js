import { Alert,FormRow,FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
const AddActivity = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    Activityname,
    ActivityType,
    ActivityTypeOptions,
    Description,
    Date,
    Duration,
    handleChange,
    clearValues,
    createActivity,
    editActivity
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Activityname || !ActivityType || !Duration || !Date ) { //เป็นการเช็ค error ในส่วนของ Frontend ว่า user กรอกข้อมูลครบมั้ย
      displayAlert();
      return;
    }
    if (isEditing) {
      editActivity()
      return;
    }
    createActivity();
  };

  const handleActivityInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    // if (name === 'Date') {
    //   value = new Date(value).toLocaleDateString('en-US', {
    //     month: 'long',
    //     day: 'numeric',
    //     year: 'numeric'
    //   });
    // }
    handleChange({ name, value });
  };

  const thisDate = new window.Date()
  const today = `${thisDate.getFullYear()}-${thisDate.getMonth() + 1}-${thisDate.getDate()}`

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit activity' : 'add activity'} </h3>
        {showAlert && <Alert />}

        {/* Activityname */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='Activityname'
            labelText='Activity Name'
            value={Activityname}
            handleChange={handleActivityInput}
          />
          {/* ActivityType */}
          <FormRowSelect
            name='ActivityType'
            labelText='Activity Type'
            value={ActivityType}
            handleChange={handleActivityInput}
            list={ActivityTypeOptions}
          />
          {/* Description */}
          <FormRow
            type='text'
            labelText='Description'
            name='Description'
            value={Description}
            handleChange={handleActivityInput}
          />
          {/* Duration */}
          <FormRow
            type='number'
            labelText='Duration (min.)'
            name='Duration'
            value={Duration}
            handleChange={handleActivityInput}
          />
          {/* Date */}
          <FormRow
            type='date'
            labelText='Date'
            name='Date'
            value={Date}
            min={today}
            handleChange={handleActivityInput}
          />
          
          {/* button submit */}
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          {/* button clear */}
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddActivity;
