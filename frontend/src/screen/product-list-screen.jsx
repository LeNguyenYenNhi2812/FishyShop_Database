import { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import Message from "../components/message";
import { listTopRatedProducts, deleteProduct } from "../action/productAction";
import axios from "axios";

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productTopRated = useSelector((state) => state.productTopRated) || {};
    const { loading = false, error, products = [] } = productTopRated;

    const [deleting, setDeleting] = useState(false);
    const [userId, setUserId] = useState(null);  // State to store userId

    // Get username from localStorage (assuming userInfo contains only username)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userID = userInfo?.username;

    useEffect(() => {
        if (userID) {
            const fetchUserProfileAndOrders = async () => {
                try {
                    // Fetch user profile using username to get userId
                    const response = await axios.get(`http://127.0.0.1:8080/api/profile/${userID}`);
                    const userId = response.data.user_id;
                    setUserId(userId); // Store userId in state
                    console.log("userId:", userId);

                    // Dispatch action to fetch user's products based on userId
                    dispatch(listTopRatedProducts(userId));
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            };

            fetchUserProfileAndOrders();
        }
    }, [dispatch, userID]);

    const deleteHandler = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setDeleting(true);
            dispatch(deleteProduct(productId));
            setDeleting(false);
        }
    };

    const createHandler = () => {
        navigate("/seller/product/create");
    };

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>List Product of shop</h1>
                </Col>
                <Col className="text-right">
                    <Button variant="primary" onClick={createHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Inventory</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.inventory}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        className="btn-sm"
                                        onClick={() =>
                                            navigate(`/seller/product/${product.productId}/edit`)
                                        }
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(product.productId)}
                                        disabled={deleting}
                                    >
                                        {deleting ? (
                                            <i className="fas fa-spinner fa-spin"></i>
                                        ) : (
                                            <i className="fas fa-trash"></i>
                                        )}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProductListScreen;
