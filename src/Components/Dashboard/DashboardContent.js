import React, { useState } from "react";
import "./Dashboard.css";
import { useEffect } from "react";
import { FaRegCopy, FaRegStar } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbUserPlus } from "react-icons/tb";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoEyeOffOutline, IoEyeOutline, IoPersonCircleOutline } from "react-icons/io5";
import { BsDroplet } from "react-icons/bs";
import increase from "../../Icon/increase.png";
import add from "../../Icon/add.png";
import socket from "../../Socket/Socket"
import ProfileCard from "../../Components/Dashboard/Profile/ProfileCard";
import MarketCard from "../Dashboard/Market/MarketCard";

function Dashboard() {

    const [marketUpdate, setMarketUpdate] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [activeTab, setActiveTab] = useState("New Listing");

    const [showPortfolio, setShowPortfolio] = useState(false);

    useEffect(() => {

        const handleMarketData = (data) => {
            console.log("Data :", data);

            const allPairs = data?.pairs || [];

            console.log("pairs: ", allPairs);

            console.log("allPairs:", allPairs.length);
            setPairs(allPairs);

            setMarketUpdate(allPairs.slice(0, 4));
        };

        socket.on("market:update", handleMarketData)

        return () => {
            socket.off("market:update", handleMarketData)
        };
    }, []);


    useEffect(() => {


        let filterData = [];

        switch (activeTab) {
            case "Top Gainers":
                filterData = [...pairs].sort(
                    (a, b) => b.change_percentage - a.change_percentage
                );
                break;

            case "New Listing":
                filterData = [...pairs].sort(
                    (a, b) =>
                        new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;

            case "Hot":
                filterData = [...pairs].sort(
                    (a, b) => b.volume - a.volume
                );
                break;

            case "Trending":
                filterData = [...pairs].sort(
                    (a, b) => b.volumeQuote - a.volumeQuote
                );
                break;

            case "Favorite":
                filterData = [];
                break;

            default:
                filterData = pairs;
        }
        setTableData(filterData);

    }, [pairs, activeTab])

    return (
        <div className="dashboard">
            <ProfileCard />
           

            {/* Market Cards */}
            <MarketCard marketUpdate={marketUpdate} />

            <h2 className="heading section-title">
                Start by depositing some crypto
            </h2>

            <div className="portfolio-section">
                <div className="portfolio-info">
                    <h3>Estimated Portfolio</h3>
                    <p className="portfolio-val">
                        {showPortfolio ? "12,450.00" : "********"} USD <span>{showPortfolio ? "19.5" : "********"} BNB</span>
                        <span className="eye-toggle" onClick={() => setShowPortfolio(!showPortfolio)}>
                            {showPortfolio ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </span>
                    </p>
                </div>

                <div className="portfolio-buttons">
                    <button className="deposit-btn">Deposit</button>
                    <button className="withdraw-btn">Withdraw</button>
                </div>
            </div>


            <div className="content">


                <div className="table-section">
                    <div className="table-header-row">
                        <h2>Spot Markets</h2>
                        <span className="more-link">More <MdKeyboardArrowRight /></span>
                    </div>

                    <div className="spot-tabs">
                        <span
                            className={`spot-tab ${activeTab === "Favorite" ? "active" : ""}`}
                            onClick={() => setActiveTab("Favorite")}
                        >
                            Favorite
                        </span>

                        <span
                            className={`spot-tab ${activeTab === "Trending" ? "active" : ""}`}
                            onClick={() => setActiveTab("Trending")}
                        >
                            Trending
                        </span>

                        <span
                            className={`spot-tab ${activeTab === "Hot" ? "active" : ""}`}
                            onClick={() => setActiveTab("Hot")}
                        >
                            Hot
                        </span>

                        <span
                            className={`spot-tab ${activeTab === "New Listing" ? "active" : ""}`}
                            onClick={() => setActiveTab("New Listing")}
                        >
                            New Listing
                        </span>

                        <span
                            className={`spot-tab ${activeTab === "Top Gainers" ? "active" : ""}`}
                            onClick={() => setActiveTab("Top Gainers")}
                        >
                            Top Gainers
                        </span>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Coin</th>
                                <th>Price</th>
                                <th>24H High</th>
                                <th>24H Change</th>
                                <th>Trade</th>
                            </tr>
                        </thead>

                        <tbody>


                            {tableData.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <div className="coin-col">
                                            <FaRegStar className="star-icon" />

                                            <div className="coin-names">
                                                <span className="coin-symbol">
                                                    {item.base_currency}
                                                </span>

                                                <span className="coin-full">
                                                    {item.base_currency_fullname}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="price-col">
                                            <span className="price-val">
                                                {item.buy_price}
                                            </span>

                                            <span className="price-cur">
                                                {item.quote_currency}
                                            </span>
                                        </div>
                                    </td>

                                    <td>{item.high}</td>

                                    <td
                                        className={
                                            item.change_percentage < 0
                                                ? "red-text"
                                                : "green-text"
                                        }
                                    >
                                        {item.change_percentage}%
                                    </td>

                                    <td>
                                        <button className="trade-link">
                                            Trade
                                        </button>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>

                <div className="right-cards">
                    <div className="side-cards relative-card">
                        <div className="side-cards-header">
                            <h3>Invite Friends for Rewards</h3>
                            <img src={add} alt="addUser" />
                        </div>
                        <p>
                            Invite your friends to join, expand your community and earn<br />amazing rewards for every successful referral.
                        </p>

                    </div>

                    <div className="side-cards relative-card">
                        <div className="side-cards-header">
                            <h3>Deposit crypto with one-click</h3>
                            <img src={increase} alt="user" />
                        </div>
                        <p>
                            Deposit crypto instantly with one-click and get fast access to digital assets without complex steps or delays.
                        </p>


                    </div>


                </div>
            </div>
        </div>
    );
}

export default Dashboard;


