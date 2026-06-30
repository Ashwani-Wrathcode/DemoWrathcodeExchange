import React, { useState } from "react";
import "./SignUp.css";

import { TiEye } from "react-icons/ti";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

import WrathcodeIcon from "../../Icon/WrathcodeIcon.png";
import cryptoMobile from "../../Icon/cryptoMobile.png";
import coinCrypto from "../../Icon/coinCrypto.png";
import decorationSide from "../../Icon/decorationSide.png";
import decorationImage from "../../Icon/decorationImage.png";
import AuthService from "../../Apis/AuthServices/AuthService";
import { buildSignupPayload } from "./signupPayload";

function SignUp() {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("email");
    const [showVerification, setShowVerification] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [checked, setChecked] = useState(false);


    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mobileRegex =
        /^[6-9]\d{9}$/;

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            if (activeTab === "email") {
                if (!email || !password) {
                    toast.warning("Please fill all required fields");
                    return;
                }

                if (!emailRegex.test(email)) {
                    toast.warning("Please enter a valid email");
                    return;
                }
            }

            if (activeTab === "mobile") {
                if (!mobile || !password) {
                    toast.warning("Please fill all required fields");
                    return;
                }

                if (!mobileRegex.test(mobile)) {
                    toast.warning("Please enter a valid mobile number");
                    return;
                }
            }

            if (password.length < 6) {
                toast.warning("Password must be at least 6 characters long");
                return;
            }

            if (!checked) {
                toast.warning("Please accept the terms and conditions");
                return;
            }

            const payload = buildSignupPayload({
                activeTab,
                email,
                mobile,
                password,
                inviteCode,
                firstName,
                lastName,
                countryCode,
            });

            const response = await AuthService.SignUp(payload);

            if (response?.data?.success) {
                toast.success("Registration Successful");

                setShowVerification(true);
            }
        } catch (error) {
            console.log(error);
            console.log(error);

            toast.error(error?.response?.data?.message || "Registration Failed");
        }
    };


    const handleSendOtp = async () => {
        try {
            const payload = {
                email,
                mobile,
            };

            const response = await AuthService.SendOtp(payload);

            if (response?.data?.success) {
                toast.success("OTP Sent Successfully");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to Send OTP");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            if (!otp) {
                toast.warning(
                    "Please enter OTP"
                );
                return;
            }

            const payload = {
                email,
                mobile,
                otp,
            };

            const response = await AuthService.VerifyOtp(payload);

            if (response?.data?.success) {
                toast.success("Account Verified Successfully");

                setShowVerification(false);

                navigate("/Login");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Invalid OTP");
        }
    };
    return (
        <div className="register-main">
            <div className="register-card">
                {/* Left Side */}
                <div className="register-left">
                    <div className="reward-text">
                        <h2>
                            Up to <span>100 USD</span>
                        </h2>
                        <h1>Sign Up Rewards</h1>
                    </div>

                    <div className="register-img">
                        <img
                            src={cryptoMobile}
                            alt="mobile"
                            className="mobile-image"
                        />

                        <img
                            src={coinCrypto}
                            alt="coin1"
                            className="coin1"
                        />

                        <img
                            src={decorationSide}
                            alt="coin2"
                            className="coin2"
                        />

                        <img
                            src={decorationImage}
                            alt="coin3"
                            className="coin3"
                        />
                    </div>

                    <div className="trust-badge">
                        <span>🛡️</span> No.1 In Trading Volume & Customer Asset
                    </div>
                </div>

                {/* Right Side */}
                <div className="register-form">

                    <div className="logo">
                        <img src={WrathcodeIcon} alt="logo" />
                        <span>WRATHCODE</span>
                    </div>

                    <h1>
                        Register to Wrathcode Exchange

                    </h1>

                    {/* Tabs */}
                    <div className="tabs">
                        <button
                            className={activeTab === "email" ? "active" : ""}
                            onClick={() => setActiveTab("email")}
                        >
                            Email
                        </button>

                        <button
                            className={activeTab === "mobile" ? "active" : ""}
                            onClick={() => setActiveTab("mobile")}
                        >
                            Mobile
                        </button>
                    </div>

                    {/* Email/Mobile Input */}
                    {activeTab === "email" ? (
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Please enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="form-group">
                            <input
                                type="tel"
                                placeholder="Please enter your mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Country Code"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group password-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Please enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span
                            className="showPassword"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? <TiEye /> : <IoEyeOffSharp />}


                        </span>
                    </div>

                    {/* Invite Code */}
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Invite Code (Optional)"
                            value={inviteCode}
                            onChange={(e) =>
                                setInviteCode(e.target.value)
                            }
                        />
                    </div>

                    {/* Checkbox */}
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={checked}
                            onChange={() =>
                                setChecked(!checked)
                            }
                        />

                        <label htmlFor="terms">
                            I agree to Wrathcode Exchange
                            <span> Terms and Use</span>
                        </label>
                    </div>


                    <button
                        className="register-btn"
                        onClick={handleRegister}
                    >
                        Register
                    </button>


                    <button className="google-btn">
                        <FcGoogle className="google-icon" />
                        Sign up with Google
                    </button>

                    <p className="register-text">
                        Already have an account? <span onClick={() => navigate("/Login")}>Login</span>
                    </p>

                </div>
            </div>

            {
                showVerification && (
                    <div className="verification-overlay">
                        <div className="verification-popup">

                            <div className="logo">
                                <img src={WrathcodeIcon} alt="" />
                                <span>WRATHCODE</span>
                            </div>
                            <div className="image-lockVerify">
                                <img src="https://demoexchange.wrathcode.com/images/security_shield.svg" />
                            </div>

                            <h2>Verify Your Account</h2>
                            <p>Make your account 100% secure against unauthorized logins.</p>

                            <h1>
                                Registered {activeTab === "email" ? "Email" : "Mobile"} :
                                <strong> {email || mobile}</strong>
                            </h1>

                            <div className="otp-box">
                                <input
                                    type="text"
                                    placeholder="Enter verification code"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />

                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                >
                                    GET OTP
                                </button>
                            </div>

                            <button
                                className="verify-btn"
                                type="button"
                                onClick={handleVerifyOtp}
                            >
                                Verify Account
                            </button>

                            <button
                                className="close-btn"
                                type="button"
                                onClick={() => setShowVerification(false)}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default SignUp;