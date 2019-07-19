export const addW3 = (square, i, j) => {
    if (i === 1 || i === 8 || i === 15) {
        if (j === 1 || j === 8 || j === 15) {
            if (!(i === 8 && j === 8)) {
                square.className += ' W3';
                square.innerHTML = '3W';
            }
        }
    }
}

export const addW2 = (square, i, j) => {
    if (i >= 2 && i <= 5 && (i === j || i === 16 - j)) {
        square.className += ' W2';
        square.innerHTML = '2W';
    }
    if ((i === j || i === 16 - j) && i >= 11 && i <= 14) {
        square.className += ' W2';
        square.innerHTML = '2W';
    }
}

export const addL3 = (square, i, j) => {
    if (i === 2 || i === 6 || i === 10 || i === 14) {
        if (j == 2 || j === 6 || j === 10 || j === 14) {
            if (!((i === 2 && j === 2) || (i === 14 && j === 2) || (i === 2 && j === 14) || (i === 14 && j === 14))) {
                square.className += ' L3';
                square.innerHTML = '3L';
            }
        }
    }
}

export const addL2 = (square, i, j) => {
    if (i === 1 || i === 15) {
        if (j === 4 || j === 12) {
            square.className += ' L2';
            square.innerHTML = '2L';
        }
    }
    if (i === 3 || i === 13) {
        if (j === 7 || j === 9) {
            square.className += ' L2';
            square.innerHTML = '2L';
        }
    }
    if (i === 4 || i === 12) {
        if (j === 1 || j === 8 || j === 15) {
            square.className += ' L2';
            square.innerHTML = '2L';
        }
    }
    if (i === 7 || i === 9) {
        if (j === 3 || j === 7 || j === 9 || j === 12) {
            square.className += ' L2';
            square.innerHTML = '2L';
        }
    }
    if (i === 8) {
        if (j === 4 || j === 11) {
            square.className += ' L2';
            square.innerHTML = '2L';
        }
    }
}

export const star = (square, i, j) => {
    if (i === 8 && j === 8) {
        square.className += ' star';
        // const star = document.createElement('i');
        // star.className = 'fas fa-star';
        // square.appendChild(star);
    }
}
