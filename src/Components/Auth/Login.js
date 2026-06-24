// import React, { useState } from 'react'
// import "./Login.css";
// import { TiEye } from "react-icons/ti";
// import { IoEyeOffSharp } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import WrathcodeIcon from "../../Icon/WrathcodeIcon.png"
// import { useDispatch } from 'react-redux';
// import AuthService from '../../Apis/AuthServices/AuthService';
// import { toast } from 'react-toastify';
// import { login } from "../../Store/Slice/authSlice";
// import { GoogleLogin } from '@react-oauth/google';


// function Login() {


//     const dispatch = useDispatch();

//     const navigate = useNavigate();

//     const [activeTab, setActiveTab] = useState("email");

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [mobileNumber, setMobileNumber] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);


//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!email || !password) {
//             toast.warning("fill all the required fields")
//             return;
//         }

//         if (password.length < 6) {
//             toast.warning("Password must be atLeast 6 character long")
//             return;
//         }

//         try {
//             setLoading(true);

//             const response = await AuthService.login({
//                 email,
//                 password,
//             })
//             if (response.success) {
//                 dispatch(login(response.data));
//                 toast.success("Login Successfully");
//                 navigate("/Dashboard");
//             } else {
//                 toast.error("Failed to login");
//             }

//         } catch (error) {
//             toast.error(error.response?.data?.message || "something went wrong")

//         } finally {
//             setLoading(false)
//         }

//     };


//     return (
//         <div className='Login'>
//             <div className="login-page">
//                 <div className="login-card">
//                     <div className="logo">
//                         <img src={WrathcodeIcon} alt="logo" />
//                         <span>WRATHCODE</span>
//                     </div>
//                     <h1>
//                         Welcome To Wrathcode <br />
//                         Exchange
//                     </h1>

//                     <div className="tabs">
//                         <button className={activeTab === "email" ? "active" : ""}
//                             onClick={() => setActiveTab("email")}>Email
//                         </button>
//                         <button className={activeTab === "mobile" ? "active" : ""}
//                             onClick={() => setActiveTab("mobile")}>Mobile
//                         </button>
//                     </div>




//                     <div className="form-group">
//                         {activeTab === "email" && (
//                             <input
//                                 type="email"
//                                 value={email}
//                                 placeholder="demo@gmail.com"
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         )}

//                         {activeTab === "mobile" && (
//                             <input
//                                 type="tel"
//                                 placeholder="+91 0000000000"
//                                 value={mobileNumber}
//                                 onChange={(e) => setMobileNumber(e.target.value)}
//                             />
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             placeholder="••••••••"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <span className='showPassword' onClick={() => setShowPassword(!showPassword)}>
//                             {showPassword ? <TiEye /> : <IoEyeOffSharp />}

//                         </span>
//                     </div>

//                     <button
//                         className="login-button"
//                         onClick={handleLogin}
//                         disabled={loading}
//                     >
//                         {loading ? "Logging In..." : "Log In"}
//                     </button>

//                     <p className="divider">
//                         Or continue with
//                     </p>

//                     <button className="social-btn">
//                         <img
//                             src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
//                             alt="google"
//                         />
//                         Sign in with Google
//                     </button>

//                     <p className="register-text">
//                         Do you have an account?
//                         <span> Register</span>
//                     </p>

//                     <a href="/ForgetPassword" className="forgot-link">
//                         Forgot Password?
//                     </a>
//                 </div>
//             </div>

//         </div>
//     )
// };


// export default Login


import React, { useState } from 'react'
import "./Login.css";
import { TiEye } from "react-icons/ti";
import { IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import WrathcodeIcon from "../../Icon/WrathcodeIcon.png"
import { useDispatch } from 'react-redux';
import AuthService from '../../Apis/AuthServices/AuthService';
import { toast } from 'react-toastify';
import { login } from "../../Store/Slice/authSlice";
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("email");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.warning("fill all the required fields")
            return;
        }
        if (password.length < 6) {
            toast.warning("Password must be atLeast 6 character long")
            return;
        }
        try {
            setLoading(true);
            const response = await AuthService.login({ email, password })
            if (response.success) {
                dispatch(login(response.data));
                toast.success("Login Successfully");
                navigate("/Dashboard");
            } else {
                toast.error("Failed to login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "something went wrong")
        } finally {
            setLoading(false)
        }
    };

    const handleGoogleSuccess = async (tokenResponse) => {
        try {
            setLoading(true);
            const googleToken = tokenResponse.access_token;

            console.log("Google Token Received:", googleToken);
            toast.info("Google Token Received");
            navigate("/Dashboard");

        } catch (error) {
            toast.error("Google Authentication Failed Server Side");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        toast.error("Google Sign-In failed. Please try again.");
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: handleGoogleError,
    });

    return (
        <div className='Login'>
            <div className="login-page">
                <div className="login-card">
                    <div className="logo">
                        <img src={WrathcodeIcon} alt="logo" />
                        <span>WRATHCODE</span>
                    </div>
                    <h1>
                        Welcome To Wrathcode <br />
                        Exchange
                    </h1>

                    <div className="tabs">
                        <button className={activeTab === "email" ? "active" : ""}
                            onClick={() => setActiveTab("email")}>Email
                        </button>
                        <button className={activeTab === "mobile" ? "active" : ""}
                            onClick={() => setActiveTab("mobile")}>Mobile
                        </button>
                    </div>

                    <div className="form-group">
                        {activeTab === "email" && (
                            <input
                                type="email"
                                value={email}
                                placeholder="demo@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        )}

                        {activeTab === "mobile" && (
                            <input
                                type="tel"
                                placeholder="+91 0000000000"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className='showPassword' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <TiEye /> : <IoEyeOffSharp />}
                        </span>
                    </div>

                    <button
                        className="login-button"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>

                    <p className="divider">
                        Or continue with
                    </p>

                    <button className="social-btn" onClick={() => loginWithGoogle()} disabled={loading}>
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                            alt="google"
                        />
                        Sign in with Google
                    </button>

                    <button className="social-btn" disabled={loading}>
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg"
                            alt="passkey"
                            style={{ filter: "invert(1)" }}
                        />
                        Sign in with Passkey
                    </button>

                    <p className="register-text">
                        Do you have an account?
                        <span> Register</span>
                    </p>

                    <a href="/ForgetPassword" className="forgot-link">
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Login;