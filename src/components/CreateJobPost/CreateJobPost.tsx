import { FormEvent, useRef } from 'react'
import exclamation from '../../assets/exclamation.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import axios from 'axios';

const CreateJobPost = () => {

    const formRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();
    const userId: string = useSelector((state: RootState) => state.user.userId);
    const userCompanyName: string = useSelector((state: RootState)=> state.user.currentCompany);
    const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);

    async function submitHandler(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (formRef.current) {
            const formElements = new FormData(formRef.current);
            const formData = Object.fromEntries(formElements.entries());
            // console.log(formData);

            try {
                const response = await axios.post(`https://referall-backend.onrender.com/referPosts/createReferPost/${userId}`, formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                if(response.data === "You cannot create a request for the company you work!"){
                    alert(response.data);
                }
                navigate("/your_job_posts");
            } catch (error) {
                console.error("Error");
            }

           formRef.current.reset();
        }
    }

    return (
        <div className="overflow-x-hidden">
            <div className="flex justify-center items-center flex-col md:mt-40 mt-10 w-full mx-auto px-4">
                <div className="mt-20 md:mt-4 w-full md:w-3/4 p-2 rounded-lg flex border-2 border-indigo-700 py-4 animate-bounce">
                    <img src={exclamation} className="w-12 h-12" />
                    <p className="pt-2 text-base md:text-xl text-gray-600 w-full">
                        A simple form to get you your desired candidates :) (Please fill all the fields so that candidates may get a clear idea about the job)
                    </p>
                </div>
                <div className="mt-8 md:mt-12 text-gray-600 w-full md:w-3/4">
                    <form onSubmit={submitHandler} ref={formRef}>
                        <div className="w-full flex flex-col md:flex-row md:justify-between">
                            <div className="mb-8 w-full md:w-1/2 md:mr-8">
                                <div className="flex">
                                    <label htmlFor="companyName">Company name:</label>
                                    <div>&nbsp;{userCompanyName}</div>
                                </div>
                            </div>
                            <div className="mb-8 w-full md:w-1/2 flex">
                                <label htmlFor="yoeRequired">
                                    YOE Required: <br />
                                </label>
                                <input
                                    className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                    type="text"
                                    id="yoeRequired"
                                    name="yoeRequired"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col md:flex-row md:justify-between">
                            <div className="mb-8 w-full md:w-1/2 md:mr-8">
                                <label htmlFor="jobId">
                                    Job ID: <br />
                                </label>
                                <input
                                    className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                    type="text"
                                    id="jobId"
                                    name="jobId"
                                    required
                                />
                            </div>
                            <div className="mb-8 w-full md:w-1/2">
                                <label htmlFor="jobTitle">
                                    Job Title: <br />
                                </label>
                                <input
                                    className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                    type="text"
                                    id="jobTitle"
                                    name="jobTitle"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-8 w-full">
                            <label htmlFor="jobUrl">
                                Job URL: <br />
                            </label>
                            <input
                                className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"
                                type="text"
                                id="jobUrl"
                                name="jobUrl"
                                required
                            />
                        </div>
                        <div className="mb-8 w-full">
                            <label htmlFor="jobDescription">
                                Job description: <br />
                            </label>
                            <textarea
                                className="mt-2 border-2 p-2 w-full rounded-md border-gray-300 focus:border-indigo-700"
                                id="jobDescription"
                                name="jobDescription"
                                rows={10}
                                required
                            ></textarea>
                        </div>
    
                        <button
                            type="submit"
                            className="mb-8 text-white mx-4 bg-indigo-800 p-3 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
    
    
}

export default CreateJobPost