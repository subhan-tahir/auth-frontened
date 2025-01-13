import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, toggleDrawer }) => {
    const logoutHandler = () => {
        localStorage.removeItem('username');
        console.log('User logged out');
    };

    const menu = [
        { item: 'Home', href: '/' },
        { item: 'About', href: '/about' },
        { item: 'Products', href: '/products' },
    ];

    const DrawerList = (
        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
            <Box sx={{ width: 270 }} role="presentation" onClick={() => toggleDrawer(false)}>
                <List sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    {menu.map((text, index) => (
                        <Box key={index}>
                            <Link to={text.href}>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                        <ListItemText primary={text.item}  />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </Link>
                        </Box>
                    ))}

                    <div className="flex gap-3 items-center justify-center">
                        <Link to="/login">
                            <button
                                className="cursor-pointer hover:text-gray-400 transition-all duration-300 ease-in-out font-bold rounded-[35px] px-4 py-2 border bg-white text-black hover:bg-gray-100"
                                onClick={logoutHandler}
                            >
                                Log out
                            </button>
                        </Link>
                    </div>

                  
                </List>
            </Box>
        </Box>
    );

    return (
        <Drawer open={open} onClose={() => toggleDrawer(false)}>
            {DrawerList}
        </Drawer>
    );
};

export default Sidebar;
