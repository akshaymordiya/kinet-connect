import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import AuthProvider from './HOC/AuthProvider';
import { Provider } from 'react-redux';
import store from "./store";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
