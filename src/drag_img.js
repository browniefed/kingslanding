import React, { Component } from "react";
import { Image } from "react-konva";

export default class DragImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null
    };

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragStart(e) {
    e.target.to({
      duration: 0.1,
      shadowOffsetX: 15,
      shadowOffsetY: 15
    });
  }

  onDragEnd(e) {
    e.target.to({
      duration: 0.3,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.image;
    image.onload = () => this.setState({ image });
  }

  render() {
    return (
      <Image
        draggable="true"
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        image={this.state.image}
        width={this.props.width}
        height={this.props.height}
        shadowOffsetX={5}
        shadowOffsetY={5}
        shadowColor="rgba(0,0,0,.5)"
        shadowBlur={6}
      />
    );
  }
}
