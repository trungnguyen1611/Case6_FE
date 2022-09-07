import "./style.css"
import {useState} from "react";
import axios from "../../axios";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

export const ResetPassword = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({password: '', confirmPassword: ''})
    const [errMessage, setErrMessage] = useState('')

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    // console.log(form)
    let {token} = useParams()
    console.log(token)
    const handleConfirm = async (e) => {
        e.preventDefault();
        let body = {
            token: token,
            password: form.password,
            confirmPassword: form.confirmPassword
        }
        try {
            await axios.post('/auth/reset-password', body)
                .then((r) => {
                    console.log(r)
                    navigate('/login')
                }).catch(err => {
                    console.log(err.response.data.message)
                    setErrMessage(err.response.data.message)
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
                            <form onSubmit={handleConfirm}>
                                <div className="form">
                                    <div className="v-input">
                                        <input name='password' onChange={handleChange} autoFocus="autofocus"
                                               id="input-14"
                                               value={form.password}
                                               placeholder="Password" type="password"
                                               pattern="\w{6,}"/>

                                    </div>
                                    <div className="v-input">
                                        <input name='confirmPassword' onChange={handleChange} autoFocus="autofocus"
                                               id="input-14"
                                               value={form.confirmPassword}
                                               placeholder="Confirm Password" type="password"
                                               pattern={form.password}
                                        />
                                    </div>
                                    {errMessage && <p style={{color: 'red'}}>{errMessage}</p>}
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