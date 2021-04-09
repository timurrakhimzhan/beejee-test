import CustomForm from "../../../../shared/custom-form";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import CustomButton from "../../../../shared/custom-button";
import {useSnapshot} from "valtio";
import store from "../../../../store";
import Space from "../../../../shared/space";
import {useQuery, useQueryClient} from "react-query";
import API from "../../../../api";
import {API_TASKS} from "../../../../constants";
import Message from "../../../../shared/message";

type Props = {
    onClose: () => void;
}
const EditTaskForm: React.FC<Props> = ({onClose}) => {
    const snap = useSnapshot(store);
    const {editingTaskId, idTaskMap, currentPage, sortField, sortDirection} = snap.tasks;
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState, getValues, setValue} = useForm<{text: string, status: '1' | '0'}>({
        defaultValues: {text: '', status: '1'},
    });
    const {errors} = formState;
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    const {refetch} = useQuery('editTask', async () => {
        if(!editingTaskId) {
            return;
        }
        const {text, status} = getValues();
        const statusNumber = status === '1' ? 1 : 0;
        try {
            const response = await API.task.actions.editTask(editingTaskId, {text, status: statusNumber });
            const task = response.message;
            store.tasks.editTask(task);
            setSuccess(true);
            await queryClient.fetchQuery([API_TASKS, {currentPage, sortDirection, sortField}]);
        } catch(error) {
            setServerError('Необходимо авторизоваться');
        }
    }, {enabled: false});

    useEffect(() => {
        if(!editingTaskId) {
            return;
        }
        const task = idTaskMap[editingTaskId];
        const status = task.status === 1 ? '1' : '0';
        setValue('text', task.text);
        setValue('status', status);
    }, [editingTaskId, idTaskMap, setValue]);

    const onSubmit = () => refetch();
    if(success) {
        return <Message error={false}>Задача успешно отредактирована</Message>
    }
    return <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <div className={'input-item'}>
            <label>Текст:</label>
            <textarea rows={3} {...register('text', {required: 'Пустое имя пользователя'})} />
            {errors.text ? <Message className={'error'} error>{errors.text.message}</Message> : null}
        </div>
        <Space height={'12px'} />
        <div className={'input-item'}>
            <label>Статус:</label>
            <select {...register('status', {required: 'Пустое имя пользователя'})}>
                <option value={'0'}>
                    Не выполнено
                </option>
                <option value={'1'}>
                    Выполнено
                </option>
            </select>
        </div>
        <Space height={'12px'} />
        <CustomButton type={'submit'}>
            Сохранить
        </CustomButton>
        {serverError ? <Message className={'serverError'} error>{serverError}</Message> : null}
    </CustomForm>
}

export default EditTaskForm;