import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Link, Breadcrumbs, Grid, Box, Typography, Tabs, Tab } from '@material-ui/core';
import UserProfileForm from './user-profile-form'
import ChangePasswordForm from './user-change-password';


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '85%',
    marginTop: '1%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  outer: {
    display: 'flex',
    height: '100%',
  },
  header: {
    marginLeft: '5%',
    marginTop: '1%',
  },
  tabheader: {
    marginBottom: '1%',
  },
  tabcontent: {
    marginTop: '1%',
  },
  deleteAccount: {
    marginTop: "10%",
    width: 250
  }
}));

export default function UserProfile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
   
    
    const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
        setValue(newValue);
    };


    return (
        <Grid container className={classes.outer}>
            <Grid item xs={12}  className={classes.header}>
                <Typography variant="h4">User Profile</Typography>

            <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/">
                        Timetock
                    </Link>
                    <Link color="inherit" href="/">
                        Account
                    </Link>
                    <Link
                        color="textPrimary"
                        href="/"
                        aria-current="page"
                    >
                        User profile
                    </Link>
                    </Breadcrumbs>
            </Grid>
            <Grid item xs={12} className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Basic Info" {...a11yProps(0)} />
                    <Tab label="Change Password" {...a11yProps(1)} />
                    <Tab label="Manges Account" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <div className={classes.tabheader}>
                        <Typography variant="h5">Basic Info</Typography>
                    </div>
                    <div className={classes.tabcontent}>
                       <UserProfileForm />
                    </div>


                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography variant="h5">Change Password</Typography>

                    <div className={classes.tabcontent}>
                        <ChangePasswordForm />
                    </div>

                </TabPanel>
                <TabPanel value={value} index={2}>
                <div className={classes.tabheader}>
                        <Typography variant="h5">Manage Account</Typography>
                    </div>
                    <div className={classes.tabcontent}>
                            <Grid className={classes.deleteAccount} item xs={12} md={6}>
                                <Button className={classes.deleteAccount} fullWidth color='secondary' variant='contained'>Delete My Account</Button>
                            </Grid>
                    </div>
                    
                </TabPanel>
            </Grid>
        </Grid>
    );
}
