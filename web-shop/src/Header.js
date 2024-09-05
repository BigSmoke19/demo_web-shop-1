import { Link } from "react-router-dom";
import React from "react";

const Header = () => {

    const [isCategory,setIsCategory]=React.useState(false)

    function handleCategoryClick(){
        setIsCategory(true)
    }

    function handleCancelClick() {
        setIsCategory(false)
    }

    return ( 
        <header>
            <div className={isCategory?"side-bar open":"side-bar close"}>
                <button className="cancel" onClick={handleCancelClick}>
                    X
                </button>
                <Link style={{marginBottom:20,}}className="link" to="/">Home</Link>
                <Link className="link" to="Create">Create</Link>
            </div>

            <div className="bottom-header">
                <div className="left-section">
                    <button className="button-icon" onClick={handleCategoryClick}>
                        <img src="../images/icons/category-icon.png" alt="category-icon" className="icon"/>
                    </button>
                    <p className="title">Web-Shop</p>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="search" placeholder="Search" />
                    <button className="search-icon-button">
                        <img src="../images/icons/search-icon.webp" alt="search-icon" className="search-icon" />
                    </button>
                </div>

                <div className="right-section">
                    <button className="button-icon">
                        <img src="../images/icons/cart-icon.webp" alt="cart-icon" className="icon" />
                    </button>
                    <button className="button-icon">
                        <img src="../images/icons/wishlist-icon.svg" alt="wishlist-icon" className="icon" />
                    </button>
                    <button className="button-icon">
                        <img src="../images/icons/rotate-icon.png" alt="rotate-icon" className="icon" />
                    </button>
                </div>
            </div>
        </header>
     );
}
 
export default Header;