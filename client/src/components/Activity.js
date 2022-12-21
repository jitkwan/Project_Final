//import moment from 'moment';

import { FaLocationArrow, FaBriefcase, FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import moment from "moment";
import Wrapper from '../assets/wrappers/Activity';
import ActivityInfo from './ActivityInfo';
import walkingImg from '../assets/images/walking.svg'
import bikingImg from '../assets/images/biking.svg'
import runningImg from '../assets/images/running.svg'
import swimmingImg from '../assets/images/swimming.svg'
import hikingImg from '../assets/images/hiking.svg'

const Activity = ({
  _id,
  Activityname,
  ActivityType,
  Description,
  Duration,
  createdAt,
  Date,
}) => {
  const { setEditActivity, deleteActivity } = useAppContext();

  let cardImg
  switch (ActivityType) {
    case 'Run':
      cardImg = `${runningImg}`
      break
    case 'Bicycle':
      cardImg = `${bikingImg}`
      break
    case 'Hike':
      cardImg = `${hikingImg}`
      break
    case 'Swimming':
      cardImg = `${swimmingImg}`
      break
    case 'Walk':
      cardImg = `${walkingImg}`
      break
    default:
      console.log('No image found')
  }

  // let date = moment(createdAt);
  // Date = Date.format('MMM Do, YYYY');
  
  let myDate = moment(Date).utc().format('DD-MM-YYYY')

  return (
    <Wrapper>
      <header>
        {/* <div className='main-icon'>{ActivityType.charAt(0)}</div> */}
        <div><img src={cardImg} alt='exercise-img' className='activity-icon'/></div>
        <div className='info'>
          <h4>{Activityname}</h4>
          <p>{ActivityType}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ActivityInfo icon={<FaLocationArrow />} text={Description} />
          <ActivityInfo icon={<FaCalendarAlt />} text={myDate} /> 
          <ActivityInfo icon={<FaBriefcase />} text={ActivityType} />
          <ActivityInfo icon={<FaRegClock />} text={`${Duration} minutes`} />
        </div>

        {/* content center later */}
        <footer>
          <div className='actions'>
            <Link
              to='/add-activity'
              onClick={() => setEditActivity(_id)}
              className='btn edit-btn'
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteActivity(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Activity;