import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import MainContent from "../components/MainContent";
import React from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { API_URL } from "../utils/constants";
import io from "socket.io-client";


function MainPage() {

  const [user_id, setuser_id] = useState('');
  const [msgList, setmsgList] = useState([]);
  const [conversation_id, setConversationID] = useState("");
  const [apiResponse, setapiResponse] = useState('');

  const { loadUser } = useContext(AuthContext);

  const nav = useNavigate();

  const socket = io("localhost:8000", {
    autoConnect: false,
    reconnectionAttempts: 0,
  });

  const emit = (message) => {
    socket.emit("msg", message);
  }

  const ChangeConvID = (id) => {
    if (id !== conversation_id)
      setConversationID(id);
  }

  useEffect(() => {
    if (localStorage["accessToken"]) {
      setuser_id(localStorage.getItem('accessToken'));
      loadUser();
      socket.connect();
    }
    else {
      nav('/');
    };
    if (conversation_id !== "")
      fetch(API_URL + "/api/msg/getmsg/" + conversation_id)
        .then(res => res.json())
        .then(data => {
          //console.log(data);
          var msgArray = data.data;
          var list = [];
          msgArray.forEach(item => {
            list = [...list, {
              user: item.user,
              conversation: item.conversation,
              content: item.content,
              attached: item.attached,
              send_time: item.send_time
            }]
          });
          //console.log(list);
          setapiResponse('responsed');
          setmsgList(list);
        })
        .catch(err => {
          console.log(err);
          nav('/');
        });
  }, [])

  return (
    <>
      <NavBar />
      <SideBar changeConvID={ChangeConvID} />
      <MainContent list={msgList} user_id={user_id} conversation_id={conversation_id} socketEmit={emit}/>
      <Outlet />
    </>
  );
}

export default MainPage;