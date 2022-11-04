import Message from "./Message";
import "../cpn_css/MessageContainer.css";
import { useEffect, useRef, useState } from "react";

function MessageContainer( props ){

    const [msgList, setMsgList] = useState(props.msglist);

    useEffect(() => {
        setMsgList(props.msglist);
    }, [props.msglist])

    useEffect(() => {
        ref.current?.scrollIntoView();
    })

    const ref = useRef(null);

    return (
        <div className="message-container">
            {msgList.map(msg => 
                <Message msg={msg} />
            )}
            <div ref={ref}></div>
        </div>
    )
}

export default MessageContainer;