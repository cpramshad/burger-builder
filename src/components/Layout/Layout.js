import React from 'react';
import classes from './Layout.module.css';

const Layout = (props) => (
    <React.Fragment>
        <div>Toolbar, Sidebar, Backdrop</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </React.Fragment>
);

export default Layout;