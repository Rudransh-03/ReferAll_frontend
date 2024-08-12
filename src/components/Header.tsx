import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userState } from "../store/user-slice";

const Header = () => {
  const { pathname } = useLocation();
  const path = pathname.substring(1);
  const userFirstName : string = useSelector((state: { user:userState })=>state.user.firstName);

  return (
    <div className="fixed top-0 w-screen bg-indigo-800 text-white p-4 flex px-8 h-24 items-center z-50">
      <Link className="w-1/6 text-3xl hover:cursor-pointer" to="/">ReferAll</Link>
      <div className="w-5/6 flex justify-around text-xl font-light">
        <Link className={`hover:cursor-pointer hover:underline underline-offset-4 ${(path === 'seek_referral') ? 'underline' : ''}`} to="/seek_referral">Seek A Referral</Link>
        <Link className={`hover:cursor-pointer hover:underline underline-offset-4 ${(path === 'view_requests') ? 'underline' : ''}`} to="/view_requests">View Your Requests</Link>
        <Link className={`hover:cursor-pointer hover:underline underline-offset-4 ${(path === 'refer') ? 'underline' : ''}`} to="/refer">Refer People</Link>
        <Link className={`hover:cursor-pointer hover:underline underline-offset-4 ${(path === 'create_job_post') ? 'underline' : ''}`} to="/create_job_post">Create Job Post</Link>
        <Link className={`hover:cursor-pointer hover:underline underline-offset-4 ${(path === 'view_job_posts') ? 'underline' : ''}`} to="/view_job_posts">View Job Posts</Link>
        <Link className={`hover:cursor-pointer hover:underline underline-offset-4 ${(path === 'your_job_posts') ? 'underline' : ''}`} to="/your_job_posts">Your Job Posts</Link>
        {userFirstName.length > 0 && <Link className={`hover:cursor-pointer hover:underline underline-offset-4 ${(path === 'my_profile') ? 'underline' : ''}`} to="/my_profile">My Profile</Link>}
        {userFirstName.length === 0 && <Link className={`hover:cursor-pointer hover:underline underline-offset-4 ${(path === 'login') ? 'underline' : ''}`} to="/login">Login/Sign-Up</Link>}
      </div>
    </div>
  );
};

export default Header;
