require('./index.css'); 
import tileDistribution from './tile_distribution'; 
import { addW2, addW3, addL2, addL3, star } from './squares'; 
import { clearW2, clearW3, clearL2, clearL3 } from './undo_actions'; 
import { isArrayInArray, 
    createHand, 
    removeAndReplaceYourTiles, 
    removeAndReplaceOppTiles, 
    rowCheck, 
    columnCheck} from './auxilliary_functions'; 
import { yhand, ohand } from './hand'; 
import { submitbutton_y, submitbutton_o, undobutton_y } from './buttons'; 
import { points } from './points'; 

// console.log(tileDistribution); 

let allPlayedTilesPositions = []; 

let playedTiles = []; 
let playedTilesPositions = []; 

let pointsPositions = []; 

let currentDirection = ''; 

let yourTotalScore = 0; 
let yourRawScore = 0;  // with letter bonuses and word bonuses 



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


function createYourHand() {
    createHand(yourHand, 'hand-tile-you', yhand); 
}

function createOppHand() {
    createHand(oppHand, 'hand-tile-opp', ohand); 
}

createYourHand(); 
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
                } else {
                    removeByLetter(droppedLetter, oppHand);
                }

                // Remove the previous hand to replace with the updated array 
                if (team === 'you') {
                    removeAndReplaceYourTiles(); 
                    createYourHand();
                } else {
                    removeAndReplaceOppTiles(); 
                    createOppHand();
                }

                const row_column = (e.target.className.split(' ')[0].split('_').slice(1)).map(x => parseInt(x))
                playedTilesPositions.push(row_column); 
            }
        })

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

const yourScores = document.createElement('div'); 
yourScores.id = 'your-scores'; 
yourScores.innerHTML = 'Your Scores:'; 
board.appendChild(yourScores); 

submitbutton_y.addEventListener('click', () => {    
    if (!rowCheck(playedTilesPositions) && !columnCheck(playedTilesPositions)) {
        undoYourMove(); 
    } else {
        if (rowCheck(playedTilesPositions) && !columnCheck(playedTilesPositions)) {
            let temp = playedTilesPositions.map(x => x[1]).sort(function (a, b) { return a - b; });
            for (let i = 0; i < temp.length - 1; i++) {
                if (temp[i + 1] - temp[i] > 1) {
                    undoYourMove();
                }
            }
        }
        if (!rowCheck(playedTilesPositions) && columnCheck(playedTilesPositions)) {
            let temp = playedTilesPositions.map(x => x[0]).sort(function (a, b) { return a - b; });
            for (let i = 0; i < temp.length - 1; i++) {
                if (temp[i + 1] - temp[i] > 1) {
                    undoYourMove();
                }
            }
        }

        // At this point, we want to check 
        console.log(playedTilesPositions);
        console.log(allPlayedTilesPositions);

        // col check (same column, row off by one)
        for (let i = 0; i < playedTilesPositions.length; i++) {
            const tile = playedTilesPositions[i]; 
            const rows = allPlayedTilesPositions.map(x => x[0]); 
            const cols = allPlayedTilesPositions.map(x => x[1]); 
            
        }

        allPlayedTilesPositions = allPlayedTilesPositions.concat(playedTilesPositions);
        
        // console.log(playedTilesPositions); 
        // console.log(allPlayedTilesPositions); 

        // const playedWords = []; 

        // console.log(rowCheck(playedTilesPositions)); 
        // console.log(playedTilesPositions); 

        
        
        for (let i = 0; i < playedTilesPositions.length; i++) {
            const row = playedTilesPositions[i][0] - 1;
            const col = playedTilesPositions[i][1] - 1;
            pointsPositions.push(points[row][col]);
        }

        // console.log(allPlayedTilesPositions); 
        // console.log(playedTilesPositions); 
        // console.log(playedTiles); 
        // console.log(pointsPositions); 

        for (let i = 0; i < playedTiles.length; i++) {
            if (playedTiles[i].points !== ' ') {
                if (pointsPositions[i] === '2W' || pointsPositions[i] === '3W' || pointsPositions[i] === 1) {
                    yourRawScore += playedTiles[i].points 
                } else if (pointsPositions[i] === '2L') {
                    yourRawScore += playedTiles[i].points * 2; 
                } else if (pointsPositions[i] === '3L') {
                    yourRawScore += playedTiles[i].points * 3; 
                }
            }
        }

        for (let i = 0; i < pointsPositions.length; i++) {
            if (pointsPositions[i] === '2W') {
                yourRawScore *= 2; 
            } else if (pointsPositions[i] === '3W') {
                yourRawScore *= 3; 
            }
        }



        const newscore = document.createElement('div'); 
        newscore.innerHTML = yourRawScore; 
        yourScores.appendChild(newscore); 

        yourTotalScore += yourRawScore; 

        yourRawScore = 0; 

        playedTilesPositions = []; 
        playedTiles = [];  
        pointsPositions = []; 

        yourHand = yourHand.concat(drawCards(7 - yourHand.length));
        removeAndReplaceYourTiles();
        createYourHand(); 
    }

})

submitbutton_o.addEventListener('click', () => {
    oppHand = oppHand.concat(drawCards(7 - oppHand.length));
    removeAndReplaceOppTiles(); 
    createOppHand();
})


undobutton_y.addEventListener('click', () => {
    undoYourMove(); 
})

function undoYourMove() {
    undoMove();
    removeAndReplaceYourTiles();
    yourHand = yourHand.concat(playedTiles);
    playedTiles = [];
    playedTilesPositions = []; 
    createYourHand();
}

function undoMove() {
    const board = document.getElementById('board');
    for (let i = 0; i < board.childNodes.length; i++) {
        for (let j = 0; j < board.childNodes[i].childNodes.length; j++) {


            if (isArrayInArray(playedTilesPositions, [i + 1, j + 1])) {
                const node = board.childNodes[i].childNodes[j];
                node.style.background = "";
                node.classList.remove('on');
                node.innerHTML = "";
                node.setAttribute('taken', 'false');
                clearW3(node, i + 1, j + 1);
                clearW2(node, i + 1, j + 1);
                clearL3(node, i + 1, j + 1);
                clearL2(node, i + 1, j + 1);
            }
        }
    }
}


const yhandLabel = document.createElement('span'); 
yhandLabel.innerHTML = 'Your Hand'; 
document.body.appendChild(yhandLabel); 
document.body.appendChild(submitbutton_y); 
document.body.appendChild(undobutton_y); 
document.body.appendChild(yhand); 

const ohandLabel = document.createElement('span'); 
ohandLabel.innerHTML = "Opponent's Hand"; 
document.body.appendChild(ohandLabel); 
document.body.appendChild(submitbutton_o); 
document.body.appendChild(ohand); 






