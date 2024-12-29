import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.5rem', color: 'black' }} />
                <span>Add Items</span>
            </Link>
            <Link
                to="/list"
                className={`sidebar-link ${activeLink === 'list' ? 'active' : ''}`}
                onClick={() => handleActiveLink('list')}
            >
                <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '1.5rem', color: 'black' }} />
                <span>List Items</span>
            </Link>
            <Link
                to="/orders"
                className={`sidebar-link ${activeLink === 'orders' ? 'active' : ''}`}
                onClick={() => handleActiveLink('orders')}
            >
                <FontAwesomeIcon icon={faClipboardList} style={{ fontSize: '1.5rem', color: 'black' }} />
                <span>Orders</span>
            </Link>
        </>
    );
};
