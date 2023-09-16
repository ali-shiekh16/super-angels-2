import MeshObject from './object';

export default class Robot extends MeshObject {
  async _setGeometry(meshPath) {
    const group = await super._setGeometry(meshPath);

    if (this.geometry) {
      const scale = 100;
      group.geometry.scale(scale, scale, scale);
      group.geometry.rotateZ(-Math.PI / 2);
      group.geometry.rotateX(-Math.PI / 2);
      this.geometry = group.geometry;
    }
  }
}
