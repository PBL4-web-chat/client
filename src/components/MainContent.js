import ContentHeader from "./ContentHeader";
import MessageContainer from "./MessageContainer";
import ChatForm from "./ChatForm";
import "../cpn_css/MainContent.css";
import { useEffect, useState } from "react";

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

function MainContent( props ){

    const [user_id, setuser_id] = useState( props.user_id);
    const [msgList, setMsgList] = useState( props.list );
    const [conversationID, setConversationID] = useState("");

    const nav = useNavigate();

    useEffect(() => {
        setuser_id(props.user_id);
        setMsgList(props.list);
    }, [props.list, props.user_id])

    useEffect(() => {
        setConversationID(props.conversation_id);
        if(props.conversation_id !== "") fetch(API_URL + '/msg/getmsg/' + props.conversation_id)
            .then(res => res.json())
            .then(data => {
                setMsgList(data.data);
            })
    }, [props.conversation_id])

    const addMsg = async() => {
        if(!localStorage['accessToken']) {
            nav('/');
            return;
        }
        var newMsg = document.ChatForm.ChatContext.value;
        if(newMsg === "") return;
        await axios.post(API_URL + '/msg/postmsg', {
            user_id: user_id,
            conversation_id: conversationID,
            content: newMsg
        })
        setMsgList(list => [...list, {
            user: user_id,
            conversation_id: conversationID,
            content: newMsg,
            send_time: Date.now(),
            attached: false
        }]);
        props.socketEmit(newMsg);
        document.ChatForm.ChatContext.value = ""; 
    }

    return (
        (props.conversation_id !== "") ?
            <div className="main-content">
                <ContentHeader conversation_id={conversationID}/>
                <hr/>
                <MessageContainer msglist={msgList}/>
                <hr/>
                <ChatForm addMsg={addMsg}/>
            </div>
                :
            <div className="main-content">
                <div className="position-absolute no-conv">
                    <i className="fa-regular fa-comments" style={{fontSize: "1000%"}}></i>
                    <h5 className="mt-4">Chọn một cuộc trò chuyện để bắt đầu</h5>
                </div>
            </div>
    );
}

export default MainContent;