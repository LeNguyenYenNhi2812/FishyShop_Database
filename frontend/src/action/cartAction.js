import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstant";

export const addToCart = (item_id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get('http://127.0.0.1:8080/purchaser/api/orders');
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            item_id,
            product: data.ProductID,
            shopID: data.ShopID,
            // name: data.ProductName,
            // image: data.image,
            // price: data.Price,
            countInStock: data.inventory,
            quantity,
        },
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = (OrderID) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: OrderID,
    });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
};
