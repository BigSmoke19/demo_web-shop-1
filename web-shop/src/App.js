import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Create from './create';
import Home from './home';
import ItemDetails from './itemdetails';
import Categories from './Categories';
import Header from './Header'

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
          <Route path="/items/:id" element={<ItemDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
