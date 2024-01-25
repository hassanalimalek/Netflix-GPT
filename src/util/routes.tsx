import { Browse } from '../pages/browse';
import { Login } from '../pages/login';
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
