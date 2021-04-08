import React from "react"
import { HeaderWrapper } from "./styled-components"
import Space from "../space";
import {useHistory, useLocation } from "react-router-dom";
import {useSnapshot} from "valtio";
import store from "../../store";

const Header = () => {
    const location = useLocation();
    const history = useHistory();
    const snap = useSnapshot(store);
    const onAuthClick = () => {
        if(!snap.user.isLoggedIn) {
            history.push('/login');
            return;
        }
        store.user.logout();
    }
    return <HeaderWrapper>
        <button onClick={() => history.push('/')} className={location.pathname === '/' ? 'chosen' : 'not-chosen'}>
            Главная
        </button>
        <Space width={'12px'} />
        <button onClick={onAuthClick} className={location.pathname === '/login' ? 'chosen' : 'not-chosen'}>
            {snap.user.isLoggedIn ? 'Выйти' : 'Войти'}
        </button>
    </HeaderWrapper>
}

export default Header;