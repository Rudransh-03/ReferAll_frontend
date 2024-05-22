import { useParams } from "react-router-dom";
import ReferralRequestPosts from "./ReferralRequestPosts"
import ReferPostDetailsCard from "../utils/ReferPostDetailsCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../store/user-slice";
import axios from "axios";
import ReferCard from "../utils/ReferCard";


const ReferralRequestDetails = () => {

    const companyName : string = useSelector((state: { user:userState })=>state.user.currentCompany);
    const jwtToken : string = useSelector((state: { user:userState })=>state.user.jwtToken);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(0);

    function clickHandler(){
      setFetching((fetching+1) / 2)
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/posts/getPostsByCompany/google`, {
              headers: {
                'Authorization': 'Bearer ' + jwtToken
              }
            });
            setData(response.data);
            console.log(response.data);

          } catch (error) {
            console.error(error)
          }
          setLoading(false);
        };
    
        fetchData();
      }, [fetching]);

    const { jobId } = useParams<{ jobId: string }>();

  return (
    <div className="w-screen">
    <div className="w-full mt-44">
        <div className="w-full text-center text-6xl h-16 font-semibold">REFER PEOPLE TO <span className="h-16 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">{companyName.toUpperCase()}</span></div>
      
      <div className="w-full flex">

      <div className="ml-16 w-5/12">
      {
        data.map((post:any, index:number)=>(
            <ReferCard key={index} 
            jobTitle={post.jobTitle}
            jobId={post.jobId} 
            jobUrl={post.jobUrl}
            referredStatus={post.referredStatus}
            firstName={post.user.firstName}
            lastName={post.user.lastName}
            resumeUrl={post.user.resumeUrl}
            linkedInUrl={post.user.linkedInUrl}
            emailId={post.user.emailId}
            currentCompany={post.user.currentCompany}
            points={post.user.points}
            postId={post.postId}
            />
        ))
      }
      </div>

      <div className="mt-16 ml-16 p-4 rounded-xl w-5/12 bg-white w-1/4 border-2 border-indigo-600 shadow-2xl">
        <ReferPostDetailsCard />
      </div>
      </div>
      <button onClick={clickHandler}>Refresh Posts</button>
    </div>
    </div>
  )
}

export default ReferralRequestDetails