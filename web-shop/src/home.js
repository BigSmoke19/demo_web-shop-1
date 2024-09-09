import ItemsList from './itemslist';
import useFetch from './usefetch';
const Home = () => {
    const url = "http://localhost/webshop-apis/getdata.php";
    //const url2 = "http://localhost:8000/items";
    const isHome = true;
    const {items,isPending,error} = (useFetch(url));
    
    return ( 
        <div className="home">
          {error && <div>{error}</div>}     
          {isPending && <div>Loading....</div>}
          {items && <ItemsList items = {items} title = "My Items" isHome={isHome} />}      
        </div>
     );
}
 
export default Home;