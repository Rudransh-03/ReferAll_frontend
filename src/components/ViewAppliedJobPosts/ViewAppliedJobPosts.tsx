import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AppliedJobPostCard from "../../utils/AppliedJobPostCard";

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
  creationDate: string; // YYYY-MM-DD
  companyName: string;
  jobId: string;
  jobUrl: string;
  jobTitle: string;
  jobDescription: string;
  yoeRequired: string;
  creator: User;
  applicants: User[];
}

const ViewAppliedJobPosts: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);
  const userId: string = useSelector((state: RootState) => state.user.userId);

  // Fetch the job posts data for the current user
  useEffect(() => {
    const fetchJobPosts = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(
          `http://localhost:8080/referPosts/getAppliedReferPosts/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        console.log(response.data);
        setJobPosts(response.data);
      } catch (error) {
        console.error("Error fetching the job posts:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchJobPosts();
  }, [jwtToken, userId]);

  return (
    <div className="mt-40">
      <div className="w-full text-center text-5xl h-16 font-semibold">
        YOUR{" "}
        <span className="h-16 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">
          APPLICATIONS
        </span>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-40 text-indigo-700 text-xl md:text-2xl font-semibold animate-fade-in-out">
          Loading your applications...
        </div>
      ) : jobPosts && jobPosts.length > 0 ? (
        <div className="mt-12 flex flex-col items-center">
          {jobPosts.map((post) => (
            <AppliedJobPostCard
              key={post.jobId}
              referPostId={post.referPostId}
              creationDate={post.creationDate}
              companyName={post.companyName}
              jobId={post.jobId}
              jobTitle={post.jobTitle}
              jobDescription={post.jobDescription}
              jobUrl={post.jobUrl}
              yoeRequired={post.yoeRequired}
              applicants={post.applicants}
              jwtToken={jwtToken} // Pass JWT token to child for authorization
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-28 text-xl text-indigo-700 font-semibold">
          No applications found!
        </div>
      )}
    </div>
  );
  
};

export default ViewAppliedJobPosts;
