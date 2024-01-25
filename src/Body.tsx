import { routes } from './util/routes.js';
import { Provider } from 'react-redux';
import store from './store/appStore.js';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/header/index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const Body = () => {
  return (
    <div>
      <Provider store={store}>
        <Toaster position='top-right' reverseOrder={false} />
        <Router>
          <Header />
          <div className=''>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </Router>
      </Provider>
    </div>
  );
};
