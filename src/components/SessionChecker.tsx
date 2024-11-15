import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';

const SessionChecker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSessionExpiration = () => {
      const savedTimestamp = localStorage.getItem('userTimestamp');
      const ONE_HOUR = 3600000;

      if (savedTimestamp && Date.now() - parseInt(savedTimestamp) > ONE_HOUR) {
        // Clear session data
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userTimestamp');

        // Clear Redux state
        dispatch(userActions.clearUserObject());
        alert("Session expired, please login again");
        // Redirect to login
        navigate('/login');
      }
    };

    // Check immediately and then set an interval
    checkSessionExpiration();
    const intervalId = setInterval(checkSessionExpiration, 1000); // Check every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch, navigate]);

  return null; // No UI, just logic
};

export default SessionChecker;
