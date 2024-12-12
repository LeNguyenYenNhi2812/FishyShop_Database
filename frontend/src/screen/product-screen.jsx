import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import Rating from "../components/rating";
import { listProductDetails } from "../action/productAction";
import { listOrders, createOrder, updateOrder } from "../action/orderAction";
import axios from "axios";

const ProductScreen = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedOrderID, setSelectedOrderID] = useState("");
    const [userId, setUserId] = useState(null);

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    // Redux state selectors
    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const orderList = useSelector((state) => state.orderList);
    const { loading: loadingOrders, error: errorOrders, orders = [] } = orderList;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Fetch user ID and orders
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/profile/${userInfo.username}`);
                setUserId(response.data.user_id);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUserProfile();
    }, [userInfo]);

    useEffect(() => {
        if (userId) {
            dispatch(listOrders(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    // Handlers
    const handleCreateOrder = async () => {
        const newOrder = {
            item_id: getRandomInteger(100, 1000),
            product_id: product?.product_id,
            shop_id: product?.shop_id,
            quantity,
            shipping_fee: 30,
            user_id: userId,
            payment_type: "CreditCard",
        };
        try {
            await dispatch(createOrder(newOrder));
            return newOrder.order_id;
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const handleUpdateOrder = async (order_id) => {
        const updatedOrder = {
            order_id,
            item_id: getRandomInteger(1000, 2000),
            product_id: product?.product_id,
            shop_id: product?.shop_id,
            quantity,
            shipping_fee: 40,
            user_id: userId,
            status: "Processing",
            payment_type: "Online",
        };
        try {
            await dispatch(updateOrder(order_id, updatedOrder));
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const addToCartHandler = async () => {
        let finalOrderID = selectedOrderID;

        if (!selectedOrderID) {
            try {
                finalOrderID = await handleCreateOrder();
            } catch (error) {
                console.error("Error creating order:", error);
                return;
            }
        } else {
            try {
                await handleUpdateOrder(selectedOrderID);
            } catch (error) {
                console.error("Error updating order:", error);
                return;
            }
        }

        alert("Product added to the cart!");
        window.location.reload();
    };

    // Helper function
    const getRandomInteger = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

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
                <Row>
                    <Col md={6}>
                        <Image
                            src={product?.image?.Valid ? product.image.String : "/placeholder.jpg"}
                            alt={product?.product_name}
                            fluid
                        />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product?.product_name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={getRandomInteger(3, 5)}
                                    text={`${getRandomInteger(50, 100)} reviews`}
                                    color="#dc994b"
                                />
                            </ListGroup.Item>
                            <ListGroup.Item style={{ textAlign: "left" }}>
                                Price: ${product?.price}
                            </ListGroup.Item>
                            <ListGroup.Item style={{ textAlign: "left" }}>
                                Description: {product?.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product?.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product?.inventory > 0 ? "In Stock" : "Out of Stock"}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {product?.inventory > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity</Col>
                                            <Col xs="auto">
                                                <Form.Control
                                                    as="select"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(Number(e.target.value))}
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
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Select Order</Col>
                                        <Col xs="auto">
                                            {loadingOrders ? (
                                                <Loader />
                                            ) : errorOrders ? (
                                                <Message variant="danger">{errorOrders}</Message>
                                            ) : (
                                                <Form.Control
                                                    as="select"
                                                    value={selectedOrderID}
                                                    onChange={(e) => setSelectedOrderID(e.target.value)}
                                                >
                                                    <option value="">
                                                        {orders.length === 0 ? "No orders available" : "Select an order"}
                                                    </option>
                                                    {orders.map((order) => (
                                                        <option key={order.order_id} value={order.order_id}>
                                                            Order {order.order_id} - {order.status}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item className="text-center">
                                    <Button
                                        className="btn-block w-75"
                                        variant="dark"
                                        disabled={product?.inventory === 0}
                                        onClick={addToCartHandler}
                                    >
                                        Add to order
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default ProductScreen;
