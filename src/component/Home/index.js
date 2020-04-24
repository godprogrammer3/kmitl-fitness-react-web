import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import firebase from '../Firebase'
const doorImage = require("../../image/door.png");
const treadmillImage = require("../../image/treadmill.png");
const lockerImage = require("../../image/locker.png");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: 5,
    backgroundColor: "#E35205",
  },
  typography: {
    flexGrow: 1,
    align: "center",
  },
  grid: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
async function lockerRandomPin(){
  var val = Math.floor(1000 + Math.random() * 9000);
  var lockerCollection = firebase.firestore().collection('locker');
  await lockerCollection.doc('pinCode').update({value: val.toString()});
}

async function treadmillPlay(uid,treadmillId){
  const snapshot = await firebase.firestore().collection('treadmill_status').doc(treadmillId).get();
  if(uid === ''){
    await firebase.firestore().collection('treadmill_status').doc(treadmillId).update({isAvailable:true,user:"",startTime:-1});
  }else if( snapshot.data().user === uid){
    await firebase.firestore().collection('treadmill_status').doc(treadmillId).update({isAvailable:false});
  }
}

async function timeAttendance(uid,type){
  if( uid !== ''){
    await firebase.firestore().collection('time_attendance').add({user:uid,type:type,time:firebase.firestore.FieldValue.serverTimestamp()});
  }
}
export default function Home() {
  React.useEffect(() => {
    (async function login() {
      await firebase.auth().signInWithEmailAndPassword('admin@gmail.com','12345678');
    })();
    firebase
    .firestore()
    .collection('userdata')
    .onSnapshot(snapshot =>{
      var list = [];
      for( let i = 0 ; i < snapshot.docs.length ; i++){
        list.push(<MenuItem key={snapshot.docs[i].id} value={snapshot.docs[i].id}>{snapshot.docs[i].data().firstName}</MenuItem>);
      }
      setUsers(list);
    });
    firebase
      .firestore()
      .collection('locker')
      .doc('pinCode')
      .onSnapshot(snapshot => {
        setPinCode(snapshot.data().value)
      });
  }, [])
  const classes = useStyles();
  const [No1, setNo1] = React.useState("");
  const [No2, setNo2] = React.useState("");
  const [No3, setNo3] = React.useState("");
  const [In, setIn] = React.useState("");
  const [Out, setOut] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [users,setUsers] = React.useState("");
  const No1Handle = (event) => {
    setNo1(event.target.value);
  };
  const No2Handle = (event) => {
    setNo2(event.target.value);
  };
  const No3Handle = (event) => {
    setNo3(event.target.value);
  };
  const InHandle = (event) => {
    setIn(event.target.value);
  };
  const OutHandle = (event) => {
    setOut(event.target.value);
  };
  const PincodeHandle = async (event) => {
    await lockerRandomPin();
  };
  const MyButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText("#E35205"),
      backgroundColor: "#E35205",
      "&:hover": {
        backgroundColor: "#cc4904",
      },
    },
  }))(Button);
  return (
    <div className={classes.grid}>
      <AppBar className={classes.root} position="relative">
        <Toolbar style={{ alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h4" className={classes.title} align="center">
            KMITL Fitness Simulator
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Card style={{ margin: 10 }}>
              <CardHeader
                title="Face Recognition Door"
                style={{ backgroundColor: "#E35205", color: "white" }}
                avatar={
                  <Avatar
                    variant="square"
                    alt="open door"
                    src={String(doorImage)}
                    className={classes.large}
                  />
                }
                titleTypographyProps={{ variant: "h5" }}
              ></CardHeader>
              <CardContent>
                <Grid
                  container
                  justify="space-between"
                  style={{ marginBottom: 20 }}
                >
                  <InputLabel shrink id="In-label" style={{ fontSize: 40 }}>
                    In
                  </InputLabel>
                  <Select
                    labelId="In-label"
                    id="In-select"
                    value={In}
                    onChange={InHandle}
                    displayEmpty
                    className={classes.selectEmpty}
                    with="auto"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {users}
                  </Select>
                  <MyButton variant="contained" color="primary" onClick={()=> timeAttendance(In,'in')}>
                    set
                  </MyButton>
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  style={{ marginBottom: 20 }}
                >
                  <InputLabel shrink id="Out-label" style={{ fontSize: 40 }}>
                    Out
                  </InputLabel>
                  <Select
                    labelId="Out-label"
                    id="Out-select"
                    value={Out}
                    onChange={OutHandle}
                    displayEmpty
                    className={classes.selectEmpty}
                    with="auto"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {users}
                  </Select>
                  <MyButton variant="contained" color="primary" onClick={()=> timeAttendance(Out,'out')}>
                    set
                  </MyButton>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ margin: 10 }}>
              <CardHeader
                title="Face Recognition Treadmill"
                style={{ backgroundColor: "#E35205", color: "white" }}
                avatar={
                  <Avatar
                    variant="square"
                    alt="treadmill"
                    src={String(treadmillImage)}
                    className={classes.large}
                  />
                }
                titleTypographyProps={{ variant: "h5" }}
              ></CardHeader>
              <CardContent>
                <Grid
                  container
                  justify="space-between"
                  style={{ marginBottom: 20 }}
                >
                  <InputLabel shrink id="No1-label" style={{ fontSize: 40 }}>
                    No. 1
                  </InputLabel>
                  <Select
                    labelId="No1-label"
                    id="No1-select"
                    value={No1}
                    onChange={No1Handle}
                    displayEmpty
                    className={classes.selectEmpty}
                    with="auto"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {users}
                  </Select>
                  <MyButton variant="contained" color="primary" onClick={()=>treadmillPlay(No1,'0')}>
                    set
                  </MyButton>
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  style={{ marginBottom: 20 }}
                >
                  <InputLabel shrink id="No2-label" style={{ fontSize: 40 }}>
                    No. 2
                  </InputLabel>
                  <Select
                    labelId="No2-label"
                    id="No2-select"
                    value={No2}
                    onChange={No2Handle}
                    displayEmpty
                    className={classes.selectEmpty}
                    with="auto"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {users}
                  </Select>
                  <MyButton variant="contained" color="primary" onClick={()=>treadmillPlay(No2,'1')}>
                    set
                  </MyButton>
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  style={{ marginBottom: 20 }}
                >
                  <InputLabel shrink id="No3-label" style={{ fontSize: 40 }}>
                    No. 3
                  </InputLabel>
                  <Select
                    labelId="No3-label"
                    id="No3-select"
                    value={No3}
                    onChange={No3Handle}
                    displayEmpty
                    className={classes.selectEmpty}
                    with="auto"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {users}
                  </Select>
                  <MyButton variant="contained" color="primary" onClick={()=>treadmillPlay(No3,'2')}>
                    set
                  </MyButton>
                </Grid>
              </CardContent>
            </Card>
            <Card style={{ margin: 10 }}>
              <CardHeader
                title="Locker pincode"
                style={{ backgroundColor: "#E35205", color: "white" }}
                avatar={
                  <Avatar
                    variant="square"
                    alt="treadmill"
                    src={String(lockerImage)}
                    className={classes.large}
                  />
                }
                titleTypographyProps={{ variant: "h5" }}
              ></CardHeader>
              <CardContent>
                <Grid
                  container
                  justify="center"
                  style={{ marginBottom: 20 }}
                >
                  <Typography
                    variant="h4"
                    className={classes.title}
                    align="center"
                  >
                    {pinCode}
                  </Typography>
                  <MyButton variant="contained" color="primary" style={{marginLeft:20}} onClick={PincodeHandle}>
                    random
                  </MyButton>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
