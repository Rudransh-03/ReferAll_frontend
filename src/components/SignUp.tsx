import { FormEvent, useRef } from 'react';
import exclamation from './../assets/exclamation.png'
import monkey from '../assets/signUpMonkey.png'
import man from '../assets/SignUpMan.png'

interface signUpBody{
    firstName: string,
    lastName: string,
    emailId: string,
    password: string,
    designation: string,
    yoe: string,
    currentCompany: string,
    resumeUrl: string,
    bio: string | null,
}

const SignUp = () => {

    const fNameRef = useRef<HTMLInputElement | null>(null);
    const lNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passRef = useRef<HTMLInputElement | null>(null);
    const designationRef = useRef<HTMLInputElement | null>(null);
    const yoeRef = useRef<HTMLInputElement | null>(null);
    const companyNameRef = useRef<HTMLInputElement | null>(null);
    const resumeRef = useRef<HTMLInputElement | null>(null);
    const bioRef = useRef<HTMLTextAreaElement | null>(null);

    function submitHandler(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(fNameRef.current && lNameRef.current && emailRef.current && passRef.current && designationRef.current && yoeRef.current && companyNameRef.current && resumeRef.current && bioRef.current){
            const user : signUpBody = {
                firstName: fNameRef.current.value,
                lastName: lNameRef.current.value,
                emailId: emailRef.current.value,
                password: passRef.current.value,
                designation: designationRef.current.value, 
                yoe: yoeRef.current.value,
                currentCompany: companyNameRef.current.value,
                resumeUrl: resumeRef.current.value,
                bio: bioRef.current.value
            }

            console.log(user);

            fNameRef.current.value='',
            lNameRef.current.value= '',
            emailRef.current.value='',
            passRef.current.value='',
            designationRef.current.value='',
            yoeRef.current.value='',
            companyNameRef.current.value='',
            resumeRef.current.value='',
            bioRef.current.value=''
        }
        else {
            console.error('Some ref is null');
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
                <form onSubmit={submitHandler}>
                    <div className='w-3/4 flex justify-between'>
                        <div className="mb-8 w-1/2 mr-8">
                            <label htmlFor="fName">First Name: <br/></label>
                            <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="fName" name="fName" ref={fNameRef} required />
                        </div>
                        <div className="mb-8 w-1/2">
                            <label htmlFor="lName">Last Name: <br/></label>
                            <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="lName" name="lName" ref={lNameRef} />
                        </div>
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="emailId">Your Email Id: <br /></label>
                        <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700' type="email" id="emailId" name="emailId" ref={emailRef} required />
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="password">Please enter a password: <br /></label>
                        <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700' type="password" id="password" name="password" ref={passRef} required />
                    </div>
                    <div className='w-3/4 flex justify-between'>
                    <div className="mb-8 w-1/2 mr-8">
                        <label htmlFor="designation">Your designation: (Enter N/A if not applicable)<br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="designation" name="designation" ref={designationRef} required />
                    </div>
                    <div className="mb-8 w-1/2">
                        <label htmlFor="yoe">Total Years of experience: <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="yoe" name="yoe" ref={yoeRef} />
                    </div>
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="companyName">Where do you currently work? (Company Name): (Enter N/A if not applicable) <br /></label>
                        <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700' type="text" id="companyName" name="companyName" ref={companyNameRef} required />
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="resumeUrl">Google drive link of your resume (Please make sure you set the access permissions such that anyone can view it): <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700" type="text" id="resumeUrl" name="resumeUrl" ref={resumeRef} required />
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="bio">Please write a short (4-5 lines) bio about yourself: <br/></label>
                        <textarea
                        className="mt-2 border-2 p-2 w-full rounded-md border-gray-300 focus:border-indigo-700"
                        id="bio"
                        name="bio"
                        rows={10}
                        ref={bioRef}
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