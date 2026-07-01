import { ApiCallPost, ApiCallGet } from '../ApiConfig/ApiCall'
import { ApiConfig } from '../ApiConfig/ApiEndpoints'

const AuthService = {
    login: async (data) => {
        const url = ApiConfig.baseUrl + ApiConfig.login;
        return ApiCallPost(url, data);
    },

    sendOtpLogin: async (data) => {
        const url = ApiConfig.baseUrl + ApiConfig.sendOtpLogin;
        return ApiCallPost(url, data);
    },

    verifyOtpLogin: async (data) => {
        const url = ApiConfig.baseUrl + ApiConfig.verifyOtpLogin;
        return ApiCallPost(url, data);
    },

    signUp: async (data) => {
        const url = ApiConfig.baseUrl + ApiConfig.SignUp;
        return ApiCallPost(url, data);
    },

    SignUp: async (data) => {
        return AuthService.signUp(data);
    },

    SendOtp: async (data) => {
        const url = ApiConfig.baseUrl + ApiConfig.sendOtp;
        return ApiCallPost(url, data);
    },

    VerifyOtp: async (data) => {
        return AuthService.SendOtp(data);
    },

    verifyOtp: async (data) => {
        const url = ApiConfig.baseUrl + ApiConfig.verifyOtp;
        return ApiCallPost(url, data);
    },

    ForgotPasswordOtp: async (data) => {
        const url =
            ApiConfig.baseUrl +
            ApiConfig.forgotPasswordOtp;

        return ApiCallPost(url, data);
    },

    // Reset Password
    ResetPassword: async (data) => {
        const url =
            ApiConfig.baseUrl +
            ApiConfig.resetPassword;

        return ApiCallPost(url, data);
    },

    // Support Ticket - Create
    supportTicket: async (data) => {
        const url = ApiConfig.baseUrl + ApiConfig.createSupportTicket;
        return ApiCallPost(url, data);
    },

    // Support Ticket - Get All
    getSupportTickets: async () => {
        const url = ApiConfig.baseUrl + ApiConfig.getSupportTickets;
        return ApiCallGet(url);
    },

}

export default AuthService;
