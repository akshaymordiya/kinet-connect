import React, { useState, memo, useMemo, useCallback } from 'react'
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import Input from '../../../../components/elements/Input'
import Button from '../../../../components/elements/Button'
import Icon from '../../../../components/Icon'
import { isValidEmail } from '../../../../helper';
import API from '../../../../http';
import useTimeout from '../../../../hooks/useTimeout';
import Loader from '../../../../components/Shared/Loader';
import authNotifications from '../../../../constant/notifications/auth.notifications';
import useLoader from '../../../../hooks/useLoader';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


const VerificationInputs = () => {

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { loader, updateLoader } = useLoader({
    emailCheck: false,
    sendOtp: false
  })

  const checkIsEmailTaken = useCallback(() => {
    updateLoader('emailCheck', true)
    API.user.isValueTaken({
      key: "email",
      value: email
    }).then((res) => {
      updateLoader('emailCheck', false)
      if(res?.isValueExist){
        setError(authNotifications.auth.email.error.isTaken)
        return
      }

      setError("");
    }).catch((err) => setError(err?.message))
  }, [email]);

  const { set, clear } = useTimeout(checkIsEmailTaken, 1000, true, true);

  const onEmailChange = ({ target : { value }}) => {
    setEmail(value);
    clear();
    if(!value || !isValidEmail(value)){
      setError(authNotifications.auth.email.error.invalid)
    }else {
      setError("")
      set();
    }
  }

  const sendOtpHandler = () => {
    updateLoader('sendOtp', true)
    API.auth.sendOtp({ email }).then((res) => {
      updateLoader('sendOtp', false)
      if(res?.hash){
        localStorage.setItem('otp-token', res.hash);
        const data = {
          hash: res?.hash,
          email,
        }
        toast.success(authNotifications.auth.otp.sendMessage)
        navigate('/onboard/authenticate/otp-verification', { state: { data }, replace: true})
      }
    }).catch((err) => console.error(err))
    .finally(() => {
      updateLoader('sendOtp', false)
    })
  }
  
  const onNextClick = useCallback(() => {
    if(!email || !isValidEmail(email)){
      setError(authNotifications.auth.email.error.invalid);
      return
    }
    
    sendOtpHandler();
  }, [email])

  const isNextBtnDisabled = useMemo(() => {
    return !email || error || loader.emailCheck
  }, [error, email, loader.emailCheck]);

  return loader.sendOtp ? (
      <Loader 
        show={loader.sendOtp}
        className="input_container_box_outer_loader"
        xClassName='input_container_box_outer_loader_x'
        yClassName='input_container_box_outer_loader_y'
      />
    ) : (
    <div className="input_container_box">
      <div className='input_container_box_wrapper'>
        <Input
          className="input_box"
          placeholder="email@xyz.com"
          type="text"
          value={email}
          onChange={onEmailChange}
          leftPlacement={(
            <FontAwesomeIcon icon={faEnvelope} />
          )}
          leftPlacementClassName="input_box_left_placement"
          showLoaderOnRightPlacement={loader.emailCheck}
        />
        {error && (
          <span className='input_container_box_wrapper_error_text'>{error}</span>
          )}
      </div>
      <Button text="Next" onClick={onNextClick} disabled={isNextBtnDisabled} />
    </div>
  )
}

export default memo(VerificationInputs);