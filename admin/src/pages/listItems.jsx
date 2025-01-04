import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

const backend_url = "https://exclusive-backend-one.vercel.app/api"

const ListItems = ({ myLocalStorageValue }) => {
    const [products, setProducts] = useState(null); // `null` to track loading state
    const [isLoading, setIsLoading] = useState(true); // Loader state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${backend_url}/products/all-product`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${myLocalStorageValue}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data.products || []); // Ensure `data.products` is an array
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]); // Set empty products array on error
            } finally {
                setIsLoading(false); // Stop loader
            }
        };

        fetchData();
    }, [myLocalStorageValue]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${backend_url}/products/delete-product`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${myLocalStorageValue}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }), // Send the ID in the request body
            });

            if (response.ok) {
                console.log("Product deleted successfully");
                // Update the product list locally
                setProducts(products.filter((product) => product._id !== id));
            } else {
                console.error("Failed to delete product:", response.statusText);
            }
        } catch (error) {
            console.error("Error during delete:", error);
        }
    };

    return (
        <div>
            {isLoading ? (
                <h2>Loading products...</h2>
            ) : products.length === 0 ? (
                <h2>No products available</h2>
            ) : (
                <ProductList products={products} handleDelete={handleDelete} />
            )}
        </div>
    );
};

export default ListItems;
