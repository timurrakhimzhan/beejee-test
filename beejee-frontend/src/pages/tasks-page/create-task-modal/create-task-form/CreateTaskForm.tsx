import CustomForm from "../../../../shared/custom-form";
import {useForm} from "react-hook-form";
import Space from "../../../../shared/space";
import React, {useState} from "react";
import CustomButton from "../../../../shared/custom-button";
import {useQuery, useQueryClient} from "react-query";
import API from "../../../../api";
import {API_TASKS, API_TASKS_COUNT} from "../../../../constants";
import {useSnapshot} from "valtio";
import store from "../../../../store";
import Message from "../../../../shared/message/Message";

const CreateTaskForm: React.FC<{onClose: () => void}> = () => {
    const {register, handleSubmit, formState, getValues, reset} = useForm({
        defaultValues: {username: '', email: '', text: ''},
    });
    const snap = useSnapshot(store);
    const {currentPage, sortField, sortDirection} = snap.tasks
    const {errors} = formState;

    const [serverError, setServerError] = useState<string>('');
    const [success, setSuccess] = useState(false);
    const queryClient = useQueryClient();
    const {refetch} = useQuery('create-task', async () => {
        try {
            const {username, email, text} = getValues();
            await API.task.actions.createTask({username, email, text});
            reset();
            setServerError('');
            setSuccess(true);
            await queryClient.fetchQuery(API_TASKS_COUNT);
            await queryClient.fetchQuery([API_TASKS, {currentPage, sortField, sortDirection}]);
        } catch(error) {
            setServerError('Ошибка сервера');
        }
    }, {enabled: false, retry: false});
    const onSubmit = () => refetch();
    if(success) {
        return <Message error={false}>Задача успешно сохранена</Message>
    }
    return <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <div className={'input-item'}>
            <label>Имя пользователя:</label>
            <input type={'text'} {...register('username', {required: 'Пустое имя пользователя'})} />
            {errors.username ? <Message className={'error'} error>{errors.username.message}</Message> : null}
        </div>
        <Space height={'12px'} />
        <div className={'input-item'}>
            <label>Email:</label>
            <input type={'text'} {...register('email', {
                required: 'Пустая почта',
                pattern: {value: /\S+@\S+\.\S+/, message: 'Невалидная почта' }})} />
            {errors.email ? <Message className={'error'} error>{errors.email.message}</Message> : null}
        </div>
        <Space height={'12px'} />
        <div className={'input-item'}>
            <label>Текст:</label>
            <textarea rows={3} {...register('text', {required: 'Пустой текст'})} />
            {errors.text ? <Message className={'error'} error>{errors.text.message}</Message> : null}
        </div>
        <Space height={'12px'} />
        <CustomButton type={'submit'}>Создать задачу</CustomButton>
        {serverError ? <Message className={'serverError'} error>{serverError}</Message> : null}
    </CustomForm>
}

export default CreateTaskForm;