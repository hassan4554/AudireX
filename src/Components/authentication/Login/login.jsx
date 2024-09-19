import { useContext, useState } from 'react';
import { authContext } from '../../Utilities/context';
import { useNavigate } from 'react-router-dom';
import Signup from '../Signup/Signup';
import { useDocTitle } from '../../Utilities/DocumentTitle';
import { PiWarningCircleBold } from "react-icons/pi";
import { hostname } from '../../Utilities/hostname';
import './login.css'

const Login = () => {
  useDocTitle('Login - AudireX');
  const { setAuthPage } = useContext(authContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isWarning, setIsWarning] = useState(false);
  const [warning, setWarning] = useState('');

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let a = await fetch(`${hostname}/auth/login`,
      {
        method: 'POST',
        headers: {
          Accept: '/',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      }
    );
    let response = await a.json();

    if (response.message == null) {
      alert(response.error);
      setWarning(response.error);
      setIsWarning(true);
    } else {
      setIsWarning(false);
      localStorage.setItem('token', response.token);
      setForm({});
      navigate('/');
      window.location.reload();
    }
  }

  return (
    <div className='login-container' >
      <div className="login-menu">
        <div className="login-heading">Login</div>
        <div className="login-text">New to AudireX ?
          <span onClick={() => { setAuthPage(<Signup />) }}>Create an account</span>
        </div>
        <div className="gap"></div>

        <form className="login-form" onSubmit={handleFormSubmit}>
          <div className="form-input">
            <input type="email" name="email" onChange={handleInputChange} placeholder='Email' value={form.email} required />
          </div>
          {
            isWarning && <div className="warning">
              <div className="warning-icon"><PiWarningCircleBold /></div>
              <div className='warning-text'>{warning}</div>
            </div>
          }
          <div className="form-input">
            <input type="password" name="password" onChange={handleInputChange} placeholder='Password' value={form.password} required />
          </div>
          <input type="submit" value="Login" className='submitBtn' />
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

    </div >
  )
}

export default Login