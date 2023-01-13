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

    cells = document.querySelectorAll('.column');
    cells.forEach(cell => {
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
    let color;

    switch(mode) {
        case 'default':
            color = document.querySelector('#color').value;
            break;
        case 'rainbow':
            color = '#' + Math.floor(Math.random()*16777215).toString(16);
            break;
        case 'eraser':
            let sketchPad = document.querySelector('#sketch-pad');
            color = window.getComputedStyle(sketchPad).getPropertyValue('background-color');
            break;
    }

    // Checks if the mouse is clicked during the mouseover event or if the click event itself is fired
    if (event.buttons === 1 || event.type === 'click') {
        event.target.style.backgroundColor = color;
    }
}

function changeMode(event) {
    const newMode = event.target.id;

    if (mode === newMode) {
        mode = 'default';
        event.target.classList.remove('enabled');
    }
    else {
        let oldModeButton = document.querySelector('.enabled');
        if (oldModeButton) {
            oldModeButton.classList.remove('enabled');
        }
        mode = newMode;
        event.target.classList.add('enabled');
    }
}


let cells;
let mode = 'default';

generateGrid();
updateSizeText();

let sizeSlider = document.querySelector("#size");
sizeSlider.addEventListener('input', () => {
    updateSizeText();
    generateGrid();
});
sizeSlider.addEventListener('input', () => {cells.forEach(cell => cell.classList.add('border'))});
sizeSlider.addEventListener('mouseover', () => {cells.forEach(cell => cell.classList.add('border'))});
sizeSlider.addEventListener('mouseout', () => {cells.forEach(cell => cell.classList.remove('border'))});

const clear = document.querySelector('#clear');
clear.addEventListener('click', generateGrid);

const modes = document.querySelectorAll('.mode');
modes.forEach(mode => mode.addEventListener('click', changeMode));