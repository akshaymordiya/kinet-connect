import OnBoardLayout from "./OnBording/Layout";
import WelcomPage from "./OnBording/Welcome";
import AuthLayout from "./OnBording/Auth/Layout";
import VerificationInputs from "./OnBording/Auth/VerificationInputs";
import OTP from "./OnBording/Auth/OTP";
import UserInfo from "./OnBording/UserInfo";
import Rooms from "./Dashboard/Rooms";
import BookMarked from "./Dashboard/Bookmarked";
import Room from "./SingleRoom";
import SignIn from "./OnBording/Auth/SingIn";
import DashboardLayout from "./Dashboard/Layout";
import Profile from "./Dashboard/Profile";
import ReceivedInvites from "./Dashboard/RecivedInvites";

export default {
  OnBoarding: {
    Layout: OnBoardLayout,
    Welcome: WelcomPage,
    Auth: {
      Layout: AuthLayout,
      VerificationInput: VerificationInputs,
      OTPVerification: OTP,
      SignIn
    },
    User: UserInfo
  },
  Dashboard: {
    Layout: DashboardLayout,
    Rooms,
    BookMarked,
    Profile,
    ReceivedInvites
  },
  Room
}