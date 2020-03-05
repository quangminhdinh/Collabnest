import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import logo from '../assets/img/v32.jpg';

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

const NavBar = props => {
    const classes1 = useStyles();
    return (
        <div className={classes1.root}>
        <AppBar color="transparent" position="static">
            <Container>
            <Toolbar>
            <Typography variant="h6" className={classes1.title}>
            <Link component={RouterLink} to="/">
                <img height='40px' src={logo} alt="logo"/> <span className="bn-lgo align-middle">Collabnest</span>
            </Link>
            </Typography>
            <Button className="bn12" component={RouterLink} to="/signin">Sign in</Button>
            <Button className="bn12" component={RouterLink} to="/signup">Create account</Button>
            </Toolbar>
            </Container>
        </AppBar>
        </div>
    );
}

export default NavBar;