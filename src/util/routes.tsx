import { Browse } from '../components/browse';
import { Login } from '../components/login';
import { createBrowserRouter } from 'react-router-dom';
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Browse />,
  },
]);
