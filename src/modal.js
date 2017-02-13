import React, { Component } from "react";
import Modal from "react-overlays/lib/Modal";
import { connect } from "react-firebase";

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
  let top = 50
  let left = 50

  return {
    position: "absolute",
    width: 400,
    top: top + "%",
    left: left + "%",
    transform: `translate(-${top}%, -${left}%)`,
    border: "1px solid #e5e5e5",
    backgroundColor: "white",
    boxShadow: "0 5px 15px rgba(0,0,0,.5)",
    padding: 20
  };
};

class SendModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ethnicity: "",
      age: "",
      years: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  handleChange(field, value) {
    this.setState({
      [field]: value
    });
    this.props.addValue(this.props.id, field, value);
  }
  handleSend() {
    this.props.addValue(this.props.id, "ethnicity", this.state.ethnicity);
    this.props.addValue(this.props.id, "age", this.state.age);
    this.props.addValue(this.props.id, "years", this.state.years);
    this.props.onHide();
  }
  render() {
    return (
      <Modal
        show={this.props.open}
        onHide={this.props.onHide}
        style={modalStyle}
        backdropStyle={backdropStyle}
      >
        <div style={dialogStyle()} >

          <p>These questions are all optional.</p>

          <div>
            <label>Ethnicity</label>
            <select
              value={this.state.ethnicity}
              onChange={e => this.handleChange("ethnicity", e.target.value)}
            >
              <option value="-1">Select</option>
              <option value="White">White</option>
              <option value="Hispanic or Latino">Hispanic or Latino</option>
              <option value="Black or African American">Black or African American</option>
              <option value="Native American or American Indian">Native American or American Indian</option>
              <option value="Asian / Pacific Islander">Asian / Pacific Islander</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Age Range</label>
            <select
              value={this.state.age}
              onChange={e => this.handleChange("age", e.target.value)}
            >
              <option>Select</option>
              <option>Under 12 years old</option>
              <option>12-17 years old</option>
              <option>18-24 years old</option>
              <option>25-34 years old</option>
              <option>35-44 years old</option>
              <option>45-54 years old</option>
              <option>55-64 years old</option>
              <option>65-74 years old</option>
              <option>75 years or older</option>
            </select>
          </div>
          <div>
            <label>Years in the Community</label>
            <input
              value={this.state.years}
              onChange={e => this.handleChange("years", e.target.value)}
            />
          </div>
          <button onClick={this.handleSend}>Send Information</button>
          <button onClick={this.props.onHide}>Close</button>
        </div>
      </Modal>
    );
  }
}
const mapFirebaseToProps = (props, ref) => ({
  addValue: (id, key, value) => ref(`images/${id}/${key}`).set(value)
});

export default connect(mapFirebaseToProps)(SendModal);
