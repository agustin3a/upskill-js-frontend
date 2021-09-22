import React from 'react'
import { Col, Row, Container } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
    let iconsSize = "1.5em";

    return (
        <>
            <footer className="p-1  bg-dark text-dark text-white">
                <Container>
                    <hr />
                    <Row>
                        <Col className="d-flex align-items-center">
                            <span>© 2021 Budget, Inc </span>
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end" >
                            <FaFacebookF size={iconsSize}/>
                            <FaTwitter  size={iconsSize}/>
                            <FaInstagram size={iconsSize}/>
                        </Col>
                    </Row>
                </Container>
                
            </footer>  
        </>
    )
}

export default Footer
