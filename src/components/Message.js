import { LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants";

function Message(props){
    if(props.msg.user === localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME))
        return (
            <>
                <div className="msg out-going me-2 mt-2" key={props.msg._id}>{props.msg.content}</div>
                <div className="out-going dt me-2">{new Date(props.msg.send_time).toUTCString()}</div>
            </>
        )
    else 
        return (
            <div className="mt-2">
                <img src={window.location.origin + "/asset/default-avatar.png"} style={{width: "40px", height: "40px"}}></img>
                <div className="msg ms-2 d-inline-block" key={props.msg._id}>{props.msg.content}</div>
                <div className="dt">{new Date(props.msg.send_time).toUTCString()}</div>
            </div>
        )
}

export default Message;