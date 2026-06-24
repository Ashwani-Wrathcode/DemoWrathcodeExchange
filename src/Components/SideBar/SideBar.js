import React, { useState } from "react";
import "./SideBar.css";
import { RiHome2Line } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdHistory } from "react-icons/md";



import DashboardContent from "../Dashboard/DashboardContent";
import Security from "../Security/Security";
import QuickSwap from "../QuickSwap/QuickSwap";
import Notification from "../Notification/Notification";
import Assets from "../Assets/Assets";
import Order from "../Order/Order";
import Earning from "../Earning/Earning";
import ActivityLogs from "../Activity/ActivityLogs";
import KycVerification from "../Account/KycVerification/KycVerification";
import Support from "../Account/Support/Support"

export default function SideBar() {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [showAccountChild, setShowAccountChild] = useState(false);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Logout Successfully");
    };

    return (
        <div className="main-containorSide">



            <div className="sideBar-main">
                {/* Sidebar */}
                <div className="side-content">

                    <button
                        className={activeTab === "Dashboard" ? "active" : ""}
                        onClick={() => setActiveTab("Dashboard")}
                    >
                        <span><RiHome2Line /></span>  Dashboard
                    </button>



                    <button
                        className={activeTab === "Assets" ? "active" : ""}
                        onClick={() => setActiveTab("Assets")}
                    >
                        <span><FaWallet /></span>  Assets
                    </button>


                    <button
                        className={activeTab === "Order" ? "active" : ""}
                        onClick={() => setActiveTab("Order")}
                    >
                        <span><RiFileList3Line />
                        </span> Orders
                    </button>
                    <button
                        className={
                            activeTab === "KycVerification" || activeTab === "support"
                                ? "active"
                                : ""
                        }
                        onClick={() => setShowAccountChild(!showAccountChild)}
                    >
                        <span>
                            <MdOutlineManageAccounts />
                        </span>
                        Account ▼
                    </button>

                    {showAccountChild && (
                        <button
                            className={activeTab === "KycVerification" ? "active" : ""}
                            onClick={() => setActiveTab("KycVerification")}
                            style={{ paddingLeft: "35px" }}
                        >
                            KYC Verification
                        </button>
                    )}


                    {showAccountChild && (
                        <button
                            className={activeTab === "support" ? "active" : ""}
                            onClick={() => setActiveTab("support")}
                            style={{ paddingLeft: "35px" }}
                        >
                            Support
                        </button>
                    )}
                    <button
                        className={activeTab === "Earning" ? "active" : ""}
                        onClick={() => setActiveTab("Earning")}
                    >
                        <span><TbReportMoney />
                        </span>Earning
                    </button>
                    <button
                        className={activeTab === "Security" ? "active" : ""}
                        onClick={() => setActiveTab("Security")}
                    >
                        <span><MdOutlineSystemSecurityUpdateGood />
                        </span>Security
                    </button>
                    <button
                        className={activeTab === "QuickSwap" ? "active" : ""}
                        onClick={() => setActiveTab("QuickSwap")}
                    >
                        <span><BsArrowUpRightCircleFill />
                        </span>Quick Swap
                    </button>

                    <button className={activeTab === "notification" ? "active" : ""}

                        onClick={() => setActiveTab("notification")}>
                        <span><IoMdNotificationsOutline />
                        </span>Notification
                    </button>

                    <button className={activeTab === "activityLog" ? "active" : ""}

                        onClick={() => setActiveTab("activityLog")}>
                        <span><MdHistory />
                        </span> ActivityLogs
                    </button>

                    <button onClick={handleLogOut}>Logout</button>
                </div>

                {/* Content */}
                <div className="side-bar">
                    {activeTab === "Dashboard" && <DashboardContent />}
                    {activeTab === "Assets" && <Assets />}
                    {activeTab === "Order" && <Order />}
                    {/* {activeTab === "Account" && <Account />} */}
                    {activeTab === "Earning" && <Earning />}
                    {activeTab === "Security" && <Security />}
                    {activeTab === "QuickSwap" && <QuickSwap />}
                    {activeTab === "notification" && <Notification />}
                    {activeTab === "activityLog" && <ActivityLogs />}
                    {activeTab === "KycVerification" && <KycVerification />}
                    {activeTab === "support" && <Support />}

                </div>
            </div>
        </div>
    );
}