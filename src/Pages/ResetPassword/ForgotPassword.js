import "./style.css"
import {useState} from "react";
import axios from "../../axios";
import {useNavigate} from "react-router-dom";

export const ForgotPassword = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [message,setMessage] = useState("")
    const [success,setSuccess] = useState('')

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleConfirm = async (e) => {
        e.preventDefault();
        let body = {
            email: email
        }
        try {
            await axios.post('/auth/forgot-password', body)
                .then((r) => {
                    console.log(r.data.message)
                    setSuccess(r.data.success)
                    setMessage(r.data.message)
                }).catch(err => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="reset-password">
            <div className="app-wrap ">
                <div className="inner-app-wrap">
                    <div className="logo d-flex justify-center">
                        <div className='content-icon'>
                            <img src="/static/media/hi-removebg-preview.8d4e112c3f814f4e9e10.png" alt=""
                                 className="object-cover  w-[100px] "/>
                            <p>Aloha</p>
                        </div>

                    </div>
                    <div className="wrapper">
                        <div className="content">
                            <div className="forgot-psw-text font-weight-bold">
                                <span>Forgot Password</span>
                            </div>
                            <div className="description">
                                <span>Enter the email address you used to register, and we will send you an email to recover your password in no time.</span>
                            </div>
                            <form onSubmit={handleConfirm}>
                                <div className="form">
                                    <div className="v-input">
                                        <input onChange={handleChange} autoFocus="autofocus" id="input-14"
                                               placeholder="Email" type="text"/>
                                    </div>
                                    {
                                        success ? <p style={{color: '#3ac330', marginBottom:'12px'}}>{message}</p> : <p style={{color: 'red',marginBottom:'12px'}}>{message}</p>
                                    }
                                    <button type="submit" className="btn-submit-ml">
                                        <span className="v-btn__content">Confirm</span>
                                    </button>
                                </div>
                            </form>
                            <div className="navication">
                                <button onClick={() => {
                                    navigate('/login')
                                }}>
                                    <p className="back-login color">Back to Login</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}