
import React, { useState } from 'react';
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup } from 'reactstrap';
import { Col, Row } from 'react-bootstrap'
import { faBan, faAdd, faCheck, faAngleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EmptyIcon } from '../../assets';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';


const AddTodoList = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false);
    const options = [
        { value: 'veryHigh', label: 'Very High' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
        { value: 'verylow', label: 'Very Low' },
    ];
    function listItem() {
        navigate("/List-Items")
    }
    function home() {
        navigate("/")
    }

    const data = []

    const toggle = () => setModal(!modal);
    return (
        <Col className='container'>
            <Modal
                isOpen={modal}
                toggle={toggle}
                centered
                size='lg'
            >
                <ModalHeader
                    toggle={toggle}>
                    Tambah List Item
                </ModalHeader>
                <ModalBody>
                    <FormGroup >
                        <Label className="small fw-bold ">NAMA LIST ITEM</Label>
                        <Input
                            className='w-100'
                            type="text"
                        />

                    </FormGroup>
                    <FormGroup >
                        <Label className="small fw-bold ">PRIORITY</Label>
                        <Select
                            options={options}
                            placeholder="Pilih Priority"
                            className='w-25'
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" className='text-white shadow rounded-pill px-5 p-3' onClick={listItem}>
                        Simpan
                    </Button>

                </ModalFooter>
            </Modal>

            <Row>
                <Col>
                    <Label className='fw-bold fs-1'>
                        <FontAwesomeIcon className="icon pr-1 me-5" onClick={home} style={{ cursor: "pointer" }} icon={faAngleLeft} />
                        New Activity
                        <FontAwesomeIcon className="icon pr-1 mx-5" icon={faEdit} />
                    </Label>

                </Col>
                <Col>
                    <Col className='d-flex my-2 flex-row-reverse'>
                        <Button color='info' className='rounded-pill text-white fw-bold px-4 py-2' onClick={toggle}>
                            <FontAwesomeIcon className="icon pr-1 mx-1 fw-bold" icon={faAdd} />
                            Tambah</Button>
                    </Col>

                </Col>
            </Row>

            {data.length !== 0 ? (
                <Row className='py-5 my-5'>
                    <EmptyIcon />
                </Row>
            ) : (
                <>
                    <Row className='py-5 my-5'>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                        <div className='bg-light py-4 my-2 p-2 shadow rounded' style={{ height: "7vh", width: "100%" }}>ini adalah  todo list</div>
                    </Row>
                </>

            )}
        </Col>

    )
}

export default AddTodoList