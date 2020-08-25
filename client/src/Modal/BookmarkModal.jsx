import { useObserver } from "mobx-react-lite";
import React from "react";
import { Modal } from "react-bootstrap";
import BookmarkForm from "../Form/BookmarkForm";
import { useBookmarkFormStore } from "../Store";

function BookmarkModal() {
  const store = useBookmarkFormStore();

  const closeModal = () => {
    store.closeModal();
  };

  return useObserver(() => (
    <Modal
      centered
      size="lg"
      backdrop="static"
      show={store.isModalShown}
      onHide={closeModal}
      aria-labelledby="bookmark-modal-title"
    >
      <BookmarkForm onClose={closeModal} />
    </Modal>
  ));
}

export default BookmarkModal;
