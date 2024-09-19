import './footer.css'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'

const Footer = () => {
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thankyou, you are subscribed to receive our daily newsletter");
        setEmail('');
    }

    return (
        <footer className="footer">
            <div className="footer-about">
                <h2 className="footer-heading-2">AudireX</h2>
                <p className="footer-text">Subscribe to our Email alerts to recieve early discount offers, and new products info.</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} className="footer-input" placeholder="Email Address*" onChange={handleChange} required />
                    <input type="submit" value="Subscribe" className="subscribeBtn" />
                </form>
            </div>
            <div className="footer-menu">
                <h3 className='footer-heading-3'>Help</h3>
                <ul className='footer-tab'>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/FAQs'>FAQs</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/orderdetails'>Track Order</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/orderdetails' >Cancel Order</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/orderdetails' >Return Order</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/warranty' >Warranty Info</NavLink>
                    </li>
                </ul>
            </div>
            <div className="footer-menu">
                <h3 className='footer-heading-3'>Policies</h3>
                <ul className='footer-tab'>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/FAQs'>Return policy</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/orderdetails'>Security</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/orderdetails' >Sitemap</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/orderdetails' >Privacy Policy</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/warranty' >Terms & Conditions</NavLink>
                    </li>
                </ul>
            </div>
            <div className="footer-menu">
                <h3 className='footer-heading-3'>Company</h3>
                <ul className='footer-tab'>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/FAQs'>About Us</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/orderdetails'>Contact Us</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/orderdetails' >Services Centers</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/orderdetails' >Carrers</NavLink>
                    </li>
                    <li className="footer-item">
                        <NavLink className='footer-link' to='/warranty' >Affiliates</NavLink>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer
