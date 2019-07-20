export const clearW3 = (square, i, j) => {
    if (i === 1 || i === 8 || i === 15) {
        if (j === 1 || j === 8 || j === 15) {
            if (!(i === 8 && j === 8)) {
                square.setAttribute('taken', 'false');
                square.style.background = "";
                square.innerHTML = '3W';
            }
        }
    }
}

export const clearW2 = (square, i, j) => {
    if (i >= 2 && i <= 5 && (i === j || i === 16 - j)) {
        square.setAttribute('taken', 'false');
        square.style.background = "";
        square.innerHTML = '2W';
    }
    if ((i === j || i === 16 - j) && i >= 11 && i <= 14) {
        square.setAttribute('taken', 'false');
        square.style.background = "";
        square.innerHTML = '2W';
    }
}

export const clearL3 = (square, i, j) => {
    if (i === 2 || i === 6 || i === 10 || i === 14) {
        if (j == 2 || j === 6 || j === 10 || j === 14) {
            if (!((i === 2 && j === 2) || (i === 14 && j === 2) || (i === 2 && j === 14) || (i === 14 && j === 14))) {
                square.setAttribute('taken', 'false');
                square.style.background = "";
                square.innerHTML = '3L';
            }
        }
    }
}

export const clearL2 = (square, i, j) => {
    if (i === 1 || i === 15) {
        if (j === 4 || j === 12) {
            square.setAttribute('taken', 'false');
            square.style.background = "";
            square.innerHTML = '2L';
        }
    }
    if (i === 3 || i === 13) {
        if (j === 7 || j === 9) {
            square.setAttribute('taken', 'false');
            square.style.background = "";
            square.innerHTML = '2L';
        }
    }
    if (i === 4 || i === 12) {
        if (j === 1 || j === 8 || j === 15) {
            square.setAttribute('taken', 'false');
            square.style.background = "";
            square.innerHTML = '2L';
        }
    }
    if (i === 7 || i === 9) {
        if (j === 3 || j === 7 || j === 9 || j === 13) {
            square.setAttribute('taken', 'false');
            square.style.background = "";
            square.innerHTML = '2L';
        }
    }
    if (i === 8) {
        if (j === 4 || j === 12) {
            square.setAttribute('taken', 'false');
            square.style.background = "";
            square.innerHTML = '2L';
        }
    }
}
