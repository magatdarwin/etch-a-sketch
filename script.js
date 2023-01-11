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
    CELLS.forEach(cell => {
        cell.addEventListener('mouseover', draw);
        cell.addEventListener('click', draw);
    });
}

function updateSketchPad(event) {
    const size = event.target.value;
    const sizeText = document.querySelector('#size-text');
    sizeText.textContent = `${size} x ${size}`;

    generateGrid();
}

function draw(event) {
    let color = isEraser ? 'white' : document.querySelector('#color').value;
    if (isMouseDown || event.type === 'click') {
        event.target.style.backgroundColor = color;
    }
}

let CELLS;
let isMouseDown = false;
let isEraser = false;

generateGrid();

let sizeSlider = document.querySelector("#size");
sizeSlider.addEventListener('input', updateSketchPad);
sizeSlider.addEventListener('input', () => {CELLS.forEach(cell => cell.classList.add('border'))});
sizeSlider.addEventListener('mouseover', () => {CELLS.forEach(cell => cell.classList.add('border'))});
sizeSlider.addEventListener('mouseout', () => {CELLS.forEach(cell => cell.classList.remove('border'))});

document.body.addEventListener('mousedown', () => isMouseDown = true);
document.body.addEventListener('mouseup', () => isMouseDown = false);

const clear = document.querySelector('#clear');
clear.addEventListener('click', generateGrid);

const eraserButton = document.querySelector('#eraser');
eraserButton.addEventListener('click', e => {
    isEraser = isEraser ? false : true; 
    e.target.classList.toggle('enabled');
});