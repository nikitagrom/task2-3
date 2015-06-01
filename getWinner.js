var WINNER_CONDITION = 4 ;

function getWinner() {
  'use strict';

  var allCells = document.querySelectorAll('.cell');
  var lineHeight = Math.sqrt(allCells.length);
  var cellsArray = [];
  var i;
  var j;

  for (i = 0; i < lineHeight; i++) {
    cellsArray[i] = [];
    for (j = 0; j < lineHeight; j++) {
      cellsArray[i][j] = allCells[i * lineHeight + j];
    }
  }
  return getWinner.checkHVLine(cellsArray, lineHeight) || getWinner.checkDiagonLine(cellsArray, lineHeight) || getWinner.checkBackDiagonLine(cellsArray, lineHeight);
}

// Обнулитель данных для проверки
getWinner.temporaryResults = function() {
  'use strict';
  return {
    result: '',
    resultCount: 0
  };
};

getWinner.checkResults = function(results) {
  'use strict';
  var i;
  var output = false;
  for (i = 0; i < results.length; i++) {
    if (results[i].resultCount === WINNER_CONDITION) {
      output = results[i].result;
    }
  }
  return output;
};

// Проверка текущей ячейки и сравнивание ее с предыдущей проверенной.
getWinner.checkFilled = function(results, cell) {
  'use strict';
  var cellFilledX = cell.classList.contains('x');
  var cellFilledO = cell.classList.contains('o');
  if (cellFilledX) {
    results.resultCount = results.result === 'x' ? results.resultCount += 1 : 1;
    results.result = 'x';
  } else if (cellFilledO) {
    results.resultCount = results.result === 'o' ? results.resultCount += 1 : 1;
    results.result = 'o';
  } else {
    results.resultCount = 0;
  }
};

getWinner.checkHVLine = function(cellsArray, lineHeight) {
  // Проверка вертикальных и горизонтальных линий
  'use strict';
  var isFinished = false;
  var resultType1;
  var resultType2;
  var i;
  var j;
  for (i = 0; i < lineHeight; i += 1) {
    resultType1 = getWinner.temporaryResults();
    resultType2 = getWinner.temporaryResults();
    for (j = 0; j < lineHeight; j += 1) {
      getWinner.checkFilled(resultType1, cellsArray[i][j]);
      getWinner.checkFilled(resultType2, cellsArray[j][i]);

      isFinished = getWinner.checkResults([resultType1, resultType2]);
      if (isFinished) {
        return isFinished;
      }
    }
  }
  return false;
};

getWinner.checkDiagonLine = function(cellsArray, lineHeight) {
  // Проверка диагоналей с левого верха к правому низу
  'use strict';

  var isFinished = false;
  var resultType1;
  var resultType2;
  var i;
  var j;
  var k;
  for (i = 0; i < lineHeight - WINNER_CONDITION + 1; i++) {
    resultType1 = getWinner.temporaryResults();
    resultType2 = getWinner.temporaryResults();
    for (j = i, k = 0; j < lineHeight; j++, k++) {
      getWinner.checkFilled(resultType1, cellsArray[j][k]);
      getWinner.checkFilled(resultType2, cellsArray[k][j]);
      isFinished = getWinner.checkResults([resultType1, resultType2]);
      if (isFinished) {
        return isFinished;
      }
    }
  }
  return false;
};

getWinner.checkBackDiagonLine = function(cellsArray, lineHeight) {
  // Проверка диагоналей с левого низа к правому верху
  'use strict';
  var isFinished = false;
  var resultType1;
  var resultType2;
  var i;
  var j;
  var k;
  for (i = WINNER_CONDITION - 1; i < lineHeight; i++) {
    resultType1 = getWinner.temporaryResults();
    resultType2 = getWinner.temporaryResults();
    for (j = i, k = 0; j > -1 && k < lineHeight; j--, k++) {
      getWinner.checkFilled(resultType1, cellsArray[j][k]);
      getWinner.checkFilled(resultType2, cellsArray[lineHeight - 1 - j][lineHeight - 1 - k]);
      isFinished = getWinner.checkResults([resultType1, resultType2]);
      if (isFinished) {
        return isFinished;
      }
    }
  }
  return false;
};