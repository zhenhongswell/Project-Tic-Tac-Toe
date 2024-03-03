const GameController = (function(){

    const gameboard = new Gameboard();
    const playerO = new Player('me','O')
    const playerX = new Player('you','X')
    let currentPlayer = playerX

    function playRound(row,col){
        
        currentPlayer = (currentPlayer === playerO) ? playerX : playerO
        // const gameboard = new Gameboard();
        const mark = currentPlayer.getMark()

        gameboard.setMarkOnGameboard(mark, row, col);
        console.log(gameboard.getGameboard()[0][0].getValue())
        console.log(gameboard.getGameboard()[0][1].getValue())

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
        playRound
    }
})()

// function createDOM(){
//     document.createElement('div')
// }

// function clickHandler(){
    
// }

const gameController = GameController
gameController.playRound(0,0)
gameController.playRound(0,1)




