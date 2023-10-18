import React from 'react';
import ReactDOM from 'react-dom/client';
import Todo from './pages/Todo';
import store from './stores/store';
import { Provider } from 'react-redux';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import './styles/index.scss';
import './styles/svg.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Todo />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
