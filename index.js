

window.addEventListener('load', function () {
    var generateFieldButton = document.querySelector('.generateField');
    var startNewGameButton = document.querySelector('.startNewGame');
    var input = document.querySelector('.count');
    var field = document.querySelector('.field');
    var fieldCounts = input.value;
    var count = 0;

    field.addEventListener('click', function (e) {

        if (count % 2 === 1 && e.target.getAttribute('class') === 'cell') {
            e.target.classList.add('x');
            count++;
        }
        else if (count % 2 === 0 && e.target.getAttribute('class') === 'cell') {
            e.target.classList.add('o');
            count++;
        }

    });

});

function checkGame() {
    obj = [];
    var field = document.querySelector('.field');
    for (var i = 0; i < field.children.length; i++) {
        obj.push([]);
        var row = field.children[i];
        console.log(row.children);
        for (var j = 0; j < row.children.length; j++) {
            obj[i].push(row.children[j].getAttribute('class'))
        }
    }
    return obj;
}

function buildGame(count) {
    count = 0;
    localStorage.setItem('ingame', JSON.stringify({game: true}))
    var mainGame = document.querySelector('.field');
    for (var i = 0; i < count; i++) {
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        mainGame.appendChild(row);
        console.log(i);
        for (var j = 0; j < count; j++) {
            var col = document.createElement('div');
            col.setAttribute('class', 'cell');
            row.appendChild(col);
        }
    }
}

function restoreGame(nodes){
  //  localStorage.setItem('ingame', JSON.stringify({game: true}))
    var mainGame = document.querySelector('.field');
    for (var i = 0; i < count; i++) {
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        mainGame.appendChild(row);
        console.log(i);
        for (var j = 0; j < count; j++) {
            var col = document.createElement('div');
            col.setAttribute('class', nodes[i][j]);
            row.appendChild(col);
        }
    }
}

function clearField() {
    var mainGame = document.querySelector('.field');
    var parent = mainGame.parentNode;
    var newNode = document.createElement('div');
    newNode.setAttribute('class', 'field');
    parent.removeChild(mainGame);
    parent.appendChild(newNode);
}