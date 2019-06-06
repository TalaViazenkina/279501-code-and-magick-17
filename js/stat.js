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
var statBarShift = STAT_BAR_WIDTH + GAP; // сдвиг столбца гистограммы по оси Х относительно предыдущего

// функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


window.renderStatistics = function (ctx, names) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  // поздравительная надпись на облаке
  ctx.fillStyle = '#000000';
  ctx.font = CLOUD_FONT + 'px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP / 2);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP / 2 + cloudLineHeight);

  // гистограмма
  for (var i = 0; i < names.length; i++) {
    // определяем цвет столбца гистограммы
    var barColor = 'rgba(255, 0, 0, 1)'; // цвет по умолчанию
    if (names[i] !== 'Вы') {
      barColor = 'hsl(240, ' + Math.random() * 100 + '%, 50%)'; // генерируем синий цвет со случайной насыщенностью
    }

    ctx.textAlign = 'left';
    ctx.fillText('150', statX + statBarShift * i, statY);
    ctx.fillStyle = barColor; // задаем цвет столбцу гистограммы
    ctx.fillRect(statX + statBarShift * i, statY + cloudLineHeight / 2, STAT_BAR_WIDTH, STAT_BAR_MAX_HEIGHT);
    ctx.fillStyle = '#000000'; // переопределяем цвет на дефолтный
    ctx.fillText(names[i], statX + statBarShift * i, statY + STAT_BAR_MAX_HEIGHT + cloudLineHeight * 1.5);
  }
};
