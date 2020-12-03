import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

const Layout = props => {
  const { children } = props;
  return (
    <>
      <Toolbar />
      <SideDrawer />
      <main className={classes.Content}>
        { children }
      </main>
    </>
  );
};

export default Layout;
