import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import axios from 'axios';

const LocalModal = ({local}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
        <Button variant="success" onClick={handleShow}>
            위치보기
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
        <Modal.Header closeButton>
            <Modal.Title>{local.place_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Map center={{lat:local.y,lng:local.x}} style={{width: "100%", height: "360px"}}>
                <MapMarker position={{lat:local.y,lng:local.x}}>
                    <div>{local.phone}</div>
                </MapMarker>
            </Map>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
                닫기
            </Button>
        </Modal.Footer>
        </Modal>
        </>
    );
}

export default LocalModal;