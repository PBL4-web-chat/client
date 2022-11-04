import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { authReducer } from "../reducer/authReducer";
import { useReducer } from "react";

function Login() {

    const [auth, dispatch] = useReducer(authReducer, {})
    const { loginUser, loadUser } = useContext(AuthContext);

    useEffect(() => {
        if(localStorage['accessToken']) {
            loadUser();
            nav('/mainpage');
        };
    }, [])

    const [ loginStatus, setLoginStatus ] = useState( { 
        display: false,
        message: ""
    } )

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const nav = useNavigate();

    const onChangeContext = (event) => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
    }

    const login = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            console.log(loginData);
            if(loginData.success){
                nav('/mainpage');
            }
            else{
                setLoginStatus( { 
                    display: true,
                    message: loginData.message
                } )
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Login</h1> 
                    <Form className="my-2" name="login" onSubmit={login}>
                        <Form.Group className="my-1">
                            <Form.Control
                                type="text"
                                placeholder="username"
                                name="username"
                                required
                                autoComplete="off"
                                onChange={onChangeContext}
                            />
                        </Form.Group>
                        <Form.Group className="my-1">
                            <Form.Control
                                type="password"
                                placeholder="password"
                                name="password"
                                required
                                autoComplete="off"
                                onChange={onChangeContext}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className="mt-1">Login</Button>
                    </Form>
                    {loginStatus.display && <div style={{color: "red"}}>{loginStatus.message}</div>}
                </div>
                
            </div>
        </div>
    );
}

export default Login;