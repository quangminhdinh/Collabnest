import React, {Component} from 'react';
import { withStyles, withTheme, Grid, Typography, Box, Card, CardContent, Button, Avatar, Tooltip, LinearProgress, IconButton, Tabs, Tab, Divider, lighten } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Group as GroupIcon, LibraryBooks as LibraryBooksIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';

import Layout from '../components/LayoutU';
import { compose } from 'recompose';
import stringToColor from '../components/utils/stringToColor';
import withURLgathering from '../components/utils/withURLgathering';
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
                    () => {
                        this.props.firebase.user(this.props.authUser.uid).set({avaExt: ext}, { merge: true })
                            .then(() => {this.setState({ openLoader: false });alert("success");window.location.reload()})
                            .catch(error => {this.setState({ openLoader: false });alert(error)});
                    }, error => {this.setState({ openLoader: false });alert(error)});
    }

    render() {
        const { classes, authUser, theme, firebase, data } = this.props;
        console.log(data);
        return (
            <Layout avaURL={data.avaURL} authUser={authUser}>
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
                                       <Tooltip title="Change avatar">
                                            <IconButton style={{padding: '0'}} component="label">

                                                {data.avaURL ? <Avatar className={classes.ava} alt="ava" src={data.avaURL} /> : 
                                                            <Avatar style={{backgroundColor: authUser.avaColor, color: theme.palette.getContrastText(authUser.avaColor)}} className={classes.ava}>{authUser.username.substr(0,1).toUpperCase()}</Avatar>}
                                                
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
                                            {authUser.phone ? (
                                                <Typography variant="subtitle1">
                                                    Phone: {authUser.phone}
                                                </Typography>
                                            ) : null}
                                            {authUser.address ? (
                                                <Typography variant="subtitle1">
                                                    Address: {authUser.address}
                                                </Typography>
                                            ) : null}
                                            {authUser.website ? (
                                                <Typography variant="subtitle1">
                                                    Website: <a href={authUser.website} rel="noopener noreferrer" target="_blank">{authUser.website}</a>
                                                </Typography>
                                            ) : null}
                                        </Box>

                                        <Typography className={classes.tabTitle} variant="overline">
                                            Introduction
                                        </Typography>
                                        <Divider/>
                                        <Box mt={3} mb={5}>
                                            {authUser.bio ? (
                                                <Typography variant="subtitle1">
                                                    {authUser.bio}
                                                </Typography>
                                            ) : null}
                                        </Box>

                                        <Typography className={classes.tabTitle} variant="overline">
                                            Skills
                                        </Typography>
                                        <Divider/>
                                        <Box mt={3} mb={5}>
                                            {authUser.skills ? authUser.skills.map((skill, id) => (
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
                                            {data.cvURL ? <Button color="primary" rel="noopener noreferrer" target="_blank" href={data.cvURL} size="large" variant="contained">Download CV</Button> : null}
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={this.state.tabVal} index={1}>
                                        <EditProfile openLoader={() => {this.setState({ openLoader: true })}}
                                                     closeLoader={() => {this.setState({ openLoader: false })}}
                                                     authUser={authUser} firebase={firebase}/>
                                    </TabPanel>
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
    withURLgathering(condition, [{source: 'users', type: 'ava', compress: true}, 
                                    {source: 'users', type: 'cv', compress: false}])
)(Profile);