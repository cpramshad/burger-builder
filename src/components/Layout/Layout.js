import React from 'react';
import classes from './Layout.module.css';

const Layout = props => {
  const { children } = props;
  return (
    <>
      <div>Toolbar, Sidebar, Backdrop</div>
      <main className={classes.content}>
        { children }
      </main>
    </>
  );
};

export default Layout;
