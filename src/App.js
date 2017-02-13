import React, { Component } from "react";
import cx from "classnames";
import { Layer, Stage, Image } from "react-konva";
import firebase from "firebase";
import { connect } from "react-firebase";
import DragImage from "./drag_img";
import SaveModal from "./modal";
import GalleryModal from "./gallery_modal";

import "./app.css";

firebase.initializeApp({
  databaseURL: "https://kings-3d57c.firebaseio.com/"
});

const BACKGROUND_IMAGE = "/images/background.jpg";
const PLACE_IMAGES = [
  {
    path: "/images/Blue1.png",
    multiple: false
  },
  {
    path: "/images/Blue2.png",
    multiple: false
  },
  {
    path: "/images/Blue3.png",
    multiple: false
  },
  {
    path: "/images/Blue4.png",
    multiple: false
  },
  {
    path: "/images/Green1.png",
    multiple: false
  },
  {
    path: "/images/Green2.png",
    multiple: false
  },
  {
    path: "/images/Green3.png",
    multiple: false
  },
  {
    path: "/images/Green4.png",
    multiple: false
  },
  {
    path: "/images/Grey1.png",
    multiple: false
  },
  {
    path: "/images/Grey2.png",
    multiple: false
  },
  {
    path: "/images/Grey3.png",
    multiple: false
  },
  {
    path: "/images/Grey4.png",
    multiple: false
  },
  {
    path: "/images/Orange1.png",
    multiple: false
  },
  {
    path: "/images/Orange2.png",
    multiple: false
  },
  {
    path: "/images/Orange3.png",
    multiple: false
  },
  {
    path: "/images/Orange4.png",
    multiple: false
  },
  {
    path: "/images/Yellow1.png",
    multiple: false
  },
  {
    path: "/images/Yellow2.png",
    multiple: false
  },
  {
    path: "/images/Yellow3.png",
    multiple: false
  },
  {
    path: "/images/Yellow4.png",
    multiple: false
  },
  {
    path: "/images/Bench.png",
    multiple: true
  },
  {
    path: "/images/Light.png",
    multiple: true
  },
  {
    path: "/images/Tree.png",
    multiple: true
  },
  {
    path: "/images/Fence.png",
    multiple: true
  }
];

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const aspectWidthPercent = windowHeight / 2325 * 1650;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background_image: null,
      images: [],
      galleryOpen: false
    };
    this.handleCapture = this.handleCapture.bind(this);
    this.handleAddImage = this.handleAddImage.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = BACKGROUND_IMAGE;
    image.onload = () => this.setState({ background_image: image });
  }

  handleCapture() {
    const image = this.stage.getStage().toDataURL({
      mimeType: "image/png",
      quality: .1,
    });

    const savedImage = this.props.addImage(image);

    this.setState({
      image,
      open: true,
      id: savedImage.getKey()
    });
  }

  handleModalHide() {
    this.setState({
      image: null,
      open: false,
      id: null,
      images: []
    });
  }

  handleAddImage(image) {
    const hasImage = this.state.images.find(imagePath => imagePath === image);
    const masterImage = PLACE_IMAGES.find(({ path }) => path === image);

    if (hasImage && !masterImage.multiple) return;

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
      <div className="container">
        <SaveModal
          open={this.state.open}
          onHide={this.handleModalHide}
          image={this.state.image}
          id={this.state.id}
        />
        <GalleryModal
          open={this.state.galleryOpen}
          onHide={() => this.setState({ galleryOpen: false })}
        />
        <div className="left" style={{ width: `${aspectWidthPercent}px` }}>
          <Stage
            width={aspectWidthPercent}
            height={windowHeight}
            ref={stage => this.stage = stage}
          >
            <Layer>
              <Image
                image={this.state.background_image}
                width={aspectWidthPercent}
                height={windowHeight}
              />
            </Layer>
            <Layer>
              {this.state.images.map((img, index) => {
                return (
                  <DragImage
                    image={img}
                    width={aspectWidthPercent * 0.12}
                    height={aspectWidthPercent * 0.12}
                    onRemove={() => this.handleRemoveImage(index)}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
        <div
          className="right"
          style={{ width: `${windowWidth - aspectWidthPercent - 150}px` }}
        >
          <div className="bar">
            <span>Instructions</span>
            <button className="button" onClick={this.handleCapture}>Send Picture</button>
            <button className="button" onClick={() => this.setState({ galleryOpen: true })}>
              View Gallery
            </button>
          </div>
          {PLACE_IMAGES.map(({ path, multiple }) => {
            const hasImage = this.state.images.find(
              imagePath => imagePath === path
            );
            const classes = cx({
              image: true,
              disabled: hasImage && !multiple
            });

            return (
              <img
                className={classes}
                src={path}
                onClick={() => this.handleAddImage(path)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapFirebaseToProps = (props, ref) => ({
  images: "images",
  addImage: image => ref("images").push({ path: image }),
  addValue: (id, key, value) => ref(`images/${id}/${key}`).set(value)
});

export default connect(mapFirebaseToProps)(App);
