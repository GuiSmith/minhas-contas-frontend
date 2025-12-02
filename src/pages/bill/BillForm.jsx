// Libraries
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// UI
import '@styles/form.css';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';


const BillForm = () => {

    const { register, handleSubmit, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            // Validations
            setIsLoading(true);

            console.log(data);

            // Category can't be empty
            if(!(data.id_category > 0)){
                toast.warning('Preencha uma categoria!');
                return;
            }

            // Value can't be negative or empty
            if(!(data.value > 0)){
                toast.warning('Valor precisa ser maior que 0!');
                return;
            }

            // Due date can't be empty
            if(!data.due_date){
                toast.warning('Preencha data de vencimento!');
                return;
            }

            // Surcharge can't be negative
            if(data.surcharge < 0){
                toast.warning('Acréscimos não podem ser negativos!');
                return;
            }

            // Discounts can't be negative
            if(data.discount < 0){
                toast.warning('Descontos não podem ser negativos!');
                return;
            }

            // If status is canceled, a cancel date should be specified
            if(data.status == 'C' && !data.cancel_date){
                toast.warning('Preencha a data de cancelamento!');
                return;
            }

            // If status is paid, a payment date should be specified
            if(data.status == 'P' && !data.payment_date){
                toast.warning('Preencha a data de pagamento!');
                return;
            }

            // If status is scheduled, a scheduled date should be specified
            if(data.status == 'S' && !data.scheduled_date){
                toast.warning('Preencha a data de agendamento!');
                return;
            }

            toast.success('OK!');
        } catch (error) {
            toast.error('Erro ao salvar conta. Contate o suporte!');
            console.log('Erro ao salvar conta');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async () => {
        toast.warning('Ainda não implementado');
    };

    return (
        <article>
            {/* Título */}
            <div className='text-center'>
                <h1 className='fw-bold'>Conta a pagar</h1>
                <p>Cadastre sua conta a pagar</p>
            </div>
            {/* Formulário */}
            <form action="#" className='card shadow-sm p-3' onSubmit={handleSubmit(onSubmit)} >
                {/* Botões */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    <NavLink to='/bill/form' className={'btn btn-primary'} >Novo</NavLink>
                    <button type='submit' className='btn btn-success'>Salvar</button>
                    <NavLink to='/bills' className={'btn btn-dark'} >Listar</NavLink>
                    <button type='button' className='btn btn-danger' onClick={handleDelete}>Deletar</button>
                </div>
                {/* Descrição e Categoria */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Descrição */}
                    <div className='mb-3'>
                        <label htmlFor="description" className='form-label'>Descrição</label>
                        <input type="text" className='form-control' id='description' {...register('description')} placeholder='Conta de Energia' />
                    </div>
                    {/* Categoria */}
                    <div className='mb-3'>
                        <label htmlFor="id-category" className='form-label'>Categoria</label>
                        <select id="id-category" className='form-control' {...register('id_category')} >
                            <option value="0">Escolha uma categoria</option>
                            <option value="1">Teste</option>
                        </select>
                    </div>
                </div>
                {/* Valor e Data de vencimento */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Valor */}
                    <div className='mb-3'>
                        <label htmlFor="value" className='form-label'>Valor</label>
                        <input type="number" step='0.01' min='0' className='form-control' id='value' {...register('value')} placeholder='R$ 0,00' />
                    </div>
                    {/* Data de vencimento */}
                    <div className='mb-3'>
                        <label htmlFor="due-date" className='form-label'>Data de vencimento</label>
                        <input type="date" className='form-control' id='due-date' {...register('due_date')} />
                    </div>
                </div>
                {/* Recorrência, Status e Forma de pagamento */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Recorrência */}
                    <div className='mb-3'>
                        <label htmlFor="recurrence" className='form-label'>Recorrência</label>
                        <select id='recurrence' className='form-control' {...register('recurrence')} >
                            <option value="U">Única</option>
                            <option value="M">Mensal</option>
                            <option value="A">Anual</option>
                        </select>
                    </div>
                    {/* Status */}
                    <div className='mb-3'>
                        <label htmlFor="status" className='form-label'>Status</label>
                        <select id='status' className='form-control' {...register('status')} >
                            <option value="D">Aberto</option>
                            <option value="P">Pago</option>
                            <option value="S">Agendado</option>
                            <option value="C">Cancelado</option>
                        </select>
                    </div>
                    {/* Forma de pagamento */}
                    <div className='mb-3'>
                        <label htmlFor="payment-method" className='form-label'>Forma de pagamento</label>
                        <select id="payment-method" className='form-control' {...register('payment_method')}>
                            <option value="P">Pix</option>
                            <option value="T">Transferência</option>
                            <option value="B">Boleto</option>
                        </select>
                    </div>
                </div>
                {/* Datas de pagamento, cancelamento e agendamento */}
                <div>
                    {/* Data de pagamento */}
                    <div className='mb-3' style={{ display: `${watch('status') == 'P' ? 'block' : 'none'}` }}>
                        <label htmlFor="payment-date" className='form-label'>Data de Pagamento</label>
                        <input type="date" className='form-control' id='payment-date' {...register('payment_date')} />
                    </div>
                    {/* Data de cancelamento */}
                    <div className='mb-3' style={{ display: `${watch('status') == 'C' ? 'block' : 'none'}` }}>
                        <label htmlFor="cancel-date" className='form-label'>Data de Cancelamento</label>
                        <input type="date" className='form-control' id='cancel-date' {...register('cancel_date')} />
                    </div>
                    {/* Data de agendamento */}
                    <div className='mb-3' style={{ display: `${watch('status') == 'S' ? 'block' : 'none'}` }}>
                        <label htmlFor="scheduled-date" className='form-label'>Data de Agendamento</label>
                        <input type="date" className='form-control' id='scheduled-date' {...register('scheduled_date')} />
                    </div>
                </div>
                {/* Acréscimos e Descontos */}
                <div className='mb-3 d-flex flex-wrap justify-content-start gap-3'>
                    {/* Acréscimos */}
                    <div className='mb-3'>
                        <label htmlFor="surcharge" className='form-label'>Acréscimo</label>
                        <input type="number" className='form-control' id='surcharge' placeholder='R$ 0,00' {...register('surcharge')} />
                    </div>
                    {/* Desconto */}
                    <div className='mb-3'>
                        <label htmlFor="discount" className='form-label'>Desconto</label>
                        <input type="number" className='form-control' id='discount' placeholder='R$ 0,00' {...register('discount')} />
                    </div>
                </div>
                {/* Observações */}
                <div className='mb-3'>
                    <label htmlFor="notes" className='form-label'>Observações</label>
                    <textarea id='notes' className='form-control' placeholder='Ex: pagar só depois do dia 10' {...register('notes')}></textarea>
                </div>
            </form>
            <ToastContainer position='bottom-right' />
        </article>
    )
};

export default BillForm;