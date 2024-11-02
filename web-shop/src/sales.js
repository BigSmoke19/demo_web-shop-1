
import "./styles/home/sales.css"
const Sales = ({handleSale,sales,items,error}) => {
    
    return ( 
        <div className="sales">
            <h2>Sales</h2>
            {Array.isArray(sales) && sales.map((sale)=>(
                <div className="sale" onClick={()=>handleSale(sale.name.trim())}>
                    <p className="sale-name">{sale.name}</p>
                    <img  className="sale-image" src={`data:image/jpeg;base64,${sale.image}`}/>
                    <div className="sale-items">
                        <div className="items-grid">
                        {items && items.map((item)=>{
                            if(item.sale.trim() === sale.name.trim()){
                                return(
                                    <div className="sale-item-container">
                                        <img  className="item-thumbnail" src={`data:image/png;base64,${item.image}`}/>
                                    </div>
                                )
                            }
                        })}
                        </div>
                    </div>
                </div>
            ))}
            {error && <p>{error}</p>}
        </div>
     );
}
 
export default Sales;