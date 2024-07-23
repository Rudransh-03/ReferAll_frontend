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
    // console.log(user);
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

        if (formRef.current) {
            const formElements = new FormData(formRef.current);
            const formData = Object.fromEntries(formElements.entries());

            // console.log(formData);

            await axios.put(`http://localhost:8080/users/updateUser/${user.userId}`, formData, {
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

    return (
        <div className='mt-24'>
            <div className='mt-40 w-full ml-20'>
                <div className='w-3/4 p-2 rounded-lg flex border-2 border-indigo-700 py-4 pr-4 animate-bounce'>
                    <img src={exclamation} className='w-12 h-12' />
                    <p className='pt-2 text-xl text-gray-600 w-full'>
                        Please make sure to enter the correct details. These details will be sent to the referrers when you put in a referral request.
                    </p>
                </div>
                <div className='text-3xl font-bold mt-12'>Your Total Points: <span className="bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">{`${user.points}`}</span></div>
                <div className='mt-12 flex'>
                    <div className="w-4/6 text-gray-600">
                        <form ref={formRef} onSubmit={submitHandler}>
                            <div className='w-3/4 flex justify-between'>
                                <div className="mb-8 w-1/2 mr-8">
                                    <label htmlFor="firstName">First Name: <br /></label>
                                    <input
                                        className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                    />
                                </div>
                                <div className="mb-8 w-1/2">
                                    <label htmlFor="lastName">Last Name: <br /></label>
                                    <input
                                        className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                    />
                                </div>
                            </div>
                            <div className="mb-8 w-3/4">
                                <label htmlFor="contactNumber">Phone Number (With Country Code): <br /></label>
                                <input
                                    className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                    type="tel"
                                    id="contactNumber"
                                    name="contactNumber"
                                    required
                                />
                            </div>
                            <div className="mb-8 w-3/4">
                                <label htmlFor="emailId">Email Id: <br /></label>
                                <input
                                    className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                    type="email"
                                    id="emailId"
                                    name="emailId"
                                    required
                                />
                            </div>
                            <div className='w-3/4 flex justify-between'>
                                <div className="mb-8 w-1/2 mr-8">
                                    <label htmlFor="currentTitle">Current title:<br /></label>
                                    <input
                                        className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                        type="text"
                                        id="currentTitle"
                                        name="currentTitle"
                                        required
                                    />
                                </div>
                                <div className="mb-8 w-1/2">
                                    <label htmlFor="linkedInUrl">LinkedIn profile URL: <br /></label>
                                    <input
                                        className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                        type="text"
                                        id="linkedInUrl"
                                        name="linkedInUrl"
                                    />
                                </div>
                            </div>
                            <div className="mb-8 w-3/4">
                                <label htmlFor="currentCompany">Current company name:<br /></label>
                                <input
                                    className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                    type="text"
                                    id="currentCompany"
                                    name="currentCompany"
                                    required
                                />
                            </div>
                            <div className="mb-8 w-3/4">
                                <label htmlFor="resumeUrl">Google drive link of resume (Please make sure you set the access permissions such that anyone can view it): <br /></label>
                                <input
                                    className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                    type="text"
                                    id="resumeUrl"
                                    name="resumeUrl"
                                    required
                                />
                            </div>
                            <div className="mb-8 w-3/4">
                                <label htmlFor="bio">Bio: <br /></label>
                                <textarea
                                    className="mt-2 border-2 p-2 w-full rounded-md border-gray-300 focus:border-indigo-700"
                                    id="bio"
                                    name="bio"
                                    rows={6}
                                ></textarea>
                            </div>

                            <button type="submit" className="mb-8 text-white mx-4 bg-indigo-800 p-3 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200">
                                Save Details
                            </button>
                        </form>
                    </div>
                    <div className='w-2/6 -ml-24 -mt-20'>
                        <img src={monkey} className='w-96 h-96' />
                        <img src={man} className='w-96 h-80' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
