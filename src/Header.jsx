import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Sidebar from './Components/Sidebar';

const Header = () => {
    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        setUser(storedUser);
    }, []);
    const logoutHandler = () => {
        localStorage.removeItem('username');
        console.log('User logged out');
    };
    // Toggle function
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
            <div className="bg-black w-full h-[90px] z-50 absolute top-0 flex justify-between items-center text-white p-4 gap-5 ">
                {/* Display Username */}
                <div className=" ">
                    <h1 className="md:text-[1.8rem] text-[1rem]">
                        {user ? (
                            <span className="font-bold">Welcome, {user.slice(0,30)}!</span>
                        ) : (
                            <span className="text-red-500">Failed to load user data</span>
                        )}
                    </h1>
                </div>

                {/* Navigation Menu */}
                <div className="flex ">
                    <ul className="sm:gap-[3rem] flex-1 font-[600] font-sans md:flex hidden items-center">
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
                <div className="hidden gap-3 items-center justify-center md:flex ">
                    <Link to="/login">
                        <button
                            className="cursor-pointer hover:text-gray-400 transition-all duration-300 ease-in-out font-bold rounded-[35px] px-4 py-2 border bg-white text-black hover:bg-gray-100"
                            onClick={logoutHandler}
                        >
                            Log out
                        </button>
                    </Link>
                </div>
                {/* Mobile Menu Button */}
                <Button onClick={() => toggleDrawer(true)} className="md:!hidden flex">
                    <MenuIcon sx={{ fontSize: 40, color: 'white' }} />
                </Button>
            </div>

            {/* Sidebar Component */}
            <Sidebar open={open} toggleDrawer={toggleDrawer} />
        </>
    );
};

export default Header;
