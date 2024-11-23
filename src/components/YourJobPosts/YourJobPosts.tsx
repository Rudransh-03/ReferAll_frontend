import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import YourJobPostsCard from "../../utils/YourJobPostsCard";

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

interface Applicant {
  applicantId: string;
  user: User;
  applicantStatus: string;
  referPost: JobPost;
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
  applicants: Applicant[];
}

const YourJobPosts: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
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
          `https://referall-backend.onrender.com/referPosts/getReferPostsByUserId/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        console.log(response.data);
        setApplicants(response.data[0]?.applicants || []); // Set applicants
        setJobPosts(response.data); // Set job posts
      } catch (error) {
        console.error("Error fetching the job posts:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchJobPosts();
  }, [jwtToken, userId]);

  // Handle job post deletion success (remove the post from the state)
  const handleDeleteSuccess = (referPostId: string) => {
    setJobPosts((prevJobPosts) => {
      if (prevJobPosts) {
        return prevJobPosts.filter((post) => post.referPostId !== referPostId);
      }
      return prevJobPosts;
    });
  };

  return (
    <div className="mt-28 md:mt-40">
      <div className="w-full text-center text-4xl md:text-5xl h-16 font-semibold">
        YOUR{" "}
        <span className="h-16 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">
          JOB POSTS
        </span>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-40 text-indigo-700 text-xl md:text-2xl font-semibold animate-fade-in-out">
          Loading your job posts...
        </div>
      ) : (
        <div className="w-full justify-center mt-4 md:mt-12 flex flex-col items-center">
          {jobPosts && jobPosts.length > 0 ? (
            jobPosts.map((post) => (
              <YourJobPostsCard
                key={post.jobId}
                referPostId={post.referPostId}
                creationDate={post.creationDate}
                companyName={post.companyName}
                jobId={post.jobId}
                jobTitle={post.jobTitle}
                jobDescription={post.jobDescription}
                jobUrl={post.jobUrl}
                yoeRequired={post.yoeRequired}
                applicants={applicants}
                jwtToken={jwtToken} // Pass JWT token to child for authorization
                onDeleteSuccess={handleDeleteSuccess} // Pass delete success handler to child
              />
            ))
          ) : (
            <div className="text-xl text-indigo-700 mt-8">No job posts found!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default YourJobPosts;
