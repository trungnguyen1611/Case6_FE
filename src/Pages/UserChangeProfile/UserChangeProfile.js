import MyAccountLayout from "../../Components/Layouts/MyAccount/MyAccountLayout";
import "./UserChangeProfile.css"
import {useEffect, useState} from "react";
import {storage} from "../../Config/firebase"
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage"
import {v4} from 'uuid'
import axios from '../../axios/index'
import {useSelector} from 'react-redux'
import {updateUserInfo} from "../../Features/CurrentUser/UserSlice"
import {useDispatch} from 'react-redux'
import swal from 'sweetalert';
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion"
import Variants from "../../Components/Variants";
import {afterLoadingAPIScreen, isLoadingAPIScreen} from "../../Features/isLoadingScreen/isLoadingScreen";


const UserChangeProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector((store) => store.currentUser.currentUser)
    const [progress, setProgress] = useState(0);
    const [imageUrls, setImageUrls] = useState(currentUser?.avatarUrl ? currentUser?.avatarUrl : '');
    const [formData, setFormData] = useState({
        username: '',
        company: '',
        phone: '',
        birthday: '',
        email: '',
        imageUpload: ''
    })
    useEffect(()=>{
        console.log(formData)
    })


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const setImageUploaded = (e) => {
        e.preventDefault()
        if (formData.imageUpload === '') {
            return axios
                .put('/my-account/change-profile', {
                    ...formData, userId: currentUser._id
                }).then((resultFromBEAloha) => {
                    dispatch(updateUserInfo(resultFromBEAloha.data))
                    swal("You have updated profile successfully", {
                        buttons: false,
                        timer: 3000,
                    }).then(() => {
                        navigate("/transactions")
                    })
                })
                .catch(err => console.log(err))
        } else {
            return axios
                .put('/my-account/change-profile', {
                    ...formData, avatarUrl: imageUrls, userId: currentUser._id
                }).then((resultFromBEAloha) => {
                    dispatch(updateUserInfo(resultFromBEAloha.data))
                    swal("You have updated profile successfully", {
                        buttons: false,
                        timer: 3000,
                    }).then(() => {
                        navigate("/transactions")
                    })
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        dispatch(isLoadingAPIScreen())
        setFormData({...currentUser})
        dispatch(afterLoadingAPIScreen())
    }, [])


    useEffect(() => {
        if (!formData.imageUpload) return
        dispatch(isLoadingAPIScreen())
        const userImage = ref(storage, `images/${formData.username + v4()}`)
        const uploadTask = uploadBytesResumable(userImage, formData.imageUpload)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prog);
            }, (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setImageUrls(downloadURL);
                        dispatch(afterLoadingAPIScreen())
                    });
            }
        );
    }, [formData.imageUpload])


    return (
        <motion.div initial="exit"
                    animate="enter"
                    exit="exit"
                    variants={Variants.variant1}>
            <MyAccountLayout>
                <div className="flex justify-center">
                    <div className=" avatar-card-container master-container h-px ">
                        <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md p-10">
                            <div className="flex justify-end px-4 pt-4">
                            </div>
                            <div className="flex flex-col items-center">
                                <img className="mb-3 w-24 object-cover h-24 rounded-full shadow-lg" src=
                                    {imageUrls ? imageUrls : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"}
                                     alt="Avatar image"/>
                                <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                                    {currentUser.username}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {currentUser?.email}
                                </span> <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {currentUser?.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className=" master-container block p-6 rounded-lg shadow-lg  bg-white max-w-7xl ">

                        <form onSubmit={(e) => setImageUploaded(e)}>
                            <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">
                                        Full Name
                                    </label>
                                    <input type="text" id="name" name='username' value={formData.username}
                                           onChange={(e) => handleChange(e)}
                                           className=" border hover:border-black border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                           placeholder="John" required={true}/>
                                    <span className="nameErrorMessage">It cannot be empty</span>
                                </div>

                                <div>
                                    <label htmlFor="company"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">Company</label>
                                    <input type="text" id="company" name="company"
                                           value={formData.company}
                                           onChange={(e) => handleChange(e)}
                                           className=" border hover:border-black border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                           placeholder="CodeGym" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="phone"

                                           className="block mb-2 text-sm font-medium text-gray-900 ">
                                        Phone number
                                    </label>
                                    <input type="telNo" id="phone" name='phone'
                                           value={formData.phone}
                                           onChange={(e) => handleChange(e)}
                                           className=" userPhoneInput hover:border-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                           placeholder="123-45-6789" pattern="\d{10,}" required=""
                                    />
                                    <span
                                        className="userPhoneInputMessage font-medium">It has to be 10 digits number</span>
                                </div>
                                <div>
                                    <label htmlFor="DOB"
                                           className="block mb-2 text-sm font-medium text-gray-900 ">Date Of
                                        Birth</label>
                                    <input type="date" id="DOB" name='birthday'
                                           value={formData.birthday}

                                           max={new Date().toISOString().split("T")[0]}
                                           onChange={(e) => handleChange(e)}
                                           className=" border hover:border-black border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                           placeholder="" required=""/>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 ">Email
                                    address</label>
                                <input type="email" id="email" name='email'
                                       value={formData.email}
                                       onChange={(e) => handleChange(e)}
                                       className=" border hover:border-black border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                       placeholder="john.doe@codegym.com.vn" required={true}/>
                                <span
                                    className="emailErrorMessage font-medium">Invalid Email</span>
                            </div>
                            <div className="mb-6">
                                <div className="mb-3 w-full">
                                    <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">
                                        Avatar Image
                                    </label>
                                    <input onChange={(e) => {
                                        setFormData((prev) => ({...prev, imageUpload: e.target.files[0]}))
                                    }}
                                           className="form-control hover:border-black block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-white bg-clip-padding border border-solid border rounded-lg border-gray-300  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                           type="file" id="formFile"/>
                                </div>
                            </div>
                            <div className=" text-center ">
                                {progress ? <h2>Uploading done {progress}%</h2> : ""}
                                <button type="submit"
                                        className="btnUpdateProfile bg-[#2EB74B] text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mt-2.5 py-2.5 text-center  ">SAVE
                                    CHANGE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </MyAccountLayout>

        </motion.div>
    );
};

export default UserChangeProfile;