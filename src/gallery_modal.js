import React, { Component } from "react";
import Modal from "react-overlays/lib/Modal";
import { connect } from "react-firebase";
import map from "lodash/map";

const modalStyle = {
  position: "fixed",
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

const backdropStyle = {
  ...modalStyle,
  zIndex: "auto",
  backgroundColor: "#000",
  opacity: 0.5
};

const dialogStyle = function() {
  return {
    position: "absolute",
    top: "15px",
    left: "15px",
    right: "15px",
    bottom: "15px",
    overflow: "auto",
    border: "1px solid #e5e5e5",
    backgroundColor: "white",
    boxShadow: "0 5px 15px rgba(0,0,0,.5)",
    padding: 20
  };
};

class GalleryModal extends Component {
  render() {
    const images = this.props.images || [];
    return (
      <Modal
        show={this.props.open}
        onHide={this.props.onHide}
        style={modalStyle}
        backdropStyle={backdropStyle}
      >
        <div>
          <button onClick={this.props.onHide} className="close_button">×</button>
          <div style={dialogStyle()}>
            {map(images, ({ path }) => {
              return <img className="image" src={path} />;
            })}
          </div>
        </div>

      </Modal>
    );
  }
}
const mapFirebaseToProps = (props, ref) => ({
  images: "images"
});

export default connect(mapFirebaseToProps)(GalleryModal);
