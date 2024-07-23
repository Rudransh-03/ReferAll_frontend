import { Link } from "react-router-dom";

const Intro = () => {
  return(
    <div className="pt-44 h-screen flex justify-center items-center -z-10">
        <div className="ml-4">
            <div className="flex text-9xl font-bold justify-center animate-slideLeft">
                <div className="">Refer</div>
                <div className="bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">All</div>
            </div>
            <div className="mt-8 flex justify-around text-gray-500 text-xl animate-slideRight">
                <div className="w-1/3 flex justify-center border-x-2 border-gray-500"><div>Refer</div></div>
                <div className="w-1/3 flex justify-center border-r-2 border-gray-500"><div>Reward</div></div>
                <div className="w-1/3 flex justify-center border-r-2 border-gray-500"><div>Repeat</div></div>
            </div>
            <div className="mt-8 text-xl text-gray-500 animate-slideDown">Just put in a referral request and let our community do the magic 🚀🚀!</div>
            <div className="flex justify-center mt-12 text-xl text-white animate-slideDown">
                <button className="mx-4 bg-indigo-800 p-4 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200"><Link to="/refer">Refer Someone</Link></button>
                <button className="mx-4 bg-indigo-800 p-4 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200"><Link to="/seek_referral">Ask for Referral</Link></button>
            </div>
        </div>
    </div>
  )
}
export default Intro