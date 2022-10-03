import axios from "axios";
import { toast } from "react-toastify";
import commonNotifications from "../constant/notifications/common.notifications";
import { mapUserResponse } from "../utils/response";

const baseURL = process.env.REACT_APP_SERVER_BASE_URL;

const Http = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const handleRequestErrors = (err) => {
  const errorMessage = err?.message || err?.error || err || commonNotifications.common.error
  console.error(errorMessage);
  toast.error(errorMessage)
}

const API = {
  get: (url, paramsPayload = {}, ...rest) => 
              Http.get(url, paramsPayload,...rest)
                  .then((res) => {
                    if(!res){
                      handleRequestErrors(commonNotifications.common.error);
                    }
                    return res?.data
                  })
                  .catch((err) => handleRequestErrors(err)),
  post: (url, payload = {}, ...rest) =>
              Http.post(url, payload, ...rest)
                  .then((res) => {
                    if(!res || res?.data?.error){
                      handleRequestErrors(res?.data?.error);
                    }
                    return res?.data
                  })
                  .catch((err) => handleRequestErrors(err))
}

const auth = {
  sendOtp: (payload) => API.post('/auth/send-otp', payload),
  verifyOTP: (payload) => API.post('/auth/verify-otp', payload),
  login: (payload) => API.post('/auth/sign-in', payload),
  logout: () => API.get('/auth/logout')
}

const user = {
  isValueTaken: (payload) => API.post('/users/key-validator', payload),
  activateUser: (payload, id) => API.post(`/users/${id}/activate`, payload)
                                    .then(res => res),
  getUserAvatar: (url) => API.get(url)
}

const room = {
  create: (payload) => API.post('/rooms/create', payload)
}

//intercepetor
Http.interceptors.response.use(
  (config) => config,
  async (error) => {
    const orignalReq = error.config
    if(error.response.status === 401 && !error?.response?.data?.isUserLogOut && orignalReq && !orignalReq._isRetry){
      orignalReq._isRetry = true;
      try {
        await axios.get(
          `${baseURL}/auth/refresh-tokens`,
          {
            withCredentials: true
          }
        )

        return Http.request(orignalReq);
      } catch (error) {
        console.error(error.message);
      }
    }

    return error.response
  }
)


export default {
  api: API,
  auth,
  user,
  room
}