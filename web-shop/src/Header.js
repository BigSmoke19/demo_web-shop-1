import { Link } from "react-router-dom";
import React from "react";
import './styles/home/header.css'
import './styles/home/sidebar.css'

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
                        <img src="../images/icons/option-icon.png" className="option-icon"/>
                    </button>
                    <p className="title">Web-Shop</p>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="search" placeholder="Search" />
                    <button className="search-icon-button">
                        <img src="../images/icons/search-icon.webp" className="search-icon" />
                    </button>
                </div>

                <div className="right-section">
                    <button className="button-icon">
                        <img className="cart-icon" src="../images/icons/cart-icon.jpg"/>
                    </button>
                    <button className="button-icon">
                        <img src="../images/icons/wishlist-icon.svg" className="love-icon" />
                    </button>
                </div>
            </div>
        </header>
     );
}
 
export default Header;