import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, FormGroup, Label, Modal, ModalBody } from "reactstrap";
import { DeleteIcon, HomeIcon, SuccessDelete } from "../../assets";
import {
  createData,
  deleteData,
  getDetail,
  listActivity,
  setActivity,
  setRedirect,
} from "../../redux/todosSlicer";

const LandingPage = () => {
  const { activity } = useSelector((state) => state.todosSlicer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const [idActivity, setIdActivity] = useState("");
  const [indexDel, setIndexDel] = useState(null);

  useEffect(() => {
    dispatch(listActivity());
  }, [dispatch]);

  const formatDate = (cell, row) => {
    let dateFormat = moment(cell).format("DD MMMM YYYY");
    return dateFormat;
  };

  //   function listItem() {
  //     navigate("/Tambah-Activity");
  //   }

  const handlePost = () => {
    dispatch(createData());
  };
  const handleDelete = (e) => {
    setModal(!modal);
    const tempIndex = activity.findIndex((item) => item.id === e);
    setIndexDel(tempIndex);
  };

  const handleDetail = (e) => {
    dispatch(setActivity({ key: "id_detail", value: e }));
    dispatch(getDetail(e));
    const detail_title = activity.find((item) => item.id === e)
    dispatch(setActivity({ key: "title_detail", value: detail_title.title }));
    dispatch(setRedirect(true))
    navigate(`/List-Items/${e}`);
  };

  return (
    <Col className="container">
      <Modal isOpen={modalDelete} toggle={toggleDelete} size="ml" centered>
        <ModalBody>
          <FormGroup className="d-flex justify-content-start pt-2">
            <SuccessDelete className="mx-2 mt-1" />
            <span className="fs-5 ">Activity berhasil dihapus</span>
          </FormGroup>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal} toggle={toggle} size="ml" centered>
        <ModalBody className="my-3">
          <FormGroup className="d-flex justify-content-center">
            <DeleteIcon />
          </FormGroup>
          <FormGroup className="d-flex justify-content-center">
            <Label className="text-center fs-4 ">
              Apakah anda yakin menghapus activity
              <br />
              <Label className="fw-bold">"{activity[indexDel]?.title}"?</Label>
            </Label>
          </FormGroup>
          <FormGroup className="d-flex justify-content-center">
            <Button
              color="light"
              className="text-muted fw-bold rounded-pill px-5 p-3 mx-2"
              onClick={toggle}
            >
              Batal
            </Button>
            <Button
              color="danger"
              className="text-white  fw-bold rounded-pill px-5 p-3 mx-2"
              onClick={() => {
                dispatch(deleteData({ id: idActivity }));
                toggleDelete();
                toggle();
              }}
            >
              Hapus
            </Button>
          </FormGroup>
        </ModalBody>
      </Modal>
      <Row>
        <Col>
          <Label className="fw-bold fs-1">Activity</Label>
        </Col>
        <Col>
          <Col className="d-flex my-2 flex-row-reverse">
            <Button
              color="info"
              onClick={handlePost}
              className="rounded-pill text-white fw-bold px-4 py-2"
            >
              <FontAwesomeIcon
                className="icon pr-1 mx-1 fw-bold"
                icon={faAdd}
              />
              Tambah
            </Button>
          </Col>
        </Col>
      </Row>
      <Row className="my-5 ">
        {activity.length === 0 ? (
          <>
            <HomeIcon />
          </>
        ) : (
          <>
            {activity.map((item) => {
              // console.log(item.id, "ini id dari mapping")
              return (
                <Col sm="3" key={item.id}>
                  <Card
                    className="d-flex flex-column border border-0 rounded shadow my-2"
                    style={{
                      minHeight: "30vh",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{ paddingBottom: "80%"}}
                      onClick={handleDetail.bind(null, item.id)}
                    >
                      <h1
                        //   onClick={listItem}
                        style={{
                          cursor: "pointer",
                        }}
                        className=" mb-auto fw-bold fs-4 m-4"
                      >
                        {item.title}
                      </h1>
                    </div>
                    {/* <Row className='d-flex'> */}
                    <span className="fs-5 mx-4 d-flex justify-content-between mb-4">
                      {formatDate(item.created_at)}
                      <FontAwesomeIcon
                        className="icon pr-1 mt-1 fw-bold "
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setIdActivity(item.id);
                          handleDelete(item.id);
                        }}
                        icon={faTrash}
                      />
                    </span>
                    {/* </Row> */}
                  </Card>
                </Col>
              );
            })}
          </>
        )}
      </Row>
    </Col>
  );
};

export default LandingPage;
