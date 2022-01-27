import firebase from 'firebase/app';
import React , { useState } from "react";
import 'firebase/database';


const [userid, setUserid] = React.useState();

export const userids = {
    firebase.auth().onAuthStateChanged((user) => {
                if(user){
                    setUserid(user.uid)
                }
            });
  
};