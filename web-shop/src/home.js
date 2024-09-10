import ItemsList from './itemslist';
import useFetch from './usefetch';
import Header from './Header.js'
import Categories from './categories.js'

const Home = () => {
    const url = "http://localhost/webshop-apis/getdata.php";
    //const url2 = "http://localhost:8000/items";
    const isHome = true;
    const {items,isPending,error} = (useFetch(url));
    
    return ( 
        <div>
          <Header />
          <Categories />
          <div>
            {error && <div>{error}</div>}     
            {isPending && <div>Loading....</div>}
            {items && <ItemsList items = {items} title = "My Items" isHome={isHome} />}      
          </div>
        </div>
     );
}
 
export default Home;