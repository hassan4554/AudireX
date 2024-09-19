import './header.css'
import { useState, useEffect } from 'react'
import Products from '../Utilities/productsData'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carouselData, setCarouseldata] = useState(Products[0]);
    const data = [Products[0], Products[6], Products[2]];
    const navigate = useNavigate();

    const slider = () => {
        setCarouseldata(data[currentIndex]);
        const lastSlide = (currentIndex === 2);
        const newIndex = lastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    useEffect(() => {
        slider();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            slider();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleClick = (id) => {
        navigate(`product-details/${id}`);
    }

    return (
        <>
            <div className="header">
                <div className="header-details">
                    <h3 className="header-heading-3">{carouselData.title}</h3>
                    <h1 className="header-heading-1">{carouselData.tagline}</h1>
                    <div className='header-price'>
                        <span className='finalPrice'>Rs. {carouselData.finalPrice.toLocaleString('en-IN')}</span>
                        <span className='ogPrice line-through'>Rs. {carouselData.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <button className="shopBtn" onClick={() => { handleClick(carouselData.id) }}>Shop Now</button>
                </div>
                <figure className="header-figure">
                    <img className='header-img' src={carouselData.heroImage} alt="" />
                </figure>
            </div>

            <div className="background-text">{carouselData.type}</div>
        </>
    )
}

export default Header
