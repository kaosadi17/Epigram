import React from "react";
import {Modal, Button, Form} from 'react-bootstrap';

function EpigramModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
      <Form onSubmit={props.onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Epigram</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicQuote">
            <Form.Label>Quote</Form.Label>
            <Form.Control
              type="text"
              value={props.quote}
              required
              onChange={(e) => props.onChangeQuote(e)}
              placeholder="Enter Quote"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={props.author}
              onChange={props.onChangeAuthor}
              placeholder="Enter Author Name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={() => props.handleClose()}
          >
            Add
          </Button>
        </Modal.Footer>
      </Form>
      </Modal>
    </>
  );
}

export default EpigramModal;
