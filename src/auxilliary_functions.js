export const isArrayInArray = (arr, item) => {
    const item_as_string = JSON.stringify(item);

    const contains = arr.some(function (el) {
        return JSON.stringify(el) === item_as_string;
    })
    return contains;
}

export const removeAndReplaceYourTiles = () => {
    const blah = document.getElementById('your-hand');
    while (blah.firstChild) {
        blah.removeChild(blah.firstChild);
    }
}

export const removeAndReplaceOppTiles = () => {
    const blah2 = document.getElementById('opp-hand');
    while (blah2.firstChild) {
        blah2.removeChild(blah2.firstChild);
    }
}


export const createHand = (hand, classname, appendHand) => {
    for (let i = 0; i < hand.length; i++) {
        const tile = document.createElement('div');
        tile.className = classname;
        tile.id = `hand-tile-${i}`;
        tile.innerHTML = hand[i].letter;

        const points = document.createElement('span');
        points.innerHTML = `${hand[i].points}`;
        points.className = 'points';
        tile.appendChild(points);

        tile.setAttribute('draggable', true);
        tile.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text', e.target.innerHTML);
            e.dataTransfer.setData('team', e.target.className);
        })
        appendHand.append(tile)
    }
}


export const rowCheck = array2D => {
    const rows = array2D.map(x => x[0]);
    let counts = {};
    for (let i = 0; i < rows.length; i++) {
        counts[rows[i]] = 1 + (counts[rows[i]] || 0);
    }
    return Object.keys(counts).length === 1;
}

export const columnCheck = array2D => {
    const cols = array2D.map(x => x[1]);
    let counts = {};
    for (let i = 0; i < cols.length; i++) {
        counts[cols[i]] = 1 + (counts[cols[i]] || 0);
    }
    return Object.keys(counts).length === 1;
}


// export const checkEntireBoardColumns = array2D => {
//     const cols = array2D.map(x => x[1]);
//     const uniqueCols = [];

//     for (let i = 0; i < cols.length; i++) {
//         if (!uniqueCols.includes(cols[i])) {
//             uniqueCols.push(cols[i]);
//         }
//     }

//     for (let i = 0; i < uniqueCols.length; i++) {
//         const rows = array2D
//             .filter(x => x[1] === uniqueCols[i])
//             .map(x => x[0])
//             .sort(function (a, b) { return a - b });
//         for (let i = 0; i < rows.length - 1; i++) {
//             if (rows[i + 1] - rows[i] > 1) {
//                 return false;
//             }
//         }
//     }

//     return true;
// }

// export const checkEntireBoardRows = array2D => {
//     const rows = array2D.map(x => x[0]);
//     const uniqueRows = [];

//     for (let i = 0; i < rows.length; i++) {
//         if (!uniqueRows.includes(rows[i])) {
//             uniqueRows.push(rows[i]);
//         }
//     }

//     for (let i = 0; i < uniqueRows.length; i++) {
//         const cols = array2D
//             .filter(x => x[0] === uniqueRows[i])
//             .map(x => x[1])
//             .sort(function (a, b) { return a - b });
//         for (let i = 0; i < cols.length - 1; i++) {
//             if (cols[i + 1] - cols[i] > 1) {
//                 return false;
//             }
//         }
//     }

//     return true;
// }
