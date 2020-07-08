export default function rootReducer(state, action) {
    const {
        type,
        payload,
        tokenPay
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
        case 'UPDATE' : 
            return{
                ...state,
                user: payload
            }

        default:
            return state
    }
}