import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import About from './pages/about';
import Checkin from './pages/checkin';
import Checkout from './pages/checkt';
import DelAcc from './pages/delacc';
import Login from './pages/forgotpw';
import Home from './pages/home';
import Register from './pages/register';
import ToS from './pages/tos';
import Worklog from './pages/worklog';
import Setting from './pages/settings';
import MyAccount from './pages/account';
import {Client, Account} from 'appwrite';
import {config} from './config';
import Testa from './pages/test.js';

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(config.projectId);

const appAcc = new Account(client);

function setTitle(title){
  document.title = title;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home setTitle={setTitle} appAcc={appAcc} />
  },
  {
    path: '/about',
    element: <About setTitle={setTitle} />
  },
  {
    path: '/tos',
    element: <ToS setTitle={setTitle} />
  },
  {
    path: '/checkin',
    element: <Checkin setTitle={setTitle} />
  },
  {
    path: '/checkout',
    element: <Checkout setTitle={setTitle} />
  },
  {
    path: '/delete',
    element: <DelAcc setTitle={setTitle} />
  },
  {
    path: '/login',
    element: <Home setTitle={setTitle} appAcc={appAcc} />
  },
  {
    path: '/myaccount',
    element: <MyAccount setTitle={setTitle} appAcc={appAcc} />
  },
  {
    path: '/newuser',
    element: <Register setTitle={setTitle} appAcc={appAcc} />
  },
  {
    path: '/worklog',
    element: <Worklog setTitle={setTitle} />
  },
  {
    path: '/forgotpw',
    element: <Login setTitle={setTitle} appAcc={appAcc} />
  },
  {
    path: '/settings',
    element: <Setting setTitle={setTitle} appAcc={appAcc} />
  },
  {
    path: '/test',
    element: <Testa setTitle={setTitle} />
  }
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
