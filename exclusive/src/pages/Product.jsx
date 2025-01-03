import React, { useState, useEffect } from 'react';
import '../../components/styles/product.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, stack } from '../../server';
import { toast } from 'react-toastify';

export const Product = ({ setMenuOpen, userId, setCartCount, setUserData, userData }) => {
    const { id } = useParams();
    const [mainImage, setMainImage] = useState('');
    const [product, setProduct] = useState({});
    const [sizes, setSizes] = useState([]); // To store parsed sizes
    const [selectedSize, setSelectedSize] = useState(''); // Store selected size
    const navigation = useNavigate();


    useEffect(()=>{
        setMenuOpen(false)
    },[])

    useEffect(() => {
        const data = { id: id };

        fetchData('products/single-product', data, 'POST')
            .then((response) => {
                setProduct(response.product);
                setMainImage(response.product.images[0]);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    useEffect(() => {
        if (product.sizes && product.sizes.length > 0) {
            // Assuming sizes is an array with a stringified array inside it
            const sizesJsonString = product.sizes[0];
            try {
                const sizesArray = JSON.parse(sizesJsonString); // Parse the JSON string
                setSizes(sizesArray); // Store parsed sizes in state
            } catch (error) {
                console.error('Error parsing sizes:', error);
            }
        }
    }, [product]);

    const handleAddToCart = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            alert('Please login to add to cart');
            stack.push('/product/' + id); // Store the current route
            navigation('/sign'); // Redirect to the login page
            return;
        }

        if (!selectedSize) {
            alert('Please select a size before adding to cart');
            return;
        }


        console.log('Adding product to cart with size:', selectedSize, localStorage.getItem('userId'));

        const data = {
            userId: userId || localStorage.getItem('userId'),
            productId: id,
            sizeType: selectedSize,
        };

        console.log(data)

        fetchData('cart/add-to-cart', data, 'POST', accessToken)
            .then((response) => {
                console.log("API Response:", response);

                if (response.status === 200) {
                    setCartCount(response.cartCount); // Update cart count
                    console.log("1 - Cart count updated");

                    const updatedUserData = {
                        ...userData, // Clone existing userData
                        cartData: response.cartData, // Update cart data
                    };
                    console.log("2 - Updated userData:", updatedUserData);

                    setUserData(updatedUserData); // Update state with new data
                    console.log("3 - User data state updated");
                    
                    toast.success('Product added to cart');
                }

                else if (response.statusCode === 401) {
                    alert('Please login to add to cart');
                    stack.push(`/product/${id}`); // Save the current route
                    navigation('/sign'); // Redirect to login
                }

                else {
                    alert(response.message || 'Something went wrong'); // Show error message
                }
            })
            .catch((error) => {
                console.error("Error adding product to cart:", error);
                alert("An error occurred while adding the product. Please try again.");
            });


    };

    const handleSizeSelect = (size) => {

        setSelectedSize(size); // Update the selected size
    };

    if (!product.name) {
        return <div>Loading product details...</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-images-container">
                <div className="all-images">
                    {product.images?.map((image, index) => (
                        <div className="img-onside" key={index} onClick={() => setMainImage(image)}>
                            <img src={image} alt={`Product Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="main-image">
                    <img src={mainImage} alt={product.name} />
                </div>
            </div>
            <div className="product-detail">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description}</p>
                <div className="size-selection">
                    <p>Select Size</p>
                    <div className="size-options">
                        {sizes?.map((size, index) => (
                            <div
                                key={index}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cart-btn">
                    <button onClick={handleAddToCart} disabled={!selectedSize}>
                        Add to Cart
                    </button>
                </div>
                <hr />
                <p style={{ fontSize: "14px", color: "#8a8e91" }}>
                    100% Original product. <br />
                    Cash on delivery is available on this product. <br />
                    Easy return and exchange policy within 7 days.
                </p>
            </div>
        </div>
    );
};
