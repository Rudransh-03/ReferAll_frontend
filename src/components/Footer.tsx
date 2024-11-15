import { useSelector } from "react-redux";
import { userState } from "../store/user-slice";
import { Link } from "react-router-dom";

const Footer = () => {
  const userFirstName: string = useSelector((state: { user: userState }) => state.user.firstName);
  
  return (
    <div className="bg-indigo-900 h-auto pb-10 pt-10 px-4 flex flex-col md:flex-row text-white">
      {/* Conditional rendering for small screens */}
      <div className="w-full md:hidden flex justify-center mb-4">
        <Link 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="text-white hover:underline underline-offset-4 text-lg"
        >
          Go to top
        </Link>
      </div>
      
      {/* Render footer content for medium and larger screens */}
      <div className="hidden md:flex w-full md:w-1/4 px-4 md:px-24 h-full align-center items-center mb-4 md:mb-0">
        <div className="w-full text-5xl md:text-6xl font-semibold">ReferAll</div>
      </div>
      <div className="hidden md:flex w-full md:w-3/4 flex flex-col md:flex-row items-center justify-end lg:justify-around text-lg md:text-xl">
        <Link className="hover:cursor-pointer md:mr-8 hover:underline underline-offset-4 mb-2 md:mb-0" to="seek_referral">
          Ask for Referral
        </Link>
        <Link className="hover:cursor-pointer md:mr-8 hover:underline underline-offset-4 mb-2 md:mb-0" to="refer">
          Refer Someone
        </Link>
        {userFirstName.length > 0 && (
          <Link className="hover:cursor-pointer hover:underline underline-offset-4 mb-2 md:mb-0" to="/my_profile">
            My Profile
          </Link>
        )}
        {userFirstName.length === 0 && (
          <Link className="hover:cursor-pointer md:mr-8 hover:underline underline-offset-4 mb-2 md:mb-0" to="/login">
            Login/Sign-Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Footer;
