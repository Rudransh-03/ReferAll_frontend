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

interface JobPost {
  referPostId: string;
  creationDate: string;
  companyName: string;
  jobId: string;
  jobUrl: string;
  jobTitle: string;
  jobDescription: string;
  yoeRequired: string;
  creator: User;
  applicants: Applicant[];
}

interface Applicant {
  applicantId: string;
  user: User;
  applicantStatus: string;
  referPost: JobPost;
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
  applicants: Applicant[];
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
  const [applicantList, setApplicantList] = useState(applicants);
  const [statusUpdates, setStatusUpdates] = useState<{ [applicantId: string]: string }>({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = async () => {
    // Send statusUpdates to backend when modal closes
    if (Object.keys(statusUpdates).length > 0) {
      try {
        await axios.post(
          `https://referall-backend.onrender.com/applicant/updateApplicantsStatus`,
          statusUpdates,
          {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
            },
          }
        );
        console.log("Status updates sent successfully:", statusUpdates);
        setStatusUpdates({});
      } catch (error) {
        console.error("Error sending status updates:", error);
      }
    }
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`https://referall-backend.onrender.com/referPosts/deleteReferPost/${referPostId}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      onDeleteSuccess(referPostId);
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting job post:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = (applicantId: string, status: string, index: number) => {
    setApplicantList((prevApplicants) => {
      const updatedApplicants = [...prevApplicants];
      updatedApplicants[index].applicantStatus = status;
      return updatedApplicants;
    });

    // Update status in statusUpdates list
    setStatusUpdates((prevStatusUpdates) => ({
      ...prevStatusUpdates,
      [applicantId]: status,
    }));
  };

  return (
    <>
      <div className="w-2/3 flex justify-center">
        <div className="w-full rounded-lg p-1 py-2 md:p-2 bg-white mb-20 border-2 border-indigo-600 shadow-2xl hover:scale-105 transition duration-150 ease-in-out text-center md:text-left">
          <div className="flex justify-center">
            <div className="font-semibold text-xl md:text-2xl bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text pt-2">
              Job Title: {jobTitle}
              <p className="text-black text-sm mb-2 italic">(Posted on: {creationDate})</p>
            </div>
          </div>
          <div>
            <span className="font-bold text-sm md:text-base">Job Url: </span>{jobUrl}
          </div>
          <div className="mt-2 mb-2 md:mt-4 md:mb-4">
            <p className="mb-2"><span className="font-bold text-sm md:text-base">Job Description: </span>{jobDescription}</p>
            <p><span className="font-bold text-sm md:text-base">Years of experience required: </span> {yoeRequired}</p>
          </div>

          <button
            onClick={handleOpenModal}
            className="mt-2 mb-2 md:mt-4 md:mb-4 mx-4 bg-indigo-700 px-3 py-2 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200 text-white"
          >
            View Applicants
          </button>
          <button
            onClick={handleOpenDeleteModal}
            className="mb-4 mx-4 bg-red-600 px-3 py-2 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200 text-white"
          >
            Delete
          </button>
        </div>
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
                    <th className="px-4 py-2 text-indigo-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applicantList.length > 0 ? (
                    applicantList.map((applicant:any, index:any) => (
                      <tr key={index} className="border-t border-b">
                        <td className="px-4 py-2 text-center">{applicant.user.firstName}</td>
                        <td className="px-4 py-2 text-center">{applicant.user.lastName}</td>
                        <td className="px-4 py-2 text-center">{applicant.user.emailId}</td>
                        <td className="px-4 py-2 text-center">
                          <a
                            href={applicant.user.resumeUrl}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Resume
                          </a>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <select
                            className={`px-2 py-1 rounded-md ${
                              applicant.applicantStatus === 'Reject' ? 'text-red-500' :
                              applicant.applicantStatus === 'Shortlist' ? 'text-green-500' :
                              applicant.applicantStatus === 'Hold' ? 'text-blue-500' :
                              applicant.applicantStatus === 'N/A' ? 'text-gray-500' : ''
                            }`}
                            value={applicant.applicantStatus || 'N/A'}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              handleStatusChange(applicant.applicantId, newStatus, index);
                            }}
                          >
                            <option value="N/A" className="text-gray-500">N/A</option>
                            <option value="Reject" className="text-red-500">Reject</option>
                            <option value="Shortlist" className="text-green-500">Shortlist</option>
                            <option value="Hold" className="text-blue-500">Hold</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
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
          <div className="bg-white border-indigo-700 border-2 rounded-lg w-3/4 max-w-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this job post?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseDeleteModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className={`${
                  isDeleting ? 'bg-gray-400' : 'bg-red-600'
                } text-white px-4 py-2 rounded-md hover:bg-red-700`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default YourJobPostsCard;
