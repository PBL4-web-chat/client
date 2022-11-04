function ChatForm( { addMsg } ){

    const btnPress = (e) => {
        if(e.key === "Enter"){
            console.log(e.key);
            e.preventDefault();
            addMsg();
        }
    }
 
    return(
        <form name="ChatForm">
            <input type="text" name="ChatContext" placeholder="Nội dung chat..." className="msg-content" id="msg" autoComplete="off" onKeyDown={btnPress}/>
            <div className="context-right">
                <button type="button" id="btn-send" name="btnSend" onClick={addMsg}><i className="fa fa-send"></i></button>
            </div>
        </form>
    )
}

export default ChatForm;