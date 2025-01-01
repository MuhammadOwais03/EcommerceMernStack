import React from "react";
import "./styles/productList.css";

const ProductList = ({ products, handleDelete }) => {
    console.log(products);

    return (
        <div className="product-list">
            <h2>All Products List</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>
                                <img src={product.images[0]} alt={product.name} className="product-image" />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
