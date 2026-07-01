import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoEyeOffOutline, IoPersonCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import AuthService from "../../../Apis/AuthServices/AuthService";
import "./Profile.css";

function ProfileCard() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getProfileData();
    }, []);

    const getProfileData = async () => {
        try {
            const response = await AuthService.getProfile();

            const payload = response?.data || response;
            if (payload?.success || payload?.status === true) {
                setProfile(payload?.data?.data || payload?.data || payload?.profile || null);
            } else {
                toast.error(payload?.message || response?.error || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="top-profile">
            <div className="profile-left">
                <IoPersonCircleOutline className="avatar-icon" />

                <div className="user-info">
                    <div className="userInformation">
                        <h1>
                            {profile
                                ? `${profile.firstName} ${profile.lastName}`
                                : "----"}
                        </h1>

                        <button className="info-btn">
                            <IoEyeOffOutline className="info-btn-icon" />
                            Show Info
                        </button>
                    </div>

                    <div className="last-login">
                        {profile?.emailId || "----"}
                    </div>
                </div>
            </div>

            <div className="details">
                <div className="detail-item">
                    <span className="label">UID :</span>

                    <span className="val">
                        {profile?.uuid || "----"}
                        <FaRegCopy className="copy-icon" />
                    </span>
                </div>

                <div className="detail-item">
                    <span className="label">Referral Code :</span>

                    <span className="val">
                        {profile?.referral_code || "----"}
                        <FaRegCopy className="copy-icon" />
                    </span>
                </div>

                <div className="detail-item">
                    <span className="label">KYC Status :</span>

                    <span className="val kyc-pending">
                        <HiOutlineIdentification className="kyc-icon" />
                        {profile?.kycVerified === 1 ? "Verified" : "Pending"}
                    </span>
                </div>

                <div className="detail-item">
                    <span className="label">Sign-up Time :</span>

                    <span className="val">
                        {profile?.createdAt || "----"}
                    </span>
                </div>

                <div className="detail-item">
                    <span className="label">Last Login IP :</span>

                    <span className="val">
                        {profile?.last_login_ip || "----"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;