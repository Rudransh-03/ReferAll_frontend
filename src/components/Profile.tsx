import { FormEvent, useRef, useEffect } from 'react';
import exclamation from './../assets/exclamation.png';
import monkey from '../assets/signUpMonkey.png';
import man from '../assets/SignUpMan.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';
import { userActions } from '../store/user-slice';

const Profile = () => {
    const user: any = useSelector((state: RootState) => state.user);
    const jwtToken = user.jwtToken;
    const userId = user.userId;

    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (formRef.current && user) {
            const form = formRef.current;
            form.firstName.value = user.firstName || '';
            form.lastName.value = user.lastName || '';
            form.contactNumber.value = user.contactNumber || '';
            form.emailId.value = user.emailId || '';
            form.currentTitle.value = user.currentTitle || '';
            form.linkedInUrl.value = user.linkedInUrl || '';
            form.currentCompany.value = user.currentCompany || '';
            form.resumeUrl.value = user.resumeUrl || '';
            form.bio.value = user.bio || '';
        }
    }, [user]);

    async function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = formRef.current;
        if(form!=null && (form.firstName.value.length == 0 || form.lastName.value == 0 || 
            form.contactNumber.value.length == 0 || form.emailId.value.length == 0 ||
            form.currentTitle.value.length == 0 || form.linkedInUrl.value.length == 0
            || form.currentCompany.value.length == 0 || form.resumeUrl.value.length == 0 ||
            form.bio.value.length == 0)){
                alert("All the fields are mandatory. Please fill all the fields");
        }

        else{
            if (formRef.current) {
                const formElements = new FormData(formRef.current);
                const formData = Object.fromEntries(formElements.entries());
    
                await axios.put(`https://referall-backend.onrender.com/users/updateUser/${user.userId}`, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                })
                .then(response => {
                     console.log('Updation successful:', response.data);
                    navigate("/");
                })
                .catch(error => {
                     console.error('Updation failed:', error);
                });
    
                const newUserData = {
                    userId,
                    ...formData
                }
                dispatch(userActions.setUserObject(newUserData));
                formRef.current.reset();
            }
        }
    }

    function buttonClickHandler(){
        dispatch(userActions.clearUserObject());
        navigate("/");
    }

    return (
        <div className='mt-12 px-4 mb-12 md:px-20'>
            <div className='w-full mt-24'>
                <div className='w-full md:mt-20 lg:mt-40 rounded-lg flex items-center border-2 border-indigo-700 p-4 mb-8 animate-bounce'>
                    <img src={exclamation} className='w-8 h-8 mr-3' />
                    <p className='text-sm md:text-md lg:text-xl text-gray-600'>
                        Please make sure to enter the correct details. These details will be sent to the referrers when you put in a referral request.
                    </p>
                </div>
                <div className='text-2xl md:text-3xl font-bold'>
                    Your Total Points: <span className="bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">{`${user.points}`}</span>
                </div>
                <div className='mt-8 md:mt-12 flex flex-col md:flex-row items-center md:items-start'>
                    <div className="w-full md:w-2/3 lg:w-3/4 text-gray-600">
                        <form ref={formRef} onSubmit={submitHandler} className="flex flex-col space-y-6">
                            <div className='flex flex-col md:flex-row md:space-x-4'>
                                <div className="flex-1">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        className="mt-1 border w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                    />
                                </div>
                                <div className="flex-1 mt-6 md:mt-0">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        className="mt-1 border w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contactNumber">Phone Number (With Country Code):</label>
                                <input
                                    className='mt-1 border w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                    type="tel"
                                    id="contactNumber"
                                    name="contactNumber"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="emailId">Email Id:</label>
                                <input
                                    className='mt-1 border w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                    type="email"
                                    id="emailId"
                                    name="emailId"
                                    required
                                />
                            </div>
                            <div className='flex flex-col md:flex-row md:space-x-4'>
                                <div className="flex-1">
                                    <label htmlFor="currentTitle">Current Title:</label>
                                    <input
                                        className="mt-1 border w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                        type="text"
                                        id="currentTitle"
                                        name="currentTitle"
                                        required
                                    />
                                </div>
                                <div className="flex-1 mt-6 md:mt-0">
                                    <label htmlFor="linkedInUrl">LinkedIn Profile URL:</label>
                                    <input
                                        className="mt-1 border w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                        type="text"
                                        id="linkedInUrl"
                                        name="linkedInUrl"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="currentCompany">Current Company Name:</label>
                                <input
                                    className='mt-1 border w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                    type="text"
                                    id="currentCompany"
                                    name="currentCompany"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="resumeUrl">Google Drive Link of Resume:</label>
                                <input
                                    className="mt-1 border w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                    type="text"
                                    id="resumeUrl"
                                    name="resumeUrl"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="bio">Bio:</label>
                                <textarea
                                    className="mt-1 border p-2 w-full rounded-md border-gray-300 focus:border-indigo-700"
                                    id="bio"
                                    name="bio"
                                    rows={5}
                                    required
                                ></textarea>
                            </div>
                            <div className='flex flex-col mx-12 md:mx-0 md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                                <button type="submit" className="text-white bg-indigo-800 p-3 rounded-md md:w-auto transition duration-150 ease-in-out hover:scale-105">
                                    Save Details
                                </button>
                                <button type="button" className="text-white bg-indigo-800 p-3 rounded-md md:w-auto transition duration-150 ease-in-out hover:scale-105" onClick={buttonClickHandler}>
                                    Logout
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='hidden md:flex flex-col items-center w-1/3'>
                        <img src={monkey} className='w-64 h-64' />
                        <img src={man} className='w-64 h-60 mt-6' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
