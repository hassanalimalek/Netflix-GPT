// routes.js
import { Login, Browse, SearchGptPage } from '@/pages';

export const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Browse />,
  },
  {
    path: '/searchgpt',
    element: <SearchGptPage />,
  },
];
