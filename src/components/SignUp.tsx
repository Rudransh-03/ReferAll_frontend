import { FormEvent, useRef, useState } from 'react';
import exclamation from './../assets/exclamation.png';
// import monkey from '../assets/signUpMonkey.png';
// import man from '../assets/SignUpMan.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | null>(null);

    // State to track validation errors
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        emailId: '',
        password: '',
        confirmPassword: '',
        currentTitle: '',
        currentCompany: '',
        resumeUrl: '',
        bio: '',
    });

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    function validateForm() {
        const form = formRef.current;
        const formData = new FormData(form!);
        const firstName = formData.get('firstName')?.toString().trim();
        // const lastName = formData.get('lastName')?.toString().trim();
        const contactNumber = formData.get('contactNumber')?.toString().trim();
        const emailId = formData.get('emailId')?.toString().trim();
        const password = formData.get('password')?.toString().trim();
        const confirmPassword = formData.get('confirmPassword')?.toString().trim();
        const currentTitle = formData.get('currentTitle')?.toString().trim();
        const currentCompany = formData.get('currentCompany')?.toString().trim();
        const resumeUrl = formData.get('resumeUrl')?.toString().trim();
        const bio = formData.get('bio')?.toString().trim();

        let isValid = true;
        const newErrors: any = {};

        // Check if fields are empty
        if (!firstName) {
            newErrors.firstName = 'This field is required';
            isValid = false;
        }
        if (!contactNumber) {
            newErrors.contactNumber = 'This field is required';
            isValid = false;
        }
        if (!emailId || !emailId.includes('@')) {
            newErrors.emailId = 'Please enter a valid email';
            isValid = false;
        }
        if (!password || password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            isValid = false;
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }
        if (!currentTitle) {
            newErrors.currentTitle = 'This field is required';
            isValid = false;
        }
        if (!currentCompany) {
            newErrors.currentCompany = 'This field is required';
            isValid = false;
        }
        if (!resumeUrl) {
            newErrors.resumeUrl = 'This field is required';
            isValid = false;
        }
        if (!bio) {
            newErrors.bio = 'This field is required';
            isValid = false;
        }

        // Check if phone number contains alphabet
        if (contactNumber && /[a-zA-Z]/.test(contactNumber)) {
            newErrors.contactNumber = 'Phone number should not contain alphabets';
            isValid = false;
        }

        setErrors(newErrors);
        setIsSubmitEnabled(isValid);
    }

    function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (formRef.current) {
            const formElements = new FormData(formRef.current);
            const formData = Object.fromEntries(formElements.entries());

            // console.log("formData", formData);

            axios.post('https://referall-backend.onrender.com/auth/signup', formData)
                .then(() => {
                    // console.log('SignUp successful:', response.data);
                    navigate("/login");
                })
                .catch(() => {
                    console.error('SignUp failed');
                });

            formRef.current.reset();
        }
    }

    return (
        <div className='mt-28 md:mt-40 w-5/6 md:ml-20 ml-8 -mr-20'>
            <div className='md:w-3/4 md:p-2 rounded-lg flex border-2 border-indigo-700 md:py-4 py-1 pr-2 md:pr-4 animate-bounce'>
                <img src={exclamation} className='w-12 h-12' />
                <p className='pt-2 text-sm md:text-xl text-gray-600 w-full'>All fields are necessary. Please make sure to enter the correct details. These details will be sent to the referrers when you put in a referral request.</p>
            </div>
            <div className='mt-12 flex'>
                <div className="w-full md:w-5/6 text-gray-600">
                    <form ref={formRef} onSubmit={submitHandler}>
                        <div className='md:w-3/4 flex flex-wrap md:flex-nowrap justify-between'>
                            <div className="mb-8 w-full md:w-1/2 md:mr-8">
                                <label htmlFor="firstName">First Name: <br /></label>
                                <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                    type="text" id="firstName" name="firstName" required
                                    onBlur={validateForm} />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>
                            <div className="mb-8 w-full md:w-1/2">
                                <label htmlFor="lastName">Last Name: <br /></label>
                                <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                    type="text" id="lastName" name="lastName" onBlur={validateForm} />
                            </div>
                        </div>
                        <div className="mb-8 w-full md:w-3/4">
                            <label htmlFor="contactNumber">Phone Number (With Country Code): <br /></label>
                            <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                type="tel" id="contactNumber" name="contactNumber" required onBlur={validateForm} />
                            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
                        </div>
                        <div className="mb-8 w-full md:w-3/4">
                            <label htmlFor="emailId">Your Email Id: <br /></label>
                            <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                type="email" id="emailId" name="emailId" required onBlur={validateForm} />
                            {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId}</p>}
                        </div>
                        <div className="mb-8 w-full md:w-3/4">
                            <label htmlFor="password">Please enter a password: <br /></label>
                            <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                type="password" id="password" name="password" required onBlur={validateForm} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        <div className="mb-8 w-full md:w-3/4">
                            <label htmlFor="confirmPassword">Confirm password: <br /></label>
                            <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                type="password" id="confirmPassword" name="confirmPassword" required onBlur={validateForm} />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>
                        <div className='w-full md:w-3/4 flex flex-wrap md:flex-nowrap justify-between'>
                            <div className="mb-8 w-full md:w-1/2 md:mr-8">
                                <label htmlFor="currentTitle">Your current title: (Enter N/A if not applicable)<br /></label>
                                <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                    type="text" id="currentTitle" name="currentTitle" required onBlur={validateForm} />
                                {errors.currentTitle && <p className="text-red-500 text-sm">{errors.currentTitle}</p>}
                            </div>
                            <div className="mb-8 w-full md:w-1/2">
                                <label htmlFor="linkedInUrl">Your linkedIn profile URL: <br /></label>
                                <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                    type="text" id="linkedInUrl" name="linkedInUrl" />
                            </div>
                        </div>
                        <div className="mb-8 w-full md:w-3/4">
                            <label htmlFor="currentCompany">Where do you currently work? (Company Name): (Enter N/A if not applicable) <br /></label>
                            <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                type="text" id="currentCompany" name="currentCompany" required onBlur={validateForm} />
                            {errors.currentCompany && <p className="text-red-500 text-sm">{errors.currentCompany}</p>}
                        </div>
                        <div className="mb-8 w-full md:w-3/4">
                            <label htmlFor="resumeUrl">Upload your resume URL: <br /></label>
                            <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                type="url" id="resumeUrl" name="resumeUrl" required onBlur={validateForm} />
                            {errors.resumeUrl && <p className="text-red-500 text-sm">{errors.resumeUrl}</p>}
                        </div>
                        <div className="mb-8 w-full md:w-3/4">
                            <label htmlFor="bio">A short bio about you: <br /></label>
                            <textarea className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700'
                                id="bio" name="bio" required onBlur={validateForm}></textarea>
                            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                        </div>
                        <div className="mb-8 w-full md:w-3/4 text-center">
                            <button type="submit" disabled={!isSubmitEnabled}
                                className={`p-2 rounded-md text-white ${isSubmitEnabled ? 'bg-indigo-700' : 'bg-gray-400 hover:cursor-not-allowed'}`}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );    
}

export default SignUp;
