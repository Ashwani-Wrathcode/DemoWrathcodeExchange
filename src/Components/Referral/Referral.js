import React, { useState, useEffect } from 'react';
import './Referral.css';
import robotImg from '../../Icon/robot.png';
import {
    FaRegCopy, FaChevronLeft, FaChevronRight,
    FaUserPlus, FaLink, FaCoins, FaRegQuestionCircle,
    FaUserAlt, FaGift, FaTrophy, FaCheck, FaSearch, FaBoxOpen
} from 'react-icons/fa';

import AuthService from "../../Apis/AuthServices/AuthService";
import { toast } from "react-toastify";

export default function Referral() {


    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    const [referralData, setReferralData] = useState([]);
    const referralCode = referralData?.referralCode;
    const referralLink = referralData?.referralLink;

   const handleCopy = (text, setCopied) => {

    if (!text) {
        toast.error("Nothing to copy");
        return;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
        setCopied(false);
    }, 2000);
};



    useEffect(() => {
        getReferralData();
    }, []);


    const getReferralData = async () => {
        try {
            const response = await AuthService.getReferralHistory();

            if (response.data?.success) {
                setReferralData(response.data.data);
            } else {
                toast.error(response.data?.message || "Failed to fetch referral data");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching referral data");
        }
    };


    return (
        <div className="referral-page-container">
            {/* <div className="level-rules-container">
                <span className="level-rules-text">Level Rules <FaRegQuestionCircle /></span>
            </div> */}

            <div className="referral-hero-section">
                <div className="referral-hero-left">
                    <h2 className="exciting-reward-title">Exciting Referral Reward</h2>
                    <h1 className="earn-usdt-title">Earn 1 USDT for every friend<br />you invite!</h1>
                    <p className="referral-description">
                        Invite a friend to Exchange and Earn 0.5 USDT on<br />
                        Referral Sign Up and 0.5 USDT after completing their KYC.
                    </p>

                    <div className="referral-code-box">
                        <div className="code-row">
                            <span className="row-label"><FaLink className="row-icon" /> Referral link:</span>
                            <span className="row-value">{referralLink}</span>
                            <button className="copy-icon-btn" onClick={() => handleCopy(referralLink, setCopiedLink)}>
                                {copiedLink ? <FaCheck /> : <FaRegCopy />}
                            </button>
                        </div>
                        <div className="code-row">
                            <span className="row-label"><FaUserAlt className="row-icon" /> Referral Code:</span>
                            <span className="row-value">{referralCode}</span>
                            <button className="copy-icon-btn" onClick={() => handleCopy(referralCode, setCopiedCode)}>
                                {copiedCode ? <FaCheck /> : <FaRegCopy />}
                            </button>
                        </div>
                    </div>

                    <button className="sign-up-now-btn">Sign Up Now</button>
                </div>

                <div className="referral-hero-right">
                    <div className="carousel-container">
                        <FaChevronLeft className="carousel-arrow left" />

                        <div className="carousel-card side-card left-side"></div>

                        <div className="carousel-card center-card">
                            <img src={robotImg} alt="Robot" className="carousel-robot-img" />
                            <h3 className="card-title">Rising</h3>
                            <div className="card-features">
                                <div className="feature-item">
                                    <div className="feature-icon"><span className="percentage-icon">40<small>%</small></span></div>
                                    <h4>High Commissions</h4>
                                    <p>Calculator &gt;</p>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon"><FaTrophy /></div>
                                    <h4>Special Events</h4>
                                    <p>Up to $20,000 in<br />rewards</p>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon"><FaGift /></div>
                                    <h4>Gift Privilege</h4>
                                    <p>Gold bars awaits</p>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-card side-card right-side"></div>

                        <FaChevronRight className="carousel-arrow right" />
                    </div>
                </div>
            </div>

            <div className="how-to-refer-section">
                <h2 className="how-to-title">How to Refer and Earn Rewards</h2>

                <div className="steps-container">
                    <div className="step-item">
                        <div className="step-icon-wrapper"><FaUserPlus /></div>
                        <h4>Invite Friends to Sign Up</h4>
                        <p>Send your referral code and invite friends<br />to sign up for a Exchange account</p>
                    </div>

                    <div className="step-divider"></div>

                    <div className="step-item">
                        <div className="step-icon-wrapper"><FaLink /></div>
                        <h4>Automatic Linking</h4>
                        <p>Once your referees complete sign-up,<br />their accounts will be automatically linked<br />to you</p>
                    </div>

                    <div className="step-divider"></div>

                    <div className="step-item">
                        <div className="step-icon-wrapper"><FaCoins /></div>
                        <h4>Friends Trade, You Earn<br />Rewards</h4>
                        <p>When your referees start trading, you will<br />automatically receive commission<br />rewards</p>
                    </div>
                </div>

                {/* <div className="event-details-link">
                    Event Details &gt;
                </div> */}
            </div>

            <div className="more-events-section">
                <h2 className="section-title">More Referral Events</h2>
                <div className="events-carousel-wrapper">
                    <div className="events-cards-container">
                        <div className="event-card">
                            <div className="event-card-content">
                                <h3>Earn 60 USDT !</h3>
                                <p>Invite Friends to Join Exchange</p>
                                <button className="join-now-btn">Join Now</button>
                            </div>
                            <div className="event-card-image">
                                {/* Placeholder for image */}
                                <FaGift className="placeholder-icon" />
                            </div>
                        </div>
                        <div className="event-card">
                            <div className="event-card-content">
                                <h3>Invite to Earn 500 USDT</h3>
                                <p>Win rewards with friends</p>
                                <button className="join-now-btn">Join Now</button>
                            </div>
                            <div className="event-card-image">
                                {/* Placeholder for image */}
                                <FaCoins className="placeholder-icon" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="carousel-dots">
                    <span className="dot active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>

            <div className="recent-transactions-section">
                <div className="transactions-header">
                    <h2 className="section-title">Recent Transactions</h2>
                    <div className="search-icon-wrapper">
                        <FaSearch />
                    </div>
                </div>

                <div className="transactions-table-container">
                    <table className="transactions-table">

    <thead>
        <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Swapping Currencies</th>
            <th>Pay Amount</th>
            <th>Get Amount</th>
            <th>Swapping Fee</th>
            <th>Conversion Rate</th>
            <th>Status</th>
        </tr>
    </thead>

    <tbody>
        {referralData?.referralHistory?.length > 0 ? (
            referralData.referralHistory.map((item, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.currency}</td>
                    <td>{item.payAmount}</td>
                    <td>{item.getAmount}</td>
                    <td>{item.fee}</td>
                    <td>{item.rate}</td>
                    <td>{item.status}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="8" className="empty-state-container">
    <FaBoxOpen className="empty-box-icon" />
    <p>No Data Available</p>
</td>
            </tr>
        )}
    </tbody>

</table>    

                </div>
            </div>
        </div>
    );
}
