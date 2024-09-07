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

  const jwtToken : string = useSelector((state: { user:userState })=>state.user.jwtToken);
  const userId : string = useSelector((state: { user:userState })=>state.user.userId);
  async function clickHandler(){
    // console.log(data.postId);
    
    const response = await axios.get(`http://localhost:8080/changeIsReferredToInProgress/${data.postId}/${userId}`,{
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    });

    console.log(response.data);

    window.location.reload();
    handleClose();
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="animate-scaleUp2 bg-white p-8 rounded-xl shadow-lg w-11/12 md:w-3/4 lg:w-1/2 border-2 border-indigo-700">
        <h2 className="text-3xl mb-4 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text font-bold">DETAILS:</h2>
        <div className='flex'>
        <p className='w-1/2'><strong>Job Title:</strong> {data.jobTitle}</p>
        <p><strong>Job ID:</strong> {data.jobId}</p>
        </div>
        <p><strong>Job Link:</strong> {data.jobUrl}</p>
        <br/>
        <p className='text-2xl mb-4 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text font-semibold'><span>APPLICANT'S INFO-</span></p>
        <p><strong>Full Name:</strong> {data.user.firstName} {data.user.lastName}</p>
        <p><strong>Email Id:</strong> {data.user.emailId}</p>
        <p><strong>Resume:</strong> <a href={`${data.user.resumeUrl}`} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:text-red-500'>Click Here</a></p>
        <p><strong>LinkedIn Profile:</strong> <a href={`${data.user.linkedInUrl}`} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:text-red-500'>Click Here</a></p>
        <p><strong>Current Company:</strong> {data.user.currentCompany}</p>
        <p><strong>Current Title:</strong> {data.user.currentTitle}</p>
        <p><strong>Points:</strong> {data.user.points}</p>
        <p><strong>Status:</strong> {getStatusDisplay(data.referredStatus)}</p>
        <p><strong>About the applicant:</strong> {data.user.bio}</p>
        <div className='flex'>
            <button
            className={`mr-4 mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ${data.referredStatus !== 0 && "bg-gray-700 cursor-not-allowed hover:bg-gray-700"}`}
            onClick={clickHandler}
            disabled={data.referredStatus !== 0}
            >
            Refer Candidate
            </button>
            
            <button
            className={`mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700`}
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
