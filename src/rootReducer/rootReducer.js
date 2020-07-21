export default function rootReducer(state, action) {
    const {
        type,
        payload,
        tokenPay,
        flag
    } = action;

    switch (type) {
        case 'LOGIN':
        case 'ONBOARD':
            localStorage.setItem('FBIdToken',  `${tokenPay}`);

            return {
                ...state,
                user: payload,
                    isAuth: true
            }
        case 'LOGOUT':
            localStorage.removeItem('FBIdToken')
            return {
                user: null,
                token: null,
                isAuth: false
            }
        case 'INITIAL' : 
            return{
                ...state,
                like: payload
            }
        case 'LIKE' :
            return{
                ...state,
                like: payload
            }

        default:
            return state
    }
}