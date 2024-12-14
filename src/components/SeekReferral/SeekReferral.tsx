import { FormEvent, useRef } from 'react';
import exclamation from '../../assets/exclamation.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const SeekReferral = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();
    const userId: string = useSelector((state: RootState) => state.user.userId);
    const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);

    async function submitHandler(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (formRef.current) {
            const formElements = new FormData(formRef.current);
            const formData = Object.fromEntries(formElements.entries());
            // console.log(formData);

            try {
                const response = await axios.post(`https://referall-backend.onrender.com/posts/addPost/${userId}`, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                if(response.data === "You cannot create a request for the company you work!"){
                    alert(response.data);
                }
                navigate("/view_requests");
            } catch (error) {
                console.error("error");
            }

            formRef.current.reset();
        }
    }

    return (
        <div className="mt-12 px-4 mb-12 md:px-20">
            <div className="w-full mt-24 lg:mt-40 rounded-lg flex items-center border-2 border-indigo-700 p-4 mb-8 animate-bounce">
                <img src={exclamation} className="w-8 h-8 mr-3" />
                <p className="text-sm md:text-md lg:text-xl text-gray-600">
                    All fields are mandatory. Please make sure to double check the spelling of each and every thing before you submit the form. Your request won't be visible to the referrers if you type the name of the company wrong.
                </p>
            </div>
            <div className="mt-8 md:mt-12 text-gray-600">
                <form onSubmit={submitHandler} ref={formRef} className="flex flex-col space-y-6">
                    <div className="w-full md:w-3/4">
                        <label htmlFor="companyName">Company name:</label>
                        <input 
                            className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700" 
                            type="text" 
                            id="companyName" 
                            name="companyName" 
                            required 
                        />
                    </div>
                    <div className="w-full md:w-3/4 flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-1">
                            <label htmlFor="jobId">Job ID:</label>
                            <input 
                                className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700" 
                                type="text" 
                                id="jobId" 
                                name="jobId" 
                                required 
                            />
                        </div>
                        <div className="flex-1 mt-6 md:mt-0">
                            <label htmlFor="jobTitle">Job Title:</label>
                            <input 
                                className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700" 
                                type="text" 
                                id="jobTitle" 
                                name="jobTitle" 
                                required 
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-3/4">
                        <label htmlFor="jobUrl">Job URL:</label>
                        <input 
                            className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700" 
                            type="text" 
                            id="jobUrl" 
                            name="jobUrl" 
                            required 
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="summary">Anything that you'd like to mention about yourself or the job:</label>
                        <textarea 
                            className="mt-2 border-2 p-2 w-full rounded-md border-gray-300 focus:border-indigo-700" 
                            id="summary" 
                            name="summary" 
                            rows={5} 
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <button 
                            type="submit" 
                            className="text-white bg-indigo-800 p-3 rounded-md transition duration-150 ease-in-out hover:scale-105 w-full md:w-auto">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SeekReferral;
