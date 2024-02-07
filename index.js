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
            return checkGameStat(player);
        }

        const checkGameStat = (player)=>{
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
    
    return {
        gameboard,
        player,
    }
})()

const Newplayer_X = Tic_Tac_Toe_module.player('playerX','X');
const Newplayer_O = Tic_Tac_Toe_module.player('playerO','O');
const gameboard =  Tic_Tac_Toe_module.gameboard()
console.log(gameboard.setMarkInBoard(Newplayer_O,0,0));
console.log(gameboard.setMarkInBoard(Newplayer_O,1,1));
console.log(gameboard.setMarkInBoard(Newplayer_O,2,2));
console.log(gameboard.getBoard());