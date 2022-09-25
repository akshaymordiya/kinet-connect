import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import Pages from './pages'

export const ProtectedRoute = ({ children }) => {
  const { isProfileActivated } = useSelector((state) => state.auth)
  const location = useLocation();

  if(!isProfileActivated){
    return <Navigate to="/onboard/account-activate" state={{ from: location }} replace/>
  }

  return children;
};

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isProfileActivated } = useSelector((state) => state.auth);
  const location = useLocation();

  if(!isAuthenticated){
    return <Navigate to="/onboard" state={{ from : location }} replace />
  }else if(isProfileActivated){
    return <Navigate to="/dashboard/rooms" state={{ from: location }} replace/>
  }
  
  return children;
};

export const ProtectedGuestRoute = ({ children }) => {
  const { isAuthenticated, isProfileActivated } = useSelector((state) => state.auth);
  if(isAuthenticated && isProfileActivated){
    return <Navigate to="/dashboard/rooms"  replace />
  }else if(isAuthenticated && !isProfileActivated){
    return <Navigate to="/onboard/account-activate"  replace />
  }
  
  return children;
}

export const getRouteElement = (type, Component) => {
  switch (type) {
    case "guest":
      return (<ProtectedGuestRoute>
              <Component />
            </ProtectedGuestRoute>)

    case "private":
      return (<PrivateRoute>
        <Component />
      </PrivateRoute>) 
  
    case "protected":
      return (
        <ProtectedRoute>
          <Component />
        </ProtectedRoute>
      )

    default:
      break;
  }
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/onboard" replace />} />
      <Route path="onboard" element={<Pages.OnBoarding.Layout />} >
        <Route index element={getRouteElement("guest", Pages.OnBoarding.Welcome )} />
        <Route path='authenticate' element={getRouteElement("guest", Pages.OnBoarding.Auth.Layout )} >
          <Route index element={getRouteElement("guest", Pages.OnBoarding.Auth.VerificationInput )} />
          <Route path='otp-verification' element={getRouteElement("guest", Pages.OnBoarding.Auth.OTPVerification )}/>
          <Route path='signin' element={getRouteElement("guest", Pages.OnBoarding.Auth.SignIn )} />
        </Route>
        <Route path='account-activate' element={getRouteElement("private", Pages.OnBoarding.User )} />
      </Route>
      <Route path="dashboard" element={getRouteElement("protected", Pages.Dashboard.Layout)}>
        <Route path='rooms' element={getRouteElement("protected", Pages.Dashboard.Rooms)} />
        <Route path='bookmark' element={getRouteElement("protected", Pages.Dashboard.BookMarked)} />
        <Route path='recived-invites' element={getRouteElement("protected", Pages.Dashboard.ReceivedInvites)} />
        <Route path='user-profile' element={getRouteElement("protected", Pages.Dashboard.Profile)} />
      </Route>
      <Route path='room/:id' element={getRouteElement("protected", Pages.Room)} />
    </Routes>
  )
}

export default AppRoutes