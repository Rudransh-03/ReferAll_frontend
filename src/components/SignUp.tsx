import { FormEvent, useRef } from 'react';
import exclamation from './../assets/exclamation.png'
import monkey from '../assets/signUpMonkey.png'
import man from '../assets/SignUpMan.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | null>(null);

    function submitHandler(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        if(formRef.current){
            const formElements = new FormData(formRef.current);
            const formData = Object.fromEntries(formElements.entries());

            console.log(formData);

            axios.post('http://localhost:8080/auth/signup', formData)
            .then(response => {
                console.log('SignUp successful:', response.data);
                navigate("/login");
            })
            .catch(error => {
                console.error('SignUp failed:', error);
                // Handle login error
            });

            formRef.current.reset();
        }
    }

  return (
    <div className='mt-40 w-full ml-20'>
        {/* <div className="w-full flex h-16 justify-center text-5xl font-semibold"><div className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Login</div></div> */}
        <div className='w-3/4 p-2 rounded-lg flex border-2 border-indigo-700 py-4 pr-4 animate-bounce'>
            <img src={exclamation} className='w-12 h-12'/>
            <p className='pt-2 text-xl text-gray-600 w-full'>Please make sure to enter the correct details. These details will be sent to the referrers when you put in a referral request.</p>
        </div>
        <div className='mt-12 flex'>
            <div className="w-4/6 text-gray-600">
                <form ref={formRef} onSubmit={submitHandler}>
                    <div className='w-3/4 flex justify-between'>
                        <div className="mb-8 w-1/2 mr-8">
                            <label htmlFor="firstName">First Name: <br/></label>
                            <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="firstName" name="firstName" required />
                        </div>
                        <div className="mb-8 w-1/2">
                            <label htmlFor="lastName">Last Name: <br/></label>
                            <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="lastName" name="lastName" />
                        </div>
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="contactNumber">Phone Number (With Country Code): <br /></label>
                        <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700' type="tel" id="contactNumber" name="contactNumber" required />
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="emailId">Your Email Id: <br /></label>
                        <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700' type="email" id="emailId" name="emailId" required />
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="password">Please enter a password: <br /></label>
                        <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700' type="password" id="password" name="password" required />
                    </div>
                    <div className='w-3/4 flex justify-between'>
                    <div className="mb-8 w-1/2 mr-8">
                        <label htmlFor="currentTitle">Your current title: (Enter N/A if not applicable)<br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="currentTitle" name="currentTitle" required />
                    </div>
                    <div className="mb-8 w-1/2">
                        <label htmlFor="linkedInUrl">Your linkedIn profile URL: <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="linkedInUrl" name="linkedInUrl" />
                    </div>
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="currentCompany">Where do you currently work? (Company Name): (Enter N/A if not applicable) <br /></label>
                        <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700' type="text" id="currentCompany" name="currentCompany" required />
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="resumeUrl">Google drive link of your resume (Please make sure you set the access permissions such that anyone can view it): <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700" type="text" id="resumeUrl" name="resumeUrl" required />
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="bio">Please write a short (2-3 lines) bio about yourself: <br/></label>
                        <textarea
                        className="mt-2 border-2 p-2 w-full rounded-md border-gray-300 focus:border-indigo-700"
                        id="bio"
                        name="bio"
                        rows={6}
                        ></textarea>
                    </div>

                    <button type="submit" className="mb-8 text-white mx-4 bg-indigo-800 p-3 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200">
                        Sign-Up!
                    </button>
                </form>
            </div>
            <div className='w-2/6 -ml-24 -mt-20'>
                <img src={monkey} className='w-96 h-96'/>
                <img src={man} className='w-96 h-80'/>
            </div>
        </div>
    </div>
  )
}

export default SignUp