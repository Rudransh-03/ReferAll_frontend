import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="mt-56 w-screen">
        <div className="w-full flex h-16 justify-center text-5xl font-semibold"><div className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Login</div></div>
            <div className="flex justify-center w-full">
                <form className="mt-8 w-full">
                    <div className="mb-8 w-full mr-8 w-1/2 flex justify-center align-center items-center">
                        <label htmlFor="jobId" className="mr-4">Email&nbsp;&nbsp;Id: </label>
                        <input className="mt-2 border-2 w-1/4 p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="jobId" name="jobId" required />
                    </div>
                    <div className="mb-8 w-full mr-8 w-1/2 flex justify-center align-center items-center">
                        <label htmlFor="jobId" className="mr-4">Password: </label>
                        <input className="mt-2 border-2 w-1/4 p-2 rounded-md border-gray-300 focus:border-indigo-700"  type="text" id="jobId" name="jobId" required />
                    </div>
                </form>
            </div>
            <div className="flex justify-center w-full">
            <div className="mb-14">Don't have an account? <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text"><Link to="/sign-up">SignUp</Link></span></div>
            </div>
            
    </div>
  )
}

export default Login