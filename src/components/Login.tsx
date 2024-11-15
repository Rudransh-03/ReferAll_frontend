
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/user-slice";

const Login = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
                    setErrorMessage(null); // Clear error message on success
                })
                .catch(error => {
                    console.error('Login failed:', error.response.data);
                    setErrorMessage(error.response.data);
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
                {errorMessage && (
                    <div className="w-full flex justify-center mt-4">
                        <div className="text-red-600 text-center px-4 py-2 border border-red-600 rounded-md bg-red-50 w-10/12 md:w-8/12 lg:w-6/12">
                            {errorMessage}
                        </div>
                    </div>
                )}
                <div className="flex justify-center w-full mt-8">
                    <form ref={formRef} onSubmit={submitHandler} className="w-full">
                        <div className="mb-8 w-full flex justify-center items-center">
                            <input 
                                className="mt-2 border-2 w-2/4 p-2 rounded-md border-gray-300 focus:border-indigo-700" 
                                type="email" 
                                id="emailId" 
                                name="emailId" 
                                required 
                                placeholder="Email Id" 
                            />
                        </div>
                        <div className="mb-8 w-full flex justify-center items-center">
                            <input 
                                className="mt-2 border-2 w-2/4 p-2 rounded-md border-gray-300 focus:border-indigo-700" 
                                type="password" 
                                id="password" 
                                name="password" 
                                required 
                                placeholder="Password" 
                            />
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button type="submit"
                                className="w-auto px-8 mb-8 text-white mx-4 bg-indigo-800 p-3 rounded-md hover:scale-110 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-indigo-200 flex justify-center items-center"
                            >
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
