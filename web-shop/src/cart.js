import ItemsList from "./itemslist";
const Cart = () => {
    const items = JSON.parse(localStorage.getItem('items'));
    const isHome = false;
    return ( 
        <div className="cart">
            {items && <ItemsList items = {items} title = "My Items" isHome={isHome} />}
        </div>
     );
}
 
export default Cart;