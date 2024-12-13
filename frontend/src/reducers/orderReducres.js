import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_MY_LIST_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,
    CREATE_NEW_ORDER,
    ORDER_REMOVE_REQUEST,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL
} from "../constants/orderConstants";

export const orderCreateReducers = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
            };
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            };
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case ORDER_CREATE_RESET:
            return {};

        default:
            return state;
    }
};

export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            };
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true,
            };
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case ORDER_PAY_RESET:
            return {};

        default:
            return state;
    }
};

export const orderMyListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_MY_LIST_REQUEST:
            return {
                loading: true,
            };
        case ORDER_MY_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };
        case ORDER_MY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case ORDER_MY_LIST_RESET:
            return {
                orders: [],
            };

        default:
            return state;
    }
};

// export const orderListReducer = (state = { orders: [] }, action) => {
//     switch (action.type) {
//         case ORDER_LIST_REQUEST:
//             return {
//                 loading: true,
//             };
//         case ORDER_LIST_SUCCESS:
//             return {
//                 loading: false,
//                 orders: action.payload,
//             };
//         case ORDER_LIST_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };

//         default:
//             return state;
//     }
// };
// import { ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from '../constants/orderConstants';
export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true, orders: [] };
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_REMOVE_REQUEST:
            // This will update the orders list after removing an order
            return {
                ...state,
                orders: state.orders.filter(order => order.order_id !== action.payload),
            };
        default:
            return state;
    }
};
const initialState = {
    loading: false,
    orders: [],
    error: null,
  };
  
export const listOrderSellerReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { ...state, loading: true };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload, error: null };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const orderReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_UPDATE_REQUEST:
            return { ...state, loading: true };
        case ORDER_UPDATE_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true,
            };
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case ORDER_DELIVER_RESET:
            return {};
        default:
            return state;
    }
};
