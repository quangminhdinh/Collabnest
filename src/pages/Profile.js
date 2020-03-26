import React, {Component} from 'react';
import { withStyles, withTheme, Grid, Typography, Box, Card, CardContent, Avatar, Tooltip, LinearProgress, Tabs, Tab, Divider, lighten } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Group as GroupIcon, LibraryBooks as LibraryBooksIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

import Layout from '../components/LayoutU';
import { compose } from 'recompose';
import {withAuthorization} from '../components/Session';

const styles = theme => ({
    title: {
        margin: theme.spacing(-3),
        marginBottom: theme.spacing(0),
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(3)
    },
    ava: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: theme.spacing(18),
        height: theme.spacing(18),
        fontSize: theme.spacing(7),
    },
    position: {
        display: "flex",
        justifyContent: "center",
        color: "rgba(0, 0, 0, 0.54)"
    },
    stats: {
        display: "flex",
        justifyContent: "center",
        color: "rgba(0, 0, 0, 0.74)",
        alignItems: "center"
    },
    tabTitle: {
        fontSize: 20,
    }
});

const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: props => lighten(props.bgcolor, 0.5),
      borderRadius: 15
    },
    bar: {
      borderRadius: 20,
      backgroundColor: props => props.bgcolor,
    },
})(LinearProgress);

const ModifiedTabs = withStyles({
    root: {
    //   borderBottom: '1px solid #e8e8e8',
      backgroundColor: '#fff',
      color: "#1890ff",
    //   borderBottom: "1px solid rgba(120, 130, 140, 0.13)"
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const TabPanel = ({ children, value, index, ...other }) => (
    <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
    >
        {value === index && <Box p={3}>{children}</Box>}
    </Typography>
);
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const profProps = index => ({
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tabVal: 0,
        };
    }

    render() {
        const { classes, authUser, theme } = this.props;

        return (
            <Layout authUser={authUser}>
                {/* <Box bgcolor="info.main" color="info.contrastText" className={classes.title}>
                    <Typography variant="h5">
                        Profile
                    </Typography>
                </Box> */}
                <Box m={3}>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Box display="flex" justifyContent="center" m={2}>
                                        <Avatar style={{backgroundColor: authUser.avaColor, color: theme.palette.getContrastText(authUser.avaColor)}} className={classes.ava}>{authUser.username.substr(0,1).toUpperCase()}</Avatar>
                                    </Box>
                                    <Box display="flex" justifyContent="center" m={2}>
                                        <Typography variant="h5">
                                            {authUser.username}
                                        </Typography>
                                    </Box>
                                    {authUser.position ? (
                                        <Box className={classes.position} m={2} mt={-2}>
                                            <Typography component="p">
                                                {authUser.position}
                                                {authUser.company ? (" at " + authUser.company) : null}
                                            </Typography>
                                        </Box>
                                    ) : (authUser.company ? (
                                            <Box className={classes.position} m={-2}>
                                                <Typography component="p">
                                                    {authUser.company}
                                                </Typography>
                                            </Box>
                                        ) : null)
                                    }
                                    <Box display="flex" justifyContent="center" m={2}>
                                        <Tooltip title="Friends">
                                            <Box className={classes.stats} px={4} >
                                                <GroupIcon /><Box pl={0.5}></Box>
                                                <Typography variant="h6">{authUser.friends ? authUser.friends.length : 0}</Typography>
                                            </Box>
                                        </Tooltip>

                                        <Tooltip title="Projects">
                                            <Box className={classes.stats} px={4}>
                                                <LibraryBooksIcon /><Box pl={0.5}></Box>
                                                <Typography variant="h6">{authUser.projects ? authUser.projects.length : 0}</Typography>
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <Box>
                                    {/* <AppBar position="static"> */}
                                        <ModifiedTabs value={this.state.tabVal} 
                                                onChange={(event, newVal) => {this.setState({ tabVal: newVal})}} 
                                                aria-label="profile tabs" >
                                            <Tab label="Profile" {...profProps(0)} />
                                            <Tab label="Edit" {...profProps(1)} />
                                        </ModifiedTabs>
                                    {/* </AppBar> */}
                                    <Divider/>
                                    <TabPanel value={this.state.tabVal} index={0}>
                                        <Typography className={classes.tabTitle} variant="overline">
                                            Overview
                                        </Typography>
                                        <Divider/>
                                        <Box mt={3} mb={5}>
                                            <Typography variant="subtitle1">
                                                Email: {authUser.email}
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                Phone: +91 654 784 547
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                Address: 71 Pilgrim Avenue Chevy Chase, MD 20815
                                            </Typography>
                                        </Box>

                                        <Typography className={classes.tabTitle} variant="overline">
                                            Introduction
                                        </Typography>
                                        <Divider/>
                                        <Box mt={3} mb={5}>
                                            <Typography variant="subtitle1">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </Typography>
                                        </Box>

                                        <Typography className={classes.tabTitle} variant="overline">
                                            Skills
                                        </Typography>
                                        <Divider/>
                                        <Box mt={3} mb={5}>
                                            <Box mb={3}>
                                                <Typography style={{fontSize: 18}} variant="caption">
                                                    Javascript
                                                </Typography>
                                                <BorderLinearProgress
                                                    className={classes.margin}
                                                    variant="determinate"
                                                    color="secondary"
                                                    value={100}
                                                    bgcolor='#26c6da'
                                                />
                                            </Box>

                                            <Box mb={3}>
                                                <Typography style={{fontSize: 18}} variant="caption">
                                                    Python
                                                </Typography>
                                                <BorderLinearProgress
                                                    className={classes.margin}
                                                    variant="determinate"
                                                    color="secondary"
                                                    value={90}
                                                    bgcolor='#1e88e5'
                                                />
                                            </Box>

                                            <Box mb={3}>
                                                <Typography style={{fontSize: 18}} variant="caption">
                                                    Photoshop
                                                </Typography>
                                                <BorderLinearProgress
                                                    className={classes.margin}
                                                    variant="determinate"
                                                    color="secondary"
                                                    value={50}
                                                    bgcolor='#fc4b6c'
                                                />
                                            </Box>

                                            <Box mb={3}>
                                                <Typography style={{fontSize: 18}} variant="caption">
                                                    Office
                                                </Typography>
                                                <BorderLinearProgress
                                                    className={classes.margin}
                                                    variant="determinate"
                                                    color="secondary"
                                                    value={80}
                                                    bgcolor='#ffb22b'
                                                />
                                            </Box>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={this.state.tabVal} index={1}>
                                        Item Two
                                    </TabPanel>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Layout>
        );
    }
}

const condition = authUser => !!authUser;

export default compose(
    withStyles(styles),
    withTheme,
    withAuthorization(condition)
)(Profile);