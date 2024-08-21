
import ItemsList from './itemslist';
import useFetch from './usefetch';
const Home = () => {
    const {items,isPending,error} = (useFetch("http://localhost:8000/items"));

    return ( 
        <div className="home">
          {error && <div>{error}</div>}     
          {isPending && <div>Loading....</div>}
          {items && <ItemsList items = {items} title = "My Items"/>}      
        </div>
     );
}
 
export default Home;