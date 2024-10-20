import { useSelector } from "react-redux";
import { userState } from "../store/user-slice";
import { Link } from "react-router-dom";


const Footer = () => {
  const userFirstName : string = useSelector((state: { user:userState })=>state.user.firstName);
  return (
    <div className="bg-indigo-200 h-64 pb-20 pt-20 px-4 flex">
        <div className="w-1/4 px-24 h-full flex align-center items-center"><div className="w-full text-6xl font-semibold">Refer<span className="text-indigo-700">All</span></div></div>
        <div className="w-3/4 flex ml-40 items-center justify-around text-xl text-gray-700">
            <Link className="hover:cursor-pointer hover:underline underline-offset-4" to="seek_referral">Ask for Referral</Link>
            <Link className="hover:cursor-pointer hover:underline underline-offset-4" to="refer">Refer someone</Link>
            {userFirstName.length > 0 && <Link className={`hover:cursor-pointer hover:underline underline-offset-4`} to="/my_profile">My Profile</Link>}
        {userFirstName.length === 0 && <Link className={`hover:cursor-pointer hover:underline underline-offset-4`} to="/login">Login/Sign-Up</Link>}
        </div>
    </div>
  )
}

export default Footer