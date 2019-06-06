'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_FONT = 16;
var CLOUD_LINE_HEIGHT = CLOUD_FONT * 1.2;
var GAP = 50;
var STAT_X = CLOUD_X + GAP * 1.1;
var STAT_Y = CLOUD_Y + GAP * 1.5;
var STAT_BAR_WIDTH = 40;
var STAT_BAR_MAX_HEIGHT = 150;

// функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


window.renderStatistics = function (ctx) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  // поздравительная надпись на облаке
  ctx.fillStyle = '#000000';
  ctx.font = CLOUD_FONT + 'px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP / 2);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP / 2 + CLOUD_LINE_HEIGHT);

  // гистограмма
  ctx.textAlign = 'left';
  // ctx.textBaseline = 'top';
  ctx.fillText('150', STAT_X, STAT_Y);
  ctx.fillRect(STAT_X, STAT_Y + CLOUD_LINE_HEIGHT / 2, STAT_BAR_WIDTH, STAT_BAR_MAX_HEIGHT);
  ctx.fillText('Вы', STAT_X, STAT_Y + STAT_BAR_MAX_HEIGHT + CLOUD_LINE_HEIGHT * 1.5);

  // добавили ещё победителей
  // игрок 2
  ctx.fillText('150', STAT_X + (STAT_BAR_WIDTH + GAP), STAT_Y);
  ctx.fillRect(STAT_X + (STAT_BAR_WIDTH + GAP), STAT_Y + CLOUD_LINE_HEIGHT / 2, STAT_BAR_WIDTH, STAT_BAR_MAX_HEIGHT);
  ctx.fillText('Игрок2', STAT_X + (STAT_BAR_WIDTH + GAP), STAT_Y + STAT_BAR_MAX_HEIGHT + CLOUD_LINE_HEIGHT * 1.5);


  // игрок 3
  ctx.fillText('150', STAT_X + (STAT_BAR_WIDTH + GAP) * 2, STAT_Y);
  ctx.fillRect(STAT_X + (STAT_BAR_WIDTH + GAP) * 2, STAT_Y + CLOUD_LINE_HEIGHT / 2, STAT_BAR_WIDTH, STAT_BAR_MAX_HEIGHT);
  ctx.fillText('Игрок3', STAT_X + (STAT_BAR_WIDTH + GAP) * 2, STAT_Y + STAT_BAR_MAX_HEIGHT + CLOUD_LINE_HEIGHT * 1.5);


  // игрок 4
  ctx.fillText('150', STAT_X + (STAT_BAR_WIDTH + GAP) * 3, STAT_Y);
  ctx.fillRect(STAT_X + (STAT_BAR_WIDTH + GAP) * 3, STAT_Y + CLOUD_LINE_HEIGHT / 2, STAT_BAR_WIDTH, STAT_BAR_MAX_HEIGHT);
  ctx.fillText('Игрок4', STAT_X + (STAT_BAR_WIDTH + GAP) * 3, STAT_Y + STAT_BAR_MAX_HEIGHT + CLOUD_LINE_HEIGHT * 1.5);
};
