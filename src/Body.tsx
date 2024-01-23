import { Browse } from './components/browse';
import { Login } from './components/login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const Body = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Browse />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
