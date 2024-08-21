import { Link, useNavigate } from "react-router-dom";

const ItemsList = (props) => {
    const items = props.items;
    const title = props.title;
    const history = useNavigate();
    const url = "http://localhost:8000/items/";

    const handleDelete = (id) =>{
      fetch(url + id,{method:"DELETE"})
      .then(()=>history("/"));
    };
    return ( 
    <div className="items">
        <h2>{title}</h2>
        {items.map((item) => (
          <div className="items-preview" key={item.id}>
            <Link className="links" to={`/items/${item.id}`}>
              <h3>{item.name}</h3>
              <h3>{item.type}</h3>
              <h3>{item.price}$</h3>
              <button id="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
            </Link>
          </div>
        ))}
      </div>
      );
}
 
export default ItemsList;