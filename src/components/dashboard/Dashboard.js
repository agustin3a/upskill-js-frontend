import React from 'react'
import { Container, Col, Row } from "react-bootstrap";
import TransactionsHistory from './TransactionsHistory';

function Dashboard() {
    return (
        <Container>
            <Row>
                <Col>
                   <h1> Welcome Banner </h1>
                </Col>
                <Col>
                    <h1> Options </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TransactionsHistory />
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
