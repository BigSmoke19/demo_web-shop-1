import './styles/home/header.css';

const Header = () => {
    return(
        <header>
            <div className="left-section">
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
                <button className="right-section-buttons">
                    <img src="/images/icons/user-icon.png" className="user-icon" />
                </button>
                <button className="right-section-buttons">
                    <img src="/images/icons/heart-icon.png" className="heart-icon" />
                </button>
                <button className="right-section-buttons">
                    <img src="/images/icons/cart-icon.png" className="cart-icon" />
                </button>
            </div>
        </header>
    )
}
 
export default Header;