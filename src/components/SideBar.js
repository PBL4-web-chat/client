import { useEffect, useState } from "react";
import SideBarLI from "./SideBarLI";
import "../cpn_css/SideBar.css";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants"
import { Link, useLocation } from "react-router-dom";

function SideBar( props ){
    const [ListItem, setListItem] = useState([]);
    const [selectedID, setSelectedID] = useState("");

    const location = useLocation();

    const changeIndex = (id) => {
        setSelectedID(id);
        props.changeConvID(id);
    }
    
    useEffect(() => {
        setSelectedID(props.conversation_id);
        fetch(API_URL + '/conversation/' + localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME))
            .then(res => res.json())
            .then(data => setListItem(data.data))
            .catch(err => console.log(err));
    }, [location])

    return (
        <div className="side-bar">
            <h1><b>Chat List</b></h1>
            <hr/> <br/>
            <div className="li-container">
                {
                ListItem.length > 0 ?
                    ListItem.map(item => 
                        <SideBarLI img={window.location.origin + "/asset/logo.png"} name={item.name} key={item._id} id={item._id} onClick={changeIndex}
                        selected={selectedID === item._id ? true : false}/>
                    )
                    :
                    <></>
                }
            </div>
            <Link to={'/mainpage/newConversation'} className="add-conv"> + new conversation</Link>
        </div>
    );
}

export default SideBar;