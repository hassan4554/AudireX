import './Services.css'
import { FaShippingFast } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { IoIosCard } from "react-icons/io";

const Services = () => {
    return (
        <div className="services">
            <h1 className="services-heading">Our Advantages</h1>
            <div className="services-container">
                <div className="advantage">
                    <div className="advantage-icon"><FaShippingFast /></div>
                    <div>
                        <h3 className="services-heading-3">Express Delivery</h3>
                        <p className="services-text">Ships in 24 hours</p>
                    </div>
                </div>
                <div className="advantage">
                    <div className="advantage-icon" ><FaShieldAlt /></div>
                    <div>
                        <h3 className="services-heading-3">Brand Warranty</h3>
                        <p className="services-text">100% Original Products</p>
                    </div>
                </div>
                <div className="advantage">
                    <div  className="advantage-icon"><FaTags /></div>
                    <div>
                        <h3 className="services-heading-3">Exciting Deals</h3>
                        <p className="services-text">On all prepaid orders</p>
                    </div>
                </div>
                <div className="advantage">
                    <div  className="advantage-icon"><IoIosCard /></div>
                    <div>
                        <h3 className="services-heading-3">Secure Payment</h3>
                        <p className="services-text">SSL / Secure Certificates</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
