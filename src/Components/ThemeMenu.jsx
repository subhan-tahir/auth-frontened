import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import DarkModeSharpIcon from '@mui/icons-material/DarkModeSharp';
import { Box } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';


const ThemeMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { theme, setTheme } = useContext(ThemeContext); // Access theme and setTheme

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  // Handle setting the theme
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme); // Update the theme in context
    handleClose(); // Close the menu
  };

  return (
    <div>
    <Button
  id="basic-button"
  aria-controls={open ? 'basic-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
  onClick={handleClick}
  sx={{
    color: theme === 'light' ? 'white' : 'black',
    backgroundColor: theme === 'light' ? 'black' : 'white',
    display: 'flex',
    gap: '5px',
    borderRadius: '20px',
    paddingInline: '15px',
    paddingBlock: '7px',
  }}
>
  {theme === 'light' ? 'Light' : 'Dark'}
  <ExpandMoreSharpIcon
    sx={{
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)', // Corrected rotation logic
      transition: 'transform 0.3s ease', // Smooth transition for the rotation
    }}
  />
</Button>
      <Box sx={{ width: '' }}>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{ top: '10px', width: '100%' }}
        >
          <MenuItem
            onClick={() => handleThemeChange('light')}
            sx={{ padding: '5px', paddingRight: '30px', display: 'flex', gap: '10px' }}
          >
            <LightModeSharpIcon sx={{ fontSize: '20px' }} />
            Light
          </MenuItem>
          <MenuItem
            onClick={() => handleThemeChange('dark')}
            sx={{ padding: '5px', display: 'flex', gap: '10px' }}
          >
            <DarkModeSharpIcon sx={{ fontSize: '20px' }} />
            Dark
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default ThemeMenu;
