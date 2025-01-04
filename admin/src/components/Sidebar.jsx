import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import download from '../assets/download.png';
import order from '../assets/order.png';

import './styles/sidebar.css';

export const Sidebar = () => {
    // State to track the active link
    const [activeLink, setActiveLink] = useState('add');

    // Handler to set the active link
    const handleActiveLink = (link) => {
        setActiveLink(link);
    };

    return (
        <>
            <Link
                to="/add"
                className={`sidebar-link ${activeLink === 'add' ? 'active' : ''}`}
                onClick={() => handleActiveLink('add')}
            >
                {/* <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.5rem', color: 'black' }} /> */}
                <img src={download} alt="" width={20} height={20}/>
                <span>Add Items</span>
            </Link>
            <Link
                to="/list"
                className={`sidebar-link ${activeLink === 'list' ? 'active' : ''}`}
                onClick={() => handleActiveLink('list')}
            >
                {/* <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '1.5rem', color: 'black' }} /> */}
                <img src={order} alt="" width={20} height={20}/>
                <span>List Items</span>
            </Link>
            <Link
                to="/orders"
                className={`sidebar-link ${activeLink === 'orders' ? 'active' : ''}`}
                onClick={() => handleActiveLink('orders')}
            >
                {/* <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '1.5rem', color: 'black' }} /> */}
                <img src={order} alt="" width={20} height={20}/>
                <span>Orders</span>
            </Link>
        </>
    );
};
