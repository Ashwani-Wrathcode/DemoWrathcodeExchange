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
    const [showVerification, setShowVerification] = useState(false);
    const [otp, setOtp] = useState("");
    const [loginData, setLoginData] = useState(null);
    const [isActivation, setIsActivation] = useState(false);


    const handleReferral = () => {
        navigate("/Referral");
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginId = activeTab === "email" ? email : mobileNumber;

        if (!loginId || !password) {
            toast.warning("fill all the required fields")
            return;
        }
        if (password.length < 6) {
            toast.warning("Password must be atLeast 6 character long")
            return;
        }
        try {
            setLoading(true);
            const response = await AuthService.login({ email_or_phone: loginId, password, token: "" });
            console.log("Login API Response:", response);

            if (response.success) {
                const token = response.data?.token || response.token;

                if (token) {
                    localStorage.setItem("token", token);
                }

                setLoginData(response.data || response);
                setIsActivation(false);
                setShowVerification(true);
            } else {
                if (response.message && response.message.includes("not been activated yet")) {
                    toast.warning(response.message);
                    setIsActivation(true);
                    setShowVerification(true);
                } else {
                    toast.error(response.error || response.message || "Failed to login");
                }
            }
        } catch (error) {
            console.error("Login catch error:", error);
            const errData = error.response?.data;
            if (errData && errData.message && errData.message.includes("not been activated yet")) {
                toast.warning(errData.message);
                setIsActivation(true);
                setShowVerification(true);
            } else {
                toast.error(errData?.message || "something went wrong")
            }
        } finally {
            setLoading(false)
        }
    };

    const handleSendOtp = async () => {
        try {
            const payload = {
                email_or_phone: activeTab === "email" ? email : mobileNumber,
                type: activeTab === "email" ? 1 : 2,
            };
            const response = await AuthService.sendOtpLogin(payload);

            if (response?.success) {
                toast.success("OTP Sent Successfully");
            } else {
                toast.error(response?.error || "Failed to Send OTP");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to Send OTP");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            if (!otp) {
                toast.warning("Please enter OTP");
                return;
            }

            const payload = {
                email_or_phone: activeTab === "email" ? email : mobileNumber,
                registeredBy: activeTab,
                type: activeTab === "email" ? 1 : 2,
                otp: Number(otp),
                verification_code: Number(otp),
            };
            console.log("verifyOtpLogin payload:", payload);
            const response = await AuthService.verifyOtpLogin(payload);

            if (response?.success) {
                toast.success("Account Verified Successfully");
                setShowVerification(false);
                if (loginData) {
                    dispatch(login(loginData));
                }
                toast.success("Login Successfully");
                navigate("/Dashboard");
            } else {
                toast.error(response?.error || "Invalid OTP");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Invalid OTP");
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
                        <button type="button" className={activeTab === "email" ? "active" : ""}
                            onClick={() => setActiveTab("email")}>Email
                        </button>
                        <button type="button" className={activeTab === "mobile" ? "active" : ""}
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
                        type="button"
                        className="login-button"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>

                    <p className="divider">
                        Or continue with
                    </p>

                    <button type="button" className="social-btn" onClick={() => loginWithGoogle()} disabled={loading}>
                        <img
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                            alt="google"
                        />
                        Sign in with Google
                    </button>

                    <button type="button" className="social-btn" disabled={loading}>
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

                    <button type="button" onClick={handleReferral}>Referral</button>






                </div>
            </div>

            {showVerification && (
                <div className="verification-overlay">
                    <div className="verification-popup">
                        <div className="logo">
                            <img src={WrathcodeIcon} alt="" />
                            <span>WRATHCODE</span>
                        </div>
                        <div className="image-lockVerify">
                            <img src="https://demoexchange.wrathcode.com/images/security_shield.svg" alt="Security shield" />
                        </div>

                        <h2>Verify Your Account</h2>
                        <p>Make your account 100% secure against unauthorized logins.</p>

                        <h1>
                            Login {activeTab === "email" ? "Email" : "Mobile"} :
                            <strong>
                                {activeTab === "mobile" ? mobileNumber : email}
                            </strong>
                        </h1>

                        <div className="otp-box">
                            <input
                                type="text"
                                placeholder="Enter verification code"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button type="button" onClick={handleSendOtp}>
                                GET OTP
                            </button>
                        </div>

                        <button className="verify-btn" type="button" onClick={handleVerifyOtp}>
                            Verify Account
                        </button>

                        <button className="close-btn" type="button" onClick={() => setShowVerification(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Login;