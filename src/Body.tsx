import { RouterProvider } from 'react-router-dom';
import { router } from './util/routes.js';
import { Provider } from 'react-redux';
import store from './store/appStore.js';
import { Toaster } from 'react-hot-toast';

export const Body = () => {
  return (
    <div>
      <Provider store={store}>
        <Toaster position='top-right' reverseOrder={false} />
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
};
