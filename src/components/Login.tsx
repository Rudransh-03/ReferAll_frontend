import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/user-slice";

const Login = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [, setIsProcessing] = useState(false);
    const [otpError, setOtpError] = useState<string | null>(null);
    const [emailId, setEmailId] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formRef.current) {
            const formElements = new FormData(formRef.current);
            const formData = Object.fromEntries(formElements.entries());

            axios.post('https://referall-backend.onrender.com/auth/login', formData)
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
            <div className="mt-56 w-10/12 md:w-8/12 pt-8 border mb-20 border-indigo-700 rounded-xl shadow-xl">
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
                                className="mt-2 border-2 w-3/4 md:w-2/4 p-2 rounded-md border-gray-300 focus:border-indigo-700" 
                                type="email" 
                                id="emailId" 
                                name="emailId" 
                                required 
                                placeholder="Email Id" 
                            />
                        </div>
                        <div className="mb-8 w-full flex justify-center items-center">
                            <input 
                                className="mt-2 border-2 w-3/4 md:w-2/4 p-2 rounded-md border-gray-300 focus:border-indigo-700" 
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
                    <div className="mb-4">
                        <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text cursor-pointer" 
                              onClick={() => setShowForgotPasswordModal(true)}>
                            Forgot Password
                        </span>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="mb-14">Don't have an account? <span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text"><Link to="/sign-up">SignUp</Link></span></div>
                </div>
            </div>
            {showForgotPasswordModal && <ForgotPasswordModal onClose={() => setShowForgotPasswordModal(false)} setShowOtpModal={setShowOtpModal} setEmailId={setEmailId} setPassword={setPassword}/>}
            {showOtpModal && <OtpModal onClose={() => setShowOtpModal(false)} setIsProcessing={setIsProcessing} setOtpError={setOtpError} otpError={otpError} emailId={emailId} password = {password}/>}
        </div>
    );
};

export default Login;

// ForgotPasswordModal Component
const ForgotPasswordModal = ({ onClose, setShowOtpModal, setEmailId, setPassword }: { onClose: () => void; setShowOtpModal: React.Dispatch<React.SetStateAction<boolean>>; setEmailId: React.Dispatch<React.SetStateAction<string | null>>; setPassword:  React.Dispatch<React.SetStateAction<string | null>>}) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef.current) {
            const formElements = new FormData(formRef.current);
            const formData = Object.fromEntries(formElements.entries());

            console.log(formData);

            console.log(formData.emailId.toString());

            const emailId = formData.emailId.toString();
            const password = formData.newPassword.toString();
            
            if(formData.emailId!=null) setEmailId(emailId);
            if(formData.newPassword!=null) setPassword(password);

            axios.post('https://referall-backend.onrender.com/auth/generate-otp', formData)
                .then(() => {
                    onClose();
                    setShowOtpModal(true);
                })
                .catch(error => {
                    console.error('Failed to generate OTP:', error.response.data);
                });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-11/12 md:w-6/12 lg:w-4/12 rounded-md p-8">
                <h2 className="text-center text-xl font-semibold mb-4">Reset Password</h2>
                <form ref={formRef} onSubmit={submitHandler}>
                    <input type="email" name="emailId" placeholder="Email Id" required className="w-full mb-4 p-2 border rounded-md" />
                    <input type="password" name="newPassword" placeholder="New Password" required className="w-full mb-4 p-2 border rounded-md" />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" required className="w-full mb-4 p-2 border rounded-md" />
                    <div className="flex justify-end">
                        <button type="submit" className="bg-indigo-700 text-white px-4 py-2 rounded-md">Submit</button>
                        <button type="button" onClick={onClose} className="ml-4 px-4 py-2 border rounded-md">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// OtpModal Component
const OtpModal = ({ onClose, setIsProcessing, setOtpError, otpError, emailId, password }: { onClose: () => void; setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>; setOtpError: React.Dispatch<React.SetStateAction<string | null>>; otpError: string | null; emailId: string | null; password: string | null }) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formRef.current) {
            const formElements = new FormData(formRef.current);
            const formData = Object.fromEntries(formElements.entries());

            setIsProcessing(true);

            console.log(formData);

            const validateOtpBody = {
                OTP: formData.otp,
                emailId: emailId,
                password: password
            }

            console.log(validateOtpBody);

            axios.post('https://referall-backend.onrender.com/auth/validate-otp', validateOtpBody)
                .then(() => {
                    setIsProcessing(false);
                    onClose();
                    alert("Password has been updated successfully!");
                    window.location.reload();
                })
                .catch(error => {
                    setIsProcessing(false);
                    setOtpError(error.response.data);
                });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-11/12 md:w-6/12 lg:w-4/12 rounded-md p-8">
                <h2 className="text-center text-xl font-semibold mb-4">Enter OTP</h2>
                <form ref={formRef} onSubmit={submitHandler}>
                    <input type="text" name="otp" placeholder="Enter OTP" required className="w-full mb-4 p-2 border rounded-md" />
                    {otpError && <div className="text-red-600 text-center mb-4">{otpError}</div>}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-indigo-700 text-white px-4 py-2 rounded-md">Submit</button>
                        <button type="button" onClick={onClose} className="ml-4 px-4 py-2 border rounded-md">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};