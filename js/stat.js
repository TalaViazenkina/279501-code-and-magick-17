'use strict';

var CLOUD_WIDTH = 420; // ширина всплывающего окна
var CLOUD_HEIGHT = 270; // высота всплывающего окна
var CLOUD_X = 100; // координата Х всплывающего окна
var CLOUD_Y = 10; // координата Y всплывающего окна
var CLOUD_FONT = 16; // размер шрифта
var cloudLineHeight = CLOUD_FONT * 1.2; // интерлиньяж
var GAP = 50; // отступы между столбцами
var statX = CLOUD_X + GAP * 1.1; // координата Х блока со статистикой
var statY = CLOUD_Y + GAP * 1.5; // координата Y блока со статистикой
var STAT_BAR_WIDTH = 40; // ширина столбца гистограммы
var STAT_BAR_MAX_HEIGHT = 150; // максимальная высота столбца гистограммы

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
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP / 2 + cloudLineHeight);

  // гистограмма
  ctx.textAlign = 'left';
  // ctx.textBaseline = 'top';
  ctx.fillText('150', statX, statY);
  ctx.fillRect(statX, statY + cloudLineHeight / 2, STAT_BAR_WIDTH, STAT_BAR_MAX_HEIGHT);
  ctx.fillText('Вы', statX, statY + STAT_BAR_MAX_HEIGHT + cloudLineHeight * 1.5);

  // добавили ещё победителей
  // игрок 2
  ctx.fillText('150', statX + (STAT_BAR_WIDTH + GAP), statY);
  ctx.fillRect(statX + (STAT_BAR_WIDTH + GAP), statY + cloudLineHeight / 2, STAT_BAR_WIDTH, STAT_BAR_MAX_HEIGHT);
  ctx.fillText('Игрок2', statX + (STAT_BAR_WIDTH + GAP), statY + STAT_BAR_MAX_HEIGHT + cloudLineHeight * 1.5);


  // игрок 3
  ctx.fillText('150', statX + (STAT_BAR_WIDTH + GAP) * 2, statY);
  ctx.fillRect(statX + (STAT_BAR_WIDTH + GAP) * 2, statY + cloudLineHeight / 2, STAT_BAR_WIDTH, STAT_BAR_MAX_HEIGHT);
  ctx.fillText('Игрок3', statX + (STAT_BAR_WIDTH + GAP) * 2, statY + STAT_BAR_MAX_HEIGHT + cloudLineHeight * 1.5);


  // игрок 4
  ctx.fillText('150', statX + (STAT_BAR_WIDTH + GAP) * 3, statY);
  ctx.fillRect(statX + (STAT_BAR_WIDTH + GAP) * 3, statY + cloudLineHeight / 2, STAT_BAR_WIDTH, STAT_BAR_MAX_HEIGHT);
  ctx.fillText('Игрок4', statX + (STAT_BAR_WIDTH + GAP) * 3, statY + STAT_BAR_MAX_HEIGHT + cloudLineHeight * 1.5);
};
