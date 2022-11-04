import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";

function ContentHeader( props ){

    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        if(!props.conversation_id) return;
        fetch(API_URL + '/conversation/get/' + props.conversation_id)
            .then(res => res.json())
            .then(data => {
                setGroupName(data.data.name);
            })
            .catch(err => console.log(err))
    }, [props.conversation_id, groupName])

    return (
        <div className="content-header">
            <img src={window.location.origin + "/asset/logo.png"} alt="group" className="profile-img"/>
            <div className="profile-name">
                <b className="group-name">{groupName}</b>
            </div>
        </div>
    )
}

export default ContentHeader;