import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import { makeStyles, Button } from '@material-ui/core';
import Layout from '../components/LayoutN';
import logo from '../assets/img/3.png';
import * as ROUTES from '../components/constants/routes';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
}));

const Landing = () => {
    const classes = useStyles();
    return (
        <Layout>
            {/* <img src={banner}/> */}
            {/* <h1 className="bn-cap">CollabNest</h1> */}
            <div className="bn-capln">
                <img src={logo} className="bn-cap" alt="CollabNest"/>
            </div>
            <div className="bn-but">
                <Button className={classes.margin} variant="contained" color="primary" size="large" component={RouterLink} to={ROUTES.SIGN_IN}>Get started</Button>
            </div>
        </Layout>
    );

}

export default Landing;