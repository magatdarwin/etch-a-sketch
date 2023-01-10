function clearAll() {
    const container = document.querySelector('#sketch-pad');

    while (container.firstChild) {
        container.firstChild.remove();
    }
}

function generateGrid(size) {
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
}

function updateSketchPad(event) {
    const size = event.target.value;
    const sizeText = document.querySelector('#size-text');
    sizeText.textContent = `${size} x ${size}`;

    generateGrid(size);
}

const initialSize = parseInt(document.querySelector('#size').value);
generateGrid(initialSize);

let size = document.querySelector("#size");
size.addEventListener('input', updateSketchPad);