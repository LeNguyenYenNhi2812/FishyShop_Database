import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../action/productAction";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Product from "../components/product";
import Message from "../components/message";
import Loader from "../components/loader.jsx";
import Banner from "../components/Banner/banner.jsx";
import Download from "../components/Download/download.jsx";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { error, loading, products } = productList;

    const [queryParameters] = useSearchParams();
    const keyword = queryParameters.get("keyword");

    // State cho form nhập liệu
    const [shop_id, setShopID] = useState("");
    const [star, setStars] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        dispatch(listProducts(keyword)); // No page parameter
    }, [dispatch, keyword]);

    // Hàm xử lý khi nhấn Confirm ở form Feedback
    const handleFeedbackSearch = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8080/seller/api/feedback", {
                shop_id,
                star,
            });
            console.log("Feedback results:", response.data);
            // Xử lý kết quả từ backend (nếu cần)
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
        }
    };

    // Hàm xử lý khi nhấn Confirm ở form Price
    const handlePriceSearch = async () => {
        try {
            const response = await axios.post("/api/products/price", {
                price,
            });
            console.log("Price results:", response.data);
            // Xử lý kết quả từ backend (nếu cần)
        } catch (error) {
            console.error("Error fetching products by price:", error);
        }
    };

    return (
        <div id="home">
            <Banner />
            <h1>Look For Reviewer's Feedbacks</h1>
            <h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    Input the ShopID you need to find: 
                    <input 
                        type="number" 
                        name="ShopID" 
                        value={shop_id} 
                        onChange={(e) => setShopID(e.target.value)}
                    />
                </form>
                <form onSubmit={(e) => e.preventDefault()}>
                    Input the upper bound of number of feedbacks's stars (1 - 5): 
                    <input 
                        type="number" 
                        name="NumberOfStars" 
                        min={1} 
                        max={5} 
                        value={star} 
                        onChange={(e) => setStars(e.target.value)}
                    />
                </form>
            </h3>
            <button onClick={handleFeedbackSearch}>
                Confirm
            </button>

            <h1>Look For Product's Price</h1>
            <h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    Input the price you need to look for product which has price exactly or more:
                    <input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                </form>
            </h3>
            <button onClick={handlePriceSearch}>
                Confirm
            </button>

            <h1 id="product">Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        {products.map((product) => (
                            <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            <Download />
        </div>
    );
};

export default HomeScreen;
