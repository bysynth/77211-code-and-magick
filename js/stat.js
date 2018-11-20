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

var Text = {
  X: 120,
  Y: 40,
  OFFSET: 20,
  FONT: '16px PT Mono',
  COLOR: '#000000',
  CONTENT: ['Ура вы победили!', 'Список результатов:']
};

var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color || '#000000';
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, color, font, text, x, y) {
  ctx.fillStyle = color || '#000000';
  ctx.font = font || '16px Arial';
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, Cloud.X + Cloud.OFFSET, Cloud.Y + Cloud.OFFSET, Cloud.WIDTH, Cloud.HEIGHT, Cloud.SHADOW);
  renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT, Cloud.COLOR);

  renderText(ctx, Text.COLOR, Text.FONT, Text.CONTENT[0], Text.X, Text.Y);
  renderText(ctx, Text.COLOR, Text.FONT, Text.CONTENT[1], Text.X, Text.Y + Text.OFFSET);
};
