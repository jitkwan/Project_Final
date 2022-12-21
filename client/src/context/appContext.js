import React, { useReducer, useContext,useEffect  } from 'react'
import reducer from './reducer'
import axios from 'axios';
import { 
  DISPLAY_ALERT, 
  CLEAR_ALERT, 
  TOGGLE_SIDEBAR, 
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_ACTIVITY_BEGIN,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_ERROR,
  DELETE_ACTIVITY_BEGIN,
  GET_ACTIVITIES_BEGIN,
  GET_ACTIVITIES_SUCCESS,
  SET_EDIT_ACTIVITY,
  EDIT_ACTIVITY_BEGIN,
  EDIT_ACTIVITY_SUCCESS,
  EDIT_ACTIVITY_ERROR
} from './action'

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,  //งง อันนี้
  token: token,
  userLocation: userLocation || '',
  activityLocation: userLocation || '',
  showSidebar:'',
  isEditing: false,
  editActivityId: '',
  Activityname: '',
  ActivityTypeOptions: ['Run', 'Bicycle', 'Hike','Swimming','Walk'],
  ActivityType: 'Run',
  Description:'',
  Date: '',
  Duration: '',
  activities: [], //รับเป็น array ปล่าวๆมา เพราะเดี๋ยวจะเอา ค่ามาใส่ แล้วเอาไป map ต่อ
  totalActivities: 0,
  numOfPages: 1,
  page: 1,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    //  axios
    const authFetch = axios.create({
      baseURL: '/api/v1',
    });

    // request
    authFetch.interceptors.request.use(
        (config) => {
          config.headers['Authorization'] = `Bearer ${state.token}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
    );

    // response 
    authFetch.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          logoutUser();
        }
        return Promise.reject(error);
      }
    );

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({type: CLEAR_ALERT})
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token, location}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('location');
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser)
            // console.log(response)
            const { user, token, location } = response.data
            dispatch({ 
                type: REGISTER_USER_SUCCESS, 
                payload: {user, token, location}
            })
            
            addUserToLocalStorage({
                user,
                token,
                location,
            });

        } catch (error) {
            // console.log(error.response)
            dispatch({ 
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.msg }
            })
        }

        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
          const { data } = await axios.post('/api/v1/auth/login', currentUser);
          const { user, token, location } = data;
      
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: { user, token, location },
          });
      
          addUserToLocalStorage({ user, token, location });
        } catch (error) {
          dispatch({
            type: LOGIN_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
        }
        clearAlert();
    };

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
          const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      
          const { user, token, location } = data;
          dispatch({
            type: SETUP_USER_SUCCESS,
            payload: { user, token, location, alertText },
          });
          addUserToLocalStorage({ user, token, location });
        } catch (error) {
          dispatch({
            type: SETUP_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
        }
        clearAlert();
      };

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
      dispatch({ type: UPDATE_USER_BEGIN });
      try {
        const { data } = await authFetch.patch('/auth/updateUser', currentUser);
    
        // no token
        const { user, location } = data;
    
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { user, location, token },
        });
    
        addUserToLocalStorage({ user, location, token: initialState.token });
      } catch (error) {
        if (error.response.status !== 401) {
          dispatch({
            type: UPDATE_USER_ERROR,
            payload: { msg: error.response.data.msg },
          });
        }
      }
      clearAlert();
    };

    const handleChange = ({ name, value }) => {
      dispatch({
        type: HANDLE_CHANGE,
        payload: { name, value },
      })
    }

    const clearValues = () => {
      dispatch({ type: CLEAR_VALUES })
    }

    const createActivity = async () => {
      dispatch({ type: CREATE_ACTIVITY_BEGIN });
      try {
        const { Activityname, ActivityType, Description, Date, Duration } = state;
    
        await authFetch.post('/activities', {
          Activityname,                       //ส่งค่าที่จะ create ไปเก็บที่หลังบ้าน
          ActivityType,
          Description,
          Date,
          Duration,
        });
        dispatch({
          type: CREATE_ACTIVITY_SUCCESS,        //60 Create แล้ว อย่าลืม clear
        });
        // call function instead clearValues()
        dispatch({ type: CLEAR_VALUES });       //61 clear
      } catch (error) {
        if (error.response.status === 401) return;
        dispatch({
          type: CREATE_ACTIVITY_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      clearAlert();
    };

    const getActivities = async () => {
      let url = `/activities`
    
      dispatch({ type: GET_ACTIVITIES_BEGIN })
      try {
        const { data } = await authFetch(url)
        const { activities, totalActivities, numOfPages } = data
        dispatch({
          type: GET_ACTIVITIES_SUCCESS,
          payload: {
            activities,
            totalActivities,
            numOfPages,
          },
        })
      } catch (error) {
        console.log(error.response)
        logoutUser()
      }
      clearAlert()
    }

    const setEditActivity = (id) => {
      dispatch({ type: SET_EDIT_ACTIVITY, payload: { id } })
    }

    const editActivity = async () => {
      dispatch({ type: EDIT_ACTIVITY_BEGIN });
  
      try {
        const { Activityname, ActivityType, Description, Date, Duration } = state;
        await authFetch.patch(`/activities/${state.editActivityId}`, {
          Activityname,
          ActivityType,
          Description,
          Date,
          Duration,
        });
        dispatch({ type: EDIT_ACTIVITY_SUCCESS });
        dispatch({ type: CLEAR_VALUES });
      } catch (error) {
        if (error.response.status === 401) return;
        dispatch({
          type: EDIT_ACTIVITY_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      clearAlert();
    };

    const deleteActivity = async (activityId) => {
  dispatch({ type: DELETE_ACTIVITY_BEGIN });
  try {
    await authFetch.delete(`/activities/${activityId}`);
    getActivities();
  } catch (error) {
    logoutUser();
  }
};

useEffect(() => {
  getActivities()
}, [])

    return (
        <AppContext.Provider value={{...state, 
          displayAlert, 
        setupUser, 
        registerUser, 
        loginUser, 
        logoutUser, 
        updateUser,
        toggleSidebar,
        handleChange,
        clearValues,
        createActivity,
        getActivities,
        setEditActivity,
        editActivity,
        deleteActivity,
        }}>
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }