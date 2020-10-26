import { User } from 'src/app/models/user.model';
import * as LoginActions from './login.actions';

export interface State {
    user: User;
    error: string;
    message: string;
}

const initialState: State = {
    user: null,
    error: null,
    message: null
}

export function loginReducer(state = initialState, action: LoginActions.LoginActions) {
    switch(action.type) {
        case LoginActions.SIGNUP_START:
        case LoginActions.LOGIN_START:
            return {
                ...state,
                message: null,
                error: null
            }
        case LoginActions.SIGNUP_SUCCESS:
            return {
                ...state,
                login: true,
                message: 'You have succesfully created an account!',
                error: null
            }
        case LoginActions.LOGIN_SUCCESS:
            const user = action.payload.user;
            return {
                ...state,
                user,
                message: null,
                error: null
            }
        case LoginActions.AUTH_FAIL:
            return {
                ...state,
                user: null,
                message: null,
                error: action.payload
            }
        case LoginActions.LOGOUT:
            return {
                ...state,
                user: null,
                message: null,
                error: null
            }
        case LoginActions.CLEAR_ERROR:
            return {
                ...state,
                message: null,
                error: null
            }
        default:
            return state;
    }
}