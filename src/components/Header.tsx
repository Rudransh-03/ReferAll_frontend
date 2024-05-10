
const Header = () => {
  return (
    <div className="fixed top-0 w-screen bg-indigo-800 text-white p-4 flex px-8 h-24 items-center z-50">
      <div className="w-1/2 text-3xl hover:cursor-pointer">ReferAll</div>
      <div className="w-1/2 flex justify-around text-xl font-light">
        <div className="hover:cursor-pointer hover:underline underline-offset-4">Create Post</div>
        <div className="hover:cursor-pointer hover:underline underline-offset-4">View Your Posts</div>
        <div className="hover:cursor-pointer hover:underline underline-offset-4">Refer People</div>
        <div className="hover:cursor-pointer hover:underline underline-offset-4">Profile</div>
      </div>
    </div>
  );
};

export default Header;
