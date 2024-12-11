import { useState, useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import Message from "../components/message";
import { listTopRatedProducts, deleteProduct } from "../action/productAction"; // Ensure deleteProduct is imported

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productTopRated = useSelector((state) => state.productTopRated) || {};
    const { loading = false, error, products = [] } = productTopRated;

    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        dispatch(listTopRatedProducts(1));
    }, [dispatch]);

    useEffect(() => {
        console.log("Top Products:", products); 
    }, [products]);

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
                    <h1>Top Products</h1>
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
