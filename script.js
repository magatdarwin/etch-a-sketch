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
        cell.ondragstart = () => false; // Prevents the default drag-and-drop behavior of the browser which stops the draw() function from being executed
    });
}

function updateSizeText() {
    const size = document.querySelector('#size').value;
    const sizeText = document.querySelector('#size-text');

    sizeText.textContent = `${size} x ${size}`;
}

function draw(event) {
    let color = isEraser ? 'white' : document.querySelector('#color').value;

    // Checks if the mouse is clicked during the mouseover event or if the click event itself is fired
    if (event.buttons === 1 || event.type === 'click') {
        event.target.style.backgroundColor = color;
    }
}

let CELLS;
let isEraser = false;

generateGrid();
updateSizeText();

let sizeSlider = document.querySelector("#size");
sizeSlider.addEventListener('input', () => {
    updateSizeText();
    generateGrid();
});
sizeSlider.addEventListener('input', () => {CELLS.forEach(cell => cell.classList.add('border'))});
sizeSlider.addEventListener('mouseover', () => {CELLS.forEach(cell => cell.classList.add('border'))});
sizeSlider.addEventListener('mouseout', () => {CELLS.forEach(cell => cell.classList.remove('border'))});

const clear = document.querySelector('#clear');
clear.addEventListener('click', generateGrid);

const eraserButton = document.querySelector('#eraser');
eraserButton.addEventListener('click', e => {
    isEraser = isEraser ? false : true; 
    e.target.classList.toggle('enabled');
});