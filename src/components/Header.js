import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/bbc.png'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UserFavDropDown from './UserFavDropDown'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({news}) => {
  const navbarLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sports', path: '/categories/sports' },
    { name: 'Entertainment', path: '/categories/entertainment' },
    { name: 'Politics', path: '/categories/politics' }
  ]
  const [menuCount, setMenuCount] = useState(1)

  const classes = useStyles();
  console.log()
  return (
    <div>
      <div id='site-logo'>
        <img src={logo} alt="logo" />
        <h1>Online News Portal</h1>
      </div>

      <AppBar position="static">
        <Toolbar>
          
          {/*<Typography variant="h6" className={classes.title}>
            News
          </Typography>*/}
          <div style={{alignItems: 'center', margin: 'auto'}}>
          {navbarLinks.map((link, i) => (
            <Fragment key={i}>
              <Link to={link.path}><Button color="inherit">{link.name}</Button></Link>
            </Fragment>
          ))}
          </div>
          <div className="UserMenu" onMouseOver={() => setMenuCount(menuCount+1)}>
            <Link to={'/favourites'}>
            <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
              <AccountCircle />
            </IconButton>
            </Link>
            <div className="dropDownBox">
                <UserFavDropDown news={news} menuCount={menuCount} onClose={() => setMenuCount(1)} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header