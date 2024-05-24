import { useState } from 'react';
import Modal from './Modal';

const ReferTable = ({ data }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any>(null);

  const getStatusDisplay = (status: number) => {
    switch (status) {
      case 0:
        return <span className="text-red-500 font-semibold">Unreferred</span>;
      case 1:
        return <span className="text-blue-500 font-semibold">In Progress</span>;
      case 2:
        return <span className="text-green-500 font-semibold">Referred</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const handleViewDetails = (post: any) => {
    setModalData(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="mt-4 w-full flex justify-center">
      <table className="w-10/12 border-collapse shadow-2xl">
        <thead>
          <tr className="text-xl">
            <th className="bg-indigo-200 px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Job Title</span>
            </th>
            <th className="bg-indigo-200 px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-800 to-violet-700 inline-block text-transparent bg-clip-text">Job Id</span>
            </th>
            <th className="bg-indigo-200 px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Full Name</span>
            </th>
            <th className="bg-indigo-200 px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Current Company and Title</span>
            </th>
            <th className="bg-indigo-200 px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Status</span>
            </th>
            <th className="bg-indigo-200 px-4 py-2">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((post: any, index: number) => (
            <tr key={index} className="border-t">
              <td className="text-center border border-indigo-600 px-4 py-2 h-16">{post.jobTitle}</td>
              <td className="text-center border border-indigo-600 px-4 py-2">{post.jobId}</td>
              <td className="text-center border border-indigo-600 px-4 py-2">{post.user.firstName}&nbsp;{post.user.lastName}</td>
              <td className="text-center border border-indigo-600 px-4 py-2">{post.user.currentCompany},&nbsp;{post.user.currentTitle}</td>
              <td className="text-center border border-indigo-600 px-4 py-2">{getStatusDisplay(post.referredStatus)}</td>
              <td className="text-center border border-indigo-600 px-4 py-2">
                <div className="hover:cursor-pointer hover:font-semibold bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text"
                  onClick={() => handleViewDetails(post)}>
                  View Details
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal showModal={showModal} handleClose={handleCloseModal} data={modalData} getStatusDisplay={getStatusDisplay}/>
    </div>
  );
};

export default ReferTable;
