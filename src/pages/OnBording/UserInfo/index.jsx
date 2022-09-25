import React, { Fragment, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faCheckDouble, faLock, faUser, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import "./index.scss";
import Button from '../../../components/elements/Button'
import ContainerBox from '../../../components/elements/ContainerBox'
import { userInfoTabDetails } from '../../../constant/userInfoTabs'
import Input from '../../../components/elements/Input';
import Avatar from '../../../components/Shared/Avatar';
import { formateMessage, isStringContainsSpecialChars, isValidPassword } from '../../../helper';
import authNotifications from '../../../constant/notifications/auth.notifications';
import useTimeout from '../../../hooks/useTimeout';
import useLoader from '../../../hooks/useLoader';
import Loader from "../../../components/Shared/Loader"
import API from '../../../http';
import useAuth from '../../../hooks/useAuth';
import userNotifications from '../../../constant/notifications/user.notifications';

const placeholders = {
  fullName: "Your Full Name",
  userName: "Choose Username",
  password: "Create Password"
}

const NO_STEPS = "No Steps";
const STEPS = "Steps";

const UserInfo = () => {
  
  const user = useSelector((state) => state.auth.user);
  const { 
    updateAuthUser,
    setUserProfileActivation
  } = useAuth({});
  const [activeTab, setActiveTab] = useState("password");
  const [userInfo, setUserInfo] = useState(() => {
    return Object.keys(userInfoTabDetails).reduce((acc, cur) => {
      acc[cur] = {
        value: userInfoTabDetails[cur]?.defaultValue || "",
        isFilled: false
      }
      return acc;
    }, {})
  });
  const { loader, updateLoader } = useLoader({
    valueChecker: false,
    submit: false
  })

  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [error, setError] = useState("");

  const checkIsValueTaken = useCallback(() => {
    updateLoader('valueChecker', true)
    API.user.isValueTaken({
      key: activeTab,
      value: userInfo[activeTab].value
    }).then((res) => {
      updateLoader('valueChecker', false)
      if(res?.isValueExist){
        setError(authNotifications.auth.activationInfo[activeTab].isTaken)
        return
      }

      setError("");
    }).catch((err) => setError(err?.message))
  }, [activeTab, userInfo]);

  const { set, clear} = useTimeout(checkIsValueTaken, 1000, true, true);

  const updateUserInfo = (key, value, validateValue = null) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        value
      }
    }))

    if(validateValue){
      clear()
      set()
    }
  }

  const updateConfirmPasswordText = useCallback((value) => {
    setConfirmPasswordText(value);
    validateUserPassword(value, 'password');
  }, []);

  const inputIcons = useMemo(() => {
    return {
      "fullName": faUser,
      "userName": faAt
    }
  }, []);

  const validateUserPassword = (value, key) => {
    const isStrongPassword = isValidPassword(value);
    const compareWith = {
      "password": userInfo[activeTab].value,
      "confirm_password": confirmPasswordText
    }

    if(key === "confirm_password" && !isStrongPassword){
      setError(authNotifications.auth.activationInfo.password.weak)
      return
    }else if(value !== compareWith[key]){
      setError(authNotifications.auth.activationInfo.password.notMatched)
      return
    }else if(key === "password" && !isStrongPassword){
      setError(authNotifications.auth.activationInfo.password.weak)
      return
    }
    
    setError("");
  }

  const captureImageHandler = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      updateUserInfo('avatarURL', reader.result);
    }
  }

  const changeActiveTab = (action, changeTab = false) => {
    const tabsArray = Object.keys(userInfoTabDetails)
    const indexOfCurrentTab = tabsArray.findIndex((tab) => tab === activeTab);
    const actionTypes = {
      "next": (indexOfCurrentTab + 1),
      "previous": (indexOfCurrentTab - 1)
    };
    const step = tabsArray[actionTypes[action]];
    if(step){
      if(changeTab){
        setActiveTab(step)
      }
      return STEPS;
    }

    return NO_STEPS;
  }

  const onNextClickHandler = () => {
    if(activeTab !== "avatarURL" && !userInfo[activeTab].value){
      return;
    }

    setUserInfo((prevstate) => ({
      ...prevstate,
      [activeTab]: {
        ...prevstate[activeTab],
        isFilled: true
      }
    }));

    const step = changeActiveTab("next", true);
    if(step === NO_STEPS){
      activateProfile();
    }
  }

  const onPreviousClickHandler = () => {
    changeActiveTab("previous", true);
  }

  const activateProfile = () => {

    const userInputs = Object.entries(userInfo) 
  
    if(userInputs.some(([key, value]) => !value.isFilled)){
      toast.error(userNotifications.profile.error.canNotActivate)
      return
    }

    const payload = userInputs.reduce((acc, curr)  => {
      const [key, value] = curr;
      acc[key] = value.value;
      return acc;
    }, {})

    payload.id = user.id

    updateLoader('submit', true);
    API.user.activateUser(payload, user.id).then((res) => {
      updateLoader('submit', false);
      if(res?.statusCode === 200 && res?.user){
        updateAuthUser(res?.user)
        if(res.user?.isActivated){
          setUserProfileActivation(res?.user?.isActivated)
          toast.success(authNotifications.auth.activationInfo.activated)
        }
      }
    }).catch((err) => console.error(err)).finally(() => {
      updateLoader('submit', false)
    })
  }

  const getPageExcert = useMemo(() => {
    if(isStringContainsSpecialChars(userInfoTabDetails[activeTab].excert)){
      return formateMessage(userInfoTabDetails[activeTab].excert, { fullname : userInfo.fullName.value });
    }

    return userInfoTabDetails[activeTab].excert
  }, [activeTab]);

  const isSubmitEnable = useMemo(() => {
    const keys = Object.keys(userInfoTabDetails);
    return keys[keys.length - 1] === activeTab
  }, [activeTab]);

  const isNavigationButtonDisabled = useMemo(() => {
    const previousStep = changeActiveTab("previous", false);
    return {
      previous: previousStep === NO_STEPS,
      next: (error !== "" || (activeTab !== "avatarURL" && !userInfo[activeTab].value ))
    }

  }, [error, activeTab, userInfo[activeTab].value ]);

  return (
    <Fragment>
      {loader.submit ? (
        <Loader 
          show={loader.submit}
          className="loader"
          xClassName='loader_x'
          loadingTextClasses='loader_text'
          loadingText="Activating Your Profile..."
        />
      ) :  (
        <ContainerBox
          title={userInfoTabDetails[activeTab].title}
          paragraph={getPageExcert}
          titleClass="title_text_h1"
        >
          {activeTab === "avatarURL" ? (
            <Avatar
              enableOptionToChooseImage
              avatarSrc={userInfo[activeTab].value}
              captureImageHandler={captureImageHandler}
              selectDefaultImageHandler={(value) => {
                updateUserInfo('avatarURL', value);
              }}
              guideText="You can set new avatar or you can skip this step if you want to proceed with default Avatar."
            />
          ) : activeTab === "password" ? (
            <Fragment>
              {error && (
                <span className='error_text'>{error}</span>
              )}
              <Input
                placeholder={placeholders[activeTab]}
                onChange={({ target: { value }}) => updateUserInfo(activeTab, value)}
                value={userInfo[activeTab].value}
                type="password"
                className="input_tab"
                onBlur={({ target : { value }}) => validateUserPassword(value, 'confirm_password')}
                inputAdditionalProps={{
                  required: true
                }}
                leftPlacement={(
                  <FontAwesomeIcon icon={faLock} />
                )}
                leftPlacementClassName="input_tab_left_placement_icon"
              />
              <Input
                placeholder="Confirm password"
                onChange={({ target: { value }}) => updateConfirmPasswordText(value)}
                value={confirmPasswordText}
                type="text"
                className="input_tab"
                inputAdditionalProps={{
                  required: true
                }}
                leftPlacement={(
                  <FontAwesomeIcon icon={faCheckDouble} />
                )}
                leftPlacementClassName="input_tab_left_placement_icon"
              />
            </Fragment>
          ) : (
            <Fragment>
            {error && (
              <span className='error_text'>{error}</span>
            )}
            <Input
              placeholder={placeholders[activeTab]}
              onChange={({ target: { value }}) => updateUserInfo(activeTab, value, activeTab === "userName")}
              value={userInfo[activeTab].value}
              type="text"
              className="input_tab"
              leftPlacement={(
                <FontAwesomeIcon icon={inputIcons[activeTab]} />
              )}
              leftPlacementClassName="input_tab_left_placement_icon"
              inputAdditionalProps={{
                required: true
              }}
              showLoaderOnRightPlacement={loader.valueChecker}
            />
            </Fragment>
          )}
          {!isSubmitEnable ? (
            <div className='navigation_button'>
              <Button
                text={(
                  <FontAwesomeIcon icon={faAnglesLeft} />
                )}
                className='btn' 
                disabled={isNavigationButtonDisabled.previous}
                onClick={onPreviousClickHandler} 
              />
              <Button 
                text={(
                  <FontAwesomeIcon icon={faAnglesRight} />
                )}
                className='btn' 
                disabled={isNavigationButtonDisabled.next}
                onClick={onNextClickHandler} 
              />
            </div>
          ) : (
            <div className="navigation_button">
              <Button
                text={(
                  <FontAwesomeIcon icon={faAnglesLeft} />
                )}
                className='btn' 
                disabled={isNavigationButtonDisabled.previous}
                onClick={onPreviousClickHandler} 
              />
              <Button 
                text="Submit" 
                className='btn' 
                disabled={isNavigationButtonDisabled.next}
                onClick={onNextClickHandler} 
              />
            </div>
          )}
        </ContainerBox>
      )}
    </Fragment>
  )
}

export default UserInfo