import React from 'react'
import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import ContainerBox from '../../../../components/elements/ContainerBox'

const AuthLayout = () => {

  const location = useLocation();
  
  const paragraphText = useMemo(( ) => {
    if(location.pathname === "/onboard/authenticate/signin"){
      return "Enter your correct username and password to authenticate your self"
    }

    return `By entering your email address, you’re agreeing to our 
    Terms of Service and  Privacy Policy. Thanks!`
  }, [location.pathname])
  return (
    <ContainerBox
      title="Let’s Authenticate"
      paragraph={paragraphText}
    >
      <Outlet />
    </ContainerBox>
  )
}

export default AuthLayout