import { RouterProvider } from 'react-router-dom';
import { router } from './util/routes.js';

export const Body = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
