import { Provider } from 'react-redux';
import { store } from './context/store';
import { RouterProvider, createBrowserRouter, Outlet }
  from 'react-router-dom';
import Login from './pages/Login/Login.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (<Login />),
    // redirect ot login or home page
    errorElement: <div>404 Not Found</div>,
    // children: [
    //   {
    //     path: 'login',
    //     element: (<Login />),
    //   }
    // ]
  }
])


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;