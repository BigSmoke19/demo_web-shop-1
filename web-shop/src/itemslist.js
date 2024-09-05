import './styles/general/itemslist.css';
import { Link} from "react-router-dom";

const ItemsList = (props) => {
    const items = props.items;
    const title = props.title;
    const url = "http://localhost:8000/items/";

    return ( 
    <div className="items">
        <h2>{title}</h2>
        {Array.from(items).map((item) => (

          <div className="item" key={item.id}>
            <Link className="links" to={`/items/${item.id}`}>
            <img className='item-image'
              src = {`data:image/jpeg;base64,${item.image}`} 
              alt="Decoded-pic">
              </img>
              <h3>{item.name}</h3>
              <h3>{item.type}</h3>
              <h3>{item.price}$</h3>
            </Link>
          </div>
        ))}
      </div>
      );
}
 
export default ItemsList;