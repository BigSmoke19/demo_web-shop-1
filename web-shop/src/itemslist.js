import './styles/general/itemslist.css';

const ItemsList = (props) => {

    const items = props.items;
    const title = props.title;
    const isHome = props.isHome;
    const handleCart = (item) =>{
      if(localStorage.getItem('items') !== null){
        const cart = JSON.parse(localStorage.getItem('items'));
        cart.push(item);
        localStorage.setItem('items',JSON.stringify(cart));
      }
      else{
        localStorage.setItem('items',JSON.stringify([item]));
      }
    }

    return ( 
    <div className="items">
        <h2>{title}</h2>
        {Array.from(items).map((item) => (

          <div className="item" key={item.id}>
            <img className='item-image'
              src = {`data:image/jpeg;base64,${item.image}`} 
              alt="Decoded-pic">
              </img>
              <h3>{item.name}</h3>
              <h3>{item.type}</h3>
              <h3>{item.price}$</h3>
              {isHome && <button onClick={()=>handleCart(item)}>Add to cart</button>}
          </div>
        ))}
      </div>
      );
}
 
export default ItemsList;