import React from 'react';
import { useParams } from 'react-router-dom';
import TransactionLayout from '../../components/Transaction/TransactionLayout';
import TransactionDelete from '../../components/Transaction/TransactionDelete';

function DeleteTransaction() {

    const { id } = useParams();

    return (
        <TransactionLayout>
            <TransactionDelete transactionId={id} />
        </TransactionLayout>
    )
}

export default DeleteTransaction
