import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const cart = useSelector((state: any) => state.root.cart);
  const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
  const totalCost = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Shoply
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', marginRight: 2 }}>
            Home
          </Typography>
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              (${totalCost.toFixed(2)})
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;