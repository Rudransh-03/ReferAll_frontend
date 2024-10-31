import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../../store/user-slice';

interface ModalProps {
  showModal: boolean;
  handleClose: () => void;
  getStatusDisplay: () => any;
  data: any;
}

const Modal: React.FC<any> = ({ showModal, handleClose, data, getStatusDisplay }) => {

  const navigate = useNavigate();

  const jwtToken: string = useSelector((state: { user: userState }) => state.user.jwtToken);
  const userId: string = useSelector((state: { user: userState }) => state.user.userId);
  
  async function clickHandler() {
    const response = await axios.get(`http://localhost:8080/changeIsReferredToInProgress/${data.postId}/${userId}`, {
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    });

    console.log(response.data);
    window.location.reload();
    navigate("/");
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      
      <div className="animate-scaleUp2 bg-white rounded-xl shadow-lg w-11/12 md:w-3/4 lg:w-1/2 border-2 border-indigo-700">
      <div className='w-full text-xl font-semibold mb-4 bg-indigo-700 py-2 px-4 text-white'>REFER</div>
        <h2 className="text-2xl bg-gradient-to-r pl-8 pt-8 from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text font-bold">JOB DETAILS:</h2>
        
        {/* Table for displaying data with light grey borders */}
        <div className='px-8'>
        <div className="grid grid-cols-2 gap-4 border-b p-2 border-gray-300 pb-2">
          <p className="font-semibold">Job Title:</p>
          <p>{data.jobTitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2 border-gray-300 pb-2">
          <p className="font-semibold">Job ID:</p>
          <p>{data.jobId}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b p-2 border-gray-300 pb-2">
          <p className="font-semibold">Job Link:</p>
          <p><a href={data.jobUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-red-500">Click Here</a></p>
        </div>
        

        <br />

        <p className="text-2xl mb-4 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text font-semibold">APPLICANT'S INFO</p>
        
        {/* Table for applicant's info with light grey borders */}
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 p-2">
          <p className="font-semibold">Full Name:</p>
          <p>{data.user.firstName} {data.user.lastName}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 p-2">
          <p className="font-semibold">Email Id:</p>
          <p>{data.user.emailId}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 p-2">
          <p className="font-semibold">Resume:</p>
          <p><a href={data.user.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-red-500">Click Here</a></p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 p-2">
          <p className="font-semibold">LinkedIn Profile:</p>
          <p><a href={data.user.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-red-500">Click Here</a></p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 p-2">
          <p className="font-semibold">Current Company:</p>
          <p>{data.user.currentCompany}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 p-2">
          <p className="font-semibold">Current Title:</p>
          <p>{data.user.currentTitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 p-2">
          <p className="font-semibold">Points:</p>
          <p>{data.user.points}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 p-2">
          <p className="font-semibold">Status:</p>
          <p>{getStatusDisplay(data.referredStatus)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-b border-gray-300 p-2">
          <p className="font-semibold">About the applicant:</p>
          <p>{data.user.bio}</p>
        </div>
        </div>

        <div className="flex mt-4">
          <button
            className={`mr-4 my-4 ml-8 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ${data.referredStatus !== 0 && "bg-gray-700 cursor-not-allowed hover:bg-gray-700"}`}
            onClick={clickHandler}
            disabled={data.referredStatus !== 0}
          >
            Refer Candidate
          </button>

          <button
            className="mr-4 my-4 ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
