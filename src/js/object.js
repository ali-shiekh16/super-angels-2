import loadObject from './loadObject';
import { MathUtils, Float32BufferAttribute, Color } from 'three';

export default class MeshObject {
  geometry = null;

  normal = null;
  position = null;

  color = null;
  randomPosition = null;

  uv = null;

  maxVertices = 0;

  constructor(meshPath, maxVertices) {
    this.meshPath = meshPath;
    this.maxVertices = maxVertices;
    this.geometry = null;
  }

  async init() {
    await this._setGeometry(this.meshPath);
    this._setNormal();

    this.setPosition();
    this.#setColorsAndRandPosition();
    this.#setUV();
  }

  async _setGeometry(meshPath) {
    const mesh = await loadObject(meshPath);
    this.geometry = mesh.geometry;

    return mesh;
  }

  _setNormal() {
    let newNormal = [];
    if (!this.geometry) return;

    if (this.geometry.attributes.normal.array.length < this.maxVertices * 3) {
      newNormal = [
        ...this.geometry.attributes.normal.array,
        ...new Array(
          this.maxVertices * 3 - this.geometry.attributes.normal.array.length
        ).fill(0),
      ];

      // this.normal = new Float32BufferAttribute(
      //   newNormal.length ? newNormal : this.geometry.attributes.normal.array,
      //   3
      // );

      this.normal = new Float32BufferAttribute(
        this.geometry.attributes.normal.array,
        3
      );
    }
  }

  setPosition() {
    if (!this.geometry) return;
    let newPosition = [];
    if (this.geometry.attributes.position.array.length < this.maxVertices * 3) {
      newPosition = [
        ...this.geometry.attributes.position.array,
        ...new Array(
          this.maxVertices * 3 - this.geometry.attributes.position.array.length
        ).fill(0),
      ];
    }

    // this.position = new Float32BufferAttribute(
    //   newPosition.length
    //     ? newPosition
    //     : this.geometry.attributes.position.array,
    //   3
    // );

    this.position = new Float32BufferAttribute(
      this.geometry.attributes.position.array,
      3
    );
  }

  #setUV() {
    if (!this.geometry) return;

    if (this.geometry.attributes.uv)
      this.uv = new Float32BufferAttribute(
        this.geometry.attributes.uv.array,
        3
      );
  }

  // #setColorsAndRandPosition() {
  //   if (!this.position) return;
  //   const randVertices = [];
  //   const colors = [];
  //   const pallete = [
  //     '#FFDFA9',
  //     '#FFB332',
  //     '#FFB332',
  //     '#FFB332',
  //     '#FBFF02',
  //     '#FBFF02',
  //     '#FBFF02',
  //   ];

   #setColorsAndRandPosition() {
    if (!this.position) return;
    const randVertices = [];
    const colors = [];
    const pallete = [
      '#00027d',
      '#FFBE02',
      '#FFBE02',
      '#FFBE02',
      '#FBFF02',
      '#FBFF02',
      '#FBFF02',
    ];


    const color = new Color();
    for (let i = 0; i < this.position.array.length; i++) {
      randVertices.push(Math.random(), Math.random(), Math.random());

      color.set(pallete[MathUtils.randInt(0, pallete.length - 1)]);
      colors.push(color.r, color.g, color.b);
    }

    this.color = new Float32BufferAttribute(colors, 3);
    this.randomPosition = new Float32BufferAttribute(randVertices, 3);
  }
}
