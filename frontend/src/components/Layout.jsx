import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Navigation */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Pane */}
            <div className="flex-1 flex flex-col min-w-0 md:pl-64">
                <TopBar toggleSidebar={toggleSidebar} />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
