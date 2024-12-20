import axios from "axios";

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

} from "../constants/productConstants";

// export const listProducts = () => async (dispatch) => {
//     try {
//         dispatch({ type: PRODUCT_LIST_REQUEST });
//         const { data } = await axios.get(`http://127.0.0.1:8080/purchaser/api/products`);
//         console.log(data);
//         dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_LIST_FAIL,
//             payload:
//                 error.response && error.response.data.detail
//                     ? error.response.data.detail
//                     : error.message,
//         });
//     }
// };
export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:8080/purchaser/api/products`);
        console.log(data);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });  // Payload is now just the products array
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        // Correct API request URL
        const { data } = await axios.get(`http://127.0.0.1:8080/purchaser/api/get-products?ProductID=${id}`);

        // Directly dispatch the product as it is already the correct one
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        );

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });
        console.log("hii", productData)
        // Replace this with your actual backend URL
        const { data } = await axios.post("http://127.0.0.1:8080/seller/api/product", productData);
        console.log("helooo",data);
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        );

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

// export const createProductReview = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: PRODUCT_CREATE_REVIEW_REQUEST,
//         });

//         const {
//             userLogin: { userInfo },
//         } = getState();

//         const config = {
//             headers: {
//                 "Content-type": "application/json",
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };
//         // console.log(review)
//         // const { data } = await axios.post(
//         //     `/api/products/${id}/reviews/`,
//         //     review,
//         //     config
//         // );

//         dispatch({
//             type: PRODUCT_CREATE_REVIEW_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_CREATE_REVIEW_FAIL,
//             payload:
//                 error.response && error.response.data.detail
//                     ? error.response.data.detail
//                     : error.message,
//         });
//     }
// };

export const listTopRatedProducts = (shopID) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:8080/seller/api/products/${shopID}`);
        console.log(data);
        dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};