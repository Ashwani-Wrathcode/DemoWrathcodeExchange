import axios from "axios";

const API_BASE_URL = "-------------";

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");

    if (!token) {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const userObj = JSON.parse(userStr);
                token = userObj.token;
            } catch (e) {
                console.error("Error parsing user object from localStorage", e);
            }
        }
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            if (window.location.pathname !== "/Login" && window.location.pathname !== "/SignUp") {
                window.location.href = "/Login";
            }
        }

        return Promise.reject(error);
    }
);



const handleError = (error) => {
    if (error.response) {
        return {
            success: false,
            error:
                error.response.data?.message ||
                error.response.data ||
                `Error ${error.response.status}`,
            data: error.response.data?.data,
            message: error.response.data?.message,
        };
    } else if (error.request) {
        return {
            success: false,
            error: "No response from server.",
        };
    } else {
        return {
            success: false,
            error: error.message || "Unexpected error",
        };
    }
};


export const ApiCallPost = async (url, data) => {
    try {

        const response = await api.post(url, data);

        return {
            success: true, ...(response.data || {})
        }

    } catch (error) {
        return handleError(error)
    }
};

export const ApiCallGet = async (url, config) => {

    try {
        const response = await api.get(url, config)

        return {
            success: true, ...response.data || {}
        }

    } catch (error) {
        return handleError(error);
    }

};


export const ApiCallPut = async (url, data, config = {}) => {
    try {
        const response = await api.put(url, data, config);

        return {
            success: true,
            ...(response.data || {}),
        };
    } catch (error) {
        return handleError(error);
    }
};


export const ApiCallDelete = async (url, config = {}) => {
    try {
        const response = await api.delete(url, config);

        return {
            success: true,
            ...(response.data || {}),
        };
    } catch (error) {
        return handleError(error);
    }
};
export default api;