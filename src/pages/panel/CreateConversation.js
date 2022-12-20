import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../../utils/constants";
import "../../cpn_css/CreateConversation.css";


function CreateConversation(){

    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [isSearching, setSearching] = useState(false);

    const [searchString, setSearchString] = useState("");

    const navigate = useNavigate();

    const isSelected = (id) => {
        for (const userID of selectedUser) {
            if(id === userID) return true;
        }
        return false;
    }

    const unSelect = (id) => {
        let list = selectedUser;
        console.log(list);
        for(let i = 0; i < list.length; i++){
            if(id === list[i]) {
                list.splice(i, 1);
                console.log(list);
                setSelectedUser([...list]);
                return;
            }
        }
    }

    const createConversation = async () => {
        const name = prompt("Tên nhóm:");
        if(name === "") name = "new group";
        const res = await axios.post(API_URL + '/conversation/add', {
            name: name
        })
        
        if(!res.data.success) {
            navigate('/mainpage');
            return;
        }

        const conversation_id = res.data.data.id;

        for (const id of selectedUser) {
            await axios.post(API_URL + '/member/add', {
                user_id: id,
                conversation_id: conversation_id
            })
        }

        await axios.post(API_URL + '/member/add', {
            user_id: localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME),
            conversation_id: conversation_id
        })

        navigate('/mainpage')
    }

    const accept = async (event) => {

        event.preventDefault();

        if(searchString === "") return

        await fetch(API_URL + "/user/find/" + searchString)
            .then(res => res.json())
            .then(data => {
                let list = [];
                data.data.forEach(user => {
                    if(user.id !== localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)){
                        list = [...list, user];
                    }
                })
                setUserList(list);
                setSearching(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onTextChange = (event) => {
        const search = document.searchForm.text.value;
        setSearchString(search);
    }

    const body = (
        !isSearching ? 
            <div className="mt-5 text-center">
                Nhập thông tin tìm kiếm vào ô "tìm kiếm"!
            </div>
        :
            userList.map(user => 
                <div className="user-item" onClick={() => {
                    if(isSelected(user.id)) unSelect(user.id);
                        else setSelectedUser([...selectedUser, user.id]);
                }} key={user.id}>
                    <img src="../asset/default-avatar.png" style={{width: "40px", height: "40px"}} className="mx-2"></img>
                    <b>{user.username}</b>
                    {console.log(isSelected(user.id))}
                    {isSelected(user.id) && <i className="fa-solid fa-circle-check text-success check"></i>}
                </div>
            )
    )

    return (
        <div className="position-absolute landing-center conv-pannel text-center">
            <h5 className="mt-2">Tạo hội thoại mới</h5>
            <div className="position-absolute translate-middle-x w-25"
            style={{bottom: "5px", left: "50%"}}>
                <button className="w-100 border-white" onClick={createConversation}>Tạo</button>
            </div>
            <Form name="searchForm" onSubmit={accept}>
                <Form.Control 
                    name="text"
                    className="mt-3 search-user"
                    type="text"
                    placeholder="Tên người dùng"
                    onChange={onTextChange}
                    autoComplete="off"
                />
            </Form>


        
            <div className="user-container">
                {body}
            </div>



            <Link to="/mainpage"
            className="text-white position-absolute pannel-close" style={{right: "4px", fontSize: "150%", top: "0px"}}>
                <i className="fa-regular fa-circle-xmark"></i>
            </Link>
        </div>
    )
}

export default CreateConversation;