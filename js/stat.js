'use strict';

var Cloud = {
  X: 100,
  Y: 10,
  HEIGHT: 270,
  WIDTH: 420,
  OFFSET: 10,
  COLOR: '#ffffff',
  SHADOW: 'rgba(0, 0, 0, 0.7'
};

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, Cloud.X + Cloud.OFFSET, Cloud.Y + Cloud.OFFSET, Cloud.WIDTH, Cloud.HEIGHT, Cloud.SHADOW);
  renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT, Cloud.COLOR);
};
