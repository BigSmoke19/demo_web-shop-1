import './styles/general/App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Create from './create';
import Home from './home';
import ItemDetails from './itemdetails';
import SignUp from './signup';
import LogIn from './login';
import Cart from './cart';
import ProtectedRoute from './ProtectedRoute';
import VerifyEmail from './verifyemail';
import Edit from './edit';
import { DataProvider } from './context';

function App() {
  return (
    <DataProvider>
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
            <Route exact path="/create" element={<Create />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/login/signup" element={<SignUp />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/verifyemail" element={<VerifyEmail />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </div>
      </div>
    </Router>
    </DataProvider>
  );
}


export default App;
