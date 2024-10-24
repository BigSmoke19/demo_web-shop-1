import './styles/home/WishList.css';
const WishList = (props) => {
    const likes = (localStorage.getItem('likes'))?localStorage.getItem('likes'):[]
    return ( 
            <div className={props.onWishList?"wish-list wishlist-open":"wish-list"}>
                <div className="cancel-wishlist-button">
                    <button style={{border:"none",backgroundColor:"black"}} onClick={()=>props.setOnWishList(!props.onWishList)}>
                        <p style={{color:"white",fontSize:20,margin:0}}>x</p>
                    </button>
                </div>
                {Array.from(props.items).map((item)=>{
                    return (
                        <div className="wishlist-items-container" key={item.id}>
                            {
                             likes.includes(item.id)
                             &&
                             <div className="wishlist-container">
                                <p>{item.name} -- {item.type}</p>
                                <img className="wishlist-thumbnail" src={`data:image/jpeg;base64,${item.image}`}/>
                                <p>{item.price}$</p>
                             </div>
                            }
                        </div>
                    )
                })}
            </div>
     );
}

export default WishList
 