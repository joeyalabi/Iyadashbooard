import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      theme="colored"
      toastClassName="border-l-4 border-blue-500 bg-white shadow-xl"
    />
  );
};

export default NotificationToast;