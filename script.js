function clearAll() {
    const container = document.querySelector('#sketch-pad');

    while (container.firstChild) {
        container.firstChild.remove();
    }
}

function generateGrid() {
    clearAll();
    let size = document.querySelector('#size').value;

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

    CELLS = document.querySelectorAll('.column');
    CELLS.forEach(cell => cell.addEventListener('mouseover', draw));
}

function updateSketchPad(event) {
    const size = event.target.value;
    const sizeText = document.querySelector('#size-text');
    sizeText.textContent = `${size} x ${size}`;

    generateGrid();
}

function draw(event) {
    if (isMouseDown) {
        event.target.style.backgroundColor = 'black';
    }
}

let CELLS;
let isMouseDown = false;

generateGrid();

let sizeSlider = document.querySelector("#size");
sizeSlider.addEventListener('input', updateSketchPad);

document.body.addEventListener('mousedown', () => isMouseDown = true);
document.body.addEventListener('mouseup', () => isMouseDown = false);

const clear = document.querySelector('#clear');
clear.addEventListener('click', generateGrid);