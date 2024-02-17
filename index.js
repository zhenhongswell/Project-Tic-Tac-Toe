
const Tic_Tac_Toc_IIFE = (function(){
    const gameController = GameController();
    const displayController = DisplayController();



    function Gameboard() {
        const rows = 3
        const columns = 3;
        let board = createEmptyBoard();

        // Creating 2D empty board for putting 
        

        function createEmptyBoard(){
            let board = [];
            for (let i = 0; i < rows; i++) {
                board[i] = [];
                for (let j = 0; j < columns; j++) {
                    board[i].push(Cell());
                }
            }
            return board;
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

        const setBoard = (newBoard) =>{
            const Before = board;
            const After = newBoard;
            if (Before === After){
                // not thing change
                return false
            }
            if (Before !== After){
                // New board change!
                board = newBoard;
                return true
            }

            return false;
        }
        return {
            setMarkInBoard,
            getBoard,
            createEmptyBoard,
            setBoard,
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
        let playerName = name;
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
                // resetGame();
                return `${player.playerName} wins!`
            }
            if (//checking same col
                board[0][0].getMark() === player.playerMark && board[1][0].getMark() === player.playerMark && board[2][0].getMark() === player.playerMark ||
                board[0][1].getMark() === player.playerMark && board[1][1].getMark() === player.playerMark && board[2][1].getMark() === player.playerMark ||
                board[0][2].getMark() === player.playerMark && board[1][2].getMark() === player.playerMark && board[2][2].getMark() === player.playerMark
            ) {
                // resetGame();
                return `${player.playerName} wins!`
            }
            if (//checking the crossover
                board[0][0].getMark() === player.playerMark && board[1][1].getMark() === player.playerMark && board[2][2].getMark() === player.playerMark ||
                board[2][0].getMark() === player.playerMark && board[1][1].getMark() === player.playerMark && board[0][2].getMark() === player.playerMark
            ) {
                // resetGame();
                return `${player.playerName} wins!`
            }
            

            return `${player.playerName} puts a ${player.playerMark} `
        }

        const resetGame = ()=>{
            const emptyBoard = gameboard.createEmptyBoard();
            console.log(
                gameboard.setBoard(emptyBoard)
                )
            currentActivePlayer = playerO;
        }

        

        

        

        return {
            getActivePlayer,
            playRound,
            checkGameStat,
            resetGame,
            playerX,
            playerO,
            gameboard,
        }
    }
    function DisplayController(){
        const messageDiv = document.querySelector('.message');
        const gameboardCellDivs = document.querySelectorAll('.card');
        const newGameBtn = document.querySelector('.newGame');
        const changePlayerX_NameBtn = document.querySelector('.playerX-name').querySelector('button');
        const changePlayerO_NameBtn = document.querySelector('.playerO-name').querySelector('button');
        changePlayerX_NameBtn.addEventListener('click',()=>changePlayerX_Name());
        changePlayerO_NameBtn.addEventListener('click',()=>changePlayerO_Name());

        gameboardCellDivs.forEach(element => {
            const position = element.addEventListener('click',()=>{
                const position = clickSetMark(element);
                const row = position.row;
                const col = position.col;
                
                const currentPlayer = gameController.getActivePlayer();
                const mark = currentPlayer.playerMark;
                // need to fix this...
                if (gameController.playRound(row,col)){
                    element.textContent =  mark !== false ? mark : '_';

                    messageDiv.textContent = gameController.checkGameStat(currentPlayer);
                }
                console.log(`row:${row} col:${col}`);                
            });
            
        });


        newGameBtn.addEventListener('click',()=>{
            // visually
            resetGame();
            // logic
            gameController.resetGame();

        })

        function resetGame(){
            gameboardCellDivs.forEach(element =>{
                element.textContent="";
            })
            messageDiv.textContent="new game!";
        }

        function clickSetMark(element){
            const row = element.getAttribute('data-row');
            const col = element.getAttribute('data-col');
            
            return {row,col};
        }

        
        function changePlayerX_Name(){
            const playerX_Name = document.querySelector('.playerX-name').querySelector('input').value;
            console.log(playerX_Name);
            gameController.playerX.playerName = playerX_Name;
        }

        function changePlayerO_Name(){
            const playerO_Name = document.querySelector('.playerO-name').querySelector('input').value;
            gameController.playerO.playerName = playerO_Name;
        }
    }
    return {
        gameController,
        displayController,
    }
})();