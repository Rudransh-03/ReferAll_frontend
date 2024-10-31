import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import YourJobPostsCard from '../../utils/YourJobPostsCard';

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

const YourJobPosts: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<JobPost[] | null>(null);
  const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);
  const userId: string = useSelector((state: RootState) => state.user.userId);

  // Fetch the job posts data for the current user
  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/referPosts/getReferPostsByUserId/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        console.log(response.data);
        setJobPosts(response.data);
      } catch (error) {
        console.error('Error fetching the job posts:', error);
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

  if (!jobPosts) {
    return <div className='mt-36'>Loading...</div>;
  }

  return (
    <div className='mt-40'>
      <div className="w-full text-center text-5xl h-16 font-semibold">YOUR <span className="h-16 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">JOB POSTS</span></div>
      <div className='mt-12 flex flex-col items-center'>
        {jobPosts.map((post) => (
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
            applicants={post.applicants}
            jwtToken={jwtToken} // Pass JWT token to child for authorization
            onDeleteSuccess={handleDeleteSuccess} // Pass delete success handler to child
          />
        ))}
      </div>
    </div>
  );
};

export default YourJobPosts;
