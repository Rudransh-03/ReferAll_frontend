import React from 'react';

interface User {
  firstName: string;
  lastName: string;
  emailId: string;
  linkedInUrl: string;
  currentCompany: string;
  currentTitle: string;
  bio: string;
  contactNumber: string;
  resumeUrl: string;
}

interface YourJobPostsCardProps {
  referPostId: string;
  creationDate: string;
  companyName: string;
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  jobUrl: string;
  yoeRequired: string;
  applicants: User[];
  jwtToken: string;
}

const AppliedJobPostCard: React.FC<YourJobPostsCardProps> = ({
  creationDate,
  // referPostId,
  companyName,
  jobId,
  jobTitle,
  // jobDescription,
  jobUrl,
  yoeRequired,
}) => {

  const formattedCompanyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);

  return (
    <>
      <div className="w-2/3 flex justify-center">
        <div className="w-full rounded-lg p-1 py-2 md:p-2 bg-white mb-20 border-2 border-indigo-600 shadow-2xl hover:scale-105 transition duration-150 ease-in-out text-center md:text-left">
          <div className="flex justify-center">
            <div className="font-semibold text-xl md:text-2xl bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text pt-2">
              {jobTitle}, {formattedCompanyName}
              <p className="text-black text-sm mb-2 italic">(Posted on: {creationDate})</p>
            </div>
          </div>
          <div className='mb-2 md:mb-4 md:px-8'>
            <span className="font-bold text-sm md:text-base">Job Id: </span>{jobId}
          </div>
          <div className="md:px-8">
            <span className="font-bold text-sm md:text-base">Job Url: </span>
              <a href={jobUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Click here
              </a>
          </div>

          <div className="mt-2 mb-2 md:mt-4 md:mb-4 md:px-8">
            {/* <p className="mb-2"><span className="font-bold text-sm md:text-base">Job Description: </span>{jobDescription}</p> */}
            <p><span className="font-bold text-sm md:text-base">Years of experience required: </span> {yoeRequired}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppliedJobPostCard;
