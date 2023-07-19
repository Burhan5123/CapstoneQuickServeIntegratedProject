import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SidebarMobile from './Sidebar-mobile';
import Contents from './Contents';

// Combination of all of the components for admin panel
function Admin_Panel() {
    return (
        <>
        <Navbar />
        <SidebarMobile />
        <Contents />
        <Sidebar /> 
        </>
    );
}

export default Admin_Panel;