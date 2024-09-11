import './styles/home/header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = () => {
    const [isMenu,setIsMenu]=React.useState(false);
    const [cookies,setCookies,removeCookie] = useCookies(['email']);
    const [isUserHover,setIsUserHover]=React.useState(false);
    /*const handleLogOut = () =>{
        removeCookie('email',{path: '/'});
    }*/
   function handleUserEnter() {
        setIsUserHover(true)
   }

   function handleUserLeave() {
        setIsUserHover(false)
    }

    function handleUserClick() {
        setIsUserHover(!isUserHover)
    }
    return(
        <header>
            <div className="left-section" >
                <div className={isMenu?"side-bar open":"side-bar"}>
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="Create">Create</Link>
                    <Link className="link" to="SignUp">SignUp</Link>
                    <button className="cancel-button" onClick={()=>setIsMenu(false)}>
                        X
                    </button>
                </div>
                <button className="menu-icon-button" onClick={()=>setIsMenu(true)}>
                    <img src="/images/icons/menu-icon.png" className="menu-icon" />
                </button>
                <p className="title">
                    Web-Shop
                </p>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search for products" />
                <button className="search-button">
                    <img src="/images/icons/search-icon.png" className="search-icon" />
                </button>
            </div>

            <div className="right-section">
                <button className="white-right-section-buttons">
                    <img src="/images/icons/white-search-icon.png" className="white-search-icon" />
                </button>
                <button className="right-section-buttons user-icon-button" 
                    onMouseEnter={handleUserEnter} onMouseLeave={handleUserLeave} onClick={handleUserClick}
                >
                    <img src="/images/icons/user-icon.png" className="user-icon" />
                </button>

                <div className={!isUserHover?"user-bar":"user-bar open-user-bar"}
                    onMouseEnter={handleUserEnter} onMouseLeave={handleUserLeave}>
                    <Link to="/login">
                        Sign In
                    </Link>
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </div>

                <button className="right-section-buttons">
                    <img src="/images/icons/heart-icon.png" className="heart-icon" />
                </button>
                <Link to='Cart'>
                <button className="right-section-buttons">
                    <img src="/images/icons/cart-icon.png" className="cart-icon" />
                </button>
                </Link>
            </div>
        </header>
    )
}
 
export default Header;