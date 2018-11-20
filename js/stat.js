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

var TextData = {
  X: 120,
  Y: 40,
  OFFSET: 20,
  FONT: '16px PT Mono',
  COLOR: '#000000',
  CONTENT: ['Ура вы победили!', 'Список результатов:']
};

var Histogram = {
  X: 140,
  Y: 90,
  WIDTH: 40,
  HEIGHT: 150,
  BOTTOM: 250,
  COLUMN_GAP: 50,
  FONT: '16px PT Mono',
  FONT_COLOR: '#000000',
  FONT_GAP_TOP: 10,
  FONT_GAP_BOTTOM: 20
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

var renderColumn = function (ctx, color, columnHeight, i) {
  ctx.fillStyle = color;
  ctx.fillRect(Histogram.X + (Histogram.WIDTH + Histogram.COLUMN_GAP) * i, Histogram.BOTTOM - columnHeight, Histogram.WIDTH, columnHeight);
};

var renderHistogram = function (ctx, number, name, i, columnHeight) {
  var color = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';

  renderText(ctx, Histogram.FONT_COLOR, Histogram.FONT, number, Histogram.X + (Histogram.WIDTH + Histogram.COLUMN_GAP) * i, Histogram.BOTTOM - columnHeight - Histogram.FONT_GAP_TOP);
  renderColumn(ctx, color, columnHeight, i);
  renderText(ctx, Histogram.FONT_COLOR, Histogram.FONT, name, Histogram.X + (Histogram.WIDTH + Histogram.COLUMN_GAP) * i, Histogram.BOTTOM + Histogram.FONT_GAP_BOTTOM);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, Cloud.X + Cloud.OFFSET, Cloud.Y + Cloud.OFFSET, Cloud.WIDTH, Cloud.HEIGHT, Cloud.SHADOW);
  renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT, Cloud.COLOR);

  renderText(ctx, TextData.COLOR, TextData.FONT, TextData.CONTENT[0], TextData.X, TextData.Y);
  renderText(ctx, TextData.COLOR, TextData.FONT, TextData.CONTENT[1], TextData.X, TextData.Y + TextData.OFFSET);

  // Так как встроенный метод объекта Math - max() принимает аргументы только в виде чисел (Math.max(1, 20, -10)), нам на помощь приходит метод apply(), который позволяет передать в функцию (в нашем случае метод .max() объекта Math) аргументы в виде массива. А мы точно знаем, что в массиве time у нас числа. Если бы мы были не уверены, что там только числа (потому что тогда будет NaN), то мы бы использовали цикл. Использование apply() с Math.max() является примером использования apply со встроенными функциями на MDN. В других случаях использования null заменяется на this. Но с this я пока не очень разобрался.

  var maxTime = Math.round(Math.max.apply(null, times));

  for (var i = 0; i < times.length; i++) {
    times[i] = Math.round(times[i]);
    renderHistogram(ctx, times[i], names[i], i, Histogram.HEIGHT * times[i] / maxTime);
  }
};
