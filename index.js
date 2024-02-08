// [0,0,0]
// [0,0,0]
// [0,0,0]

// gameboard 

const Tic_Tac_Toe_module = (function(){
    const gameboard = function(){
        
        const col = 3;
        const row = 3;

        // 
        let board = emptyBoard();

        function emptyBoard(board){
            let emptyBoard = [];
            for (let index = 0; index < col; index++){
                let board_col = [];
                for (let index = 0; index < row; index++) {
                    board_col.push(null);
                }
                emptyBoard.push(board_col);
            }
            if (board != null || board != undefined){
                board = emptyBoard;
            }
            return emptyBoard;
        }

        const getBoard = () =>{
            return board;
        }

        const setMarkInBoard = (player,row,col)=>{
            console.log(`${player.playerName} setMark ${player.playerMark}`)
            console.log(`board[${row}][${col}] = ${board[row][col]}`);
            if (board[row][col] !== null){
                console.log('already got a mark at this position')
            }
            board[row][col] = player.playerMark;
            console.log(`board[${row}][${col}] = ${board[row][col]}`);
            console.log(getBoard());
            // checking the game stat after setting the mark!
            // return checkGameStat(player,getBoard());
        }

        const checkGameStat = (player,board)=>{
            let checkspaceToSetMark = 0;
            
            
            board.forEach(row_element => {
                row_element.forEach(col_elemet =>{
                    if (row_element!== null){//checking if tie = there's no space to put marks
                        checkspaceToSetMark++;
                    }
                })
            });

            if (checkspaceToSetMark === 9){
                return "tie!";
            }
            if (//checking same row
                board[0][0] === player.playerMark && board[0][1] === player.playerMark && board[0][2] === player.playerMark ||
                board[1][0] === player.playerMark && board[1][1] === player.playerMark && board[1][2] === player.playerMark || 
                board[2][0] === player.playerMark && board[2][1] === player.playerMark && board[2][2] === player.playerMark
                ){
                return `${player.playerName} wins!`
            }
            if (//checking same col
                board[0][0] === player.playerMark && board[1][0] === player.playerMark && board[2][0] === player.playerMark ||
                board[0][1] === player.playerMark && board[1][1] === player.playerMark && board[2][1] === player.playerMark || 
                board[0][2] === player.playerMark && board[1][2] === player.playerMark && board[2][2] === player.playerMark
                ){
                return `${player.playerName} wins!`
            }
            if (//checking the crossover
                board[0][0] === player.playerMark && board[1][1] === player.playerMark && board[2][2] === player.playerMark ||
                board[2][0] === player.playerMark && board[1][1] === player.playerMark && board[0][2] === player.playerMark
                ){
                
                return `${player.playerName} wins!`
            }
            return 'not thing happen';
        }

        return {
            getBoard,
            setMarkInBoard,
            checkGameStat,
        }
    }

    const player = function(name,mark){
        let playerName = name;
        let playerMark = mark;
        return {
            playerName,
            playerMark,
        }
    }


    const gamePlayController = function(){
        const playerX = player('playerX','X');
        const playerO = player('playerO','O');
        const gameBoard = gameboard()
        const PlayerSetMarkInBoard = (player,row,col) =>{
            gameBoard.setMarkInBoard(player,row,col);
            // console.log(gameBoard.checkGameStat(player));
            // console.log(gameBoard.getBoard());
            return gameBoard.checkGameStat(player,gameBoard.getBoard());
        }
        return {
            PlayerSetMarkInBoard,
            playerX,
            playerO,
        }
        
    }
    
    return {
        gameboard,
        player,
        gamePlayController,
    }
})()

const DisplayController = (function(){

})()

const gamePlayController = Tic_Tac_Toe_module.gamePlayController();

gamePlayController.PlayerSetMarkInBoard(gamePlayController.playerX,0,0);
gamePlayController.PlayerSetMarkInBoard(gamePlayController.playerX,0,1);
gamePlayController.PlayerSetMarkInBoard(gamePlayController.playerX,0,2);
gamePlayController.PlayerSetMarkInBoard(gamePlayController.playerX,1,0);
gamePlayController.PlayerSetMarkInBoard(gamePlayController.playerX,1,1);
gamePlayController.PlayerSetMarkInBoard(gamePlayController.playerX,1,2);
gamePlayController.PlayerSetMarkInBoard(gamePlayController.playerX,2,0);
gamePlayController.PlayerSetMarkInBoard(gamePlayController.playerX,2,1);
console.log(gamePlayController.PlayerSetMarkInBoard(gamePlayController.playerX,2,2));
// checking tie

// const Newplayer_X = Tic_Tac_Toe_module.player('playerX','X');
// const Newplayer_O = Tic_Tac_Toe_module.player('playerO','O');
// const gameboard =  Tic_Tac_Toe_module.gameboard()
// console.log(gameboard.setMarkInBoard(player,0,0));
// console.log(gameboard.setMarkInBoard(Newplayer_O,1,1));
// console.log(gameboard.setMarkInBoard(Newplayer_O,2,2));
// console.log(gameboard.getBoard());