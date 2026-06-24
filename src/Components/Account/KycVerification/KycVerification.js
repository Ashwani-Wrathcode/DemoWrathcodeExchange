import React from "react";
import "./KycVerification.css";
import { FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import kycVerify from "../../../Icon/kycVerify.png";
import { toast } from "react-toastify";
import kycEllipse from "../../../Icon/kycEllipse.png";
import AuthService from "../../../Apis/AuthServices/AuthService";
import { useState } from "react";



const KycVerification = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [country, setCountry] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [showPersonal, setShowPersonal] = useState(false);
    const [showIncomePopup, setShowIncomePopup] = useState(false);
    const [selfieVerify, setSelfieVerify] = useState(false)
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [loading, setLoading] = useState(false);


    const [showSelfiPopUp, setshowSelfiPopUp] = useState(false)

    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [panImage, setPanImage] = useState(null);
    const [selfieImage, setSelfieImage] = useState(null);
    const [panNumber, setPanNumber] = useState("");
    const [personalDetails, setPersonalDetails] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "Male",
        address: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPersonalDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!personalDetails.firstName.trim()) {
            toast.error("Please enter first name");
            return;
        }

        if (personalDetails.firstName.trim().length < 3) {
            toast.error("First Name should be at least 3 characters");
            return;
        }

        if (!personalDetails.lastName.trim()) {
            toast.error("Please enter last name");
            return;
        }

        if (personalDetails.lastName.trim().length < 3) {
            toast.error("Last Name should be at least 3 characters");
            return;
        }

        if (!personalDetails.dob) {
            toast.error("Please select Date of Birth");
            return;
        }

        if (!personalDetails.address.trim()) {
            toast.error("Please enter your address");
            return;
        }

        if (personalDetails.address.trim().length < 10) {
            toast.error("Address should be minimum 10 characters");
            return;
        }

        if (!personalDetails.city.trim()) {
            toast.error("Please enter your city");
            return;
        }

        if (!personalDetails.state.trim()) {
            toast.error("Please enter your state");
            return;
        }

        if (!personalDetails.zipCode.trim()) {
            toast.error("Please enter your zip code");
            return;
        }

        if (!frontImage) {
            toast.error("Please upload front image document");
            return;
        }

        if (!backImage) {
            toast.error("Please upload back image document");
            return;
        }

        if (!panNumber.trim()) {
            toast.error("Please enter PAN number");
            return;
        }

        if (!panImage) {
            toast.error("Please upload PAN image document");
            return;
        }

        if (!selfieImage) {
            toast.error("Please upload selfie image");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("firstName", personalDetails.firstName);
            formData.append("lastName", personalDetails.lastName);
            formData.append("dob", personalDetails.dob);
            formData.append("gender", personalDetails.gender);
            formData.append("address", personalDetails.address);
            formData.append("city", personalDetails.city);
            formData.append("state", personalDetails.state);
            formData.append("zipCode", personalDetails.zipCode);

            formData.append("country", country);
            formData.append("documentType", selectedId);
            formData.append("documentNumber", aadhaarNumber);
            formData.append("panNumber", panNumber);

            formData.append("frontImage", frontImage);
            formData.append("backImage", backImage);
            formData.append("panImage", panImage);
            formData.append("selfieImage", selfieImage);

            const response = await AuthService.KycVerify(formData);

            console.log(response.data);

            toast.success(response.data.message || "KYC Submitted Successfully");

            setShowReviewPopup(false);

        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }

    };


    return (
        <div className="kyc-container">
            <h1 className="kyc-heading">KYC Verification</h1>

            {/* Top Card */}
            <div className="kyc-top-card">
                <div className="kyc-left">
                    <h3>KYC</h3>

                    <p>
                        Finish your KYC in just a few minutes and enjoy a seamless
                        experience. Submit your basic details once and get instant access
                        to withdrawals, rewards and every feature without any delays or
                        limitations.
                    </p>

                    <h4>KYC Verification Requirements</h4>

                    <div className="requirement">
                        <FaStar /> ID Document
                    </div>

                    <div className="requirement">
                        <FaStar /> Tax Document
                    </div>

                    <div className="requirement">
                        <FaStar /> Live Selfie (Camera Required)
                    </div>

                    <button
                        className="verify-btn"
                        onClick={() => setShowPopup(true)}
                    >
                        Verify
                    </button>
                </div>

                <div className="kyc-right">
                    <div className="kyc-image-card">
                        <img src={kycVerify} alt="kyvImage" />
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="kyc-bottom">

                <div className="benefits-card">
                    <h2>Account Benefits</h2>

                    <div className="benefit-header">
                        <h4>Level</h4>
                        <h4>Unverified</h4>
                        <h4>Advanced KYC</h4>
                    </div>

                    <div className="benefit-row">
                        <span><FaStar /> KYC Level</span>
                        <span>Unlimited</span>
                        <span>Unlimited</span>
                    </div>

                    <div className="benefit-row">
                        <span><FaStar /> Crypto Deposit</span>
                        <span>1 BTC per day</span>
                        <span>100 BTC per day*</span>
                    </div>

                    <div className="benefit-row">
                        <span><FaStar /> Crypto Withdrawal</span>
                        <span><FaTimesCircle className="cross" /></span>
                        <span>30,000 USD per day*</span>
                    </div>

                    <div className="benefit-row">
                        <span><FaStar /> Crypto Swap</span>
                        <span><FaTimesCircle className="cross" /></span>
                        <span><FaCheckCircle className="check" /></span>
                    </div>

                    <div className="benefit-row">
                        <span><FaStar /> Spot/Futures Trading</span>
                        <span><FaTimesCircle className="cross" /></span>
                        <span><FaCheckCircle className="check" /></span>
                    </div>

                    <div className="benefit-row">
                        <span><FaStar /> Platform Events</span>
                        <span><FaCheckCircle className="check" /></span>
                        <span><FaCheckCircle className="check" /></span>
                    </div>
                </div>

                <div className="faq-card">
                    <h2>Faq</h2>

                    <div className="faq-item">
                        <span>How long does KYC take?</span>
                        <IoIosArrowDown />
                    </div>

                    <div className="faq-item">
                        <span>What documents do I need for KYC?</span>
                        <IoIosArrowDown />
                    </div>

                    <div className="faq-item">
                        <span>Can I use the app without completing KYC?</span>
                        <IoIosArrowDown />
                    </div>

                    <div className="faq-item">
                        <span>Is my personal information secure?</span>
                        <IoIosArrowDown />
                    </div>

                    <div className="faq-item">
                        <span>Can I resubmit my KYC if rejected?</span>
                        <IoIosArrowDown />
                    </div>

                    <div className="faq-item">
                        <span>Do I need front and back of ID?</span>
                        <IoIosArrowDown />
                    </div>

                    <div className="faq-item">
                        <span>Is live selfie mandatory?</span>
                        <IoIosArrowDown />
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="kyc-popup-overlay">
                    <div className="kyc-popup">
                        <div className="popup-header">
                            <h3>Select Country and ID Type</h3>

                            <button
                                className="popup-close"
                                onClick={() => setShowPopup(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <p className="popup-label">
                            🌟 Country/Region
                            <span> (Please select the issuing country of the document)</span>
                            <span className="required">*</span>
                        </p>

                        {/* Country Select */}
                        <div className="country-select">
                            <select
                                value={country}
                                onChange={(e) => {
                                    setCountry(e.target.value);
                                    setSelectedId("");
                                }}
                            >
                                <option value="">Select Country</option>
                                <option value="India">🇮🇳 India</option>
                                <option value="USA">🇺🇸 USA</option>
                                <option value="UK">🇬🇧 United Kingdom</option>
                                <option value="Canada">🇨🇦 Canada</option>
                            </select>

                            <IoIosArrowDown className="select-icon" />
                        </div>

                        {/* ID Type */}
                        {country && (
                            <>
                                <p className="popup-label">
                                    ID Type <span className="required">*</span>
                                </p>

                                <div className="id-grid">
                                    <div
                                        className={`id-card ${selectedId === "Aadhaar Card" ? "active-id" : ""
                                            }`}
                                        onClick={() => setSelectedId("Aadhaar Card")}
                                    >
                                        <div className="radio-circle"></div>
                                        <span>Aadhaar Card</span>
                                    </div>

                                    <div
                                        className={`id-card ${selectedId === "Passport" ? "active-id" : ""
                                            }`}
                                        onClick={() => setSelectedId("Passport")}
                                    >
                                        <div className="radio-circle"></div>
                                        <span>Passport</span>
                                    </div>

                                    <div
                                        className={`id-card ${selectedId === "Driving License" ? "active-id" : ""
                                            }`}
                                        onClick={() => setSelectedId("Driving License")}
                                    >
                                        <div className="radio-circle"></div>
                                        <span>Driving License</span>
                                    </div>

                                    <div
                                        className={`id-card ${selectedId === "Voter ID" ? "active-id" : ""
                                            }`}
                                        onClick={() => setSelectedId("Voter ID")}
                                    >
                                        <div className="radio-circle"></div>
                                        <span>Voter ID</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            className="next-btn"
                            disabled={!country || !selectedId}
                            onClick={() => {
                                setShowPopup(false);
                                setShowPersonal(true);
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* personalDetails */}
            {showPersonal && (

                <div className="personal-popup-overlay">
                    <div className="personal-popup">

                        <div className="popup-header">
                            <h3>Personal Details</h3>

                            <button
                                className="popup-close"
                                onClick={() => setShowPersonal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="personal-form">

                            <div className="form-group">
                                <label>
                                    First Name <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter First Name"
                                    value={personalDetails.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Last Name <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter Last Name"
                                    value={personalDetails.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Date of Birth <span>*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={personalDetails.dob}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Gender <span>*</span>
                                </label>

                                <select
                                    name="gender"
                                    value={personalDetails.gender}
                                    onChange={handleChange}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label>
                                    Address <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter your full address (Minimum 10 characters)"
                                    value={personalDetails.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    City <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={personalDetails.city}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    State <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={personalDetails.state}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Zip/Postal Code <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="Zip Code"
                                    value={personalDetails.zipCode}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="personal-btns">
                            <button
                                className="back-btn"
                                onClick={() => {
                                    setShowPersonal(false)
                                    setShowPopup(true);
                                }
                                }

                            >

                                Back
                            </button>

                            {/* <button
                                className="next-btn"
                                onClick={() => {
                                    setShowPersonal(false);
                                    setshowSelfiPopUp(true);

                                }}
                            >
                                Next
                            </button> */}

                            <button
                                className="next-btn"
                                onClick={() => {

                                    // if (!personalDetails.firstName || !personalDetails.lastName || !personalDetails.dob || !personalDetails.address || !personalDetails.city || !personalDetails.state || !personalDetails.zipCode) {
                                    //     toast.error("Please fill all the fields");
                                    //     return;
                                    // }

                                    if (!personalDetails.firstName.trim()) {
                                        toast.error("Please enter first name");
                                        return;
                                    }

                                    if (!personalDetails.lastName.trim()) {
                                        toast.error("Please enter last name");
                                        return;
                                    }

                                    if (!personalDetails.dob) {
                                        toast.error("Please select DOB");
                                        return;
                                    }

                                    if (!personalDetails.address.trim()) {
                                        toast.error("Please enter address");
                                        return;
                                    }

                                    if (!personalDetails.city.trim()) {
                                        toast.error("Please enter city");
                                        return;
                                    }

                                    if (!personalDetails.state.trim()) {
                                        toast.error("Please enter state");
                                        return;
                                    }

                                    if (!personalDetails.zipCode.trim()) {
                                        toast.error("Please enter zip code");
                                        return;
                                    }

                                    setShowPersonal(false);
                                    setshowSelfiPopUp(true);
                                }}
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            )
            }

            {showSelfiPopUp && (
                <div className="id-photo-overlay">
                    <div className="id-photo-modal">

                        {/* Header */}
                        <div className="id-photo-header">
                            <h3>Take a Photo of Your ID Card</h3>

                            <button className="id-close-btn"
                                onClick={() => setshowSelfiPopUp(false)}>
                                ✕
                            </button>
                        </div>

                        {/* Big Preview */}
                        <div className="id-preview-box">
                            <img
                                // src={idCardPreview}
                                alt="id-preview"
                            />
                        </div>

                        {/* Instructions */}
                        <div className="instruction-cards">

                            <div className="instruction-card">
                                {/* <img src={idWrong1} alt="" /> */}

                                <p>
                                    Align the document so it is
                                    flat and centered.
                                </p>
                            </div>

                            <div className="instruction-card">
                                {/* <img src={idWrong2} alt="" /> */}

                                <p>
                                    Blurry image. Hold the
                                    device steady to refocus.
                                </p>
                            </div>

                            <div className="instruction-card">
                                {/* <img src={idWrong3} alt="" /> */}

                                <p>
                                    Glare detected. Adjust the
                                    angle to reduce reflections.
                                </p>
                            </div>

                        </div>

                        {/* Selected Country */}
                        <div className="selected-info">
                            <p>
                                The selected country/region and ID type are as follows:
                            </p>

                            <div className="selected-tags">
                                <span>🇮🇳 India</span>
                                <span>🪪 Passport</span>
                            </div>

                            <small>
                                Please upload a valid ID matching your selected
                                country/region and ID type to avoid verification failure.
                            </small>
                        </div>

                        {/* Passport Number */}
                        <div className="passport-field">
                            <input
                                type="text"
                                placeholder={`${selectedId} Number`}
                                value={aadhaarNumber}
                                onChange={(e) => setAadhaarNumber(e.target.value)}
                            />
                        </div>

                        {/* Upload */}
                        <div className="upload-grid">

                            <div className="upload-card">
                                <div className="upload-icon">
                                    ☁
                                </div>

                                <h4>Front Side</h4>

                                <p>Drag or choose file</p>

                                <input
                                    type="file"
                                    onChange={(e) => setFrontImage(e.target.files[0])}
                                />                            </div>

                            <div className="upload-card">
                                <div className="upload-icon">
                                    ☁
                                </div>

                                <h4>Back Side(Optional)</h4>

                                <p>Drag or choose file</p>

                                <input
                                    type="file"
                                    onChange={(e) => setBackImage(e.target.files[0])}
                                />                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="id-btns">

                            <button className="id-back-btn">
                                Back
                            </button>

                            <button
                                className="id-next-btn"
                                onClick={() => {

                                    if (!aadhaarNumber.trim()) {
                                        toast.error("Please enter document number");
                                        return;
                                    }

                                    if (!frontImage) {
                                        toast.error("Please upload front image");
                                        return;
                                    }

                                    if (!backImage) {
                                        toast.error("Please upload back image");
                                        return;
                                    }

                                    setshowSelfiPopUp(false);
                                    setShowIncomePopup(true);
                                }}
                            >
                                Next
                            </button>

                        </div>

                    </div>
                </div>
            )
            }

            {
                showIncomePopup && (
                    <div className="income-popup-overlay">
                        <div className="income-popup">

                            {/* Header */}
                            <div className="income-header">
                                <h3>Income Tax & Selfie</h3>

                                <button
                                    className="income-close-btn"
                                    onClick={() => setShowIncomePopup(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="income-section">
                                <label>
                                    Tax Document Type <span>*</span>
                                </label>

                                <div className="tax-card">
                                    <div className="tax-radio"></div>
                                    <span>PAN Card</span>
                                </div>

                                <div className="pan-input-box">
                                    <input
                                        type="text"
                                        placeholder="Enter PAN Card Number"
                                        maxLength={10}
                                        value={panNumber}
                                        onChange={(e) =>
                                            setPanNumber(e.target.value.toUpperCase())
                                        }
                                    />
                                </div>
                            </div>

                            {/* Upload Tax Document */}
                            <div className="income-section">
                                <label>
                                    Upload Tax Document <span>*</span>
                                </label>

                                <small>
                                    (Only JPEG, PNG & JPG formats and file size upto 5MB are supported)
                                </small>

                                <div className="tax-upload-card">
                                    <div className="upload-cloud">
                                        ☁
                                    </div>

                                    <h4>Choose a File</h4>

                                    <p>Drag or choose your file to upload</p>

                                    <input
                                        type="file"
                                        onChange={(e) => setPanImage(e.target.files[0])}
                                    />                                </div>
                            </div>

                            {/* Selfie */}
                            <div className="income-section">
                                <label>
                                    Live Selfie Capture <span>*</span>
                                </label>

                                <small>
                                    (Camera required - Please allow camera access to capture live selfie)
                                </small>

                                <div className="selfie-card">

                                    <div className="selfie-circle">
                                        <img
                                            src={kycEllipse}
                                            alt="selfie"
                                        />
                                    </div>

                                    <button className="camera-btn">
                                        📷 Start Camera
                                    </button>

                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="income-btns">

                                <button className="income-back-btn"

                                >
                                    Back
                                </button>

                                <button
                                    className="income-next-btn"
                                    onClick={() => {
                                        if (!panNumber.trim()) {
                                            toast.error("Please enter PAN number");
                                            return;
                                        }

                                        if (!panImage) {
                                            toast.error("Please upload PAN document");
                                            return;
                                        }

                                        // if (!selfieImage) {
                                        //     toast.error("Please capture selfie");
                                        //     return;
                                        // }

                                        setShowIncomePopup(false);
                                        setSelfieVerify(true);
                                    }}
                                >
                                    Next
                                </button>



                            </div>

                        </div>
                    </div>
                )
            }


            {selfieVerify && (
                <div className="selfie-review-overlay">
                    <div className="selfie-review-modal">

                        <div className="selfie-review-header">
                            <h3>Face Verification</h3>

                            <button
                                className="selfie-close-btn"
                                onClick={() => setSelfieVerify(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="selfie-review-body">

                            <div className="selfie-preview-circle">
                                <img
                                    src={selfieImage || kycEllipse}
                                    alt="selfie"
                                />
                            </div>

                            {selfieImage ? (
                                <h4 className="selfie-success">
                                    ✓ Face Captured Successfully
                                </h4>
                            ) : (
                                <h4 className="selfie-pending">
                                    📷 Please capture your selfie
                                </h4>
                            )}

                            <p className="selfie-text">
                                {selfieImage
                                    ? "Your selfie has been uploaded. Click Next to review your information."
                                    : "Click the button below to start camera and take a live selfie."}
                            </p>

                            <button
                                className="camera-btn"
                                onClick={() => {
                                    setSelfieImage(kycEllipse);
                                    toast.success("Selfie captured successfully!");
                                }}
                            >
                                📷 {selfieImage ? "Retake Selfie" : "Start Camera"}
                            </button>

                        </div>

                        <div className="selfie-review-btns">

                            <button
                                className="selfie-back-btn"
                                onClick={() => {
                                    setSelfieVerify(false);
                                    setShowIncomePopup(true);
                                }}
                            >
                                Back
                            </button>

                            <button
                                className="selfie-next-btn"
                                onClick={() => {
                                    if (!selfieImage) {
                                        toast.error("Please capture your selfie first");
                                        return;
                                    }
                                    setSelfieVerify(false);
                                    setShowReviewPopup(true);
                                }}
                            >
                                Next
                            </button>

                        </div>

                    </div>
                </div>
            )}

            {
                showReviewPopup && (
                    <div className="review-overlay">
                        <div className="review-modal">

                            <div className="review-header">
                                <h3>Review Your Information</h3>

                                <button
                                    className="review-close"
                                    onClick={() => setShowReviewPopup(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Scrollable Body */}
                            <div className="review-modal-body">

                                {/* User Details */}
                                <div className="review-user-card">

                                    <div className="review-left">

                                        <div className="review-profile">
                                            <img src={kycEllipse} alt="" />
                                        </div>

                                        <h4>
                                            {personalDetails.firstName}{" "}
                                            {personalDetails.lastName}
                                        </h4>

                                    </div>

                                    <div className="review-right">

                                        <div className="review-row">
                                            <span>Email</span>
                                            <p>{"ashwani@gmail.com"}</p>
                                        </div>

                                        <div className="review-row">
                                            <span>Mobile Number</span>
                                            <p>+91 9876543210</p>
                                        </div>

                                        <div className="review-row">
                                            <span>Document Type</span>
                                            <p>{selectedId}</p>
                                        </div>

                                        <div className="review-row">
                                            <span>Country</span>
                                            <p>{country}</p>
                                        </div>

                                    </div>

                                </div>

                                {/* Document Number */}
                                <div className="review-doc-card">

                                    <span>
                                        {selectedId} Number :
                                    </span>

                                    <p>{aadhaarNumber || "Not Added"}</p>

                                </div>

                                {/* Uploaded Images */}
                                <div className="review-images">

                                    <div className="review-image-card">

                                        <p>Document (Front)</p>

                                        <div className="review-image-box">
                                            {frontImage && (
                                                <img
                                                    src={URL.createObjectURL(frontImage)}
                                                    alt=""
                                                />
                                            )}
                                        </div>

                                    </div>

                                    <div className="review-image-card">

                                        <p>Document (Back)</p>

                                        <div className="review-image-box">
                                            {backImage && (
                                                <img
                                                    src={URL.createObjectURL(backImage)}
                                                    alt=""
                                                />
                                            )}
                                        </div>

                                    </div>

                                </div>

                                {/* PAN Card Row */}
                                <div className="review-pan-row">
                                    <span>PAN Card:</span>
                                    <span className="review-pan-value">
                                        {panNumber
                                            ? panNumber.slice(0, -3).replace(/./g, "•") + panNumber.slice(-3)
                                            : "Not Added"}
                                    </span>
                                </div>

                                {/* Tax Document & Selfie */}
                                <div className="review-images">

                                    <div className="review-image-card">
                                        <p>Tax Document</p>
                                        <div className="review-image-box">
                                            {panImage && (
                                                <img
                                                    src={URL.createObjectURL(panImage)}
                                                    alt="tax-doc"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="review-image-card">
                                        <p>Selfie</p>
                                        <div className="review-image-box">
                                            {selfieImage && (
                                                <img
                                                    src={URL.createObjectURL(selfieImage)}
                                                    alt="selfie"
                                                />
                                            )}
                                        </div>
                                    </div>

                                </div>

                            </div>{/* end review-modal-body */}

                            {/* Buttons */}
                            <div className="review-btns">

                                <button
                                    className="review-back-btn"
                                    onClick={() => {
                                        setShowReviewPopup(false);
                                        setSelfieVerify(true);
                                    }}
                                >
                                    Back
                                </button>

                                <button
                                    className="review-submit-btn" onClick={handleSubmit}                              >
                                    Submit KYC
                                </button>

                            </div>

                        </div>
                    </div>
                )
            }

        </div >
    );
};

export default KycVerification;