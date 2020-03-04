import React from 'react';
import {
    Card, Row, Col, CardBody,
    CardTitle, Input, Button, CardLink
  } from 'reactstrap';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import NavBar from '../Components/NavBar';

const signin = props => {
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
                                <CardBody className="auth-ls">
                                    <CardTitle>Create a new Collabnest account</CardTitle>
                                    <Input type="text" name="username" id="username" placeholder="Username"/>
                                    <Input type="email" name="email" id="email" placeholder="Email"/>
                                    <Input type="password" name="pass" id="pass" placeholder="Password"/>
                                    <Input type="password" id="re_pass" placeholder="Confirm password"/>
                                    <div className="d-flex justify-content-center">
                                       <Button color='primary'>Sign up</Button>
                                    </div>
                                    <div className="cr-lgn">
                                        <CardLink tag={Link} to="/signin">Log in to existing account</CardLink>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                </div>
            </section>
        </div>
    );
}

export default signin;