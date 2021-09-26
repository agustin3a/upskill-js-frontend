import React from 'react';
import TransactionLayout from '../../components/Transaction/TransactionLayout';
import TransferForm from '../../components/Transfer/TransferForm';

function MakeATransfer() {
    return (
        <TransactionLayout>
            <TransferForm title="Make a transfer"/>
        </TransactionLayout>
    )
}

export default MakeATransfer
