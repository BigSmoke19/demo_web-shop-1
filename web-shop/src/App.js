import './styles/general/App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Create from './create';
import Home from './home';
import ItemDetails from './itemdetails';
import Categories from './categories';
import Header from './Header'
import SignUp from './signup';
import LogIn from './login';
import Cart from './cart';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Categories />
        <div className="content">
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<Create />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/login/signup" element={<SignUp />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
