import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
//import Loading from './Loading';
import Activity from './Activity';
import Wrapper from '../assets/wrappers/ActivitiesContainer';

const ActivitiesContainer = () => {
  const { getActivities, activities, totalActivities } = useAppContext();
  useEffect(() => {
    getActivities();
  }, []);

  // if (isLoading) {
  //   return <Loading center />;
  // }
  if (activities.length === 0) {
    return (
      <Wrapper>
        <h2>No activities to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalActivities} activity{activities.length > 1 && 's'} found
      </h5>
      <div className='activities'>
        {activities.map((activity) => {
          return <Activity key={activity._id} {...activity} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ActivitiesContainer;