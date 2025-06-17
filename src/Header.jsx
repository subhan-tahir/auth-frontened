import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Sidebar from './Components/Sidebar';
import ThemeMenu from './Components/ThemeMenu';
import { ThemeContext } from './context/ThemeContext'; // Import ThemeContext

const Header = () => {
    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);
    const { theme } = useContext(ThemeContext); // Access the theme from context

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        setUser(storedUser);
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        console.log('User logged out');
    };

    // Toggle function for the sidebar
    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };

    const menu = [
        { item: 'Home', href: '/' },
        { item: 'About', href: '/about' },
        { item: 'Products', href: '/products' },
    ];

    return (
        <>
            {/* Apply the theme dynamically using the context */}
            <div
                className={`w-full h-[90px] z-50 absolute top-0  border-b flex justify-between items-center p-4 gap-5 transition-colors duration-300 ${theme === 'dark' ? 'bg-black text-white  border-white' : 'bg-white text-black border-b-black'
                    }`}
            >
                {/* Display Username */}
                <div className='flex-1'>
                    <h1 className="md:text-[1.8rem] text-[1rem]">
                        {user ? (
                            <span className="font-bold">Welcome, {user.slice(0, 30)}!</span>
                        ) : (
                            <span className="text-red-500">Failed to load user data</span>
                        )}
                    </h1>
                </div>

                {/* Navigation Menu */}
                <div className="md:flex hidden">
                    <ul className="sm:gap-[3rem] flex-1 font-[600] font-sans flex  items-center">
                        {menu.map((items, index) => (
                            <Link to={items.href} key={index}>
                                <li
                                    className="cursor-pointer sm:text-[19px] hover:text-gray-400 transition-all duration-300 text-xl ease-in-out font-bold"
                                >
                                    {items.item}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className="">

                    <Link to="/login" className="md:flex hidden">

                        <button
                            className={`cursor-pointer hover:text-gray-400 transition-all duration-300 ease-in-out font-bold rounded-[35px] px-4 py-2 border ${theme === 'dark'
                                    ? 'bg-white text-black hover:bg-gray-100'
                                    : 'bg-black text-white hover:bg-gray-800'
                                }`}
                            onClick={logoutHandler}
                        >
                            Log out
                        </button>
                    </Link>
                    
                </div>
                <div className='flex items-center'>
                <div>
                        <ThemeMenu />
                    </div>
                {/* Mobile Menu Button */}
                <Button onClick={() => toggleDrawer(true)} className="md:!hidden flex">
                    <MenuIcon sx={{ fontSize: 40, color: theme === 'dark' ? 'white' : 'black' }} />
                </Button>

                </div>
            </div>

            {/* Sidebar Component */}
            <Sidebar open={open} toggleDrawer={toggleDrawer} />
        </>
    );
};

export default Header;
