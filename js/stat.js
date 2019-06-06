'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_FONT = 16;
var CLOUD_LINE_HEIGHT = CLOUD_FONT * 1.2;
var GAP = 50;

// функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


window.renderStatistics = function (ctx) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, 100, 10, '#ffffff');

// поздравительная надпись на облаке
  ctx.fillStyle = '#000000';
  ctx.font = CLOUD_FONT + 'px "PT Mono"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('Ура вы победили!', 100 + CLOUD_WIDTH / 2, GAP / 2);
  ctx.fillText('Список результатов:', 100 + CLOUD_WIDTH / 2, GAP / 2 + CLOUD_LINE_HEIGHT);
};
