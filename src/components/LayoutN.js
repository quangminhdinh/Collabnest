import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Toolbar, Container, Button, Box } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import logo from '../assets/img/TabLogo.png';
import * as ROUTES from './constants/routes';

const useStyles = makeStyles(theme => ({
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

const LayoutN = ({children}) => {
    const classes1 = useStyles();
    return (
      <React.Fragment>
        <div className={classes1.root}>
        <AppBar color="transparent" position="static">
            <Container>
            <Toolbar>
            <Box p={1} className={classes1.title}>
            <Link component={RouterLink} to={ROUTES.HOME}>
                <img height='30px' src={logo} alt="logo"/> 
                {/* <span className="bn-lgo align-middle">Collabnest</span> */}
            </Link>
            </Box>
            <Button className="bn12" component={RouterLink} to={ROUTES.SIGN_IN}>Sign in</Button>
            <Button className="bn12" component={RouterLink} to={ROUTES.SIGN_UP}>Create account</Button>
            </Toolbar>
            </Container>
        </AppBar>
        </div>
        <section className="banner">
          {children}
        </section>
          <footer className="f-int">© 2020 <a href="https://www.facebook.com/minh.dinh.112" rel="noopener noreferrer" target="_blank">Minh Dinh</a>, All rights reserved.</footer>
      </React.Fragment>
    );
}

export default LayoutN;