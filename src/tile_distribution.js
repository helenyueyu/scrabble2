let tileDistribution = []; 

class Tile {
    constructor(letter, points) {
        this.letter = letter; 
        this.points = points; 
    }
}

const generateTile = (freq, letter, points) => {
    for (let i = 0; i < freq; i++) {
        tileDistribution.push(new Tile(letter, points)); 
    }
}

// 1 point letters 
generateTile(12, 'E', 1); 
generateTile(9, 'A', 1); 
generateTile(9, 'I', 1); 
generateTile(8, 'O', 1); 
generateTile(6, 'N', 1); 
generateTile(6, 'R', 1); 
generateTile(6, 'T', 1); 
generateTile(4, 'L', 1); 
generateTile(4, 'S', 1); 
generateTile(4, 'U', 1); 

// 2 point letters
generateTile(4, 'D', 2); 
generateTile(3, 'G', 2); 

// 3 point letters
generateTile(2, 'B', 3); 
generateTile(2, 'C', 3); 
generateTile(2, 'M', 3); 
generateTile(2, 'P', 3); 

// 4 point letters 
generateTile(2, 'F', 4); 
generateTile(2, 'H', 4); 
generateTile(2, 'V', 4); 
generateTile(2, 'W', 4); 
generateTile(2, 'Y', 4); 

// 5 point letters 
generateTile(1, 'K', 5);

// 8 point letters 
generateTile(1, 'J', 8);
generateTile(1, 'X', 8);

// 10 point letters 
generateTile(1, 'Q', 10); 
generateTile(1, 'Z', 10); 

// 0 point letters 
generateTile(2, ' ', ' '); 


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
export default shuffle(tileDistribution); 
