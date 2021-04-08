import React, {useState} from "react"
import {LoginFormWrapper } from "./styled-components"
import Space from "../../../shared/space";
import {useForm} from 'react-hook-form';
import {useQuery} from "react-query";
import API from "../../../api";
import store from "../../../store";
import CustomForm from "../../../shared/custom-form";
import CustomButton from "../../../shared/custom-button";

const LoginForm = () => {
    const {register, handleSubmit, formState, getValues} = useForm({
        defaultValues: {username: '', password: ''},
    });
    const [serverError, setServerError] = useState<string>('');
    const {refetch} = useQuery('login', async () => {
        try {
            const {username, password} = getValues();
            const {message} = await API.auth.actions.login({username, password});
            setServerError('');
            store.user.login(username, message.token);
        } catch(error) {
            if(error?.response?.status === 401) {
                setServerError('Неверное сочетание логина и парня');
            } else {
                setServerError('Ошибка сервера');
            }
        }

    }, {enabled: false, retry: false});
    const {errors} = formState;

    const onSubmit = () => {
        return refetch();
    }

    return <LoginFormWrapper>
        <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <div className={'input-item'}>
                <label>Логин:</label>
                <input type={'text'} {...register('username', {required: 'Логин пустой'})} />
                {errors.username ? <span className={'error'}>{errors.username.message}</span> : null}
            </div>
            <Space height={'12px'} />
            <div className={'input-item'}>
                <label>Пароль:</label>
                <input type={'password'} {...register('password', {required: 'Пароль пустой'})} />
                {errors.password ? <span className={'error'}>{errors.password.message}</span> : null}
            </div>
            <Space height={'12px'} />
            <CustomButton type={'submit'}>Авторизоваться</CustomButton>
            {serverError ? <span className={'message serverError'}>{serverError}</span> : null}
        </CustomForm>
    </LoginFormWrapper>
}

export default LoginForm;