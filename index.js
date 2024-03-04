const GameController = (function(){

    const gameboard = new Gameboard();
    const playerO = new Player('playerO','O')
    const playerX = new Player('playerX','X')
    let currentPlayer = playerX

    function playRound(row,col){
        
        currentPlayer = (currentPlayer === playerO) ? playerX : playerO
        // const gameboard = new Gameboard();
        const mark = currentPlayer.getMark()

        gameboard.setMarkOnGameboard(mark, row, col);
        console.log(gameboard.getGameboard()[row][col].getValue())
        if (checkWhoWin(currentPlayer) == true){
            console.log(currentPlayer.getName() + '_win!')
        }


    }

    function checkWhoWin(currentPlayer) {
        const myMark = currentPlayer.getMark();
        const board = gameboard.getGameboard();
        
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getValue() === myMark && board[i][1].getValue() === myMark && board[i][2].getValue() === myMark) {
                return true;
            }
        }
    
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (board[0][j].getValue() === myMark && board[1][j].getValue() === myMark && board[2][j].getValue() === myMark) {
                return true;
            }
        }
    
        // Check diagonals
        if (board[0][0].getValue() === myMark && board[1][1].getValue() === myMark && board[2][2].getValue() === myMark) {
            return true;
        }
    
        if (board[0][2].getValue() === myMark && board[1][1].getValue() === myMark && board[2][0].getValue() === myMark) {
            return true;
        }
    
        return false;
    }

    function Gameboard() {
        const row = 3;
        const col = 3;
        
        
        this.gameboard = createGameboard();
        console.log(this.gameboard)

        

        function createGameboard() {
            const gameboard = [];
    
            for (let rowIndex = 0; rowIndex < row; rowIndex++) {
                const rowElement = [];
                for (let colIndex = 0; colIndex < col; colIndex++) {
                    const cell = new Cell();
                    rowElement.push(cell);
                }
                gameboard.push(rowElement);
            }
            return gameboard;
        }
    
        const getGameboard = () =>{
            const row = 3
            const col = 3
            // for (let rowIndex = 0; rowIndex < row; rowIndex++) {
            //     for (let colIndex = 0; colIndex < col; colIndex++) {
            //         console.log(`gameboard ${rowIndex} ${colIndex} : 
            //         ${gameboard[rowIndex][colIndex].getValue()}`)
            //     }
            // }
            // console.log(this)
            // console.log(this.gameboard)
            return this.gameboard;
        }
        
        const resetGameboard = (value) =>{
            this.gameboard = createGameboard()
        }
    
        const setMarkOnGameboard = (value, row, col)  =>{
            this.gameboard[row][col].setValue(value);
    
            // console.log(gameboard[row][col].getValue())
            
        }

        const checkGameStat = () =>{

        }

        
    
        function Cell() {
            this.value = null;
            this.check = false;
    
            const setValue = (newValue) => {
                // console.log(this.check);
                if (!this.check) {
                    this.value = newValue;
                    setCheck(true);
                    return true;
                }
                console.log("There is a value already");
                return false;
            }
    
            const getValue = () =>{
                return this.value;
            }
    
            const getCheck = () => {
                return this.check;
            }
    
            const setCheck = (newValue) => {
                this.check = newValue;
            }
    
            return {
                setValue,
                setCheck,
                getCheck,
                getValue,
            };
        }
    
        return {
            getGameboard,
            setMarkOnGameboard,
            resetGameboard,
        };
    }
    
    function Player(name,mark){
        this.name = name
        this.mark = mark
    
        const getMark = ()=>{
            return this.mark
        }
    
        const setMark = (value) =>{
            this.mark = value
        }
    
        const getName = () =>{
            return this.name
        }
    
        const setName = (value)=>{
            this.name = value
        }
    
        return {
            getMark,
            setMark,
            getName,
            setName,
        }
    }



    return{
        playRound,
        gameboard
    }


})()

function createDOM(gameController){
    const container = document.querySelector(".container")
    // createing gameboard DOM
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const div = document.createElement('div')
            div.classList.add('cell')
            div.setAttribute('row',row)
            div.setAttribute('col',col)
            
            div.addEventListener('click', ()=>clickHandler(div,gameController, row, col));

            
            container.appendChild(div)
        }
    }
}

function clickHandler(clickedElement,gameController, row, col) {
    console.log(row, col);
    gameController.playRound(row, col)
    const gameboard = gameController.gameboard
    // console.log(gameboard)
    const mark = gameboard.getGameboard()[row][col].getValue()
    
    clickedElement.textContent = "mark"
    if (mark !== null){
        clickedElement.textContent = mark
    }
}




const gameController = GameController
createDOM(gameController)

// gameController.playRound(0,0)
// gameController.playRound(0,1)




