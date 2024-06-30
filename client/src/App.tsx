import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import TodosPage from './pages/TodosPage.tsx'
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { Toaster } from 'react-hot-toast';
import AuthGuard from './AuthGuard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/todos",
    element: <AuthGuard><TodosPage /></AuthGuard>,
  },
]);

function App() {
    return (
        <Provider store={store}>
          <RouterProvider router={router} />
          <Toaster />
        </Provider>
    );
  }
  
  export default App;