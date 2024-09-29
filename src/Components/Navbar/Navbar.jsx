import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Products from '../Utilities/productsData'
import { hostname } from "../Utilities/hostname";
import axios from "axios";
import './navbar.css'
import './searchbar.css'
import './userMenu.css'

const Navbar = () => {
    const itemCount = useSelector((state) => state.cartItems.value.length);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [userLogged, setUserlogged] = useState({});
    const [isUserLogged, setIsUserLogged] = useState(false);

    ///////////////////////////////////////////////////


    const [searchText, setSearchText] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();


    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            axios.get(`${hostname}/auth/protected-route`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUserlogged(response.data.user)
                    setIsUserLogged(true)
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        alert('Session expired. Please log in again.');
                        goToAuthPage();
                    } else {
                        console.log(error);
                    }
                    setIsUserLogged(false)
                })
        } else {
            setIsUserLogged(false);
        }

    }, [])


    useEffect(() => {
        if (searchText != '') {
            const arr = Products.filter((item) => {
                return (
                    item.title.includes(searchText) || item.brand.includes(searchText) || item.category.includes(searchText)
                )
            })

            setSuggestions(arr);
        }
        else {
            setSuggestions([]);
        }
    }, [searchText])

    const showProduct = (item) => {
        navigate(`product-details/${item.id}`)
        toggleSearchOpen();
        setSearchText('');
    }

    const handleClickOutside = () => {
        setIsSearchOpen(false);
    }


    /////////////////////////////////////////////////////////////////

    const delay = (d) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, d * 1000)
        })
    }


    const toggleSearchOpen = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const setUserMenuOpen = async () => {
        await delay(0.5);
        setUserMenu(true);
    }

    const setUserMenuClose = async () => {
        await delay(0.5);
        setUserMenu(false);
    }

    const goToAuthPage = () => {
        setUserMenuClose();
        navigate('auth');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <>
            <nav className="navbar">
                <h2 className="C-name">AudireX</h2>
                <div className="buttons">
                    <button className="searchBtn" onClick={toggleSearchOpen}><IoSearch /></button>
                    <div className="cartBtn-container">
                        <button className="cartBtn"><NavLink className='cart-link'
                            to='/cart'><MdOutlineShoppingCart /></NavLink></button>
                        {
                            itemCount != 0 && (<span className="itemCount">{itemCount}</span>)
                        }
                    </div>
                    <button className="userBtn"
                        onMouseOver={setUserMenuOpen}
                        onMouseOut={setUserMenuClose}
                    ><LuUser /></button>
                </div>
            </nav>

            {
                isSearchOpen && <div className='searchbar-container' onClick={handleClickOutside}>
                    <div className="searchbar" onClick={(e) => e.stopPropagation()}>
                        <input type="text" name="" id="" className="search" value={searchText} placeholder='Search for product...' onChange={handleSearchChange} />
                        {
                            suggestions.length != 0 &&
                            <div className="search-suggestions">
                                {
                                    suggestions.map((item) => {
                                        return (
                                            <div className="suggestion" key={item.id}
                                                onClick={() => { showProduct(item) }}
                                            >
                                                {item.title}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            }

            {
                userMenu && <div className="userMenu-container"
                    onMouseOver={setUserMenuOpen}
                    onMouseOut={setUserMenuClose}>
                    <div className="userMenu">

                        {
                            isUserLogged ? (<>
                                <h4 className="userMenu-heading">Hello! <span className="user-name">{userLogged.username}</span></h4>
                                <div className="gap"></div>
                                <button className="userMenu-btn" onClick={handleLogout}>Logout</button>
                            </>) :
                                (<>
                                    <h4 className="userMenu-heading">Hello!</h4>
                                    <p className="userMenu-text">Access Acounts and Manage Orders</p>
                                    <button className="userMenu-btn" onClick={goToAuthPage}>Login / Signup</button>
                                </>)
                        }
                        <div className="gap"></div>
                        <div className="seperator"></div>
                        <div className="gap"></div>

                        <ul className="userMenu-list">
                            <li className="userMenu-items">Orders</li>
                            <li className="userMenu-items">Wishlist</li>
                            <li className="userMenu-items">Gift Cards</li>
                            <li className="userMenu-items">Saved Cards</li>
                            <li className="userMenu-items">Saved Address</li>
                        </ul>
                    </div>
                </div>
            }

        </>
    )
}

export default Navbar
