
"use strict";

(function () {
    const grid = document.getElementById("grid");
    let isMineFound = false;
    /**
        * The method is to add Mines to the Grid
        *  @param {number} rows  No of rows to the grid.
        *  @param {number} columns  No of columns to the grid.
    */
    let addMinesToGrid = (rows, columns) => {
        let totalCells = rows + columns;
        for(let i=0; i<totalCells; i++) {
            let randomRow = Math.floor(Math.random() * 10);
            let randomCol = Math.floor(Math.random() * 10);
            let cells = grid.rows[randomRow].cells[randomCol];
            cells.setAttribute("value", true);
            if(isMineFound) cells.innerHTML = "X" ;
        }

    }
    /**
        * The method is to show mines positions in the Grid
        *  @param {number} rows  No of rows to the grid.
        *  @param {number} columns  No of columns to the grid.
    */
    let showMinesPosition = (rows, columns) => {
        for(let i=0; i<rows; i++) {
            for(let j=0; j<columns; j++) {
                let cell = grid.rows[i].cells[j];
                if(cell.getAttribute("value")) {
                    cell.className = "value";
                    cell.innerHTML = "*";
                }
            }
        }
    }
    /**
        * The method is to check if the mines are clicked
        *  @param {number} rows  No of rows to the grid.
        *  @param {number} columns  No of columns to the grid.
    */
    let checkForMines = (rows, columns) => {
        let isGameCompleted = true;
        for(let i=0; i<rows; i++) {
            for(let j=0; j<columns; j++) {
                let cell = grid.rows[i].cells[j];
                if(!cell.getAttribute("value") && cell.innerHTML === '') {
                    isGameCompleted = false;
                }
            }
        }
        if(isGameCompleted) {
            alert(" you won the game");
            document.getElementById("gameStatus").className = "game-won";
            document.getElementById("gameStatus").innerHTML = "Yeyy!!! You won the game";
            showMinesPosition(rows, columns);
            grid.disabled = true;

        }
    }

    /**
        * The method is to trigger actions after clicking on a cell
        * @param {number} cell  Current cell which is clicked.
        *  @param {number} rows  No of rows to the grid.
        *  @param {number} columns  No of columns to the grid.
    */
    let clickOnCell = (cell, rows, columns) => {
        if(cell.getAttribute("value")) {
            document.getElementById("gameStatus").className = "game-over";
            document.getElementById("gameStatus").innerHTML = "Oops!!! Game over";
            showMinesPosition(rows, columns);
            grid.className = 'disabledTable';
        } else {
            cell.className = "visited";
            let mineCount = 0;
            let cellRow = cell.parentNode.rowIndex;
            let cellCol = cell.cellIndex;
            for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,rows-1); i++) {
                for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,columns-1); j++) {
                  if (grid.rows[i].cells[j].getAttribute("value")) mineCount++;
                }
              }
              cell.innerHTML=mineCount;
              if (mineCount === 0) { 
                for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,rows-1); i++) {
                  for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,columns-1); j++) {
                    if (grid.rows[i].cells[j].innerHTML=="") clickOnCell(grid.rows[i].columns[j]);
                  }
                }
              }
              checkForMines(rows, columns);
        }
    }
    /**
        * The method is to trigger display the grid Table
        *  @param {number} rows  No of rows to the grid.
        *  @param {number} columns  No of columns to the grid.
    */
    let showGrid = (rows, columns) => {
      grid.innerHTML = "";
      for(let i=0; i<rows; i++) {
         let row = grid.insertRow(i);
         for(let j=0; j<columns; j++) {
             let cell = row.insertCell(j);
             cell.addEventListener('click', () => {
                clickOnCell(cell, rows, columns);
             })
         } 
      }
      addMinesToGrid(rows, columns);
    }

    const button = document.getElementById("button");
    button.addEventListener('click', ()=> {
        grid.className = '';
        document.getElementById("gameStatus").className = "";
        document.getElementById("gameStatus").innerHTML = "";
        showGrid(10,10);
    });
    showGrid(10,10);
})();
