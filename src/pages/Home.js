import React from 'react';
import Layout from '../components/LayoutU';

const Home = ({authUser}) => {
    return (
        <Layout fabDisplay authUser={authUser}></Layout>
    );

}

export default Home;