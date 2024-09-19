import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Products from '../Utilities/productsData.jsx'
import ProductSpecs from "./ProductSpecs"
import ProductOverview from "./ProductOverview"
import ProductReview from './ProductReview'
import RelatedProducts from "./RelatedProducts"
import Advantages from '../Services/Services.jsx'
import { useDispatch } from 'react-redux'
import { incrementCartItem } from '../Redux/CartItems/cartItemSlice'
import { useDocTitle } from '../Utilities/DocumentTitle.jsx'
import { ProductRating } from '../Utilities/ProductRating.jsx'
import { ScrollToTop } from "../Utilities/ScrollToTop.jsx"
import './Product.css'


const Product = () => {
    useDocTitle('Product Details - AudireX ')
    ScrollToTop();
    const { id } = useParams();
    const index = Products.findIndex(product => product.id == id);
    const dispatch = useDispatch();
    const data = Products[index];
    const [image, setImage] = useState(data.images[0]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('Specs');

    const handleClick = (item, key) => {
        setImage(item);
        setCurrentImageIndex(key);
    }

    useEffect(() => {
        setImage(data.images[0]);
    }, [id])

    const setStyle = (cat) => ({
        color: selectedCategory === cat ? '#fff' : '',
        backgroundColor: selectedCategory === cat ? 'red' : ''
    })


    const handleCartAdd = async (e, item) => {
        e.target.style.backgroundColor = '#008000';
        e.target.innerText = 'Item Added';
        e.target.disabled = true;
        dispatch(incrementCartItem(item));
        await delay();
        e.target.style.backgroundColor = '#ff0000';
        e.target.innerText = 'Add to cart';
        e.target.disabled = false;
    }

    const delay = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }

    return (
        <>
            <div className="product-container">
                <div className="left-col">
                    <div className="product-imgs">
                        {
                            data.images.map((item, key) => {
                                return (
                                    <div key={key}
                                        className={key == currentImageIndex ? 'tab-image active-tab-image' : 'tab-image'}
                                        onClick={() => { handleClick(item, key) }}>
                                        <img src={item} alt=" Product Image" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <img className="active-img" src={image} alt="product image" />
                    </div>
                </div>
                <div className="right-col">
                    <div className="product-details">
                        <div>
                            <h1 className="product-title">{data.title}</h1>
                            <p className="product-tagline">{data.tagline}</p>
                            <div className="product-rating">
                                <ProductRating rateCount={data.rateCount} />
                                <div className="product-reviews">  |  {data.ratings} Ratings</div>
                            </div>
                        </div>
                        <div className="gap"></div>
                        <div className="seperator"></div>
                        <div className="gap"></div>
                        <div className="price-detail">
                            <div>
                                <h2 className="final-price">Rs. {data.finalPrice.toLocaleString('en-IN')}</h2>
                                <h3 className="og-Price line-through">Rs. {data.originalPrice.toLocaleString('en-IN')}</h3>
                            </div>
                            <p className="saved-price">{`You saved: Rs. ${(data.originalPrice - data.finalPrice).toLocaleString('en-IN')}`}</p>
                            <p>( inclusive of all taxes )</p>
                        </div>
                        <div className="gap"></div>
                        <div className="seperator"></div>
                        <div className="gap"></div>
                        <div className="product-offers">
                            <h2 className="offer-heading">Offers and Discounts</h2>
                            <div className="offers">
                                <div>
                                    no cost EMI on credit card
                                </div>
                                <div>
                                    pay later and avail cashback
                                </div>
                            </div>
                        </div>
                        <div className="gap"></div>
                        <div className="seperator"></div>
                        <div className="gap"></div>
                        <button className="addCartBtn" onClick={(e) => { handleCartAdd(e, data) }}>Add to cart</button>
                    </div>
                </div>
            </div>

            <div className="details-category">
                <div onClick={() => { setSelectedCategory('Specs') }}
                    style={setStyle('Specs')}
                >Specifications</div>
                <div onClick={() => { setSelectedCategory('Overview') }}
                    style={setStyle('Overview')}
                >Overview</div>
                <div onClick={() => { setSelectedCategory('Review') }}
                    style={setStyle('Review')}
                >Reviews</div>
            </div>

            {
                selectedCategory == 'Specs' ? <ProductSpecs data={data} /> : ''
            }
            {
                selectedCategory == 'Overview' ? <ProductOverview data={data} /> : ''
            }
            {
                selectedCategory == 'Review' ? <ProductReview /> : ''
            }

            <div className="gap-large"></div>
            <RelatedProducts data={data} />
            <Advantages />
        </>
    )
}

export default Product