import './Signup.css'
import { useState, useRef, useEffect } from 'react'
import { useContext } from 'react';
import { authContext } from '../../Utilities/context';
import Login from '../Login/login'
import { hostname } from '../../Utilities/hostname'
import { useDocTitle } from '../../Utilities/DocumentTitle';

const Signup = () => {
    useDocTitle('Signup - AudireX');
    const { setAuthPage } = useContext(authContext);
    const [form, setForm] = useState({});
    const submitBtnRef = useRef(null);
    const [checkpass, setCheckPass] = useState('');

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (checkpass != form.password) {
            submitBtnRef.current.disabled = true
        }
        else {
            submitBtnRef.current.disabled = false;
        }
    }, [checkpass])

    const handlePasswordCheck = (e) => {
        setCheckPass(e.target.value);
        console.log(checkpass == form.pass);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        let a = await fetch(`${hostname}/auth/signup`,
            {
                method: 'POST',
                headers: {
                    Accept: '/',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
        )

        let response = await a.json();

        if (response.message == null) {
            alert(response.error);
        } else {
            setAuthPage(<Login />);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-menu">
                <div className="signup-heading">Signup</div>
                <div className="signup-text">Already have an account?
                    <span onClick={() => { setAuthPage(<Login />) }}>Login</span>
                </div>
                <div className="gap"></div>
                <form className="signup-form" onSubmit={handleFormSubmit}>
                    <div className='form-input'>
                        <input type="text" name="username" onChange={handleInputChange} value={form.username} placeholder='Username' required />
                    </div>
                    <div className='form-input'>
                        <input type="email" name="email" onChange={handleInputChange} value={form.email} placeholder='Email' required />
                    </div>
                    <div className='form-input'>
                        <input type="password" name="password" onChange={handleInputChange} value={form.password} placeholder='Password' required />
                    </div>
                    <div className='form-input'>
                        <input type="password" name="Checkpassword" onChange={handlePasswordCheck} value={checkpass} placeholder='Check Password' required />
                    </div>
                    <div>
                        <input type="submit" value="Signup" className='submitBtn' ref={submitBtnRef} />
                    </div>
                </form>
                <div className="gap"></div>
                <div className="or-div">
                    <div className="seperator"></div>
                    <div className="or-div-text">or Login with</div>
                    <div className="seperator"></div>
                </div>
                <div className="gap"></div>
                <div className="btns-option">
                    <button className="googleBtn">Google</button>
                    <button className="facebookBtn">Facebook</button>
                    <button className="twitterBtn">Twitter</button>
                </div>
            </div>
        </div>
    )
}

export default Signup
