import './styles/home/header.css';
import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from './context';
import WishList from './wishlist.js';
import { UserContext } from './usercontext.js';
import { useCookies } from 'react-cookie';

const Header = () => {
    const [isMenu,setIsMenu]=React.useState(false);
    const [onWishList,setOnWishList]= useState(false);
    //const [cookies,setCookies,removeCookie] = useCookies(['email']);
    const [isUserHover,setIsUserHover]=React.useState(false);
    const history = useNavigate();

    const [{useremail,setUserEmail},{isadmin,setIsAdmin}] = useContext(UserContext);

    const [{search,setSearch},{items, setItems},{recomendations,setRecomendations}] = useContext(DataContext);

    const [cookie,setCookie,removeCookie] = useCookies("email");

   function handleUserEnter() {
        setIsUserHover(true)
   }

   function handleUserLeave() {
        setIsUserHover(false)
    }

    function handleUserClick() {
        setIsUserHover(!isUserHover)
    }
    
    const handleSearch = (s) =>{
        setSearch(s.trim());
    }

    const handleWebShop = ()=>{
        history("/");
    }

    function extractPhrases(word, keyword) {
        const keywordIndex = word.indexOf(keyword);
        
        if (keywordIndex === -1) {
          return ['',''];
        }
      
        const wordLeft = word.substring(0, keywordIndex);
        const wordRight = word.substring(keywordIndex + keyword.length);
      
        return [
          wordLeft,
          wordRight
    ];
      }

      const handleSelectedRec = (rec) =>{
        setItems([rec]);
        setRecomendations(null);
      }

      const handleLogout = () =>{
        removeCookie('email',{path: '/'});
        window.location.reload();
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
                <button className="menu-icon-button" alt="" onClick={()=>setIsMenu(true)}>
                    <img src="/images/icons/menu-icon.png" alt="" className="menu-icon" />
                </button>
                <p className="title" onClick={handleWebShop}>
                    Web-Shop
                </p>
            </div>


            <div className="middle-section">
                <input className="search-bar" onChange={(e)=>handleSearch(e.target.value)} type="text" placeholder="Search for products" />
                <button className="search-button">
                    <img src="/images/icons/search-icon.png" alt="" className="search-icon" />
                </button>
            </div>
            {recomendations &&
             <div className="search-recomendation" onClick={(e)=>e.target.hidden = true}>
                {recomendations.map((rec)=>{

                    const [w1,w2] = extractPhrases(rec.name,search);

                    return (
                    <div className='recomendation' onClick={(e)=>e.target.hidden = true}>
                        <span>{w1}</span><span className="search-phrase">{search}</span><span>{w2}</span>
                        &nbsp; {rec.type} - {rec.price}$
                    </div>
                        )
                    })
                }
             </div>
            }


            <div className="right-section">
                <button className="white-right-section-buttons">
                    <img src="/images/icons/white-search-icon.png" alt="" className="white-search-icon" />
                </button>
                <button className="right-section-buttons user-icon-button" 
                    onMouseEnter={handleUserEnter} onMouseLeave={handleUserLeave} onClick={handleUserClick}
                >
                    <img src="/images/icons/user-icon.png" alt="" className="user-icon" />
                </button>

                <div className={!isUserHover?"user-bar":"user-bar open-user-bar"}
                    onMouseEnter={handleUserEnter} onMouseLeave={handleUserLeave} onClick={handleUserClick}>
                    <Link to="/login">
                        Sign In
                    </Link>
                    <Link to="/login/signup">
                        Sign Up
                    </Link>
                   { cookie.email && <Link onClick={handleLogout}>
                        Log Out
                    </Link>}
                </div>

                <button className="right-section-buttons" onClick={()=>setOnWishList(!onWishList)} >
                    <img src="/images/icons/heart-icon.png" alt="" className="heart-icon" />
                    <WishList  onWishList={onWishList} setOnWishList={()=>setOnWishList}/>
                </button>
                <Link to='/cart'>
                <button className="right-section-buttons">
                    <img src="/images/icons/cart-icon.png" alt="" className="cart-icon" />
                </button>
                </Link>
                {isadmin &&
                <Link to='Create'>
                <button id="log-out">
                    Admin
                </button>
                </Link>}
            </div>
        </header>
    )
}
 
export default Header;