// import {
//     ORDER_CREATE_FAIL,
//     ORDER_CREATE_SUCCESS,
//     ORDER_CREATE_REQUEST,
//     ORDER_DETAILS_REQUEST,
//     ORDER_DETAILS_SUCCESS,
//     ORDER_DETAILS_FAIL,
//     ORDER_PAY_REQUEST,
//     ORDER_PAY_SUCCESS,
//     ORDER_PAY_FAIL,
//     ORDER_MY_LIST_REQUEST,
//     ORDER_MY_LIST_SUCCESS,
//     ORDER_MY_LIST_FAIL,
//     ORDER_LIST_REQUEST,
//     ORDER_LIST_SUCCESS,
//     ORDER_LIST_FAIL,
//     ORDER_DELIVER_REQUEST,
//     ORDER_DELIVER_SUCCESS,
//     ORDER_DELIVER_FAIL,
// } from "../constants/orderConstants";

// import { CART_CLEAR_ITEMS } from "../constants/cartConstant";
// import axios from "axios";

// export const createOrder = (order) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: ORDER_CREATE_REQUEST,
//         });

//         // const {
//         //     userLogin: { userInfo },
//         // } = getState();

//         // const config = {
//         //     headers: {
//         //         "Content-type": "application/json",
//         //         Authorization: `Bearer ${userInfo.token}`,
//         //     },
//         // };
//         const { data } = await axios.post(`/api/orders/add/`, order);

//         dispatch({
//             type: ORDER_CREATE_SUCCESS,
//             payload: data,
//         });

//         dispatch({
//             type: CART_CLEAR_ITEMS,
//             payload: data,
//         });

//         // localStorage.removeItem("cartItems");

//         // dispatch({
//         //     type: USER_LOGIN_SUCCESS,
//         //     payload: data,
//         // });

//         // localStorage.setItem("userInfo", JSON.stringify(data));
//     } catch (error) {
//         dispatch({
//             type: ORDER_CREATE_FAIL,
//             payload:
//                 error.response && error.response.data.detail
//                     ? error.response.data.detail
//                     : error.message,
//         });
//     }
// };

// export const getOrderDetail = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: ORDER_DETAILS_REQUEST,
//         });

//         const {
//             userLogin: { userInfo },
//         } = getState();

//         // const config = {
//         //     headers: {
//         //         "Content-type": "application/json",
//         //         Authorization: `Bearer ${userInfo.token}`,
//         //     },
//         // };
//         const { data } = await axios.get(`/api/orders/${id}/`);

//         dispatch({
//             type: ORDER_DETAILS_SUCCESS,
//             payload: data,
//         });

//         //localStorage.removeItem('cartItems');

//         // dispatch({
//         //     type: USER_LOGIN_SUCCESS,
//         //     payload: data,
//         // });

//         // localStorage.setItem("userInfo", JSON.stringify(data));
//     } catch (error) {
//         dispatch({
//             type: ORDER_DETAILS_FAIL,
//             payload:
//                 error.response && error.response.data.detail
//                     ? error.response.data.detail
//                     : error.message,
//         });
//     }
// };

// export const payOrder = (id, paymentResults) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: ORDER_PAY_REQUEST,
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
//         const { data } = await axios.put(
//             `/api/orders/${id}/pay/`,
//             paymentResults,
//             config
//         );

//         dispatch({
//             type: ORDER_PAY_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: ORDER_PAY_FAIL,
//             payload:
//                 error.response && error.response.data.detail
//                     ? error.response.data.detail
//                     : error.message,
//         });
//     }
// };

// export const listMyOrders = () => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: ORDER_MY_LIST_REQUEST,
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
//         const { data } = await axios.get(`/api/orders/myorders/`, config);

//         dispatch({
//             type: ORDER_MY_LIST_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: ORDER_MY_LIST_FAIL,
//             payload:
//                 error.response && error.response.data.detail
//                     ? error.response.data.detail
//                     : error.message,
//         });
//     }
// };

// export const listOrders = () => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: ORDER_LIST_REQUEST,
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
//         const { data } = await axios.get(`/api/orders/`, config);

//         dispatch({
//             type: ORDER_LIST_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: ORDER_LIST_FAIL,
//             payload:
//                 error.response && error.response.data.detail
//                     ? error.response.data.detail
//                     : error.message,
//         });
//     }
// };

// export const deliverOrder = (order) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: ORDER_DELIVER_REQUEST,
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
//         const { data } = await axios.put(
//             `/api/orders/${order._id}/deliver/`,
//             {},
//             config
//         );

//         dispatch({
//             type: ORDER_DELIVER_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: ORDER_DELIVER_FAIL,
//             payload:
//                 error.response && error.response.data.detail
//                     ? error.response.data.detail
//                     : error.message,
//         });
//     }
// };
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_REMOVE_REQUEST,
    ORDER_REMOVE_SUCCESS,
    ORDER_REMOVE_FAIL,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    CREATE_NEW_ORDER
} from "../constants/orderConstants";

import axios from "axios";

// Create Order


// Define the action types


// Action to create a new order
// export const createNewOrder = (newOrder) => ({
//   type: CREATE_NEW_ORDER,
//   payload: newOrder,
// });


export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });

        const { data } = await axios.post(`http://127.0.0.1:8080/purchaser/api/orders`, order);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

// Get Order Details
export const getOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`http://127.0.0.1:8080/purchaser/api/orders/${id}`);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

// Update Order
export const updateOrder = (id, updatedOrder) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_UPDATE_REQUEST,
        });

        const { data } = await axios.put(`http://127.0.0.1:8080/purchaser/api/orders/${id}`, updatedOrder);
        console.log("hellooo");
        dispatch({
            type: ORDER_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ORDER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

///order of 1 user
export const listOrders = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        // Make the API request with the provided `id`
        const { data } = await axios.get(`http://127.0.0.1:8080/purchaser/api/orders-order-item/${id}`);
        // console.log("hellooooo");
        // console.log(data);
        localStorage.setItem("data", JSON.stringify(data));
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
            
        });
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
// Remove Order
export const removeOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_REMOVE_REQUEST,
        });

        await axios.delete(`http://127.0.0.1:8080/purchaser/api/orders/${orderId}`);

        dispatch({
            type: ORDER_REMOVE_SUCCESS,
            payload: orderId, // pass order_id here
        });
    } catch (error) {
        dispatch({
            type: ORDER_REMOVE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        });
    }
};
