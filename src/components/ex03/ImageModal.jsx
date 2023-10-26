import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card } from 'react-bootstrap';

const ImageModal = ({box, setBox}) => {
    const handleClose = () => setBox({...box, show:false});

    return (
        <>
            <Modal
                show={box.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>이미지</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className='p-2'>
                        <img src={box.url} width="100%" />
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ImageModal