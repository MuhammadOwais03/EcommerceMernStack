import React, { useEffect, useState } from "react";
import "../../components/styles/profile.css";

const ProfilePage = ({userData}) => {

    const [customer, setCustomer] = useState({});
     
        useEffect(() => {
            setCustomer(userData);
        }, [userData]);

      console.log(userData)
      
  return (
    <div className="customer-profile-container">
      <div className="customer-profile-card">
        <img
          className="customer-profile-avatar"
          src={customer.avatar || "https://via.placeholder.com/150"}
          alt={`${customer.name}'s avatar`}
        />
        <h1 className="customer-profile-name">{customer.name}</h1>
        <p className="customer-profile-email">Email: {customer.email}</p>
        <p className="customer-profile-phone">Phone: {customer.phone}</p>
        
        <p className="customer-profile-joined">
          Joined on: {new Date(customer.createdAt).toLocaleDateString()}
        </p>
        <button className="customer-profile-edit-btn">Update Information</button>
      </div>
    </div>
  );
};

export default ProfilePage;
