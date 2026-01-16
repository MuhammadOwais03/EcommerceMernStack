// import React, { useState, useEffect } from 'react';
// import '../../components/styles/product.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchData, stack } from '../../server';
// import { toast } from 'react-toastify';

// export const Product = ({ setMenuOpen, userId, setCartCount, setUserData, userData }) => {
//     const { id } = useParams();
//     const [mainImage, setMainImage] = useState('');
//     const [product, setProduct] = useState({});
//     const [sizes, setSizes] = useState([]); // To store parsed sizes
//     const [selectedSize, setSelectedSize] = useState(''); // Store selected size
//     const navigation = useNavigate();


//     useEffect(()=>{
//         setMenuOpen(false)
//     },[])

//     useEffect(() => {
//         const data = { id: id };

//         fetchData('products/single-product', data, 'POST')
//             .then((response) => {
//                 setProduct(response.product);
//                 setMainImage(response.product.images[0]);
//             })
//             .catch((error) => {
//                 console.error('Error fetching product:', error);
//             });
//     }, [id]);

//     useEffect(() => {
//         if (product.sizes && product.sizes.length > 0) {
//             // Assuming sizes is an array with a stringified array inside it
//             const sizesJsonString = product.sizes[0];
//             try {
//                 const sizesArray = JSON.parse(sizesJsonString); // Parse the JSON string
//                 setSizes(sizesArray); // Store parsed sizes in state
//             } catch (error) {
//                 console.error('Error parsing sizes:', error);
//             }
//         }
//     }, [product]);

//     const handleAddToCart = async () => {
//         const accessToken = localStorage.getItem('accessToken');
//         if (!accessToken) {
//             toast.error('Please login to add to cart');
//             stack.push('/product/' + id); // Store the current route
//             navigation('/sign/login'); // Redirect to the login page
//             return;
//         }

//         if (!selectedSize) {
//             toast.error('Please select a size before adding to cart');
//             return;
//         }


//         console.log('Adding product to cart with size:', selectedSize, localStorage.getItem('userId'));

//         const data = {
//             userId: userId || localStorage.getItem('userId'),
//             productId: id,
//             sizeType: selectedSize,
//         };

//         console.log(data)

//         fetchData('cart/add-to-cart', data, 'POST', accessToken)
//             .then((response) => {
//                 console.log("API Response:", response);

//                 if (response.status === 200) {
//                     setCartCount(response.cartCount); // Update cart count
//                     console.log("1 - Cart count updated");

//                     const updatedUserData = {
//                         ...userData, // Clone existing userData
//                         cartData: response.cartData, // Update cart data
//                     };
//                     console.log("2 - Updated userData:", updatedUserData);

//                     setUserData(updatedUserData); // Update state with new data
//                     console.log("3 - User data state updated");
                    
//                     toast.success('Product added to cart');
//                 }

//                 else if (response.statusCode === 401) {
//                     alert('Please login to add to cart');
//                     stack.push(`/product/${id}`); // Save the current route
//                     navigation('/sign'); // Redirect to login
//                 }

//                 else {
//                     alert(response.message || 'Something went wrong'); // Show error message
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error adding product to cart:", error);
//                 alert("An error occurred while adding the product. Please try again.");
//             });


//     };

//     const handleSizeSelect = (size) => {

//         setSelectedSize(size); // Update the selected size
//     };

//     if (!product.name) {
//         return <div>Loading product details...</div>;
//     }

//     return (
//         <div className="product-detail-container">
//             <div className="product-images-container">
//                 <div className="all-images">
//                     {product.images?.map((image, index) => (
//                         <div className="img-onside" key={index} onClick={() => setMainImage(image)}>
//                             <img src={image} alt={`Product Image ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//                 <div className="main-image">
//                     <img src={mainImage} alt={product.name} />
//                 </div>
//             </div>
//             <div className="product-detail">
//                 <h1 className="product-name">{product.name}</h1>
//                 <p className="product-price">${product.price}</p>
//                 <p className="product-description">{product.description}</p>
//                 <div className="size-selection">
//                     <p>Select Size</p>
//                     <div className="size-options">
//                         {sizes?.map((size, index) => (
//                             <div
//                                 key={index}
//                                 className={`size-option ${selectedSize === size ? 'selected' : ''}`}
//                                 onClick={() => handleSizeSelect(size)}
//                             >
//                                 {size}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="cart-btn">
//                     <button onClick={handleAddToCart} disabled={!selectedSize}>
//                         Add to Cart
//                     </button>
//                 </div>
//                 <hr />
//                 <p style={{ fontSize: "14px", color: "#8a8e91" }}>
//                     100% Original product. <br />
//                     Cash on delivery is available on this product. <br />
//                     Easy return and exchange policy within 7 days.
//                 </p>
//             </div>
//         </div>
//     );
// };


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData, stack } from '../../server';
import { toast } from 'react-toastify';

export const Product = ({ setMenuOpen, userId, setCartCount, setUserData, userData }) => {
    const { id } = useParams();
    const [mainImage, setMainImage] = useState('');
    const [product, setProduct] = useState({});
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
        setMenuOpen(false);
    }, []);

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
            const sizesJsonString = product.sizes[0];
            try {
                const sizesArray = JSON.parse(sizesJsonString);
                setSizes(sizesArray);
            } catch (error) {
                console.error('Error parsing sizes:', error);
            }
        }
    }, [product]);

    const handleAddToCart = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            toast.error('Please login to add to cart');
            stack.push('/product/' + id);
            navigation('/sign/login');
            return;
        }

        if (!selectedSize) {
            toast.error('Please select a size before adding to cart');
            return;
        }

        console.log('Adding product to cart with size:', selectedSize, localStorage.getItem('userId'));

        const data = {
            userId: userId || localStorage.getItem('userId'),
            productId: id,
            sizeType: selectedSize,
        };

        console.log(data);

        fetchData('cart/add-to-cart', data, 'POST', accessToken)
            .then((response) => {
                console.log("API Response:", response);

                if (response.status === 200) {
                    setCartCount(response.cartCount);
                    console.log("1 - Cart count updated");

                    const updatedUserData = {
                        ...userData,
                        cartData: response.cartData,
                    };
                    console.log("2 - Updated userData:", updatedUserData);

                    setUserData(updatedUserData);
                    console.log("3 - User data state updated");
                    
                    toast.success('Product added to cart');
                }
                else if (response.statusCode === 401) {
                    alert('Please login to add to cart');
                    stack.push(`/product/${id}`);
                    navigation('/sign');
                }
                else {
                    alert(response.message || 'Something went wrong');
                }
            })
            .catch((error) => {
                console.error("Error adding product to cart:", error);
                alert("An error occurred while adding the product. Please try again.");
            });
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    if (!product.name) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-black mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading product details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    
                    {/* Product Images Section */}
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                        {/* Thumbnail Images */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto">
                            {product.images?.map((image, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => setMainImage(image)}
                                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg  cursor-pointer border-2 transition-all duration-300 bg-white border-white `}
                                >
                                    <img 
                                        src={image} 
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1  overflow-hidden">
                            <div className="aspect-[3/4] md:aspect-square">
                                <img 
                                    src={mainImage} 
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="flex flex-col">
                        {/* Product Name */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 font-medium">(4.8) 2.5k reviews</span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                ${product.price}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-base leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Size Selection */}
                        <div className="mb-8">
                            <p className="text-base font-semibold text-gray-900 mb-4">Select Size</p>
                            <div className="flex flex-wrap gap-3">
                                {sizes?.map((size, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSizeSelect(size)}
                                        className={`px-6 py-3 rounded-lg border-2 font-semibold text-sm transition-all duration-300 ${
                                            selectedSize === size
                                                ? 'bg-black text-white border-black shadow-lg scale-105'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-black hover:scale-105'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button 
                            onClick={handleAddToCart} 
                            disabled={!selectedSize}
                            className={`w-full py-4 rounded-full font-bold text-base transition-all duration-300 mb-8 ${
                                selectedSize
                                    ? 'bg-black text-white hover:bg-gray-900 hover:shadow-xl hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {selectedSize ? 'Add to Cart' : 'Please Select a Size'}
                        </button>

                        {/* Divider */}
                        <div className="w-full h-px bg-gray-200 mb-6"></div>

                        {/* Product Info */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-sm text-gray-600">100% Original product.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-sm text-gray-600">Cash on delivery is available on this product.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-sm text-gray-600">Easy return and exchange policy within 7 days.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};