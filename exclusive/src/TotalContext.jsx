import React, { createContext, useEffect, useState } from "react";

// Create the context
export const TotalContext = createContext();

// Create a provider component
export const TotalProvider = ({ children }) => {
    const [total, setTotal] = useState(0); // State to manage the total

    useEffect(() => {
        console.log("Total updated:", total);
    }, [total]);

    return (
        <TotalContext.Provider value={{ total, setTotal }}>
            {children}
        </TotalContext.Provider>
    );
};
