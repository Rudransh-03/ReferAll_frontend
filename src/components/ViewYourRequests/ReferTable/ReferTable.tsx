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
    <div className="mt-4 mb-6 w-full md:flex md:justify-center overflow-x-auto md:overflow-visible lg:mx-0">
      {/* <div className="w-full md:flex md:justify-center overflow-x-auto md:overflow-visible"> */}
      <table className="w-full md:w-10/12 border-collapse shadow-2xl text-xs sm:text-sm md:text-base">
        <thead>
          <tr className="text-xs sm:text-sm md:text-xl">
            <th className="bg-indigo-200 px-2 sm:px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Job Title</span>
            </th>
            <th className="bg-indigo-200 px-2 sm:px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-800 to-violet-700 inline-block text-transparent bg-clip-text">Job Id</span>
            </th>
            <th className="bg-indigo-200 px-2 sm:px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Referrer's Name</span>
            </th>
            <th className="bg-indigo-200 px-2 sm:px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Referrer's Email Id</span>
            </th>
            <th className="bg-indigo-200 px-2 sm:px-4 py-2 border-r-2 border-white">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Status</span>
            </th>
            <th className="bg-indigo-200 px-2 sm:px-4 py-2">
              <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((post: any, index: number) => (
            <tr key={index} className="border-t">
              <td className="text-center border border-indigo-600 px-2 sm:px-4 py-2 h-16">{post.jobTitle}</td>
              <td className="text-center border border-indigo-600 px-2 sm:px-4 py-2">{post.jobId}</td>
              <td className="text-center border border-indigo-600 px-2 sm:px-4 py-2">{post.referrer == null ? "N/A" : post.referrer.firstName+" "+post.referrer.lastName}</td>
              <td className="text-center border border-indigo-600 px-2 sm:px-4 py-2">{post.referrer == null ? "N/A" : post.referrer.emailId}</td>
              <td className="text-center border border-indigo-600 px-2 sm:px-4 py-2">{getStatusDisplay(post.referredStatus)}</td>
              <td className="text-center border border-indigo-600 px-2 sm:px-4 py-2">
                <div className="hover:cursor-pointer hover:font-semibold bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text"
                  onClick={() => handleViewDetails(post)}>
                  View Details
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* </div> */}

      <Modal showModal={showModal} handleClose={handleCloseModal} data={modalData} getStatusDisplay={getStatusDisplay}/>
    </div>
  );
};

export default ReferTable;
