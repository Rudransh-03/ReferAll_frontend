import React from 'react'
import { Link } from 'react-router-dom';

const ReferPostDetailsCard = ({jobTitle, jobId, jobUrl, referredStatus, firstName, lastName, resumeUrl, linkedInUrl, emailId, currentCompany, points, postId} : any) => {

    var progress = "Unreferred";
    if(referredStatus === 1) progress = "In Progress";
    if(referredStatus === 2) progress = "Referred";
    

  return (
    <div className="w-full flex">
        Hii
        <div className="flex">
                <div className="w-2/3 ml-4 font-semibold text-2xl bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text pt-2">{jobTitle}</div>
                <div className={`p-2 rounded-lg text-white mt-2 ml-20 ${referredStatus === 0 && "bg-red-400"} ${referredStatus === 1 && "bg-blue-400"} ${referredStatus === 2 && "bg-green-400"}`}>{progress}</div>
        </div>
    </div>
  )
}

export default ReferPostDetailsCard