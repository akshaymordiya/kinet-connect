import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/elements/Button'
import ContainerBox from '../../../components/elements/ContainerBox'
import "./index.scss"

const WelcomPage = () => {

  const navigate = useNavigate();

  const redirectTo = useCallback((type = "") => {
    navigate(`/onboard/authenticate${type}`);
  }, []);

  return (
    <ContainerBox
      title="WELCOME"
      paragraph="repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem."
    >
      <Button 
        text="Get Your Username"
        showNextIconVector
        onClick={redirectTo}
      />
      <p>Already registered? <span onClick={() => redirectTo('/signin')}> Sign In</span></p>
    </ContainerBox>
  )
}

export default WelcomPage