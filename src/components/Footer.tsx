

const Footer = () => {
  return (
    <div className="bg-indigo-200 h-64 pb-20 pt-20 px-4 flex">
        <div className="w-1/4 px-24 h-full flex align-center items-center"><div className="w-full text-6xl font-semibold">Refer<span className="text-indigo-700">All</span></div></div>
        <div className="w-3/4 flex ml-40 items-center justify-around text-xl text-gray-700">
            <div className="hover:cursor-pointer">Ask for Referral</div>
            <div className="hover:cursor-pointer">Refer someone</div>
            <div className="hover:cursor-pointer">SignUp/Login</div>
        </div>
    </div>
  )
}

export default Footer