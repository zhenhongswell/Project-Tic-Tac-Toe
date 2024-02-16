function Gameboard(){
    const rows = 3
    const columns = 6;
    const board = [];

    // Creating 2D board for putting 
    for(let i = 0;i < rows;i++){
        board[i] = [];
        for(let j = 0;j < columns;j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const setMarkInBoard = (row,col,player) =>{
        if (board[row][col].getMark() !== null){
            console.log (`already have mark: ${board[row][col].getMark()}`);
            return;
        }
        // console.log(player.playerMark);
        board[row][col].setMark(player);

    }
    return {
        setMarkInBoard,
        getBoard,

    }


}


function Cell(){
    let mark = null;
    let player = null;

    const setMark = (player_) =>{
        player = player_;
        mark = player_.playerMark;
    };

    const getMark = () => mark;
    const getPlayer = () => player;

    return {
        setMark,
        getMark,
        getPlayer,
    }
}


function Player(name,mark){
    const playerName = name;
    const playerMark = mark;

    return {
        playerName,
        playerMark,
    }
}


function GameController(){

    const playerX = Player("PlayerX",'X');
    const playerO = Player("PlayerO",'O');
    const gameboard = Gameboard();
    // default PlayerO first
    let currentActivePlayer = playerO;

    const getActivePlayer = () => currentActivePlayer;

    const switchCurrentPlayer = () =>{
        currentActivePlayer = currentActivePlayer === playerO ? playerX : playerO;
    }

    const printNewRound = () =>{
        console.log(`${getActivePlayer().playerName}'s turn`);
    }

    const playRound = (row,col) => {
        const currentPlayer  = getActivePlayer();
        gameboard.setMarkInBoard(row,col,currentPlayer);
        console.log(checkGameStat(currentPlayer));
        switchCurrentPlayer();
        printNewRound();
    }


    const checkGameStat = (player) =>{
        
        const board = gameboard.getBoard();

        // checking if still have space to put marks 
        // may not need to check this
        let CanPutMark = false;
        board.forEach(each_row => {
            each_row.forEach(each_col => {
                if (each_col.getMark() === null){
                    CanPutMark = true;
                }
            });
        });
        if (!CanPutMark){
            return 'have no space to put marks';
        }



        if (//checking same row
        board[0][0].getMark() === player.playerMark && board[0][1].getMark() === player.playerMark && board[0][2].getMark() === player.playerMark ||
        board[1][0].getMark() === player.playerMark && board[1][1].getMark() === player.playerMark && board[1][2].getMark() === player.playerMark ||
        board[2][0].getMark() === player.playerMark && board[2][1].getMark() === player.playerMark && board[2][2].getMark() === player.playerMark
        ) {
            return `${player.playerName} wins!`
        }
        if (//checking same col
        board[0][0].getMark() === player.playerMark && board[1][0].getMark() === player.playerMark && board[2][0].getMark() === player.playerMark ||
        board[0][1].getMark() === player.playerMark && board[1][1].getMark() === player.playerMark && board[2][1].getMark() === player.playerMark ||
        board[0][2].getMark() === player.playerMark && board[1][2].getMark() === player.playerMark && board[2][2].getMark() === player.playerMark
        ) {
            return `${player.playerName} wins!`
        }
        if (//checking the crossover
        board[0][0].getMark() === player.playerMark && board[1][1].getMark() === player.playerMark && board[2][2].getMark() === player.playerMark ||
        board[2][0].getMark() === player.playerMark && board[1][1].getMark() === player.playerMark && board[0][2].getMark() === player.playerMark
        ) {

            return `${player.playerName} wins!`
        }

        return 'no thing happened'
    }

    return {
        getActivePlayer,
        playRound,
    }
}

const game = GameController();

game.playRound(0,0);
game.playRound(0,1);
game.playRound(0,2);
game.playRound(1,0);
game.playRound(1,1);
game.playRound(1,2);
game.playRound(2,0);
game.playRound(2,1);
game.playRound(2,2);
game.playRound(2,2);




