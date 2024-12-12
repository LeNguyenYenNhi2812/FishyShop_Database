import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import Loader from "../components/loader";
import Message from "../components/message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkout";
import { listOrders, removeOrder } from "../action/orderAction";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import axios from "axios";

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);
    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, error, success } = orderCreate;
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.orderList);
    const { loading: loadingOrders, error: errorOrders, orders } = orderList;
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [userId, setUserId] = useState(null);
    const [selectedOrderID, setSelectedOrderID] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState(null);
    
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    // Fetch user profile and orders
    useEffect(() => {
        const fetchUserProfileAndOrders = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/profile/${userInfo.username}`);
                setUserId(response.data.user_id);
                setLoadingProfile(false);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
                setErrorProfile("Failed to fetch user profile.");
                setLoadingProfile(false);
            }
        };
        
        if (userInfo?.username) {
            fetchUserProfileAndOrders();
        }
    }, [userInfo]);

    // Fetch orders when userId is available
    useEffect(() => {
        if (userId) {
            dispatch(listOrders(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        // Automatically updates filteredOrders when orders change
        setFilteredOrders(orders);
    }, [orders]);

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}/`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, order, navigate, dispatch]);

    const handleSetOrderID = (e) => {
        setSelectedOrderID(e.target.value);
    };

    const handleDeleteOrder = (orderId) => {
        dispatch(removeOrder(orderId));
        setSelectedOrderID("");
        alert(`Order with ID ${orderId} has been deleted!`);
        window.location.reload();

    };

    const placeOrder = () => {
        alert("Order Placed");
        // Add logic to place the order
    };

    cart.itemsPrice = cart.cartItems
        .reduce((acc, item) => acc + item.Price * item.quantity, 0)
        .toFixed(2);

    cart.shippingPrice = (
        cart.itemsPrice > 5000
            ? 0
            : cart.itemsPrice > 4000
            ? 10
            : cart.itemsPrice > 3000
            ? 15
            : cart.itemsPrice > 2000
            ? 20
            : 30
    ).toFixed(2);

    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice)
    ).toFixed(2);

    // Ensure orders is an array before using .find()
    const selectedOrder = Array.isArray(orders) 
        ? orders.find((order) => order?.order_id == selectedOrderID) 
        : null;

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <Row>
                <Col md={8}>
                    {loadingProfile ? (
                        <Loader />
                    ) : errorProfile ? (
                        <Message variant="danger">{errorProfile}</Message>
                    ) : (
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex flex-column mt-1" style={{ textAlign: "left" }}>
                                <h2>Select Order</h2>
                                <Form.Control
                                    as="select"
                                    value={selectedOrderID}
                                    onChange={handleSetOrderID}
                                >
                                    <option value="">Select an order</option>
                                    {orders?.map((order) => (
                                        <option key={order.order_id} value={order.order_id}>
                                            Order {order.order_id} - {order.status}
                                        </option>
                                    ))}
                                </Form.Control>
                            </ListGroup.Item>

                            {selectedOrder ? (
                                <>
                                    <ListGroup.Item className="d-flex flex-column mt-1" style={{ textAlign: "left" }}>
                                        <h2>Shipping</h2>
                                        <p><span>Shipping: </span>{selectedOrder.shipping_fee ?? 'Not Available'}</p>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex flex-column mt-1" style={{ textAlign: "left" }}>
                                        <h2>Payment Method</h2>
                                        <p><span>Payment Method: </span>{selectedOrder.payment_type ?? 'Not Available'}</p>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex flex-column mt-1" style={{ textAlign: "left" }}>
                                        <h2>Order Items</h2>
                                        {selectedOrder.items?.length > 0 ? (
                                            <ListGroup variant="flush">
                                                {selectedOrder.items.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                {/* Optionally, you can display item image here */}
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`} className="text-decoration-none text-dark">
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.quantity} x ${item.price} = {(item.price * item.quantity).toFixed(2)}$
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <Message variant="info">No items in this order</Message>
                                        )}
                                    </ListGroup.Item>
                                </>
                            ) : (
                                <Message variant="info">Please select an order to view details</Message>
                            )}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Item</Col>
                                    <Col>${selectedOrder?.amount || 0}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${selectedOrder?.shipping_fee || 0}</Col> 
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ textAlign: "left" }}>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${(selectedOrder?.amount || 0) + (selectedOrder?.shipping_fee || 0)}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    variant="dark"
                                    style={{ minWidth: "75%" }}
                                    className="mt-1 mb-1"
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    variant="danger"
                                    style={{ minWidth: "75%" }}
                                    className="mt-1 mb-1"
                                    onClick={() => handleDeleteOrder(selectedOrderID)}
                                    disabled={!selectedOrderID}
                                >
                                    Delete Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PlaceOrderScreen;
