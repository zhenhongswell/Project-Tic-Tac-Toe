
const Tic_Tac_Toc_IIFE = (function(){
    const gameController = GameController();
    const displayController = DisplayController();



    function Gameboard() {
        const rows = 3
        const columns = 3;
        const board = [];

        // Creating 2D board for putting 
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(Cell());
            }
        }

        const getBoard = () => board;

        const setMarkInBoard = (row, col, player) => {
            // return true if can set mark
            // return false if can not set mark
            if (board[row][col].getMark() !== null) {
                console.log(`already have mark: ${board[row][col].getMark()}`);
                return false;
            }
            // console.log(player.playerMark);
            board[row][col].setMark(player);
            return true
        }
        return {
            setMarkInBoard,
            getBoard,

        }
    }

    function Cell() {
        let mark = null;
        let player = null;

        const setMark = (player_) => {
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


    function Player(name, mark) {
        const playerName = name;
        const playerMark = mark;

        return {
            playerName,
            playerMark,
        }
    }


    function GameController() {

        const playerX = Player("PlayerX", 'X');
        const playerO = Player("PlayerO", 'O');
        const gameboard = Gameboard();
        // default PlayerO first
        let currentActivePlayer = playerO;

        const getActivePlayer = () => currentActivePlayer;

        const switchCurrentPlayer = () => {
            currentActivePlayer = currentActivePlayer === playerO ? playerX : playerO;
        }
        const getCurrentGameboard = () => gameboard;

        const printNewRound = () => {
            console.log(`${getActivePlayer().playerName}'s turn`);
        }

        const playRound = (row, col) => {
            if (checkGameboardSpace(gameboard) === false){
                // there is no space to set marks
                return false;
            }
            const currentPlayer = getActivePlayer();

            if (gameboard.setMarkInBoard(row, col, currentPlayer) === false){
                return false
            }

            
            console.log(checkGameStat(currentPlayer));

            // next turn
            switchCurrentPlayer();
            printNewRound();
            
            return true;
        }

        
        const checkGameboardSpace = (gameboard) => {
            const board = gameboard.getBoard();
            let haveSpaceToSetMark = false;
            board.forEach(each_row => {
                each_row.forEach(each_col => {
                    // console.log(each_col.getMark());
                    if (each_col.getMark() === null) {
                        haveSpaceToSetMark = true;
                    }
                });
            });

            return haveSpaceToSetMark;
        }

        const checkGameStat = (player) => {

            const board = gameboard.getBoard();
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
            

            return `${player.playerName} puts a ${player.playerMark} `
        }

        return {
            getActivePlayer,
            playRound,
            checkGameStat,
            // gameboard,
        }
    }
    function DisplayController(){
        const messageDiv = document.querySelector('.message');
        const gameboardCellDivs = document.querySelectorAll('.card');
        gameboardCellDivs.forEach(element => {
            const position = element.addEventListener('click',()=>{
                const position = clickSetMark(element);
                const row = position.row;
                const col = position.col;
                // const gameboard = gameController.getCurrentGameboard();
                
                const currentPlayer = gameController.getActivePlayer();
                const mark = currentPlayer.playerMark;
                
                if (gameController.playRound(row,col)){
                    element.textContent =  mark !== false ? mark : '_';

                    messageDiv.textContent = gameController.checkGameStat(currentPlayer);
                }
                console.log(`row:${row} col:${col}`);

                
            });
            
        });



        function clickSetMark(element){
            const row = element.getAttribute('data-row');
            const col = element.getAttribute('data-col');
            
            return {row,col};
        }
    }
    return {
        game: gameController,
        displayController,
    }
})();

// Tic_Tac_Toc_IIFE.game.playRound(0,0);
// Tic_Tac_Toc_IIFE.game.playRound(0,1);
// Tic_Tac_Toc_IIFE.game.playRound(0,2);
// Tic_Tac_Toc_IIFE.game.playRound(1,0);
// Tic_Tac_Toc_IIFE.game.playRound(1,1);
// Tic_Tac_Toc_IIFE.game.playRound(1,2);
// Tic_Tac_Toc_IIFE.game.playRound(2,0);
// Tic_Tac_Toc_IIFE.game.playRound(2,1);
// Tic_Tac_Toc_IIFE.game.playRound(2,2);

// Tic_Tac_Toc_IIFE.displayController;