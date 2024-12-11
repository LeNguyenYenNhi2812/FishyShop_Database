import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../action/productAction'; // Adjust import path as needed
import Loader from '../components/loader';
import Message from '../components/message';

const CreateProductScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [inventory, setInventory] = useState('');

    // Access the productCreateReducers state
    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, success, product } = productCreate;

    useEffect(() => {
        if (success) {
            // Redirect to the product details page or another page after success
            navigate(`/seller/product/${product.productId}/edit`);
        }
    }, [navigate, success, product]);

    const submitHandler = (e) => {
        e.preventDefault();

        // Create product object to send to the action
        const productData = {
            shopID: 1,
            productName,
            price: parseFloat(price),  // Ensure price is a float
            quantity: parseInt(quantity), // Ensure quantity is an integer
            inventory: parseInt(inventory),
            description,
           
        };

        // Dispatch createProduct action
        dispatch(createProduct(productData));
    };

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Create Product</h1>
                </Col>
            </Row>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Product created successfully!</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="productName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="inventory">
                    <Form.Label>Inventory</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter inventory"
                        value={inventory}
                        onChange={(e) => setInventory(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Create Product
                </Button>
            </Form>
        </div>
    );
};

export default CreateProductScreen;
