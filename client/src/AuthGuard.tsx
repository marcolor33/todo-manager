import { Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';

interface AuthGuardProps {
  children: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const user = useAppSelector((state) => state.authSlice.user);
  console.log(`user: ${user}`)
  return user ? children : <Navigate to="/" />;
};

export default AuthGuard;