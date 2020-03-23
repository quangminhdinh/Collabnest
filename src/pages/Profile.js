import React, {Component} from 'react';
import { withStyles, Grid, Typography, Box, Card, CardContent, Avatar } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

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
        justifyContent: "center",
        color: "rgba(0, 0, 0, 0.54)"
    }
});

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, authUser } = this.props;

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
                                        <Avatar className={classes.ava}>{authUser.username.substr(0,1).toUpperCase()}</Avatar>
                                    </Box>
                                    <Box display="flex" justifyContent="center" m={2}>
                                        <Typography variant="h5">
                                            {authUser.username}
                                        </Typography>
                                    </Box>
                                    {authUser.position ? (
                                        <Box display="flex" className={classes.position} m={2} mt={-2}>
                                            <Typography component="p">
                                                {authUser.position}
                                                {authUser.company ? (" at " + authUser.company) : null}
                                            </Typography>
                                        </Box>
                                    ) : (authUser.company ? (
                                            <Box display="flex" className={classes.position} m={-2}>
                                                <Typography component="p">
                                                    {authUser.company}
                                                </Typography>
                                            </Box>
                                        ) : null)
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardContent>
                                    abc
                                </CardContent>
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
    withAuthorization(condition)
)(Profile);