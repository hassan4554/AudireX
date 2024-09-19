import Products from '../Utilities/productsData'
import { useState, useEffect, useRef } from 'react'
import HandleCartBtn from '../Utilities/handleCart'
import { ProductRating } from '../Utilities/ProductRating'
import { NavLink } from 'react-router-dom'
import Advantages from '../Services/Services.jsx'
import { useDocTitle } from '../Utilities/DocumentTitle.jsx'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { ScrollToTop } from "../Utilities/ScrollToTop.jsx"
import './allproducts.css'

const AllProducts = () => {
  useDocTitle('All Products - AudireX');
  ScrollToTop();
  const [newArr, setNewArr] = useState(Products)
  const [sort, setSort] = useState(null);
  const [price, setPrice] = useState(19990);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const checkboxRefs = useRef([]);

  const toggleFilterBar = () => {
    setIsOpen(!isOpen);
  }

  const setSortStyle = (s) => ({
    color: sort == s ? '#ff0000' : '',
  })

  const handleTopRated = () => {
    const arr = Products.filter((product) => {
      return product.rateCount == 5;
    })
    setNewArr(arr);
  }

  const handlePriceLow = () => {
    const arr = [...Products];
    arr.sort((a, b) => a.finalPrice - b.finalPrice);
    setNewArr(arr);
  }

  const handlePriceHigh = () => {
    const arr = [...Products];
    arr.sort((a, b) => b.finalPrice - a.finalPrice);
    setNewArr(arr);
  }

  const clearFilters = () => {
    setSort(null);
    setPrice(19990);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setNewArr(Products);
    checkboxRefs.current.map((check) => {
      check.checked = false;
    })
  }

  const handlePriceChange = async (e) => {
    setPrice(e.target.value);
  }

  const handleCheckboxChange = (e) => {
    const { name, checked, dataset } = e.target;

    if (dataset.type === 'brand') {
      setSelectedBrands((prev) => {
        if (checked) return [...prev, name];
        return prev.filter((brand) => brand !== name);
      });
    } else if (dataset.type === 'category') {
      setSelectedCategories((prev) => {
        if (checked) return [...prev, name];
        return prev.filter((category) => category !== name);
      });
    }
  }

  useEffect(() => {
    let filteredProducts = Products;
    filteredProducts = filteredProducts.filter((product) => product.finalPrice <= price);

    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) => selectedBrands.includes(product.brand));
    }

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) => selectedCategories.includes(product.category));
    }

    setNewArr(filteredProducts);
  }, [price, selectedBrands, selectedCategories]);


  useEffect(() => {
    checkboxRefs.current = checkboxRefs.current.slice(0, 7);
  }, []);


  return (
    <>
      <button className={`filter-toggle-btn ${isOpen ? 'btn-move' : ''}`} onClick={toggleFilterBar}>
        {isOpen ? <MdOutlineKeyboardDoubleArrowLeft /> : <MdOutlineKeyboardDoubleArrowRight />}
      </button >
      <div className={`allProducts-container ${isOpen ? 'open' : ''}`}>
        <div className={`filters-tab ${isOpen ? 'show' : ''}`}>
          <button className="clearBtn" onClick={clearFilters}>Clear Filters</button>
          <div className="sort">
            <h3 className="filters-tab-heading">Sort By</h3>
            <div className="seperator"></div>
            <div className="gap"></div>
            <ul className="sort-list">
              <li className="sort-item" onClick={() => {
                handleTopRated()
                setSort('Top-Rated')
              }}
                style={setSortStyle('Top-Rated')}
              >Top Rated</li>
              <li className="sort-item" onClick={() => {
                handlePriceLow()
                setSort('Price-Low')
              }}
                style={setSortStyle('Price-Low')}
              >Price(Lowest First)</li>
              <li className="sort-item"
                onClick={() => {
                  handlePriceHigh();
                  setSort('Price-High')
                }}
                style={setSortStyle('Price-High')}
              >Price(Highest First)</li>
            </ul>
          </div>
          <div className="filter">
            <h3 className="filters-tab-heading">Filter By</h3>
            <div className="seperator"></div>
            <div className="gap"></div>
            <div className='filter-div'>
              <div className="brand">
                <h4 className="brand-heading">Brand</h4>
                <div className="gap"></div>

                {['JBL', 'boAt', 'Sony'].map((brand, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={brand}
                      id={brand}
                      data-type="brand"
                      ref={(el) => (checkboxRefs.current[index] = el)}
                      onChange={handleCheckboxChange}
                    />
                    <label className='brand-label' htmlFor={brand}>{brand}</label>
                  </div>
                ))}

              </div>

              <div className="gap"></div>

              <div className="category">
                <h4 className="category-heading">Category</h4>
                <div className="gap"></div>

                {['Headphones', 'Earbuds', 'Earphones', 'Neckbands'].map((category, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={category}
                      id={category}
                      data-type="category"
                      ref={(el) => (checkboxRefs.current[index + 3] = el)}
                      onChange={handleCheckboxChange}
                    />
                    <label className='category-label' htmlFor={category}>{category}</label>
                  </div>
                ))}

              </div>
              <div className="gap"></div>

              <div className="pricing">
                <div className="price-heading">Price</div>
                <div className="price-text">Rs. {price.toLocaleString('en-IN')}</div>
                <input type="range" value={price} name="price-range" min='549' className='price-range' max='19990' onChange={handlePriceChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="products-listing">
          {
            newArr.map((item) => {
              return (
                <div className="product-card" key={item.id}>
                  <figure className="card-figure" >
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
        </div>
      </div>
      <Advantages />
    </>
  )
}

export default AllProducts
