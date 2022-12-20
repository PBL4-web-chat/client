import "../cpn_css/NavBar.css";
import { useNavigate } from 'react-router-dom';

function NavBar(){

    const nav = useNavigate();

    const logout = () => {
        localStorage.removeItem('accessToken');
        nav('/');
    }

    return(
    <div className="navigation">
        <div className="logo"><i className="fa-sharp fa-solid fa-headset"></i></div>

        <div className="nav nav-top">
            <div className="nav-item"><i className="fa-regular fa-comment"></i></div>
            <div className="nav-item"><i className="fa-solid fa-user-group"></i></div>
        </div>

        <div className="nav nav-footer">
            <div className="nav-item"><i className="fa-solid fa-gear"></i></div>
            <div className="nav-item"><i className="fa-solid fa-right-from-bracket" onClick={logout}></i></div>
        </div>
    </div>
    );
}

export default NavBar;