function clearAll() {
    const container = document.querySelector('#sketch-pad');

    while (container.firstChild) {
        container.firstChild.remove();
    }
}

function draw(size) {
    clearAll();

    const container = document.querySelector('#sketch-pad');
    let row;
    let column;

    for (let i = 0; i < size; i++) {
        row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < size; j++) {
            column = document.createElement('div');
            column.classList.add('column');
            row.appendChild(column);
        }

        container.appendChild(row);
    }

    console.log(container);
}

function updateSketchPad() {

}

const initialSize = parseInt(document.querySelector('#size').value);
draw(initialSize);