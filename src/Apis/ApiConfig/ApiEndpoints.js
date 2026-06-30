const appUrl = 'https://backend.zillionexchange.com/v1'


export const ApiConfig = {

    baseUrl: appUrl,

    login: "/user/login",
    sendOtpLogin: "/user/send-otp",
    verifyOtpLogin: "/user/verify-otp",


    SignUp: "/user/register-email",
    sendOtp: "/user/registration-otp",
    verifyOtp: "/user/verify-registration-otp",


    // forgetPassword

    forgotPasswordOtp: "/",
    resetPassword: "/",

    // supportTicket

    createSupportTicket: "/support/submit-ticket",
    getSupportTickets: "/support/get-user-tickets",


    // Referral 

    getReferralHistory:"/",



    // referral
    getReferralHistory: "",




};