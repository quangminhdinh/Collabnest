import React from 'react';
import Layout from '../components/LayoutU';
import { compose } from 'recompose';
import {withAuthorization} from '../components/Session';

const Profile = ({authUser}) => {
    return (
        <Layout authUser={authUser}>{authUser.email}</Layout>
    );

}

const condition = authUser => !!authUser;

export default compose(
    withAuthorization(condition)
)(Profile);