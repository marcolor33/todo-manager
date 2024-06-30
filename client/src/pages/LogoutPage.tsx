import { FC, useEffect } from 'react';
import { useAuthControllerLogoutMutation } from '../store/authApi';
import { clearAuthentication } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutPage: FC = () => {
  const naviate = useNavigate();
  const [logout, { isLoading, isSuccess, isError, error }] =
    useAuthControllerLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      alert('Logout successfully!');
      clearAuthentication();
      naviate('/');
    }

    if (isError) {
      if ('status' in error) {
        const errMsg =
          'error' in error
            ? error.error
            : (error.data as DefaultException).message;
        alert(errMsg);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Logout</h1>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutPage;
