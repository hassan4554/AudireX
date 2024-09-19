import './productslisting.css'
import Products from '../Utilities/productsData'
import { NavLink } from 'react-router-dom'
import HandleCartBtn from '../Utilities/handleCart'
import { useState, useEffect } from 'react'
import { ProductRating } from '../Utilities/ProductRating'

const ProductsListing = () => {
    const [category, setCategory] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [newArr, setNewArr] = useState(Products.slice(9, 18))

    useEffect(() => {
        category == 'All' ? setNewArr(Products.slice(9, 18)) : setNewArr(Products.filter(product => product.category == category));
    }, [category])

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        setCategory(categoryName);
    };

    const getCategoryStyle = (currentCategory) => ({
        color: selectedCategory === currentCategory ? '#fff' : 'inherit',
        backgroundColor: selectedCategory === currentCategory ? 'red' : ''
    });

    return (
        <>
            <div className="products-listing-container">
                <div className="products-listing-heading">Top Products</div>
                <div className="categories-container">
                    <div className="categories">
                        <div
                            style={getCategoryStyle('All')}
                            onClick={() => { handleCategoryClick('All') }}>All</div>
                        <div
                            style={getCategoryStyle('Headphones')}
                            onClick={() => { handleCategoryClick('Headphones') }}>Headphones</div>
                        <div
                            style={getCategoryStyle('Earbuds')}
                            onClick={() => { handleCategoryClick('Earbuds') }}>Earbuds</div>
                        <div
                            style={getCategoryStyle('Earphones')}
                            onClick={() => { handleCategoryClick('Earphones') }}>Earphones</div>
                        <div
                            style={getCategoryStyle('Neckbands')}
                            onClick={() => { handleCategoryClick('Neckbands') }}>NeckBand</div>
                    </div>
                </div>
                <div className="products-listing">


                    {
                        newArr.map((item) => {
                            return (
                                <div className="product-card" key={item.id}>
                                    <figure className="card-figure">
                                        <NavLink to={`/product-details/${item.id}`}>
                                            <img src={item.images[0]} alt={item.title} className="card-img" />
                                        </NavLink>
                                    </figure>
                                    <ProductRating rateCount={item.rateCount} />
                                    <div className="card-title">{item.title}</div>
                                    <p className="card-info">{item.info}</p>
                                    <div className="gap"></div>
                                    <div className="seperator"></div>
                                    <div className="gap"></div>
                                    <div className="card-price">
                                        <div className="fn-price">Rs. {item.finalPrice.toLocaleString('en-IN')}</div>
                                        <div className="og-price line-through">Rs. {item.originalPrice.toLocaleString('en-IN')}</div>
                                    </div>
                                    <HandleCartBtn item={item} />
                                </div>
                            )
                        })
                    }
                    <div className="view-card">
                        <div>
                            <NavLink className='view-link' to='/all-products'>Browse All Products&#8594;</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsListing
