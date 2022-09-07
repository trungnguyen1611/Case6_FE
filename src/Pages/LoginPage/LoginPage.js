import React, {useState} from 'react';
import './LoginPage.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from '../../axios/index';
import {auth, googleAuthProvider, faceBookAuthProvider, githubAuthProvider} from "../../Config/firebase"
import {signInWithPopup} from "firebase/auth"
import isEmpty from "validator/es/lib/isEmpty";
import {useDispatch, useSelector} from 'react-redux'
import {UserLoginWithFireBase, UserLoginWithPassword} from '../../Features/CurrentUser/UserSlice'
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";
import {selectCurrentWallet} from "../../Features/Transaction/currentWalletSlice";

const DEFAULT_USER_URL = "https://firebasestorage.googleapis.com/v0/b/aloha-money.appspot.com/o/DefaultUser.jpg?alt=media&token=58615f07-c33a-42f7-aa11-43b9d8170593"


const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [active, setActive] = useState('container');
    const [userSignIn, setUserSignIn] = useState({
        email: '',
        password: ''
    })
    const [userSignUp, setUserSignUp] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [validateSignInMsg, setValidateSignInMsg] = useState({});
    const [validateSignUpMsg, setValidateSignUpMsg] = useState('');
    const [listWallet, setListWallet] = useState([]);
    const [isHaveWallet, setIsHaveWallet] = useState(false);
    const [togglePassword, setTogglePassword] = useState(true)
    const currentWalletState = useSelector(state => state.currentWallet.value)
    const handleClickSignIn = () => {
        setActive('container')
    }

    const handleClickSignUp = () => {
        setActive('container right-panel-active')
    }

    const handleChangeSignIn = (e) => {
        setUserSignIn({...userSignIn, [e.target.name]: e.target.value})
    }

    const handleChangeSignUp = (e) => {
        setUserSignUp({...userSignUp, [e.target.name]: e.target.value})
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        const isValid = validateSignIn()
        if (isValid) {
            await axios
                .post('auth/signin', userSignIn)
                .then(async (resultFromBEAloha) => {
                    if (resultFromBEAloha.data.currentUser.isActive) {
                        await axios.post('wallet/render', {userId: resultFromBEAloha.data.currentUser._id})
                            .then(res => {
                                dispatch(UserLoginWithPassword({
                                    ...resultFromBEAloha.data.currentUser,
                                    wallet: res.data.data
                                }))
                                const [key, value] = resultFromBEAloha.data.token.split(' ')
                                localStorage.setItem(key, JSON.stringify(value));
                                dispatch(selectCurrentWallet(res.data.data[0]))
                                if (res.data.data.length > 0) {
                                    navigate('/transactions')
                                }else {
                                    navigate('/my-wallets')
                                }

                            })
                    }
                })
                .catch((err) => {
                    const {message} = err?.response?.data;
                    setValidateSignInMsg({password: message})
                })
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const isValid = validateSignUp();
        if (isValid) {
            axios.post('auth/signup', userSignUp)
                .then(() => {
                    setUserSignUp({
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    })
                    setActive('container')
                    setUserSignIn({email: userSignUp.email, password: userSignUp.password})
                    setValidateSignUpMsg('')
                })
                .catch((err) => {
                    setActive('container right-panel-active')
                    const {msg} = err.response.data;
                    setValidateSignUpMsg({password: msg})
                })
        }
    }

    const validateSignIn = async () => {
        const msg = {};
        if (isEmpty(userSignIn.email)) {
            msg.email = '* Please input your email *'
        }
        if (isEmpty(userSignIn.password)) {
            msg.password = '* Please input your password *'
        }
        if (!isEmpty(userSignIn.email) && !isEmpty(userSignIn.password)) {
            axios.post('auth/signin', userSignIn)
                .catch(() => {
                    msg.password = '* Wrong email or password *'
                })
        }
        // setValidateSignInMsg(msg)
        return Object.keys(msg).length <= 0;
    }

    const validateSignUp = async () => {
        const msg = {};
        if (isEmpty(userSignUp.email)) {
            msg.email = '* Please input your email *'
        }
        if (isEmpty(userSignUp.password)) {
            msg.password = '* Please input your password *'
        }
        if (isEmpty(userSignUp.confirmPassword)) {
            msg.password = '* Please input your confirm password *'
        }
        // // setValidateSignUpMsg(msg)
        return Object.keys(msg).length <= 0;
    }

    const handleChangeTypePassword = () => {
        setTogglePassword(!togglePassword);
    }

    const signInWithFireBase = async (auth, provider) => {
        signInWithPopup(auth, provider)
            .then((resultFromAuthProvider) => {
                axios.post(`auth/firebase`, {
                    username: resultFromAuthProvider.user.displayName || "Name Not Stated",
                    email: resultFromAuthProvider.user.email || resultFromAuthProvider.user.providerData[0].email,
                    uid: resultFromAuthProvider.user.uid,
                    avatarUrl: resultFromAuthProvider.user.photoURL || DEFAULT_USER_URL
                }).then(resultFromBEAloha => {
                    const [key, value] = resultFromBEAloha.data.token.split(' ')
                    localStorage.setItem(key, JSON.stringify(value));
                    dispatch(UserLoginWithFireBase(resultFromBEAloha.data.currentUser))
                    navigate("/transactions")
                })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <motion.div className='login'
                    initial="exit"
                    animate="enter"
                    exit="exit"
                    variants={Variants.variant1}>
            <div className={active}>
                <div className="form-container sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <Link to="" onClick={() => signInWithFireBase(auth, faceBookAuthProvider)}
                                  className="social hover:text-blue-700"><i className="fab fa-facebook-f"/></Link>
                            <Link to="" onClick={() => signInWithFireBase(auth, googleAuthProvider)}
                                  className="social hover:text-red-700"><i
                                className="fab fa-google-plus-g"/></Link>
                            <Link to="" onClick={() => signInWithFireBase(auth, githubAuthProvider)}
                                  className="social hover:text-black-700"><i
                                className="fab fa-github"/></Link>
                        </div>
                        <span style={{margin: '10px'}}>or use your email for registration</span>
                        <input type="text" name='username' value={userSignUp.username} placeholder="Name"
                               onChange={handleChangeSignUp}/>
                        {validateSignUpMsg.username &&
                            <p className='text-red-500 text-xs italic'>{validateSignUpMsg.username}</p>}
                        <input type="email" name='email' value={userSignUp.email} placeholder="Email"
                               onChange={handleChangeSignUp}/>
                        {validateSignUpMsg.email &&
                            <p className='text-red-500 text-xs italic'>{validateSignUpMsg.email}</p>}
                        <div className={"relative w-full"}>
                            <input type={togglePassword ? "password" : "text"} name='password' placeholder="Password"
                                   onChange={handleChangeSignUp} value={userSignUp.password}
                                   pattern="\w{6,}"
                            />
                            <div onClick={handleChangeTypePassword}
                                 className={"absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"}>
                                {togglePassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                  strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                    </svg>
                                }
                            </div>
                        </div>
                        <input type={togglePassword ? "password" : "text"} name='confirmPassword'
                               placeholder="Confirm Password" value={userSignUp.confirmPassword}
                               onChange={handleChangeSignUp}
                               pattern={userSignUp.password}/>
                        {validateSignUpMsg.password &&
                            <p className='text-red-500 text-xs italic'>{validateSignUpMsg.password}</p>}

                        <button style={{marginTop: '10px'}} onClick={handleSignUp}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <Link to="" onClick={() => signInWithFireBase(auth, faceBookAuthProvider)}
                                  className="social hover:text-blue-700"><i className="fab fa-facebook-f"/></Link>
                            <Link to="" onClick={() => signInWithFireBase(auth, googleAuthProvider)}
                                  className="social hover:text-red-700"><i
                                className="fab fa-google-plus-g"/></Link>
                            <Link to="" onClick={() => signInWithFireBase(auth, githubAuthProvider)}
                                  className="social hover:text-black"><i
                                className="fab fa-github"/></Link>
                        </div>
                        <span style={{margin: '10px'}}>or use your account</span>
                        <input type="email" name='email' placeholder="Email" onChange={handleChangeSignIn}
                               value={userSignIn.email}/>
                        {validateSignInMsg.email &&
                            <p className='text-red-500 text-xs italic'>{validateSignInMsg.email}</p>}
                        <div className={"w-full relative "}>
                            <input type={togglePassword ? "password" : "text"} name='password' placeholder="Password"
                                   onChange={handleChangeSignIn}
                                   pattern="\w{6,}"

                            />
                            <div onClick={handleChangeTypePassword}
                                 className={"absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"}>
                                {togglePassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                  strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                    </svg>
                                }
                            </div>
                        </div>
                        {validateSignInMsg.password &&
                            <p className='text-red-500 text-xs italic'>{validateSignInMsg.password}</p>}
                        <Link to="/forgot-password" style={{color: 'darkcyan', margin: '20px'}}>Forgot your
                            password?</Link>
                        <button onClick={handleSignIn}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={handleClickSignIn}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" onClick={handleClickSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LoginPage;