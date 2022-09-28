import React, { useState, useCallback} from 'react';
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Input from '../../../../components/elements/Input';
import useLoader from '../../../../hooks/useLoader';
import Loader from '../../../../components/Shared/Loader';
import Button from '../../../../components/elements/Button';
import API from '../../../../http';
import commonNotifications from '../../../../constant/notifications/common.notifications';
import useAuth from '../../../../hooks/useAuth';

const SignIn = () => {

  const [payload, setPayload] = useState({
    username: "",
    password: "",
  })

  const { updateAuthState } = useAuth();

  const { loader, updateLoader} = useLoader({
    signInRequest: false
  });

  const updatePaylaod = useCallback((key, value) => {
    setPayload((prev) => ({
      ...prev,
      [key]: value
    }))
  }, []);


  const handleSingIn = useCallback(() => {
    if(Object.values(payload).some((value) => !value)){
      toast.error('All Feilds are required!')
    }
    
    updateLoader('signInRequest', true)
    API.auth.login(payload).then((res) => {
      if(res && !res?.error){
        const { user, message, isAuthenticated } = res;
        if(isAuthenticated && user){
          updateAuthState({
            isAuthenticated,
            user
          })
          toast.success(message)
        }  
      }
    }).catch((err) => {
      console.error(err);
      toast.error(err?.message || commonNotifications.common.error)
    }).finally(() => {
      updateLoader('signInRequest', false)
    })

  }, [payload]);

  return loader.signInRequest ? (
      <Loader 
        show={loader.signInRequest} 
        className="input_container_box_outer_loader"
        xClassName='input_container_box_outer_loader_x'
        yClassName='input_container_box_outer_loader_y'
      />
    ) : (
      <div className="input_container_box">
        <div className='input_container_box_wrapper'>
          <Input
            className="input_box"
            placeholder="username"
            type="text"
            value={payload.username}
            onChange={({ target : { value }}) => updatePaylaod("username", value)}
            leftPlacement={(
              <FontAwesomeIcon icon={faAt} />
            )}
            />
          <Input
            className="input_box"
            placeholder="password"
            type="password"
            value={payload.password}
            onChange={({ target : { value }}) => updatePaylaod("password", value)}
            leftPlacement={(
              <FontAwesomeIcon 
                icon={faLock}
              />
            )}
          />
        </div>
          <Button text="Sign In" 
            onClick={handleSingIn} 
          />
      </div>
    )
}

export default SignIn