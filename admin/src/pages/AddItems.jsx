import React, { useState } from "react";
import "../components/styles/additems.css"; // Import CSS
import upload from '../assets/upload.png'

const AddItems = () => {
    const [formData, setFormData] = useState({
        productName: "",
        productDescription: "",
        productCategory: "Men",
        subCategory: "Topwear",
        productPrice: "",
        productSizes: [],
        isBestseller: false,
        images: [null, null, null, null],
    });

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
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const newImages = [...formData.images];
                newImages[index] = reader.result;
                setFormData((prevData) => ({
                    ...prevData,
                    images: newImages,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // Handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div className="image-upload-section">
                <label>Upload Image</label>
                <div className="image-upload-container">
                    {formData.images.map((image, index) => (
                        <div key={index} className="image-upload-box">
                            <label htmlFor={`file-input-${index}`} className="upload-placeholder">
                                {image ? (
                                    <img src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
                                ) : (
                                    <img src={upload} alt="Upload Placeholder" className="upload-icon" />
                                )}
                            </label>
                            <input
                                id={`file-input-${index}`}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(index, e)}
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
