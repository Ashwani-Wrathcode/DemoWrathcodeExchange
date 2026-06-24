import React, { useState } from "react";
import "./ForgetPassword.css";
import AuthService from "../../Apis/AuthServices/AuthService";
import { toast } from "react-toastify";
import { Link } from "react-router";


const ForgotPassword = () => {
    const [activeTab, setActiveTab] = useState("email");

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [phoneOtp, setPhoneOtp] = useState("");

    // Send OTP
    const handleSendOtp = async () => {
        if (!email.trim()) {
            toast.error("Please enter email");
            return;
        }

        try {
            setOtpLoading(true);

            const payload = {
                email,
            };

            const response = await AuthService.ForgotPasswordOtp(payload);

            console.log(response);

            if (response?.data?.success) {
                toast.success(response.data.message);
            } else {
                toast.error("OTP sent to failed");
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to send OTP"
            );
        } finally {
            setOtpLoading(false);
        }
    };

    // Reset Password
    const handleForgotPassword = async () => {
        if (!email.trim()) {
            toast.error("Please enter email");
            return;
        }

        if (!otp.trim()) {
            toast.error("Please enter OTP");
            return;
        }

        if (!newPassword.trim()) {
            toast.error("Please enter new password");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                email,
                otp,
                password: newPassword,
            };

            const response =
                await AuthService.ResetPassword(payload);

            if (response?.data?.success) {
                toast.success(response.data.message);
            } else {
                toast.success("Password reset successfully");
            }

            setEmail("");
            setOtp("");
            setNewPassword("");
        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Password reset failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-card">
                <h1>Forgot Password</h1>

                <div className="tabs">
                    <span
                        className={activeTab === "email" ? "active" : ""}
                        onClick={() => setActiveTab("email")}
                    >
                        Email
                    </span>

                    <span
                        className={activeTab === "phone" ? "active" : ""}
                        onClick={() => setActiveTab("phone")}
                    >
                        Phone
                    </span>
                </div>

                {activeTab === "email" && (
                    <>
                        <div className="input-group">
                            <label>Email*</label>

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                Email Verification Code*
                            </label>

                            <div className="otp-box">
                                <input
                                    type="text"
                                    placeholder="Enter Code"
                                    value={otp}
                                    onChange={(e) =>
                                        setOtp(e.target.value)
                                    }
                                />

                                <button
                                    type="button"
                                    className="otp-btn"
                                    onClick={handleSendOtp}
                                    disabled={otpLoading}
                                >
                                    {otpLoading
                                        ? "Sending..."
                                        : "GET OTP"}
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>New Password*</label>

                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </>
                )}



                <button
                    className="forgot-btn"
                    onClick={handleForgotPassword}
                    disabled={loading}
                >
                    {loading
                        ? "Please Wait..."
                        : "Forgot Password"}
                </button>

                <p className="back-login">
                    Back to <Link href="/Login" > Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;