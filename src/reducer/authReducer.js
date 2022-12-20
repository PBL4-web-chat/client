const authReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {...state,
                authLoading: false,
                authenticated: true,
                user: action.user_id
            }
        
        case "LOAD":
            return {...state,
                authLoading: false,
                authenticated: true,
                user: action.user_id
            }

        default:
            return state
    }
}

export { authReducer };