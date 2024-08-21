import { useParams } from "react-router-dom";
import useFetch from "./usefetch";
const ItemDetails = () => {
    const {id} = useParams();
    const {items : item,isPending,error} = (useFetch(`http://localhost:8000/items/${id}`));
    return ( 
        <div className="item-details">
          {error && <div>{error}</div>}     
          {isPending && <div>Loading....</div>}
          {item && (
            <article>
                <h2>{item.name}</h2>
                <p>{item.type}</p>
                <p>can be purchased for {item.price} $ only</p>
            </article>
          )}              
        </div>
    );
}
 
export default ItemDetails;