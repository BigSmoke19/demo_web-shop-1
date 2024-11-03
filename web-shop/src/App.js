import './styles/general/App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Create from './create';
import Home from './home';
import SignUp from './signup';
import LogIn from './login';
import Cart from './cart';
import ProtectedRoute from './ProtectedRoute';
import VerifyEmail from './verifyemail';
import Edit from './edit';
import { DataProvider } from './context';
import { UserDataProvider } from './usercontext';
import { VerifyDataProvider } from './verifycontext';
import { WishListDataProvider } from './wishlistcontext';
import { CartDataProvider } from './cartcontext';
import Orders from './orders';
import AddSale from './addsale';

function App() {
  return (
    <DataProvider>
    <UserDataProvider>
    <VerifyDataProvider>
    <WishListDataProvider>
    <CartDataProvider>
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
            path="/create"
              element={
                <ProtectedRoute>
                  <Create />
                </ProtectedRoute>
              }
            />
            <Route
            path="/edit"
              element={
                <ProtectedRoute>
                  <Edit />
                </ProtectedRoute>
              }
            />
            <Route
            path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />\
            <Route
            path="/addsale"
              element={
                <ProtectedRoute>
                  <AddSale />
                </ProtectedRoute>
              }
            />
            <Route exact path="/create" element={<Create />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/login/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/verifyemail" element={<VerifyEmail />} />
          </Routes>
        </div>
      </div>
    </Router>
    </ CartDataProvider>
    </WishListDataProvider>
    </ VerifyDataProvider>
    </ UserDataProvider>
    </DataProvider>
  );
}


export default App;
