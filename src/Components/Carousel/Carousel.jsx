import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import './carousel.css';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import Products from '../Utilities/productsData'
function Carousel() {
    const navigate = useNavigate();
    const slideData = [];
    const handleSlide = (id) => {
        navigate(`/product-details/${id}`);
    }

    for (let i = 0; i < 8; i++) {
        slideData.push(Products[i]);
    }

    return (
        <>
            <div className="carousel-heading">Featured Products</div>
            <Swiper
                spaceBetween={50}
                slidesPerView={2}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                effect={'coverflow'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false,
                }}
                modules={[Autoplay, Pagination, EffectCoverflow]}
                onSlideChange={() => { }}
                onSwiper={() => { }
                }
                className='swiper'
            >

                {
                    slideData.map((item) => {
                        return (
                            <SwiperSlide className='slide' key={item.id}
                                onClick={() => { handleSlide(item.id) }}>
                                <p className="slide-text">{item.title}</p>
                                <figure className="slide-figure">
                                    <img src={item.images[0]} alt="" className="slide-img" />
                                </figure>
                                <h3 className="slide-price">Rs. {item.finalPrice.toLocaleString('en-IN')}</h3>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    );
};

export default Carousel;
