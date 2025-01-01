import React, { useState } from "react";
import "../components/styles/additems.css"; // Import CSS
import upload from '../assets/upload.png';

const AddItems = ({ myLocalStorageValue }) => {
    const [formData, setFormData] = useState({
        productName: "",
        productDescription: "",
        productCategory: "Men",
        subCategory: "Topwear",
        productPrice: "",
        productSizes: [],
        isBestseller: false,
    });

    const [images1, setImages1] = useState(null);
    const [images2, setImages2] = useState(null);
    const [images3, setImages3] = useState(null);
    const [images4, setImages4] = useState(null);

    const sizes = ["S", "M", "L", "XL", "XXL"];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSizeSelection = (size) => {
        setFormData((prevData) => {
            const sizes = prevData.productSizes.includes(size)
                ? prevData.productSizes.filter((s) => s !== size)
                : [...prevData.productSizes, size];
            return { ...prevData, productSizes: sizes };
        });
    };

    const handleImageUpload = (index, event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            if (index === 1) {
                setImages1(file); // Store the file, not the base64 string
            } else if (index === 2) {
                setImages2(file);
            } else if (index === 3) {
                setImages3(file);
            } else if (index === 4) {
                setImages4(file);
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an instance of FormData to handle file uploads
        const formDataToSubmit = new FormData();

        // Append form data fields (text inputs) to FormData
        formDataToSubmit.append("name", formData.productName);
        formDataToSubmit.append("description", formData.productDescription);
        formDataToSubmit.append("category", formData.productCategory);
        formDataToSubmit.append("subCategory", formData.subCategory);
        formDataToSubmit.append("price", formData.productPrice);
        formDataToSubmit.append("bestSellers", formData.isBestseller);
        formDataToSubmit.append("sizes", JSON.stringify(formData.productSizes));

        // Append images if they exist
        if (images1) formDataToSubmit.append("images1", images1);
        if (images2) formDataToSubmit.append("images2", images2);
        if (images3) formDataToSubmit.append("images3", images3);
        if (images4) formDataToSubmit.append("images4", images4);

        // Log FormData entries
        for (let [key, value] of formDataToSubmit.entries()) {
            console.log(key, value);
        }

        console.log(formData);


        // Make a POST request to the server
        fetch("http://localhost:5000/api/products/create", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${myLocalStorageValue}`,
            },
            body: formDataToSubmit,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Product added successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to add product!");
            });
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div className="image-upload-section">
                <label>Upload Image</label>
                <div className="image-upload-container">
                    {[images1, images2, images3, images4].map((image, index) => (
                        <div key={index} className="image-upload-box">
                            <label htmlFor={`file-input-${index + 1}`} className="upload-placeholder">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className="uploaded-image" />
                                ) : (
                                    <img src={upload} alt="Upload Placeholder" className="upload-icon" />
                                )}
                            </label>
                            <input
                                id={`file-input-${index + 1}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(index + 1, e)}
                                style={{ display: "none" }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label>Product Name</label>
                <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="Type here"
                />
            </div>
            <div>
                <label>Product Description</label>
                <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleInputChange}
                    placeholder="Write content here"
                />
            </div>
            <div>
                <label>Product Category</label>
                <select
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleInputChange}
                >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>
            <div>
                <label>Sub Category</label>
                <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                >
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Footwear">Footwear</option>
                </select>
            </div>
            <div>
                <label>Product Price</label>
                <input
                    type="number"
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleInputChange}
                    placeholder="25"
                />
            </div>
            <div>
                <label>Product Sizes</label>
                <div className="product-sizes">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => handleSizeSelection(size)}
                            className={
                                formData.productSizes.includes(size) ? "size-button selected" : "size-button"
                            }
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="isBestseller"
                        checked={formData.isBestseller}
                        onChange={handleInputChange}
                    />
                    Add to bestseller
                </label>
            </div>
            <button type="submit" className="submit-button">
                ADD
            </button>
        </form>
    );
};

export default AddItems;
