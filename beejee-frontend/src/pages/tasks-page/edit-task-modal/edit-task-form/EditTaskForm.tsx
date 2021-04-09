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

type Props = {
    onClose: () => void;
}
const EditTaskForm: React.FC<Props> = ({onClose}) => {
    const snap = useSnapshot(store);
    const {editingTaskId, idTaskMap, currentPage, sortField, sortDirection} = snap.tasks;
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState, getValues, setValue} = useForm<{text: string, status: '10' | '11'}>({
        defaultValues: {text: '', status: '10'},
    });
    const {errors} = formState;
    const [serverError, setServerError] = useState('');

    const {refetch} = useQuery('editTask', async () => {
        if(!editingTaskId) {
            return;
        }
        const {text, status} = getValues();
        try {
            await API.task.actions.editTask(editingTaskId, {text, status: status === '10' ? 10 : 11 });
            const task = idTaskMap[editingTaskId];
            store.tasks.editTask({...task, text, status: status === '10' ? 10 : 11 });
            onClose();
            await queryClient.fetchQuery([API_TASKS, {currentPage, sortDirection, sortField}]);
        } catch(error) {
            setServerError('Ошибка сервера')
        }
    }, {enabled: false});

    useEffect(() => {
        if(!editingTaskId) {
            return;
        }
        const task = idTaskMap[editingTaskId];
        const status = task.status === 0 || task.status === 10 ? 10 : 11;
        setValue('text', task.text);
        setValue('status', status === 10 ? '10' : '11');
    }, [editingTaskId, idTaskMap, setValue]);

    const onSubmit = () => refetch();
    return <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <div className={'input-item'}>
            <label>Текст:</label>
            <textarea rows={3} {...register('text', {required: 'Пустое имя пользователя'})} />
            {errors.text ? <span className={'error'}>{errors.text.message}</span> : null}
        </div>
        <Space height={'12px'} />
        <div className={'input-item'}>
            <label>Статус:</label>
            <select {...register('status', {required: 'Пустое имя пользователя'})}>
                <option value={'10'}>
                    Не выполнено
                </option>
                <option value={'11'}>
                    Выполнено
                </option>
            </select>
        </div>
        <Space height={'12px'} />
        <CustomButton type={'submit'}>
            Сохранить
        </CustomButton>
        {serverError ? <span className={'message serverError'}>{serverError}</span> : null}
    </CustomForm>
}

export default EditTaskForm;