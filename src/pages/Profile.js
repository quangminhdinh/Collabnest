import React, {Component} from 'react';
import { withStyles, withTheme, Grid, Typography, Box, Card, CardContent, Button, Avatar, Tooltip, LinearProgress, IconButton, Tabs, Tab, Divider, lighten } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Group as GroupIcon, LibraryBooks as LibraryBooksIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

import Layout from '../components/LayoutU';
import { compose } from 'recompose';
import { stringToColor, checkDynamicId } from '../components/utils';
// import { withFirebase } from '../components/Firebase';

import EditProfile from '../components/EditProfile';
import Loader from '../components/Loader';

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
            openLoader: false
        };
    }

    onFileUpload = event => {
        if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
            return;
        }
        const name = event.target.files[0].name;
        const lastDot = name.lastIndexOf('.');
        const ext = name.substring(lastDot);

        this.setState({ openLoader: true });

        this.props.firebase
            .upload('users/ava/' + this.props.authUser.uid + ext, 
                    event.target.files[0],
                    url => {
                        this.props.firebase.user(this.props.authUser.uid).set({avaURL: url}, { merge: true })
                            .then(() => {this.setState({ openLoader: false });alert("success");window.location.reload()})
                            .catch(error => {this.setState({ openLoader: false });alert("123" + error)});
                    }, error => {this.setState({ openLoader: false });alert(error)});
    }

    render() {
        const { classes, authUser, theme, firebase, iUser } = this.props;
        
        // const profileData = iUser ? data.iUser : data.authUser;
        const profileUser = iUser ? iUser : authUser;

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
                                       <Tooltip disableHoverListener={!!iUser} 
                                                disableTouchListener={!!iUser}
                                                disableFocusListener={!!iUser} 
                                                title="Change avatar">
                                            <IconButton disabled={!!iUser} style={{padding: '0'}} component="label">

                                                {profileUser.avaURL ? <Avatar className={classes.ava} alt="ava" src={profileUser.avaURL} /> : 
                                                            <Avatar style={{backgroundColor: profileUser.avaColor, color: theme.palette.getContrastText(profileUser.avaColor)}} className={classes.ava}>{profileUser.username.substr(0,1).toUpperCase()}</Avatar>}
                                                
                                                <input
                                                    type="file"
                                                    onChange={this.onFileUpload}
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Box display="flex" justifyContent="center" m={2}>
                                        <Typography variant="h5">
                                            {profileUser.username}
                                        </Typography>
                                    </Box>
                                    {profileUser.position ? (
                                        <Box className={classes.position} m={2} mt={-2}>
                                            <Typography component="p">
                                                {profileUser.position}
                                                {profileUser.company ? (" at " + profileUser.company) : null}
                                            </Typography>
                                        </Box>
                                    ) : (profileUser.company ? (
                                            <Box className={classes.position} m={-2}>
                                                <Typography component="p">
                                                    {profileUser.company}
                                                </Typography>
                                            </Box>
                                        ) : null)
                                    }
                                    <Box display="flex" justifyContent="center" m={2}>
                                        <Tooltip title="Friends">
                                            <Box className={classes.stats} px={4} >
                                                <GroupIcon /><Box pl={0.5}></Box>
                                                <Typography variant="h6">{profileUser.friends ? profileUser.friends.length : 0}</Typography>
                                            </Box>
                                        </Tooltip>

                                        <Tooltip title="Projects">
                                            <Box className={classes.stats} px={4}>
                                                <LibraryBooksIcon /><Box pl={0.5}></Box>
                                                <Typography variant="h6">{profileUser.projects ? profileUser.projects.length : 0}</Typography>
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
                                            {!iUser && (<Tab label="Edit" {...profProps(1)} />)}
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
                                                Email: {profileUser.email}
                                            </Typography>
                                            {profileUser.phone ? (
                                                <Typography variant="subtitle1">
                                                    Phone: {profileUser.phone}
                                                </Typography>
                                            ) : null}
                                            {profileUser.address ? (
                                                <Typography variant="subtitle1">
                                                    Address: {profileUser.address}
                                                </Typography>
                                            ) : null}
                                            {profileUser.website ? (
                                                <Typography variant="subtitle1">
                                                    Website: <a href={profileUser.website} rel="noopener noreferrer" target="_blank">{profileUser.website}</a>
                                                </Typography>
                                            ) : null}
                                        </Box>

                                        <Typography className={classes.tabTitle} variant="overline">
                                            Introduction
                                        </Typography>
                                        <Divider/>
                                        <Box mt={3} mb={5}>
                                            {profileUser.bio ? (
                                                <Typography variant="subtitle1">
                                                    {profileUser.bio}
                                                </Typography>
                                            ) : null}
                                        </Box>

                                        <Typography className={classes.tabTitle} variant="overline">
                                            Skills
                                        </Typography>
                                        <Divider/>
                                        <Box mt={3} mb={5}>
                                            {profileUser.skills ? profileUser.skills.map((skill, id) => (
                                                <Box key={id} mb={3}>
                                                    <Typography style={{fontSize: 18}} variant="caption">
                                                        {skill.name}
                                                    </Typography>
                                                    <BorderLinearProgress
                                                        className={classes.margin}
                                                        variant="determinate"
                                                        color="secondary"
                                                        value={skill.value}
                                                        bgcolor={stringToColor(skill.name)}
                                                    />
                                                </Box>
                                            )) : null}
                                        </Box>
                                        <Box mt={2} className="d-flex justify-content-center">
                                            {profileUser.cvURL ? <Button color="primary" rel="noopener noreferrer" target="_blank" href={profileUser.cvURL} size="large" variant="contained">Download CV</Button> : null}
                                        </Box>
                                    </TabPanel>
                                    { !iUser && (
                                        <TabPanel value={this.state.tabVal} index={1}>
                                            <EditProfile openLoader={() => {this.setState({ openLoader: true })}}
                                                        closeLoader={() => {this.setState({ openLoader: false })}}
                                                        authUser={authUser} firebase={firebase}/>
                                        </TabPanel>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
                <Loader open={this.state.openLoader} />
            </Layout>
        );
    }
}

const condition = authUser => !!authUser;

export default compose(
    withStyles(styles),
    withTheme,
    // withFirebase,
    checkDynamicId(condition, 'users'),
    // withURLgathering(condition, [{source: 'users', type: 'ava', compress: true, isAuthUser: true}, 
    //                                 {source: 'users', type: 'ava', compress: true, isAuthUser: false}, 
    //                                 {source: 'users', type: 'cv', compress: false, isAuthUser: false}])
)(Profile);