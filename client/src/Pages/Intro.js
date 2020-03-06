import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Helmet} from "react-helmet";
import NavBar from '../Components/NavBar';
// import banner from '../assets/img/v2.jpg';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
}));

const Intr = props => {
    const classes = useStyles();
    return (
        <div>
            <Helmet>
                <title>Collabnest</title>
            </Helmet>
            <NavBar></NavBar>
            <section className="banner">
                {/* <img src={banner}/> */}
                <h1 className="bn-cap">Collabnest</h1>
                <div className="bn-but">
                    <Button className={classes.margin} variant="contained" color="primary" size="large" component={RouterLink} to="/signin">Get started</Button>
                </div>
            </section>
        </div>
    );

}

export default Intr;