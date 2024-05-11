import { FormEvent, useRef } from 'react';
import exclamation from '../assets/exclamation.png';

interface referralRequestBody{
    companyName: string,
    jobTitle: string,
    jobId: string,
    jobUrl: string,
    summary: string | null,
}

const SeekReferral = () => {

    const companyNameRef = useRef<HTMLInputElement | null>(null);
    const jobIdRef = useRef<HTMLInputElement | null>(null);
    const jobTitleRef = useRef<HTMLInputElement | null>(null);
    const jobUrlRef = useRef<HTMLInputElement | null>(null);
    const summaryRef = useRef<HTMLTextAreaElement | null>(null);

    function submitHandler(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(companyNameRef.current && jobIdRef.current && jobTitleRef.current && jobUrlRef.current){
            const referralRequest: referralRequestBody = {
                companyName: companyNameRef.current.value,
                jobTitle: jobTitleRef.current.value,
                jobId: jobIdRef.current.value,
                jobUrl: jobUrlRef.current.value,
                summary: summaryRef.current?.value || null
            }

            console.log(referralRequest);

            companyNameRef.current.value='';
            jobIdRef.current.value='';
            jobTitleRef.current.value='';
            jobUrlRef.current.value='';
            if(summaryRef.current != null) summaryRef.current.value = '';
        }
        else {
            console.error('Some ref is null');
        }
    }

    return (
        <div className="mt-40 w-full mx-20">
            <div className='w-3/4 p-2 rounded-lg flex border-2 border-indigo-700 py-4 pr-4 animate-bounce'>
                <img src={exclamation} className='w-12 h-12'/>
                <p className='pt-2 text-xl text-gray-600 w-full'>Please make sure to double check the spelling of each and every thing before you submit the form. Your request won't be visible to the referrers if you type the name of the company wrong</p>
            </div>
            <div className="mt-12 text-gray-600">
                <form onSubmit={submitHandler}>
                    <div className="flex">
                        <div className="mb-8 w-3/4">
                            <label htmlFor="companyName">Company name:<br /></label>
                            <input className='mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700' type="text" id="companyName" name="companyName" ref={companyNameRef} required />
                        </div>
                    </div>
                    <div className='w-3/4 flex justify-between'>
                    <div className="mb-8 w-1/2 mr-8">
                        <label htmlFor="jobId">Job ID: <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="jobId" name="jobId" ref={jobIdRef} required />
                    </div>
                    <div className="mb-8 w-1/2">
                        <label htmlFor="jobTitle">Job Title: <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="jobTitle" name="jobTitle" ref={jobTitleRef} required />
                    </div>
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="jobUrl">Job URL: <br/></label>
                        <input className="mt-2 border-2 w-full p-2 rounded-md border-gray-300 focus:border-indigo-700" type="text" id="jobUrl" name="jobUrl" ref={jobUrlRef} required />
                    </div>
                    <div className="mb-8 w-3/4">
                        <label htmlFor="summary">Anything that you'd like to mention about yourself or the job: <br/></label>
                        <textarea
                        className="mt-2 border-2 p-2 w-full rounded-md border-gray-300 focus:border-indigo-700"
                        id="summary"
                        name="summary"
                        rows={10}
                        ref={summaryRef}
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

export default SeekReferral