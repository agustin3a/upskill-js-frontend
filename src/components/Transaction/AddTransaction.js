import React from 'react'
import { Container } from 'react-bootstrap';
import TransactionForm from './TransactionForm';

function AddTransaction() {
    return (
        <Container>
            <TransactionForm title="Add transaction" />
        </Container>
    )
}

export default AddTransaction
