import Loader from "../../components/Shared/Loader";
import { LOADING_TEXT } from "../../constant/contents/loading.contents";
import useAuth from "../../hooks/useAuth";

const AuthProvider = ({ children }) => {

  const {
    loader,
  } = useAuth({
    invokeRefreshCall: true
  });

  return loader.auth ? 
    <Loader 
      show={loader.auth}
      loadingText={LOADING_TEXT.INITILIZING}
      enableFullScreenMode
    /> : children
  
}

export default AuthProvider