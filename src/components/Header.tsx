import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { RootState } from "../store"; // Assuming RootState is defined in store
import { userState } from "../store/user-slice";

const Header = () => {
  const { pathname } = useLocation();
  const path = pathname.substring(1);
  const userFirstName: string = useSelector((state: RootState) => state.user.firstName);

  const [referralsOpen, setReferralsOpen] = useState(false);
  const [jobPostsOpen, setJobPostsOpen] = useState(false);

  // Use refs to track dropdown elements
  const referralsRef = useRef<HTMLDivElement | null>(null);
  const jobPostsRef = useRef<HTMLDivElement | null>(null);

  const toggleReferralsOpen = () => {
    setReferralsOpen(!referralsOpen);
    setJobPostsOpen(false);
  };

  const toggleJobPostsOpen = () => {
    setJobPostsOpen(!jobPostsOpen);
    setReferralsOpen(false);
  };

  const closeDropdowns = () => {
    setReferralsOpen(false);
    setJobPostsOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        referralsRef.current &&
        !referralsRef.current.contains(event.target as Node)
      ) {
        setReferralsOpen(false);
      }
      if (
        jobPostsRef.current &&
        !jobPostsRef.current.contains(event.target as Node)
      ) {
        setJobPostsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 w-screen bg-indigo-800 text-white py-4 px-4 md:px-6 lg:px-8 md:h-16 lg:h-24 flex items-center justify-between z-50">
      <Link className="text-xl md:text-2xl lg:text-3xl font-semibold hover:cursor-pointer" to="/">ReferAll</Link>

      <div className="flex space-x-4 md:space-x-8 lg:space-x-12 text-lg md:text-xl lg:text-2xl font-light relative">
        {/* Referrals Dropdown */}        
        <div className="relative" ref={referralsRef}>
          <span
            className={`hover:underline underline-offset-4 ${['seek_referral', 'view_requests', 'refer'].includes(path) ? 'underline' : ''} cursor-pointer`}
            onClick={toggleReferralsOpen}
          >
            Referrals
          </span>
          {referralsOpen && (
            <div className="absolute bg-white text-indigo-700 shadow-lg font-normal rounded-md mt-2 p-4 w-48 md:w-64 lg:w-72 text-sm md:text-base animate-slideDown2 z-50">
              <Link className="block py-2 border-b border-gray-300" to={(userFirstName.length === 0) ? "/login" : '/seek_referral'} onClick={closeDropdowns}>
                <p className="hover:underline">Seek A Referral</p>
                <p className="text-sm text-gray-500">Fill a simple form and get referred</p>
              </Link>
              <Link className="block py-2 border-b border-gray-300" to={(userFirstName.length === 0) ? "/login" : '/view_your_referrals'} onClick={closeDropdowns}>
                <p className="hover:underline ">See People You Referred</p>
                <p className="text-sm text-gray-500">Track whom you referred and the current referral status of those applications</p>
              </Link>
              <Link className="block py-2 border-b border-gray-300" to={(userFirstName.length === 0) ? "/login" : "/view_requests"} onClick={closeDropdowns}>
                <p className="hover:underline ">View Your Requests</p>
                <p className="text-sm text-gray-500">Track which of your applications got referred</p>
              </Link>
              <Link className="block py-2" to={(userFirstName.length === 0) ? "/login" : "/refer"} onClick={closeDropdowns}>
                <p className="hover:underline ">Refer People</p>
                <p className="text-sm text-gray-500">Be an aladdin for those in need of jobs (a good karma helps :))</p>
              </Link>
            </div>
          )}
        </div>

        {/* Job Posts Dropdown */}
        <div className="relative" ref={jobPostsRef}>
          <span
            className={`hover:underline underline-offset-4 ${['create_job_post', 'view_job_posts', 'your_job_posts'].includes(path) ? 'underline' : ''} cursor-pointer`}
            onClick={toggleJobPostsOpen}
          >
            Job Posts
          </span>
          {jobPostsOpen && (
            <div className="absolute bg-white text-indigo-700 font-normal shadow-lg rounded-md mt-2 p-4 w-48 md:w-64 lg:w-72 text-sm md:text-base animate-slideDown2 z-50">
              <Link className="block py-2 border-b border-gray-300" to={(userFirstName.length === 0) ? "/login" : "/create_job_post"} onClick={closeDropdowns}>
                <p className="hover:underline">Create Job Post</p>
                <p className="text-sm text-gray-500">Advertise new job openings</p>
              </Link>
              <Link className="block py-2 border-b border-gray-300" to={(userFirstName.length === 0) ? "/login" : "/view_job_posts"} onClick={closeDropdowns}>
                <p className="hover:underline">View Job Posts</p>
                <p className="text-sm text-gray-500">Browse available jobs</p>
              </Link>
              <Link className="block py-2 border-b border-gray-300" to={(userFirstName.length === 0) ? "/login" : "/your_job_posts"} onClick={closeDropdowns}>
                <p className="hover:underline">Your Job Posts</p>
                <p className="text-sm text-gray-500">Manage your job listings</p>
              </Link>
              <Link className="block py-2" to={(userFirstName.length === 0) ? "/login" : "/your_applications"} onClick={closeDropdowns}>
                <p className="hover:underline">Your Applications</p>
                <p className="text-sm text-gray-500">View the jobs you have applied for at a single place</p>
              </Link>
            </div>
          )}
        </div>

        {/* Profile and Login Links */}
        {userFirstName.length > 0 ? (
          <Link className="hover:cursor-pointer hover:underline underline-offset-4" to="/my_profile">
            Your Profile
          </Link>
        ) : (
          <Link className="hover:cursor-pointer hover:underline underline-offset-4" to="/login">
            Login/Sign-Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
