import axios from "axios";

const axiosIns = axios.create({
    baseURL: `http${process.env.REACT_APP_APP_DOMAIN ? 's' : ""}://${process.env.REACT_APP_APP_DOMAIN || 'localhost:8000'}`
})

export const register = (body) => {
    return axiosIns.post("/user", body);
}

export const login = (body) => {
    return axiosIns.post("/auth", body);
}

export const getCurrentUserInfo = () => {
    const config = getConfig();
    return axiosIns.get("/user/me", config);
}

const getConfig = () => {
    const token = localStorage.getItem("access_token");
    const config = {
        headers: {
            "auth-token": token
        }
    }
    return config;
}