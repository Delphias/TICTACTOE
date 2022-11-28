const squares = document.querySelectorAll(".square") 
let playerTurn = true 
let gameStop = false
let playerSquares = [] 
let computerSquares = []                                                             /* to let us know that is the players' turn to play */

/* creating the combinations of winning and losing */
let combination = {
    "horizontal": [                                                                     /* creating a JSOn object */
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ],                                                                              
    
    "vertical": [
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ],

    "diagonal": [
        [0,4,8],
        [2,4,6]
    ]

}

let computerTurnFunc = () => {    
    checkTie()                                                  
    let random = Math.floor(Math.random() * 9)
    if (!playerSquares.includes(random) && !computerSquares.includes(random))  {                                                /* create a random number and * 9 let its find random no between 0 and 9 */
    squares[random].classList.add('O')
    computerSquares.push(random)

    playerTurn = true
    gameCheck(computerSquares, "Computer")                                                                   /* also call it the moment the game plays */ 
}else {
    if(!gameStop)
    computerTurnFunc ()
}
}

 /* to check whether the player or the computer has won the game. Creating a function for whoever plays */
let gameCheck = (squares, currPlayer) => {
    for(let combo in combination){
        combination[combo].forEach((pattern) => {
            if(squares.includes(pattern[0]) && squares.includes(pattern[1]) && squares.includes(pattern[2])){
                alert('${currPlayer} Wins');
                gameStop = true
            }
        });
    }
}

let checkTie = () => {
    console.log(playerSquares.length + computerSquares.length)
}

squares.forEach((square,idx ) => {                                                   /* to loop in each and every square to see the one that is being clicked*/
    square.addEventListener("click", (evt) =>{                                      /* adding an eventLister so when I click an event can occur */
        let elementClassList = evt.target.classList                                 /* to add an X to our blocks */
        /*        if(elementClassList.contains("X")) {                                      /* if the block contains an X or O...
            elementClassList.remove("X")                                            /* then remove the existing X by cliking 
        } else{
            elementClassList.add("X")                                                /* else add X if it doesn't exist on the block 
        } */

        if(!playerSquares.includes(idx) && !computerSquares.includes(idx) && !gameStop){
            let turnClass = playerTurn ? "X" : "O"

            elementClassList.add(turnClass)
            playerSquares.push(idx)
            playerTurn = !playerTurn
            checkTie()                                                  /* to change the plyer turn */
            gameCheck (playerSquares, "Player")
            if(!gameStop)
            computerTurnFunc ()                                                       /* creating a computer turn to ensure that it is its turn to play the O */
            
           
        }
    })  
})