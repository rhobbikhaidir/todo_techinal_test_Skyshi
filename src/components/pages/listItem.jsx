import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Back from "../../assets/icon/back.svg";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteDetail,
  postDetail,
  putDetail,
  setActivity,
  setPostDetail,
  setPutDetail,
  updateTitle,
} from "../../redux/todosSlicer";
import "./detailPage.css";
import { DeleteIcon } from "../../assets";

const ListItems = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [blur, setBlur] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [titleModalDelete, setTitleModalDelete] = useState("");
  const [indexUpdatePriority, setIndexUpdatePriority] = useState(null);
  const [idList, setIdList] = useState("");

  const dispatch = useDispatch();

  const { list_detail, title_detail, id_detail } = useSelector(
    (state) => state.todosSlicer
  );

  const { title } = useSelector((state) => state.todosSlicer.put_detail);
  const options = [
    {
      value: "very-high",
      label: "Very High",
    },
    {
      value: "high",
      label: "High",
    },
    {
      value: "normal",
      label: "Medium",
    },
    {
      value: "low",
      label: "Low",
    },
    {
      value: "very-low",
      label: "Very Low",
    },
  ];

  const showModalUpdate = () => setModalUpdate(!modalUpdate);
  const showModalDelete = () => setModalDelete(!modalDelete);

  const showModalCreate = () => setModal(!modal);

  const onAddListData = (e) => {
    dispatch(postDetail());
    setModal(false);
  };

  const updateHandler = (e) => {
    // setTitleModalUPdate(e.title)
    setIdList(e.id);
    dispatch(setPutDetail({ key: "title", value: e.title }));
    const findIndex = options.findIndex((data) => data.value === e.priority);
    setIndexUpdatePriority(findIndex);
    const priority = options[findIndex];
    dispatch(
      setPutDetail({
        key: "priority",
        value: priority.value,
      })
    );
    showModalUpdate();
  };

  console.log(id_detail, "**id Detail");
  const blurHandler = () => {
    const id = parseInt(id_detail);
    setBlur(false);
    dispatch(updateTitle(id));
  };

  return (
    <div className="container">
      {/* Create Modal */}
      <Modal isOpen={modal} toggle={showModalCreate} centered size="lg">
        <ModalHeader toggle={showModalCreate}>Tambah List Item</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label className="small fw-bold ">NAMA LIST ITEM</Label>
            <Input
              className="w-100"
              type="text"
              // value={title}
              onChange={(e) =>
                dispatch(
                  setPostDetail({
                    key: "title",
                    value: e.target.value,
                  })
                )
              }
            />
          </FormGroup>
          <FormGroup>
            <Label className="small fw-bold ">PRIORITY</Label>
            <Select
              options={options}
              placeholder="Pilih Priority"
              className="w-25"
              // formatOptionLabel={formatOptionLabel}
              onChange={(e) =>
                dispatch(
                  setPostDetail({
                    key: "priority",
                    value: e.value,
                  })
                )
              }
              //   formatOptionLabel={formatOptionLabel}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            className="text-white shadow rounded-pill px-5 p-3"
            onClick={onAddListData}
          >
            Simpan
          </Button>
        </ModalFooter>
      </Modal>
      {/* update Modal */}
      <Modal isOpen={modalUpdate} toggle={showModalUpdate} centered size="lg">
        <ModalHeader toggle={showModalUpdate}>Tambah List Item</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label className="small fw-bold ">NAMA LIST ITEM</Label>
            <Input
              className="w-100"
              type="text"
              value={title}
              onChange={(e) =>
                dispatch(
                  setPutDetail({
                    key: "title",
                    value: e.target.value,
                  })
                )
              }
            />
          </FormGroup>
          <FormGroup>
            <Label className="small fw-bold ">PRIORITY</Label>
            <Select
              options={options}
              placeholder="Pilih Priority"
              className="w-25"
              defaultValue={options[indexUpdatePriority]}
              onChange={(e) =>
                dispatch(
                  setPutDetail({
                    key: "priority",
                    value: e.value,
                  })
                )
              }
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            className="text-white shadow rounded-pill px-5 p-3"
            onClick={() => {
              dispatch(putDetail(idList));
              setModalUpdate(false);
            }}
          >
            Simpan
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal Delete */}
      <Modal isOpen={modalDelete} toggle={showModalDelete} size="ml" centered>
        <ModalBody className="my-3">
          <FormGroup className="d-flex justify-content-center">
            <DeleteIcon />
          </FormGroup>
          <FormGroup className="d-flex justify-content-center">
            <Label className="text-center fs-4 ">
              Apakah anda yakin menghapus activity
              <br />
              <Label className="fw-bold">"{titleModalDelete}"?</Label>
            </Label>
          </FormGroup>
          <FormGroup className="d-flex justify-content-center">
            <Button
              color="light"
              className="text-muted fw-bold rounded-pill px-5 p-3 mx-2"
              onClick={showModalDelete}
            >
              Batal
            </Button>
            <Button
              color="danger"
              className="text-white  fw-bold rounded-pill px-5 p-3 mx-2"
              onClick={() => {
                dispatch(DeleteDetail(idList));
                setModalDelete(false);
              }}
            >
              Hapus
            </Button>
          </FormGroup>
        </ModalBody>
      </Modal>

      <Row>
        <Col style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={Back}
            alt="iconBack"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          {blur ? (
            <Input
              value={title_detail}
              onChange={(e) =>
                dispatch(
                  setActivity({ key: "title_detail", value: e.target.value })
                )
              }
              type="text"
              onBlur={blurHandler}
            />
          ) : (
            <div className="d-flex ">
              <h1 className="fw-bold">{title_detail}</h1>
              <FontAwesomeIcon
                className="icon align-self-center p-2 fw-bold  "
                style={{ cursor: "pointer", flex: 6 }}
                onClick={() => setBlur(true)}
                icon={faEdit}
              />
            </div>
          )}
        </Col>
        <Col>
          <Col className="d-flex my-2 flex-row-reverse">
            <Button
              //   color="info"
              onClick={() => {
                setModal(true);
                console.log("jaaallannanan");
              }}
              className="rounded-pill text-white fw-bold px-4 py-2"
            >
              Tambah
              <FontAwesomeIcon
                className="icon pr-1 mx-1 fw-bold"
                icon={faAdd}
              />
            </Button>
          </Col>
        </Col>
      </Row>
      <Row className="py-3 my-3 bg-blue">
        {list_detail?.map((item, i) => {
          return (
            <div
              className="bg-light  my-2 p-4 shadow rounded "
              style={{
                height: "7vh",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              key={i}
            >
              <div className={`${item.priority}`}></div>
              <p style={{ flex: 1 }}> {item.title}</p>
              <FontAwesomeIcon
                className="icon pr-1 mt-1 fw-bold "
                style={{ cursor: "pointer", flex: 6 }}
                onClick={updateHandler.bind(null, item)}
                icon={faEdit}
              />
              <FontAwesomeIcon
                className="icon pr-1 mt-1 fw-bold "
                style={{ cursor: "pointer", flex: 1 }}
                onClick={() => {
                  setIdList(item.id);
                  setTitleModalDelete(item.title);
                  showModalDelete();
                }}
                icon={faTrash}
              />
            </div>
          );
        })}
      </Row>
    </div>
  );
};

export default ListItems;
