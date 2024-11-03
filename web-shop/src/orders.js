import Header from "./Header";
import useFetch from "./usefetch";
import "./styles/admin/orders.css"

const Orders = () => {

    const url = "http://localhost/webshop-apis/getorders.php";

    const {items: orders,isPending,error} = useFetch(url);

    return (
        <div>
            <div className="orders">
                <h2>Orders</h2>
                {isPending && <h3>Loading ....</h3>}
                {!isPending && orders && Array.from(orders).map((order)=>{
                    return(
                        <div className="order" key={order.orderid}>
                        <p className="orderemail">Order from : {order.cusemail}</p>             
                        <div className="orderitems">
                        {JSON.parse(order.orderdata).map((item)=>{
                            return(
                                <div className="orderdata" >
                                <p className="orderinfo">{item.name} -- {item.type}</p>
                                <img className="orderthumbnail" src={`data:image/png;base64,${item.image}`}/>
                                <p className="orderinfo">Price: {item.price}</p>
                                <p className="orderinfo">Quantity: {item.quantity}</p>
                            </div>
                            )

                        })}
                        </div>
                        <p className="ordertotal">total: {order.total}$</p>
                    </div>
                    )
                })}           
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}
 
export default Orders;