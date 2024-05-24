// import axios from 'axios';
// import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';

// import { userState } from '../store/user-slice';
// import { useParams } from 'react-router-dom';

// const ReferPostDetailsCard = () => {
//   const jwtToken : string = useSelector((state: { user:userState })=>state.user.jwtToken);
//   const[data, setData] = useState<any>([]);
//   const [loading, setLoading] = useState(true);

//   const { postId } = useParams<{ postId: string }>();
//   console.log(postId);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/posts/getPostsByPostId/${postId}`, {
//           headers: {
//             'Authorization': 'Bearer ' + jwtToken
//           }
//         });
//         setData(response.data);
//         console.log(response.data);

//       } catch (error) {
//         console.error(error)
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, [postId]);

//   var progress = "Unreferred";
//   if(data){
//     if(data.referredStatus === 1) progress = "In Progress";
//     if(data.referredStatus === 2) progress = "Referred";
//   }

//   return (
//     <>
//     {loading && <div className="w-full flex">
//         Hii
//     </div>}

//     {data && 
//       <div className='w-full'>
//         <div className="flex">
//             <div className="w-2/3 ml-4 font-semibold text-2xl bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text pt-2"><span className="italic font-semibold ">Job Title- </span>{data.jobTitle}</div>
//             <div className={`p-2 rounded-lg text-white mt-2 ml-20 ${data.referredStatus === 0 && "bg-red-400"} ${data.referredStatus === 1 && "bg-blue-400"} ${data.referredStatus === 2 && "bg-green-400"}`}>{progress}</div>
//         </div>
//         <div className="mt-8 ml-4 font-semibold text-lg"><span className="italic bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">Job Id:</span> <span>{data.jobId}</span></div>
//         <div className="mt-2 ml-4 font-semibold text-lg"><span className="italic bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">Job Url:</span> <a href={data.jobUrl}>{data.jobUrl}</a></div>
//         <div className="w-full text-gray-600 font-semibold text-lg p-4"><span className="italic bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">Full Name: </span> {data.user.firstName}&nbsp;{data.user.lastName}</div>
//         <div className="w-full -mt-4 text-gray-600 p-4 font-semibold text-lg"><span className="italic bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">Email Id: </span> {data.user.emailId}</div>
        
//         <div className="w-full -mt-4 text-gray-600 p-4 font-semibold text-lg"><span className="italic bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">Resume Url:</span> {data.user.resumeUrl}</div>
//         <div className="w-full -mt-4 text-gray-600 p-4 font-semibold text-lg"><span className="italic bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">Linked Url:</span> {data.user.linkedInUrl}</div>
//       </div>
//     }
//     </>
//   )
// }

// export default ReferPostDetailsCard