import React from 'react';

import { makeStyles, useTheme, withStyles,
          AppBar, CssBaseline, Divider, Drawer, Hidden, Container, ClickAwayListener, Grow, Paper, Popper, Box,
          IconButton, Toolbar, Typography, Badge, Tooltip, TextField, InputAdornment, Avatar, Fab,
          List, ListItem, ListItemText, MenuItem, MenuList, ListItemIcon } from '@material-ui/core';
import { FindInPage as FindInPageIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Settings as SettingsIcon, 
          Person as PersonIcon, ExitToApp as ExitToAppIcon, Search as SearchIcon, Add as AddIcon, Chat as ChatIcon, 
          Dashboard as DashboardIcon, AddCircle as AddCircleIcon } from '@material-ui/icons';

import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {withFirebase} from './Firebase';
import * as ROUTES from './constants/routes';
import logo from '../assets/img/TabLogo.png';

const drawerWidth = 240;

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  ava: {
    // color: theme.palette.getContrastText(deepOrange[500]),
    // backgroundColor: deepOrange[500],
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  liAva: {
    justifyContent: "center",
  },
  avaIco: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  lIco: {
    color: "#fff",
  },
  emp: {
    padding: "0",
    '&:hover': {
      background: "#5475d1",
   },
  },
  footer: {
    // [theme.breakpoints.up('md')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
    margin: theme.spacing(-3),
    marginTop: theme.spacing(0)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(10),
    zIndex: 1200,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#fff',
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    // },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#5475d1",
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    minHeight: "100vh",
    flexDirection: 'column'
  },
  title: {
    flexGrow: 1,
  },
  liButton: {
    '&:hover': {
      background: "#3f66d1",
    },
  }
}));

function Layout(props) {
  const { container, authUser } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
        <Divider />
        <List>
            <ListItem style={{paddingTop: "1rem"}} className={classes.liAva}>
                <StyledBadge overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot">
                    <Avatar style={{backgroundColor: authUser.avaColor, color: theme.palette.getContrastText(authUser.avaColor)}} className={classes.ava}>{authUser.username.substr(0,1).toUpperCase()}</Avatar>
                </StyledBadge>
            </ListItem>
            
            <ListItem style={{paddingTop: "0"}} className={classes.liAva}>
                <Typography variant="h6">{authUser.username}</Typography>
            </ListItem>

            <ListItem style={{paddingTop: "0", paddingBottom: "2rem"}} className={classes.liAva}>
                <Tooltip title="Profile">
                    <IconButton component={RouterLink} to={ROUTES.PROFILE} className={classes.emp}>
                        <PersonIcon fontSize="small" className={classes.avaIco}/>
                    </IconButton>
                </Tooltip>

                <Box px={2}>
                    <Tooltip title="Settings">
                        <IconButton className={classes.emp}>
                            <SettingsIcon fontSize="small" className={classes.avaIco}/>
                        </IconButton>
                    </Tooltip>
                </Box>

                <Tooltip title="Log out">
                    <IconButton onClick={props.firebase.doSignOut} className={classes.emp}>
                      <ExitToAppIcon fontSize="small" className={classes.avaIco}/>
                    </IconButton>
                </Tooltip>
            </ListItem>

            <Divider light/>
            
            <ListItem component={RouterLink} to="#" className={classes.liButton} button key="new_prj">
                <ListItemIcon><AddCircleIcon className={classes.lIco}/></ListItemIcon>
                <ListItemText primary="New project" />
            </ListItem>
            <ListItem component={RouterLink} to={ROUTES.HOME} className={classes.liButton} button key="home">
                <ListItemIcon><DashboardIcon className={classes.lIco}/></ListItemIcon>
                <ListItemText primary="My projects" />
            </ListItem>
            <ListItem className={classes.liButton} button key="explore">
                <ListItemIcon><FindInPageIcon className={classes.lIco}/></ListItemIcon>
                <ListItemText primary="Explore" />
            </ListItem>
        </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Container maxWidth={false}>
                <Box display="flex">
                    <IconButton style={{ color: "#3a3a3a" }}
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    className={classes.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    {/* <Typography variant="h6" noWrap> */}
                    
                    <Box p={2} className={classes.title}>
                        <Link component={RouterLink} to={ROUTES.HOME}>
                            <img height='30px' src={logo} alt="logo"/> 
                            {/* <span className="bn-lgo align-middle">Collabnest</span> */}
                        </Link>
                    </Box>
                    <Box py={2}>
                        <TextField type="search" placeholder="Search"  
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><SearchIcon color="disabled"/></InputAdornment>,
                                    }} />
                    </Box>
                    <Box p={1} alignItems="center">
                        {/* <PersonIcon/> */}
                        
                        <Tooltip title="Messages">
                            <IconButton className="ic-but">
                                <Badge badgeContent={2} color="primary" className="clpr-badge">
                                    <ChatIcon className="nav-ic"/>
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Notifications">
                            <IconButton className="ic-but">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon className="nav-ic"/>
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Create new project">
                            <IconButton className="ic-but">
                                <AddIcon className="nav-ic"/>
                            </IconButton>
                        </Tooltip>

                        {/* <Tooltip title="Menu"> */}
                            <IconButton className="ic-but"
                                        ref={anchorRef}
                                        aria-controls={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}>
                            <PersonIcon className="nav-ic"/>
                            </IconButton>
                        {/* </Tooltip> */}
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <MenuItem className="clr-dark-pop" component={RouterLink} to={ROUTES.PROFILE}>Profile</MenuItem>
                                            <MenuItem className="clr-dark-pop" component={RouterLink} to="#">Settings</MenuItem>
                                            <Divider/>
                                            <MenuItem onClick={props.firebase.doSignOut}>Log out</MenuItem>
                                        </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Box>
                </Box> {/* </Typography> */}
            </Container>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer classes={{
                    paper: classes.drawerPaper,
                  }}
                variant="permanent"
                open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Box className="wrp-content">
        <div className={classes.toolbar} />
        {props.children}
        <Box display={props.fabDisplay ? "inline-flex" : "none"}>
          <Tooltip  title="Create new project">
              <Fab color="primary" className={classes.fab} aria-label="Create new project"><AddIcon /></Fab>
          </Tooltip>
        </Box></Box>
        <footer className={classes.footer}>© 2020 <a href="https://www.facebook.com/minh.dinh.112" rel="noopener noreferrer" target="_blank">Minh Dinh</a>, All rights reserved.</footer>
      </main>
    </div>
  );
}

export default withFirebase(Layout);