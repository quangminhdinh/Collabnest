import React from 'react';
import {
    Card, Row, Col, CardBody,
    CardTitle, Input, Button, CardLink
  } from 'reactstrap';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {useForm} from 'react-hook-form';
import { createBrowserHistory } from 'history';
import {FirebaseContext} from '../Components/Firebase';
import NavBar from '../Components/NavBar';

const SignUp = props => {
    const { register, handleSubmit, watch, errors } = useForm();

    const addUser = e => {

        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const pass = document.getElementById('pass').value;

        props.firebase.auth.createUserWithEmailAndPassword(email, pass).then((authData) => {
            const user = props.firebase.auth.currentUser;
            user.updateProfile({
                displayName: username
            }).then(function() {
                // Update successful.
                const history = createBrowserHistory({forceRefresh: true});
                history.push('/');
            }).catch(function(error) {
                // An error happened.
                alert(error.message);
            });
        }).catch((error) => {
            // Handle Errors here.
            alert(error.message);
        });


        // var docRef = props.firebase.firestore.collection("users").doc(email);

        // docRef.get().then((doc) => {
        //     if (doc.exists) {
        //         alert("Email da ton tai!");
        //     } else {
        //         docRef.set({
        //             username : username,
        //             pass: pass,
        //             email: email
        //         }, {merge: true})
        //         .then(function() {
        //             console.log("Document successfully written!");
        //             localStorage.username = username;
        //             localStorage.pass = pass;
        //             localStorage.email = email;
        //             const history = createBrowserHistory({forceRefresh: true});
        //             history.push('/');
        //         })
        //         .catch(function(error) {
        //             console.error("Error writing document: ", error);
        //         });
        //     }
        // }).catch(function(error) {
        //     console.log("Error getting document:", error);
        // });
    }

    return (
        <div>
            <Helmet>
                <title>Sign Up - Collabnest</title>
            </Helmet>
            <NavBar></NavBar>
            <section className="banner">
                {/* <img src={banner}/> */}
                <div className="lgn-card">
                    <Row>
                        <Col md="4"></Col>
                        <Col md="4">
                            <Card>
                                <form onSubmit={handleSubmit(addUser)}>
                                    <CardBody className="auth-ls">
                                        <CardTitle>Create a new Collabnest account</CardTitle>
                                        
                                        <Input type="text" innerRef={register({required : 'Please enter your username', maxLength : {value : 20, message : 'Username must be from 3 to 20 characters'}, minLength : {value : 3, message : 'Username must be from 3 to 20 characters'}})} name="username" id="username" placeholder="Username"/>
                                        <div className="cr-sn">{errors.username && errors.username.message}</div>

                                        <Input type="email" innerRef={register({required : {value : true, message : 'Please enter your email'}})} name="email" id="email" placeholder="Email"/>
                                        <div className="cr-sn">{errors.email && errors.email.message}</div>

                                        <Input type="password" innerRef={register({required : 'Please enter your password', minLength : {value : 6, message : 'Password must be at least 6 characters long'}})} name="pass" id="pass" placeholder="Password"/>
                                        <div className="cr-sn">{errors.pass && errors.pass.message}</div>
                                        
                                        <Input type="password" innerRef={register({validate : (cfpass) => cfpass === watch('pass')})} name="confirmPassword" id="confirmPassword" placeholder="Confirm password"/>
                                        <div className="cr-sn">{errors.confirmPassword && <span>Please make sure your passwords match</span>}</div>

                                        <div className="d-flex justify-content-center">
                                            <Button type="submit" color='primary'>Sign up</Button>
                                        </div>
                                        <div className="cr-lgn">
                                            <CardLink tag={Link} to="/signin">Log in to existing account</CardLink>
                                        </div>
                                    </CardBody>
                                </form>
                            </Card>
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                </div>
            </section>
        </div>
    );
}

const SignUpFbConsumer = () => (
    <div>
        <FirebaseContext.Consumer>
            {firebase => <SignUp firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>
);

export default SignUpFbConsumer;