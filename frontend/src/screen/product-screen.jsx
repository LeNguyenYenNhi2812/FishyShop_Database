// //import axios from "axios";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// import {
//     Row,
//     Col,
//     Image,
//     ListGroup,
//     Button,
//     Card,
//     Form,
// } from "react-bootstrap";
// import Rating from "../components/rating";
// //import products from "../../products";

// import { useDispatch, useSelector } from "react-redux";
// import {
//     listProductDetails,
//     // createProductReview,
// } from "../action/productAction";
// import Loader from "../components/loader";
// import Message from "../components/message";
// import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

// const ProductScreen = () => {
//     const [quantity, setQuantity] = useState(1);
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState("");
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     let navigate = useNavigate();

//     const capitalizeFirstLetter = (str) => {
//         const arr = str.split(" ");
//         for (var i = 0; i < arr.length; i++) {
//             arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
//         }
//         const str2 = arr.join(" ");
//         return str2;
//     };

//     const productDetails = useSelector((state) => state.productDetails);
//     const { error, loading, product } = productDetails;

//     const userLogin = useSelector((state) => state.userLogin);
//     const { userInfo } = userLogin;

//     const productReviewCreate = useSelector(
//         (state) => state.productReviewCreate
//     );
//     const {
//         error: errorProductReview,
//         loading: loadingProductReview,
//         success: successProductReview,
//     } = productReviewCreate;

//     useEffect(() => {
//         if (successProductReview) {
//             setRating(0);
//             setComment("");
//             dispatch({ type: { PRODUCT_CREATE_REVIEW_RESET } });
//         }
//         dispatch(listProductDetails(id));
//         // const fetchProduct = async () => {
//         //   const {data} = await axios.get(`/api/product/${id}`)
//         //   setProduct(data);
//         // }
//         // fetchProduct();
//     }, [dispatch, id, successProductReview]);

//     //const product = products.find((p) => p._id === id);

//     const addToCartHandler = () => {
//         //history.push(`/cart/${id}?quantity=${quantity}`);
//         navigate(`/cart/${id}?quantity=${quantity}`);
//     };

//     const submitHandler = (e) => {
//         e.preventDefault();
//         // dispatch(createProductReview(id, {rating, comment}));
//     };

//     return (
//         <div className="product-screen-container">
//             <Link to="/" className="btn btn-outline-dark my-3">
//                 Go back
//             </Link>
//             {loading ? (
//                 <Loader />
//             ) : error ? (
//                 <Message variant="danger">{error}</Message>
//             ) : (
//                 <div>
//                     <Row>
//                         <Col md={6}>
//                             <Image
//                                 src={product?.image}
//                                 alt={product?.name}
//                                 fluid
//                             />
//                         </Col>
//                         <Col md={3}>
//                             <ListGroup variant="flush" className="d-flex">
//                                 <ListGroup.Item style={{ textAlign: "left" }}>
//                                     <h3>{product?.name}</h3>
//                                 </ListGroup.Item>
//                                 <ListGroup.Item style={{ textAlign: "left" }}>
//                                     <Rating
//                                         value={product?.rating}
//                                         text={`${product?.numReviews} reviews`}
//                                         color="#dc994b"
//                                     />
//                                 </ListGroup.Item>
//                                 <ListGroup.Item style={{ textAlign: "left" }}>
//                                     Price : ${product?.price}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item
//                                     style={{ textAlign: "justify" }}
//                                 >
//                                     Description : {product?.description}
//                                 </ListGroup.Item>
//                             </ListGroup>
//                         </Col>
//                         <Col md={3}>
//                             <Card>
//                                 <ListGroup variant="flush">
//                                     <ListGroup.Item
//                                         style={{ textAlign: "left" }}
//                                     >
//                                         <Row>
//                                             <Col>Price :</Col>
//                                             <Col>
//                                                 <span>${product?.price}</span>
//                                             </Col>
//                                         </Row>
//                                     </ListGroup.Item>

//                                     <ListGroup.Item
//                                         style={{ textAlign: "left" }}
//                                     >
//                                         <Row className="d-flex justify-content-between">
//                                             <Col>Status :</Col>
//                                             <Col>
//                                                 {product?.countInStock >= 1
//                                                     ? "In Stock"
//                                                     : "Out of Stock"}
//                                             </Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     {product?.countInStock > 0 && (
//                                         <ListGroup.Item
//                                             style={{ textAlign: "left" }}
//                                         >
//                                             <Row className="d-flex justify-content-between align-items-center">
//                                                 <Col>Quantity</Col>
//                                                 <Col xs="auto" className="my-1">
//                                                     <Form.Control
//                                                         as="select"
//                                                         value={quantity}
//                                                         onChange={(e) =>
//                                                             setQuantity(
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                         style={{
//                                                             appearance: "auto",
//                                                         }}
//                                                     >
//                                                         {[
//                                                             ...Array(
//                                                                 product?.countInStock
//                                                             ).keys(),
//                                                         ].map((x) => (
//                                                             <option
//                                                                 key={x + 1}
//                                                                 value={x + 1}
//                                                             >
//                                                                 {x + 1}
//                                                             </option>
//                                                         ))}
//                                                     </Form.Control>
//                                                 </Col>
//                                             </Row>
//                                         </ListGroup.Item>
//                                     )}

//                                     <ListGroup.Item
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                         }}
//                                     >
//                                         <Button
//                                             className="btn-block w-75"
//                                             variant="dark"
//                                             disabled={
//                                                 product?.countInStock === 0
//                                             }
//                                             onClick={addToCartHandler}
//                                         >
//                                             Add to cart
//                                         </Button>
//                                     </ListGroup.Item>
//                                 </ListGroup>
//                             </Card>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md={6}>
//                             <h3 className="mt-3">Review</h3>
//                             {product?.reviews.length === 0 && (
//                                 <Message variant="info">No Reviews</Message>
//                             )}
//                             <ListGroup>
//                                 {product?.reviews.map((review) => {
//                                     return (
//                                         <ListGroup.Item
//                                             key={review._id}
//                                             className="px-4 d-flex flex-column align-items-start"
//                                         >
//                                             <strong className="mb-2">
//                                                 {capitalizeFirstLetter(
//                                                     review.name
//                                                 )}
//                                             </strong>
//                                             <div
//                                                 className="d-flex"
//                                                 style={{
//                                                     justifyContent:
//                                                         "space-between",
//                                                     width: "100%",
//                                                 }}
//                                             >
//                                                 <Rating
//                                                     value={review.rating}
//                                                     color="#dc994b"
//                                                 />
//                                                 <p className="mb-2 small">
//                                                     {review.createAt.substring(
//                                                         0,
//                                                         10
//                                                     )}
//                                                 </p>
//                                             </div>
//                                             <p className="mb-2">
//                                                 {review.comment}
//                                             </p>
//                                         </ListGroup.Item>
//                                     );
//                                 })}
//                                 <ListGroup.Item>
//                                     <h3>Write a review</h3>
//                                     {loadingProductReview && <Loader />}
//                                     {successProductReview && (
//                                         <Message variant="success">
//                                             Review Submitted
//                                         </Message>
//                                     )}
//                                     {errorProductReview && (
//                                         <Message variant="danger">
//                                             {errorProductReview}
//                                         </Message>
//                                     )}

//                                     {userInfo ? (
//                                         <Form onSubmit={submitHandler}>
//                                             <Form.Group>
//                                                 <Form.Label
//                                                     className="d-flex m-lg-1"
//                                                     style={{
//                                                         textAlign: "left",
//                                                     }}
//                                                 >
//                                                     Rating
//                                                 </Form.Label>
//                                                 <Form.Control
//                                                     as="select"
//                                                     value={rating}
//                                                     onChange={(e) =>
//                                                         setRating(
//                                                             e.target.value
//                                                         )
//                                                     }
//                                                 >
//                                                     <option value="0">
//                                                         Select ...
//                                                     </option>
//                                                     <option value="1">
//                                                         1 - Poor
//                                                     </option>
//                                                     <option value="2">
//                                                         2 - Fair
//                                                     </option>
//                                                     <option value="3">
//                                                         3 - Good
//                                                     </option>
//                                                     <option value="4">
//                                                         4 - Very Good
//                                                     </option>
//                                                     <option value="5">
//                                                         5 - Excellent
//                                                     </option>
//                                                 </Form.Control>
//                                             </Form.Group>
//                                             <Form.Group
//                                                 controlId="comment"
//                                                 className="mt-3"
//                                             >
//                                                 <Form.Label
//                                                     className="d-flex m-lg-1"
//                                                     style={{
//                                                         textAlign: "left",
//                                                     }}
//                                                 >
//                                                     Reviews
//                                                 </Form.Label>
//                                                 <Form.Control
//                                                     as="textarea"
//                                                     row="5"
//                                                     value={comment}
//                                                     onChange={(e) =>
//                                                         setComment(
//                                                             e.target.value
//                                                         )
//                                                     }
//                                                 >
//                                                     {" "}
//                                                 </Form.Control>
//                                             </Form.Group>
//                                             <Button
//                                                 disabled={loadingProductReview}
//                                                 type="submit"
//                                                 variant="dark"
//                                                 className="mt-3 mb-2 px-5"
//                                             >
//                                                 Submit
//                                             </Button>
//                                         </Form>
//                                     ) : (
//                                         <Message variant="info">
//                                             Please &nbsp;
//                                             <Link
//                                                 className="text-dark"
//                                                 to="/login"
//                                             >
//                                                 Login
//                                             </Link>{" "}
//                                             &nbsp;to write a review
//                                         </Message>
//                                     )}
//                                 </ListGroup.Item>
//                             </ListGroup>
//                         </Col>
//                     </Row>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductScreen;

//disabled={product.countInStock !== 0}
// const ProductScreen = () => {
//     const [quantity, setQuantity] = useState(1);
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState("");
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     let navigate = useNavigate();

//     const capitalizeFirstLetter = (str) => {
//         return str
//             .split(" ")
//             .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(" ");
//     };

//     const productDetails = useSelector((state) => state.productDetails);
//     const { error, loading, product } = productDetails;

//     useEffect(() => {
//         dispatch(listProductDetails(id));
//     }, [dispatch, id]);

//     const addToCartHandler = () => {
//         navigate(`/cart/${id}?quantity=${quantity}`);
//     };
//     function getRandomInteger(a, b) {
//         return Math.floor(Math.random() * (b - a + 1)) + a;
//     }
//     return (
//         <div className="product-screen-container">
//             <Link to="/" className="btn btn-outline-dark my-3">
//                 Go back
//             </Link>
//             {loading ? (
//                 <Loader />
//             ) : error ? (
//                 <Message variant="danger">{error}</Message>
//             ) : (
//                 <div>
//                     <Row>
//                         <Col md={6}>
//                             <Image
//                                 src={product?.image?.Valid ? product.image.String : "/placeholder.jpg"}
//                                 alt={product?.product_name}
//                                 fluid
                                
//                             />
//                         </Col>
//                         <Col md={3}>
//                             <ListGroup variant="flush" className="d-flex">
//                                 <ListGroup.Item style={{ textAlign: "left" }}>
//                                     <h3>{product?.product_name}</h3>
//                                 </ListGroup.Item>
//                                 <ListGroup.Item style={{ textAlign: "left" }}>
//                                     <Rating
//                                         value={getRandomInteger(3,5)} // Adjust as needed for your data
//                                         text={`${getRandomInteger(50,100)} reviews`}
//                                         color="#dc994b"
//                                     />
//                                 </ListGroup.Item>
//                                 <ListGroup.Item style={{ textAlign: "left" }}>
//                                     Price: ${product?.price}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item style={{ textAlign: "justify" }}>
//                                     Description: {product?.description}
//                                 </ListGroup.Item>
//                             </ListGroup>
//                         </Col>
//                         <Col md={3}>
//                             <Card>
//                                 <ListGroup variant="flush">
//                                     <ListGroup.Item style={{ textAlign: "left" }}>
//                                         <Row>
//                                             <Col>Price:</Col>
//                                             <Col>
//                                                 <span>${product?.price}</span>
//                                             </Col>
//                                         </Row>
//                                     </ListGroup.Item>

//                                     <ListGroup.Item style={{ textAlign: "left" }}>
//                                         <Row className="d-flex justify-content-between">
//                                             <Col>Status:</Col>
//                                             <Col>
//                                                 {product?.inventory > 0 ? "In Stock" : "Out of Stock"}
//                                             </Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     {product?.inventory > 0 && (
//                                         <ListGroup.Item style={{ textAlign: "left" }}>
//                                             <Row className="d-flex justify-content-between align-items-center">
//                                                 <Col>Quantity</Col>
//                                                 <Col xs="auto" className="my-1">
//                                                     <Form.Control
//                                                         as="select"
//                                                         value={quantity}
//                                                         onChange={(e) =>
//                                                             setQuantity(Number(e.target.value))
//                                                         }
//                                                         style={{ appearance: "auto" }}
//                                                     >
//                                                         {[
//                                                             ...Array(product.inventory).keys(),
//                                                         ].map((x) => (
//                                                             <option key={x + 1} value={x + 1}>
//                                                                 {x + 1}
//                                                             </option>
//                                                         ))}
//                                                     </Form.Control>
//                                                 </Col>
//                                             </Row>
//                                         </ListGroup.Item>
//                                     )}

//                                     <ListGroup.Item
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                         }}
//                                     >
//                                         <Button
//                                             className="btn-block w-75"
//                                             variant="dark"
//                                             disabled={product?.inventory === 0}
//                                             onClick={addToCartHandler}
//                                         >
//                                             Add to cart
//                                         </Button>
//                                     </ListGroup.Item>
//                                 </ListGroup>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductScreen;

// import { createNewOrder } from '../action/orderAction';  // Import the createNewOrder action







import React, { useState, useEffect } from "react";
import { Await, Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import Rating from "../components/rating";
import { listProductDetails } from "../action/productAction";
import { listOrders } from "../action/orderAction"; // Assuming you have an action for fetching orders
import { createOrder,updateOrder } from "../action/orderAction"; // Assuming you have an action for creating orders

const ProductScreen = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedOrderID, setSelectedOrderID] = useState("");
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const orderList = useSelector((state) => state.orderList);
    const { loading1, error1, orders } = orderList;
    

    useEffect(() => {
        dispatch(listProductDetails(id));
        dispatch(listOrders(1)); 
        // Fetch product details
    }, [dispatch, id]);
    // useEffect(() => {
        
    // }, [dispatch, 1]);
    // Function to create a new order
    const handleCreateOrder = () => {
        const newOrder = {
            item_id: getRandomInteger(100, 1000),
            product_id: product.product_id,
            shop_id: product.shop_id, // Replace with actual shop ID if applicable
            quantity: quantity, // Default quantity for the new order
            shipping_fee: 30, // Replace with actual shipping fee logic
            user_id: 1, // Replace with the actual user ID
            payment_type: "CreditCard", // Default payment type
        };
        dispatch(createOrder(newOrder)); // Dispatch the action to create a new order
        return newOrder.order_id; // Return the new order ID
    };
    const handleUpdateOrder = (order_id) => {
        const update ={
                order_id: order_id,
                item_id: getRandomInteger(1000, 2000),
                product_id: product.product_id,
                shop_id: product.shop_id, // Replace with actual shop ID if applicable
                quantity: quantity, // Default quantity for the new order
                shipping_fee: 40, // Replace with actual shipping fee logic
                user_id: 1,
                 // Replace with the actual user ID
                status: "Processing", // Default status
                payment_type: "Online", // Default payment type
        };
        dispatch(updateOrder(order_id, update));
        return update.order_id;
    };
    const addToCartHandler = async () => {
        let finalOrderID = selectedOrderID;
    
        if (!selectedOrderID) {
            // If no order is selected, create a new order
            try {
                finalOrderID = await handleCreateOrder(); // Ensure createOrder returns the new order ID
            } catch (error) {
                console.error("Error creating order:", error);
                return; // Exit if there's an error
            }
        }
        else{
            try{
                finalOrderID = await handleUpdateOrder(selectedOrderID); // Ensure updateOrder returns the
            }
            catch (error) {
                console.error("Error updating order:", error);
                return; // Exit if there's an error
    

        }
    }
    
        // Navigate with the final orderID and quantity
        // navigate('/');
        alert("Đã thêm sản phẩm vào giỏ hàng");
    };

    function getRandomInteger(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
    // console.log(product);
    console.log(orders);
    return (
        <div className="product-screen-container">
            <Link to="/" className="btn btn-outline-dark my-3">
                Go back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        <Col md={6}>
                            <Image
                                src={product?.image?.Valid ? product.image.String : "/placeholder.jpg"}
                                alt={product?.product_name}
                                fluid
                            />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush" className="d-flex">
                                <ListGroup.Item style={{ textAlign: "left" }}>
                                    <h3>{product?.product_name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item style={{ textAlign: "left" }}>
                                    <Rating
                                        value={getRandomInteger(3, 5)}
                                        text={`${getRandomInteger(50, 100)} reviews`}
                                        color="#dc994b"
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item style={{ textAlign: "left" }}>
                                    Price: ${product?.price}
                                </ListGroup.Item>
                                <ListGroup.Item style={{ textAlign: "justify" }}>
                                    Description: {product?.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item style={{ textAlign: "left" }}>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <span>${product?.price}</span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{ textAlign: "left" }}>
                                        <Row className="d-flex justify-content-between">
                                            <Col>Status:</Col>
                                            <Col>
                                                {product?.inventory > 0 ? "In Stock" : "Out of Stock"}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product?.inventory > 0 && (
                                        <ListGroup.Item style={{ textAlign: "left" }}>
                                            <Row className="d-flex justify-content-between align-items-center">
                                                <Col>Quantity</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        value={quantity}
                                                        onChange={(e) =>
                                                            setQuantity(Number(e.target.value))
                                                        }
                                                        style={{ appearance: "auto" }}
                                                    >
                                                        {[...Array(product.inventory).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item style={{ textAlign: "left" }}>
                                        <Row className="d-flex justify-content-between align-items-center">
                                            <Col>Select Order</Col>
                                            <Col xs="auto">
                                                <Form.Control
                                                    as="select"
                                                    value={selectedOrderID}
                                                    onChange={(e) =>
                                                        setSelectedOrderID(e.target.value)
                                                    }
                                                >
                                                    <option value="">Select an order</option>
                                                    {orders.map((orders) => (
                                                        <option key={orders.order_id} value={orders.order_id}>
                                                            Order {orders.order_id} - {orders.status}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            className="btn-block w-75"
                                            variant="dark"
                                            disabled={product?.inventory === 0 }
                                            onClick={addToCartHandler}
                                        >
                                            Add to order
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;
