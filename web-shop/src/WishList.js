import './styles/home/WishList.css';
const WishList = (props) => {
    return ( 
            <div className={props.onWishList?"wish-list wishlist-open":"wish-list"}>
                <div className="cancel-wishlist-button">
                    <button style={{border:"none",backgroundColor:"black"}} onClick={()=>props.setOnWishList(!props.onWishList)}>
                        <p style={{color:"white",fontSize:20,margin:0}}>x</p>
                    </button>
                </div>
                {Array.from(props.items).map((item)=>{
                    return (
                        <div className="wishlist-items-container">
                            {
                             localStorage.getItem('likes').includes(item.id)
                             &&
                             <div className="wishlist-container">
                                <img className="wishlist-thumbnail" src={`data:image/jpeg;base64,${item.image}`}/>
                             </div>
                            }
                        </div>
                    )
                })}
            </div>
     );
}

export default WishList
 