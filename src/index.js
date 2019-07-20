require('./index.css'); 
import tileDistribution from './tile_distribution'; 
import { addW2, addW3, addL2, addL3, star } from './squares'; 
import { clearW2, clearW3, clearL2, clearL3 } from './undo_actions'; 

// console.log(tileDistribution); 


const yourTurn = true; 

let playedTiles = []; 
let playedTilesPositions = []; 

function isArrayInArray(arr, item) {
    const item_as_string = JSON.stringify(item); 

    const contains = arr.some(function(el){
        return JSON.stringify(el) === item_as_string; 
    })
    return contains; 
}

function removeByLetter(letter, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].letter === letter) {
            playedTiles = playedTiles.concat(arr.splice(i, 1));
            break; 
        }
    }
    return arr; 
}


function drawCards(x) {
    return tileDistribution.splice(0,x); 
}

let yourHand = drawCards(7);  
let oppHand = drawCards(7); 

const yhand = document.createElement('div');
yhand.className = 'hand';
yhand.id = 'your-hand'; 

const ohand = document.createElement('div');
ohand.className = 'hand'; 
ohand.id = 'opp-hand';


// function disableYourHand() {
//     const h1 = document.getElementById('your-hand');
//     const childNodes = h1.childNodes; 
//     for (let i = 0; i < childNodes.length; i++) {
//         childNodes[i].setAttribute('draggable', false); 
//     }

//     const h2 = document.getElementById('opp-hand'); 
//     const childNodes2 = h2.childNodes;
//     for (let i = 0; i < childNodes2.length; i++) {
//         childNodes2[i].setAttribute('draggable', true);
//     }
// }

// function disableOppHand() {
//     const h1 = document.getElementById('your-hand');
//     const childNodes = h1.childNodes;
//     for (let i = 0; i < childNodes.length; i++) {
//         childNodes[i].setAttribute('draggable', true);
//     }

//     const h2 = document.getElementById('opp-hand');
//     const childNodes2 = h2.childNodes;
//     for (let i = 0; i < childNodes2.length; i++) {
//         childNodes2[i].setAttribute('draggable', false);
//     }
// }

function createYourHand() {
    
    for (let i = 0; i < yourHand.length; i++) {
        const tile = document.createElement('div');
        tile.className = 'hand-tile-you';
        tile.id = `hand-tile-${i}`;
        tile.innerHTML = yourHand[i].letter;

        // Trying to make the blank tile editable
        const points = document.createElement('span');
        points.innerHTML = `${yourHand[i].points}`;
        points.className = 'points';
        tile.appendChild(points);

        tile.setAttribute('draggable', true);
        tile.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text', e.target.innerHTML);
            e.dataTransfer.setData('team', e.target.className); 
            // setTimeout(function() {
            //     e.target.style.visibility = "hidden";  
            // }, 1); 
        })
        yhand.append(tile);
    }
}

createYourHand(); 


function createOppHand() {
    for (let i = 0; i < oppHand.length; i++) {
        const tile = document.createElement('div');
        tile.className = 'hand-tile-opp';
        tile.id = `hand-tile-${i}`;
        tile.innerHTML = oppHand[i].letter;

        const points = document.createElement('span');
        points.innerHTML = `${oppHand[i].points}`;
        points.className = 'points';
        tile.appendChild(points);

        // Draggable will be set to true or false depending on whose turn it is 
        tile.setAttribute('draggable', true);

        tile.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text', e.target.innerHTML);
            e.dataTransfer.setData('team', e.target.className); 
            // setTimeout(function() {
            //     e.target.style.visibility = "hidden";  
            // }, 1); 
        })
        ohand.append(tile);
    }
}

createOppHand(); 

const board = document.createElement('div'); 
board.id = 'board'; 


for (let i = 1; i <= 15; i++) {
    const row = document.createElement('div'); 
    row.className = 'row'; 
    for (let j = 1; j <= 15; j++) {
        const square = document.createElement('div'); 
        square.className=`$T_${i}_${j}`; 
        square.className += ' box'; 
        square.innerHTML = ''; 
        square.setAttribute('taken', false); 
        square.addEventListener('dragenter', function() {
            square.classList.add('on'); 
        }); 
        square.addEventListener('dragleave', function() {
            square.classList.remove('on'); 
        }); 
        square.addEventListener('dragover', function(e) {
            e.preventDefault(); 
        })
        square.addEventListener('drop', function(e) {
            if (e.target.getAttribute('taken') === 'false') {
                e.target.setAttribute('taken', true);
                const scrabbleText = e.dataTransfer.getData('text');
                const temp = e.dataTransfer.getData('team').split('-');
                const team = temp[temp.length - 1];
                
                e.target.innerHTML = scrabbleText;
                // console.log('the length of the letter is ' + `${e.target.innerHTML[0] === ' '}`); 
          
                if (e.target.innerHTML[0] === ' ') {
                    e.preventDefault(); 
                    e.target.setAttribute('contenteditable', true);
                    e.target.setAttribute('onkeypress', "return (this.innerText.length < 1)"); 
                    e.target.style.background = 'rgb(230, 238, 156)'; 
                    e.target.style.textTransform = 'uppercase'; 
                    e.target.className += ' blank-tile'; 
                } 



                e.target.style.background = 'rgb(142, 207, 242)';
                e.target.addEventListener('onmousedown', () => { return false })

                const droppedLetter = scrabbleText[0];

                if (team === 'you') {
                    removeByLetter(droppedLetter, yourHand);
                    console.log(yourHand); 
                    console.log(playedTiles); 
                } else {
                    removeByLetter(droppedLetter, oppHand);
                    console.log(oppHand);
                }

                // Remove the previous hand to replace with the updated array 
                if (team === 'you') {
                    const blah = document.getElementById('your-hand');
                    while (blah.firstChild) {
                        blah.removeChild(blah.firstChild);
                    }
                } else {
                    const blah2 = document.getElementById('opp-hand');
                    while (blah2.firstChild) {
                        blah2.removeChild(blah2.firstChild);
                    }
                }

                if (team === 'you') {
                    createYourHand();
                } else {
                    createOppHand();
                }
                const row_column = (e.target.className.split(' ')[0].split('_').slice(1)).map(x => parseInt(x))
                playedTilesPositions.push(row_column); 
                console.log(playedTilesPositions); 

                console.log(scrabbleText[0]); 
            }
        })

        // Coloring the different type of squares 
        addW3(square, i, j); 
        addL3(square, i, j); 
        addW2(square, i, j); 
        addL2(square, i, j); 
        star(square, i, j); 

        row.appendChild(square); 
    }
    board.appendChild(row); 
}

document.body.appendChild(board); 

const ybutton = document.createElement('button'); 
ybutton.className = 'submit-button'; 
ybutton.innerHTML = 'Submit'; 

const undobutton_y = document.createElement('button'); 
undobutton_y.className = 'undo-button'; 
undobutton_y.innerHTML = 'Undo'; 

ybutton.addEventListener('click', () => {
    // disableYourHand(); 
    console.log('you moved');
    console.log(yourHand);  
    yourHand = yourHand.concat(drawCards(7 - yourHand.length)); 
    console.log(yourHand); 
    const blah = document.getElementById('your-hand');
    while (blah.firstChild) {
        blah.removeChild(blah.firstChild);
    }
    createYourHand(); 
})

undobutton_y.addEventListener('click', () => {
    undoYourMove(); 
})


function undoYourMove() {
    console.log('hey there')
    console.log(playedTilesPositions); 

    const board = document.getElementById('board'); 
    for (let i = 0; i < board.childNodes.length; i++) {
        for (let j = 0; j < board.childNodes[i].childNodes.length; j++) {
 

            if (isArrayInArray(playedTilesPositions, [i + 1, j + 1])) {
                // const node = board.childNodes[i].childNodes[j]; 
                // node.style.background = ""; 
                const node = board.childNodes[i].childNodes[j]; 
                node.style.background=""; 
                node.classList.remove('on'); 
                node.innerHTML = ""; 
                node.setAttribute('taken', 'false'); 
                clearW3(node, i+1, j+1); 
                clearW2(node, i+1, j+1); 
                clearL3(node, i+1, j+1); 
                clearL2(node, i+1, j+1); 
                // node.setAttribute('taken', 'false'); 
                // node.style.background = ""; 
                // node.innerHTML = '3W'; 

                // board.childNodes[i].childNodes[j].setAttribute('taken', 'false');
                // board.childNodes[i].childNodes[j].style.background = ""; 
                // board.childNodes[i].childNodes[j].innerHTML = '3W';
                // board.childNodes[i].childNodes[j].classList.remove('on'); 
            }
        }
    }

    const blah = document.getElementById('your-hand');
    while (blah.firstChild) {
        blah.removeChild(blah.firstChild);
    }
    // console.log(playedTiles); 
    yourHand = yourHand.concat(playedTiles);
    playedTiles = []; 
    createYourHand(); 
}


const obutton = document.createElement('button'); 
obutton.className = 'submit-button'; 
obutton.innerHTML = 'Submit'; 

obutton.addEventListener('click', () => {
    // disableOppHand(); 
    console.log('opp moved'); 
    console.log(oppHand); 
    oppHand = oppHand.concat(drawCards(7 - oppHand.length)); 
    console.log(oppHand); 
    const blah2 = document.getElementById('opp-hand');
    while (blah2.firstChild) {
        blah2.removeChild(blah2.firstChild);
    }
    createOppHand(); 
})


const yhandLabel = document.createElement('span'); 
yhandLabel.innerHTML = 'Your Hand'; 
document.body.appendChild(yhandLabel); 
document.body.appendChild(ybutton); 
document.body.appendChild(undobutton_y); 
document.body.appendChild(yhand); 

const ohandLabel = document.createElement('span'); 
ohandLabel.innerHTML = "Opponent's Hand"; 
document.body.appendChild(ohandLabel); 
document.body.appendChild(obutton); 
document.body.appendChild(ohand); 






