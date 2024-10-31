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
            console.log(formData);

            try {
                const response = await axios.post(`http://localhost:8080/referPosts/createReferPost/${userId}`, formData,
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
                console.error(error);
            }

           formRef.current.reset();
        }
    }

    return (
        <div className="mt-40 w-full mx-20">
            <div className='w-3/4 p-2 rounded-lg flex border-2 border-indigo-700 py-4 pr-4 animate-bounce'>
                <img src={exclamation} className='w-12 h-12'/>
                <p className='pt-2 text-xl text-gray-600 w-full'>Please make sure to double check the spelling of each and every thing before you submit the form. Your request won't be visible to the referrers if you type the name of the company wrong</p>
            </div>
            <div className="mt-12 text-gray-600">
                <form onSubmit={submitHandler} ref={formRef}>
                    <div className='w-3/4 flex justify-between'>
                    <div className="mb-8 w-1/2 mr-8">
                    <div className='flex'>
                        <label htmlFor="companyName">Company name:</label>
                        <div>&nbsp;{userCompanyName}</div>
                    </div>
                    </div>
                    <div className="mb-8 w-1/2 flex">
                        <label htmlFor="yoeRequired">Years of Experience Required: <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="yoeRequired" name="yoeRequired" required />
                    </div>
                    </div>
                    <div className='w-3/4 flex justify-between'>
                    <div className="mb-8 w-1/2 mr-8">
                        <label htmlFor="jobId">Job ID: <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="jobId" name="jobId" required />
                    </div>
                    <div className="mb-8 w-1/2">
                        <label htmlFor="jobTitle">Job Title: <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="jobTitle" name="jobTitle" required />
                    </div>
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="jobUrl">Job URL: <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700" type="text" id="jobUrl" name="jobUrl" required />
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="jobDescription">Job description: <br/></label>
                        <textarea
                        className="mt-2 border-2 p-2 w-full rounded-md border-gray-300 focus:border-indigo-700"
                        id="jobDescription"
                        name="jobDescription"
                        rows={10}
                        ></textarea>
                    </div>

                    <button type="submit" className="mb-8 text-white mx-4 bg-indigo-800 p-3 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200">
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
  )
}

export default CreateJobPost