function SideBarLI(props){

    const changeIndex = (event) => {
        props.onClick(props.id);
    }

    return (
        <div className={props.selected ? "side-bar-li selected" : "side-bar-li"} key={props.id} onClick={changeIndex}>
            <img src={props.img} className="li-img vertical-center" alt="" />
            <div className="li-name vertical-center">{props.name}</div>
        </div>
    )
}

export default SideBarLI;