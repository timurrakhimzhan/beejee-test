import BaseStore from "../base-store";
import {LS_TOKEN_KEY} from "../../constants";

export default class UserStore extends BaseStore {
    username: string | null = null;
    token: string | null = null;
    isLoggedIn: boolean = false;

    login(username: string, token: string) {
        this.username = username;
        this.token = token;
        this.isLoggedIn = true;
        localStorage.setItem(LS_TOKEN_KEY, token);
    }

    logout() {
        this.username = null;
        this.token = null;
        this.isLoggedIn = false;
        localStorage.removeItem(LS_TOKEN_KEY);

    }
}