import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import "./index.scss";
import Button from '../../../../components/elements/Button';
import Input from '../../../../components/elements/Input';
import API from '../../../../http';
import authNotifications from '../../../../constant/notifications/auth.notifications';
import useLoader from '../../../../hooks/useLoader';
import Loader from '../../../../components/Shared/Loader';
import useAuth from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';

const OTP = () => {

  const { state: { data } } = useLocation();
  const hashedOTP = useRef(data.hash || localStorage.getItem('otp-token'));
  const navigate = useNavigate();
  const { updateAuthState } = useAuth({});
  const { loader, updateLoader } = useLoader({
    invokedAPI: false
  });

  const [otpCode, setOtpCode] = useState({
    code_1: "",
    code_2: "",
    code_3: "",
    code_4: "",
  });
  const [error, setError] = useState("");

  const code_one = useRef(null);
  const code_two = useRef(null);
  const code_three = useRef(null);
  const code_four = useRef(null);

  const refrences = {
    1: code_one,
    2: code_two,
    3: code_three,
    4: code_four
  }
  useEffect(() => {
    code_one?.current?.focus();
  }, []);

  const handleInputChange = (value, number) => {
    setOtpCode((prev) => ({
      ...prev,
      [`code_${number}`]: value
    }));

    if(value !== ""){
      refrences[number + 1]?.current?.focus();
    }
  }

  const handleBackspaceChange = (key, number) => {
    if(key === "Backspace" && otpCode[`code_${number}`] === "" && number !== 1){
      refrences[number - 1].current?.focus();
    }else if(key === "Enter"){
      handleSubmit()
    }
  }

  const resendOTPHandler = () => {
    updateLoader('invokedAPI', true);
    API.auth.sendOtp({ email: data.email }).then((res) => {
      updateLoader('invokedAPI', false)
      if(res.hash){
        hashedOTP.current = res.hash;
        localStorage.setItem('otp-token', res.hash);
        toast.success(res?.message)
      }
    }).catch((err) => console.error(err))
  }

  const handleSubmit = () => {
    if(!data.hash || !data.email){
      navigate('/onborad/authenticate', { replace : true })
      return;
    }

    const prepareOTP = Object.values(otpCode).join('');
    if(prepareOTP.length < 4){
      setError(authNotifications.auth.otp.error.invalid)
      return;
    };

    const payload = {
      otp: prepareOTP,
      hashedText: hashedOTP.current
    }
    
    API.auth.verifyOTP(payload).then((res) => {
      if(res?.user && res?.isAuthenticated){
        updateAuthState({
          isAuthenticated: res?.isAuthenticated,
          user: res?.user
        })
        toast.success(authNotifications.auth.login.success)
        localStorage.removeItem('otp-token')
      }
    }).catch((err) => console.error(err));
  }

  return loader.invokedAPI ? (
      <Loader
        show={loader.invokedAPI}
        className="otp_container_outer_loader"
        xClassName='otp_container_outer_loader_x'
        yClassName='otp_container_outer_loader_y'
      />
    ) : (
        <div className="otp_container">
        {error && (
          <span className='otp_container_error_text'>{error}</span>
        )}
        <div className="otp_input_boxes">
          {[...Array(5).keys()].slice(1).map((number) => (
            <Input 
              ref={refrences[number]}
              key={number}
              placeholder="x"
              value={otpCode[`code_${number}`]}
              className="input_box"
              onChange={({ target: { value }}) => handleInputChange(value, number)}
              inputAdditionalProps={{
                onKeyUp:({ key }) => handleBackspaceChange(key, number),
                required: true,
                maxLength: "1"
              }}
            />
          ))}
        </div>
        <p className="verification_text">
          Enter the code we just texted you! <span onClick={resendOTPHandler}>Resend OTP</span>
        </p>
        <Button 
          text="Submit"
          className="btn_submit"
          onClick={handleSubmit}
        />
      </div>
    )
}

export default OTP