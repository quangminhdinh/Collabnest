import React, {Component} from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withStyles, Card, CardContent, Button, TextField, Grid } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Layout from '../components/LayoutN';

import {withFirebase} from '../components/Firebase';
import * as ROUTES from '../components/constants/routes';

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        minWidth: 275,
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
  
const INITIAL_STATE = {
    email: '',
    pass: '',
    emailError: null,
    passError: null
};

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        if (localStorage.getItem('authUser')) {
            this.props.history.push('/');
        }
    }

    onChange = event => {
        this.setState({
            emailError: null,
            passError: null,
            [event.target.name]: event.target.value
        });
    }

    onSubmit = () => {
        const { email, pass } = this.state;
        // Handle
        this.props.firebase
            .doSignInWithEmailAndPassword(email, pass)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push('/');
            })
            .catch(error => {
                switch(error.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-not-found':
                        this.setState({ emailError: error.message });
                        break;
                    case 'auth/wrong-password':
                        this.setState({ passError: error.message });
                        break;
                    default:
                        alert(error.message);
                }
            });
    }

    render() {
        const { classes } = this.props;
        const { email, pass, emailError, passError } = this.state;

        const isInvalid = pass.trim() === '' || email.trim() === '';

        return (
            <Layout>
                {/* <img src={banner}/> */}
                <Grid container>
                    <Grid item md={4}>
                    </Grid>
                    <Grid className="g1-lgn" item md={4}>
                    <Card className={classes.root}>
                    <CardContent className="auth-ls">
                        <div className="card-title">Sign in to Collabnest</div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField error={!!emailError} 
                                        helperText={emailError} 
                                        onChange={this.onChange} 
                                        fullWidth 
                                        className="tf-clgn" 
                                        type="email" 
                                        name="email" 
                                        value={email} 
                                        label="Email" />
                            <TextField error={!!passError} 
                                        helperText={passError} 
                                        onChange={this.onChange} 
                                        fullWidth 
                                        className="tf-clgn" 
                                        type="password" 
                                        name="pass" 
                                        value={pass} 
                                        label="Password" />
                        </form>
                        <div className="d-flex justify-content-center">
                            <Button disabled={isInvalid} onClick={this.onSubmit} variant="contained">Sign in</Button>
                        </div>
                        <div className="cr-lgn">
                            <Link component={RouterLink} to={ROUTES.SIGN_UP}>Create an Collabnest account</Link>
                        </div>
                    </CardContent>
                    </Card>
                    </Grid>
                    <Grid item md={4}>
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    withFirebase
)(SignIn);