import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoEyeOffOutline, IoPersonCircleOutline } from "react-icons/io5";
import "./Profile.css";

function ProfileCard() {
    return (
        <div className="top-profile">
            <div className="profile-left">
                <IoPersonCircleOutline className="avatar-icon" />

                <div className="user-info">
                    <div className="userInformation">
                        <h1>----</h1>

                        <button className="info-btn">
                            <IoEyeOffOutline className="info-btn-icon" />
                            Show Info
                        </button>
                    </div>

                    <div className="last-login">
                        Last Login: ----
                    </div>
                </div>
            </div>

            <div className="details">
                <div className="detail-item">
                    <span className="label">UID :</span>

                    <span className="val">
                        ---- <FaRegCopy className="copy-icon" />
                    </span>
                </div>

                <div className="detail-item">
                    <span className="label">Referral Code :</span>

                    <span className="val">
                        ---- <FaRegCopy className="copy-icon" />
                    </span>
                </div>

                <div className="detail-item">
                    <span className="label">KYC Status</span>

                    <span className="val kyc-pending">
                        <HiOutlineIdentification className="kyc-icon" />
                        KYC Pending
                    </span>
                </div>

                <div className="detail-item">
                    <span className="label">Sign-up Time</span>

                    <span className="val">----</span>
                </div>

                <div className="detail-item">
                    <span className="label">Last Login IP</span>

                    <span className="val">----</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;