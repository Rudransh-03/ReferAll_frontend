import React, { useState } from 'react';
import axios from 'axios';

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
  onDeleteSuccess: (referJobId: string) => void;
}

const YourJobPostsCard: React.FC<YourJobPostsCardProps> = ({
  creationDate,
  referPostId,
  companyName,
  jobId,
  jobTitle,
  jobDescription,
  jobUrl,
  yoeRequired,
  applicants,
  jwtToken,
  onDeleteSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toggle the applicants modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Toggle the delete confirmation modal
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Handle the "Yes" button click in the delete confirmation modal
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8080/referPosts/deleteReferPost/${referPostId}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      onDeleteSuccess(referPostId);  // Notify the parent about successful deletion
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting job post:', error);
      // Handle error as needed, maybe show a message
    } finally {
      setIsDeleting(false);
    }
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
        <div className="mt-4 mb-4">
          <p className="mb-4"><span className="font-bold ml-12">Job Description: </span>{jobDescription}</p>
          <p><span className="font-bold ml-12">Years of experience required: </span> {yoeRequired}</p>
        </div>

        <button
          onClick={handleOpenModal}
          className="mb-4 mt-4 ml-12 mx-4 bg-indigo-700 px-3 py-2 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200 text-white"
        >
          View Applicants
        </button>
        <button
          onClick={handleOpenDeleteModal}
          className="mb-4 ml-2 mx-4 bg-red-600 px-3 py-2 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200 text-white"
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white border-indigo-700 border-2 rounded-lg w-3/4 max-w-3xl">
            <h2 className="text-xl font-semibold mb-4 bg-indigo-700 py-2 px-4 text-white">Applicants</h2>
            <div className="overflow-x-auto p-2">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-indigo-700">First Name</th>
                    <th className="px-4 py-2 text-indigo-700">Last Name</th>
                    <th className="px-4 py-2 text-indigo-700">Email</th>
                    <th className="px-4 py-2 text-indigo-700">Resume URL</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.length > 0 ? (
                    applicants.map((applicant, index) => (
                      <tr key={index} className="border-t border-b">
                        <td className="px-4 py-2 text-center">{applicant.firstName}</td>
                        <td className="px-4 py-2 text-center">{applicant.lastName}</td>
                        <td className="px-4 py-2 text-center">{applicant.emailId}</td>
                        <td className="px-4 py-2 text-center">
                          <a
                            href={applicant.resumeUrl}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Resume
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        No applicants yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 mb-4 mx-4 bg-indigo-700 py-2 px-4 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white border-indigo-600 border-2 rounded-lg w-5/12">
            <div className='bg-indigo-700 h-1/2 py-2 px-4 text-white w-full font-semibold text-lg'>Confirmation</div>
            <h2 className="text-xl font-semibold mb-4 text-center pt-3 pl-4 pr-4 mt-4">
              {'Are you sure you want to delete this job post? This action cannot be undone.'}
            </h2>
            <div className="mb-6 pt-2 flex justify-evenly">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 px-4 py-2 ml-36 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg text-white"
                disabled={isDeleting}
              >
                Yes
              </button>
              <button
                onClick={handleCloseDeleteModal}
                className="bg-gray-400 px-4 py-2 mr-36 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg text-white"
                disabled={isDeleting}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourJobPostsCard;
