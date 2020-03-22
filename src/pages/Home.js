import React from 'react';
import Layout from '../components/LayoutU';
import { compose } from 'recompose';
import {withAuthorization} from '../components/Session';

const Home = ({authUser}) => {
    return (
        <Layout authUser={authUser}></Layout>
    );

}

const condition = authUser => !!authUser;

export default compose(
    withAuthorization(condition)
)(Home);