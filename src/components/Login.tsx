import axios from "axios";
import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/user-slice";

const Login = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formRef.current) {
            const formElements = new FormData(formRef.current);
            const formData = Object.fromEntries(formElements.entries());

            axios.post('http://localhost:8080/auth/login', formData)
                .then(response => {
                    dispatch(userActions.setUserObject(response.data));
                    navigate("/");
                })
                .catch(error => {
                    console.error('Login failed:', error);
                    // Handle login error
                });

            formRef.current.reset();
        }
    };

    return (
        <div className="w-screen flex justify-center">
            <div className="mt-56 w-8/12 pt-8 border mb-20 border-indigo-700 rounded-xl shadow-xl">
                <div className="w-full flex h-16 justify-center text-5xl font-semibold">
                    <div className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">Login</div>
                </div>
                <div className="flex justify-center w-full mt-8">
                    <form ref={formRef} onSubmit={submitHandler} className="w-full">
                        <div className="mb-8 w-full mr-8 flex justify-center align-center items-center">
                            <label htmlFor="emailId" className="w-1/12">Email&nbsp;&nbsp;Id: </label>
                            <input className="mt-2 border-2 w-2/4 p-2 rounded-md border-gray-300 focus:border-indigo-700" type="email" id="emailId" name="emailId" required />
                        </div>
                        <div className="mb-8 w-full mr-4 flex justify-center align-center items-center">
                            <label htmlFor="password" className="w-1/12">Password: </label>
                            <input className="mt-2 border-2 w-2/4 p-2 rounded-md border-gray-300 focus:border-indigo-700" type="password" id="password" name="password" required />
                        </div>
                        <div className="w-full flex justify-center align-center items-center">
                            <button type="submit" className="w-2/12 mb-8 text-white mx-4 bg-indigo-800 p-3 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-center w-full">
                    <div className="mb-14">Don't have an account? <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text"><Link to="/sign-up">SignUp</Link></span></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
