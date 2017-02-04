import React, { Component } from "react";
import { Layer, Stage } from "react-konva";

import DragImage from "./drag_img";

const BACKGROUND_IMAGE = "";
const PLACE_IMAGES = [
  "/yoda.jpg",
  "/yoda.jpg",
  "/yoda.jpg",
  "/yoda.jpg",
  "/yoda.jpg"
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedImage: null,
      images: []
    };
    this.handleCapture = this.handleCapture.bind(this);
    this.handleAddImage = this.handleAddImage.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
  }

  handleCapture() {
    this.setState({
      savedImage: this.stage.getStage().toDataURL({
        width: 700,
        height: 300,
        pixelRatio: 1,
        mimeType: "image/png"
      })
    });
  }
  handleAddImage(image) {
    this.setState(state => ({
      images: [...state.images, image]
    }));
  }
  handleRemoveImage(index) {
    const images = [...this.state.images];
    images.splice(index, 1);
    this.setState({
      images
    });
  }
  render() {
    return (
      <div>
        <Stage width={700} height={300} ref={stage => this.stage = stage}>
          <Layer>
            {this.state.images.map((img, index) => {
              return (
                <DragImage
                  image={img}
                  onRemove={() => this.handleRemoveImage(index)}
                />
              );
            })}
          </Layer>
        </Stage>
        <div>
          {PLACE_IMAGES.map(img => (
            <img src={img} onClick={() => this.handleAddImage(img)} />
          ))}
        </div>
        <button onClick={this.handleCapture}>Capture</button>
        {this.state.savedImage && <img src={this.state.savedImage} />}
      </div>
    );
  }
}

export default App;
