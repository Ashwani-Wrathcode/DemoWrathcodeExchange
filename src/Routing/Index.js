import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../Components/LandingPage/Landing";
import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/SignUp";
import Dashboard from "../Components/Dashboard/Dashboard";
import SideBar from "../Components/SideBar/SideBar";
import Assets from "../Components/Assets/Assets";
import ForgetPassword from "../Components/Auth/ForgetPassword";
import KycVerification from "../Components/Account/KycVerification/KycVerification";
import Support from "../Components/Account/Support/Support";
import Referral from "../Components/Referral/Referral";
<<<<<<< Updated upstream
import SpotTrade from "../Components/TradePages/SpotTrade/SpotTrade";
=======
import SpotTrade from "../Components/Trading/SpotTrade/SpotTrade";
>>>>>>> Stashed changes



export default function Index() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/Landing" replace />} />

            <Route path="/Landing" element={<Landing />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/SideBar" element={<SideBar />} />
            <Route path="/Assets" element={<Assets />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/KycVerification" element={<KycVerification />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/Referral" element={<Referral />} />
            <Route path="/SpotTrade" element={<SpotTrade />} />
<<<<<<< Updated upstream
            <Route path="*" element={<Navigate to="/Landing" replace />} />
=======

>>>>>>> Stashed changes
        </Routes>
    );
}