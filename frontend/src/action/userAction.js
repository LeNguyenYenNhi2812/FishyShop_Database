import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_REQUEST,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST,
} from "../constants/userConstants";
import axios from "axios";
import { ORDER_MY_LIST_RESET } from "../constants/orderConstants";

export const login = (username, password, type_of_customer) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const { data } = await axios.post(
            "http://127.0.0.1:8080/api/login",
            {
                username: username,
                password: password,
                type_of_customer: type_of_customer,
            }
        );

        // Assuming the API response includes the user object with their info
        const userInfo = {
            username: data.user, // Adjust based on your API response
            message: data.message,
            type_of_customer: type_of_customer, // You might want to validate or remove this if it's redundant
        };

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: userInfo,
        });

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({
        type: USER_LOGOUT,
    });
    dispatch({
        type: USER_DETAILS_RESET,
    });
    dispatch({
        type: ORDER_MY_LIST_RESET,
    });
    dispatch({
        type: USER_LIST_RESET,
    });
};

export const register = (username, password, email, ssn, type_of_customer,date_of_birth,address,phone,FName,LName) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });
        const config = {
            header: {
                "Content-type": "application/json",
            },
        };
        const { data } = await axios.post(
            "/api/users/register/",
            {
                username: username,
                password: password,
                email: email,
                ssn:ssn,
                type_of_customer:type_of_customer,
                date_of_birth:date_of_birth,
                address:address,
                phone:phone,
                FName:FName,
                LName:LName,

            },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getUserDetails = (username) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // const config = {
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };
        const { data } = await axios.get(`http://127.0.0.1:8080/purchaser/api/profile${username}/`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // const config = {
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };
        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            // config
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listUser = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // const config = {
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };
        const { data } = await axios.get(
            `/api/users/`
            // config
        );

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        });



       
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // const config = {
        //     // headers: {
        //     //     "Content-type": "application/json",
        //     //     Authorization: `Bearer ${userInfo.token}`,
        //     // },
        // };
        const { data } = await axios.delete(
            `/api/users/delete/${id}/`
            // config
        );
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // const config = {
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };
        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user
            // config
        );
        dispatch({
            type: USER_UPDATE_SUCCESS,
            //payload: data,
        });
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};