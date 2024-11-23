import { Link } from "react-router-dom";
// import { useState } from "react";

// interface HomeCard{
//     title: string,
//     content: string,
// }

const ReferCard = ({jobTitle, jobId, referredStatus, firstName, lastName, resumeUrl, emailId, postId} : any) => {

    var progress = "Unreferred";
    if(referredStatus === 1) progress = "In Progress";
    if(referredStatus === 2) progress = "Referred";
    

  return (
    <div className="w-full mt-20 flex">
        <div className="w-full rounded-xl p-2 bg-white border-2 border-indigo-600 shadow-2xl hover:scale-105 transition duration-150 ease-in-out">
            <div className="flex">
                <div className="w-2/3 ml-4 font-semibold text-2xl bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text pt-2">{jobTitle}</div>
                <div className={`p-2 rounded-lg text-white mt-2 ml-20 ${referredStatus === 0 && "bg-red-400"} ${referredStatus === 1 && "bg-blue-400"} ${referredStatus === 2 && "bg-green-400"}`}>{progress}</div>
            </div>
            <div className="mt-2 ml-4 text-gray-600"><span className="italic">Job Id:</span> {jobId}</div>
            <div className="w-full text-gray-600 p-4"><span className="italic">Name & Email-Id:</span> {firstName}&nbsp;{lastName} ({emailId})</div>
            <div className="w-full -mt-4 text-gray-600 p-4"><span className="italic">Resume Url:</span> {resumeUrl}</div>
            <Link className="ml-4 mb-2 p-2 px-4 text-center bg-gradient-to-r from-indigo-600 to-violet-500 inline-block text-white rounded-lg hover:cursor-pointer" to={"/"+jobId+"/"+postId}>View Details</Link>
        </div>
    </div>
  )
}

export default ReferCard