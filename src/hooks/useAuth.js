import { useEffect } from 'react';
import http from '../http';
import useLoader from './useLoader'
import { useDispatch, useSelector} from "react-redux";
import { markUserAuthenticated, markUserProfileActivated, setUserData } from '../store/slices/auth.slice';
import { getAuthenticatedUser, getIsUserAuthenticated, getIsUserProfileActivated } from '../selectors/auth';


const useAuth = ({
  invokeRefreshCall = false
} = {}) => {
  
  const { loader, updateLoader } = useLoader({
    auth: true
  });
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsUserAuthenticated);
  const isProfileActivated = useSelector(getIsUserProfileActivated);
  const authenticatedUser = useSelector(getAuthenticatedUser);

  useEffect(() => {
    if(invokeRefreshCall){
      (async() => {
        http.api.get(
          '/auth/refresh-tokens',
          ).then((res) => {
            if(res?.user && res?.isAuthenticated){
              updateAuthState({
                isAuthenticated: res?.isAuthenticated,
                user: res?.user
              })
            }
          }).catch((err) => {
            console.error(err);
          }).finally(() => {
            updateLoader("auth", false)
        })
      })();
    }
  }, []);

  const updateAuthState = ({
    isAuthenticated = false,
    user = null,
    updateUserProfileActivationKey = false
  }) => {
    dispatch(markUserAuthenticated(isAuthenticated))
    dispatch(setUserData(user))
    if(user?.isActivated || updateUserProfileActivationKey){
      dispatch(markUserProfileActivated(user?.isActivated || false))
    }
  }

  const updateAuthUser = (userData) => {
    dispatch(setUserData(userData));
  }

  const handleAuthUserLogout = () => {
    updateAuthState({
      isAuthenticated: false,
      user: null,
      updateUserProfileActivationKey: true
    })    
  }

  const setUserProfileActivation = (payload) => {
    dispatch(markUserProfileActivated(payload))
  }
  
  return {
    loader,
    isAuthenticated,
    isProfileActivated,
    authenticatedUser,
    updateAuthState,
    updateAuthUser,
    setUserProfileActivation,
    handleAuthUserLogout
  }
}

export default useAuth