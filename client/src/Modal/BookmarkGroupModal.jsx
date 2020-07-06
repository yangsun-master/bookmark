import React from "react";
import { Modal } from "react-bootstrap";
import type { ButtonClickHandler, Group, SaveGroupHandler } from "../App/Types";
import BookmarkGroupForm from "./BookmarkGroupForm";

type Props = {
  show: boolean,
  onClose: ButtonClickHandler,
  onSave: SaveGroupHandler,
  data?: Group,
};

function BookmarkGroupModal(props: Props) {
  const { show, onClose, onSave, data } = props;

  return (
    <Modal
      centered
      size="lg"
      show={show}
      onHide={onClose}
      aria-label="bookmark group modal"
    >
      <BookmarkGroupForm
        onClose={onClose}
        show={show}
        onSubmit={onSave}
        data={data}
      />
    </Modal>
  );
}

export default BookmarkGroupModal;
