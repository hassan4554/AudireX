import './Signup.css'
import { useContext, useEffect } from 'react';
import { authContext } from '../../Utilities/context';
import Login from '../Login/login'
import { useDocTitle } from '../../Utilities/DocumentTitle';
import { useFormik } from "formik"
import { signupSchema } from "../../../Schema/signupSchema";
import { useDispatch, useSelector } from "react-redux";
import { signupRoute } from "../../Redux/Auth/authSlice";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    useDocTitle('Signup - AudireX');
    const { setAuthPage } = useContext(authContext)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth)


    useEffect(() => {
        if (state.authState) {
            navigate('/')
            window.location.reload()
        }
    }, [state.authState])


    useEffect(() => {
        if (!state.error && !state.isLoading) {
            resetForm();
        }
    }, [state.error])

    const onSubmit = async (values) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
        dispatch(signupRoute(values))
    }

    const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched, resetForm } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: signupSchema,
        onSubmit
    })

    return (
        <div className="signup-container">
            <div className="signup-menu">
                <div className="signup-heading">Signup</div>
                <div className="signup-text">Already have an account?
                    <span onClick={() => { setAuthPage(<Login />) }}>Login</span>
                </div>
                <div className="gap"></div>


                <div>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-input">
                            <input type="text" name="username" value={values.username} placeholder="Username" onChange={handleChange} onBlur={handleBlur} className={`input ${errors.username && touched.username ? 'input-error' : ''}`} />
                            {
                                errors.username && touched.username && <p className="error">{errors.username}</p>
                            }
                            {
                                state.error && <p className="error">{state.error}</p>
                            }
                        </div>
                        <div className="form-input">
                            <input type="email" name="email" value={values.email} placeholder="Email" onChange={handleChange} onBlur={handleBlur} className={`input ${errors.email && touched.email ? 'input-error' : ''}`} />
                            {
                                errors.email && touched.email && <p className="error">{errors.email}</p>
                            }
                        </div>
                        <div className="form-input">
                            <input type="password" name="password" value={values.password} placeholder="Password" onChange={handleChange} onBlur={handleBlur} className={`input ${errors.password && touched.password ? 'input-error' : ''}`} />
                            {
                                errors.password && touched.password && <p className="error">{errors.password}</p>
                            }
                        </div>
                        <div className="form-input">
                            <input type="password" name="confirmPassword" value={values.confirmPassword} placeholder="Confirm Password" onChange={handleChange} onBlur={handleBlur} className={`input ${errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}`} />
                            {
                                errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>
                            }
                        </div>
                        <div>
                            <button className={isSubmitting ? `submitBtn disable` : `submitBtn`} disabled={isSubmitting} type="submit" >Submit</button>
                        </div>
                    </form>
                    {
                        isSubmitting || state.isLoading && <h2>Loading...</h2>
                    }
                </div>


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
