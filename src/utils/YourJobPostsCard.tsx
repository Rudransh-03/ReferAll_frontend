import React, { useState } from 'react';

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
  creationDate: string;
  companyName: string;
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  jobUrl: string;
  yoeRequired: string;
  applicants: User[];
}

const YourJobPostsCard: React.FC<YourJobPostsCardProps> = ({
  creationDate,
  companyName,
  jobId,
  jobTitle,
  jobDescription,
  jobUrl,
  yoeRequired,
  applicants,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="rounded-lg p-2 bg-white mb-20 w-3/4 border-2 border-indigo-600 shadow-2xl hover:scale-105 transition duration-150 ease-in-out">
        <div className="flex justify-center">
          <div className="text-center justify-center font-semibold text-2xl bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text pt-2">
            Job Title: {jobTitle}
            <p className="text-black text-sm italic">(Posted on: {creationDate})</p>
          </div>
        </div>
        <div>
          <span className="font-bold ml-12">Job Url: </span>{jobUrl}
        </div>
        <div className="mt-4 justify-center"></div>
        <div className="mt-4 mb-4">
          <p className="mb-4"><span className="font-bold ml-12">Job Description: </span>{jobDescription}</p>
          <p><span className="font-bold ml-12">Years of experience required: </span> {yoeRequired}</p>
        </div>

        <button
          onClick={handleOpenModal}
          className="mb-4 ml-12 mx-4 bg-indigo-700 p-3 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200 text-white"
        >
          View Applicants
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-w-3xl">
            <h2 className="text-xl font-semibold mb-4">Applicants</h2>
            <ul>
              {applicants.length > 0 ? (
                applicants.map((applicant, index) => (
                  <li key={index} className="mb-2">
                    {applicant.firstName} {applicant.lastName} - {applicant.emailId}
                  </li>
                ))
              ) : (
                <li>No applicants yet.</li>
              )}
            </ul>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-indigo-700 p-2 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default YourJobPostsCard;
