
      const screen = document.getElementById("screen");
      const screen2 = document.getElementById("screen2");

      let firstValue = null;
      let secondValue = null;
      let first;
      let second;
      let op = null;
      let previousResult = null;
      let reset;
      let allowOp;
      let includesE = screen.innerHTML;

      //GOOD clear values
      const clearValues = function () {
        firstValue = null;
        secondValue = null;
        op = null;
        previousResult = null;
      };

      //GOOD clear screen
      const clearScreen = function () {
        document.getElementById("screen").innerHTML = "";
      };
      const clearScreen2 = function () {
        document.getElementById("screen2").innerHTML = "";
      };

      //GOOD get operator signal and show operator, except neg
      const operator = function (id) {
        //GOOD makes neg numbers
        if (
          document.getElementById(id).value === "-" &&
          screen.innerHTML === ""
        ) {
          screen.innerHTML = "-";
          //GOOD prevents double sign after neg
        } else if (screen.innerHTML === "-") {
          screen2.innerHTML = screen2.innerHTML;
        } else {
          getFirst();
          allowOp = undefined;
          //GOOD for when there's a value already entered
          if (firstValue !== null) {
            //GOOD revious result will be part of operation
            if (previousResult !== null) {
              screen2.innerHTML = previousResult;
              //GOOD for SN
              if (screen.innerHTML.includes("e") === true) {
                op = document.getElementById(id).value;
                screen2.innerHTML = "(" + screen.innerHTML + ")" + " " + op;
              } else {
                //GOOD for regular notation
                op = document.getElementById(id).value;
                screen2.innerHTML = screen.innerHTML + " " + op;
              }
              clearScreen();
            }
            //GOOD shows sign on screen2
            if (op === null) {
              op = document.getElementById(id).value;
              screen2.innerHTML = screen.innerHTML + " " + op;
              clearScreen();
            }
            //GOOD keeps from doubling up signs
            if (op !== null && previousResult === null) {
              screen2.innerHTML = screen2.innerHTML;
            }
          }
        }
      };

      //GOOD Get variables
      const getFirst = function () {
        if (screen.innerHTML !== "") {
          firstValue = parseFloat(screen.innerHTML);
          return firstValue;
        } else {
          previousResult = null;
          return previousResult;
        }
      };
      const getSecond = function () {
        secondValue = parseFloat(screen.innerHTML);
        return secondValue;
      };

      //GOOD runs operations on equal sign
      const operate = function () {
        if (screen.innerHTML === "") {
          screen.innerHTML = screen.innerHTML;
        } else {
          if (op === null) {
            screen2.innerHTML = screen2.innerHTML;
          } else {
            getSecond();
            if (allowOp !== null) {
              screen2.innerHTML =
                screen2.innerHTML + " " + screen.innerHTML + " = ";
              switch (op) {
                case "+":
                  add();
                  break;
                case "-":
                  subtract();
                  break;
                case "*":
                  multiply();
                  break;
                case "/":
                  divide();
              }
            }
          }
          allowOp = null;
        }
      };

      //GOOD shows values
      const view = function (id) {
        let show = document.getElementById(id).value;
        if (allowOp === null && previousResult !== null) {
          if (screen.innerHTML === "-") {
            clearValues();
            screen.innerHTML = screen.innerHTML + show;
          } else {
            screen2.innerHTML = screen2.innerHTML + " " + screen.innerHTML;
            clearScreen();
            clearValues();
            screen.innerHTML = screen.innerHTML + show;
          }
        } else if (op !== null) {
          let show = document.getElementById(id).value;
          //GOOD limits input to 10
          if (screen.innerText.length === 10) {
            screen.innerHTML = screen.innerHTML;
          } else screen.innerHTML = screen.innerHTML + show;
        } else if (previousResult !== null) {
          screen.innerHTML = "";
        } else {
          if (screen.innerText.length === 10) {
            screen.innerHTML = screen.innerHTML;
          } else screen.innerHTML = screen.innerHTML + show;
        }
      };

      let handlers = {
        clear: function () {
          if (screen.innerHTML === "") {
            screen2.innerHTML = "";
            clearValues();
          }
          if (screen.innerHTML == previousResult) {
            screen2.innerHTML = screen2.innerHTML + "" + previousResult;
            clearValues();
          }
          clearScreen();
        },
      };

      //GOOD operations work
      const add = function () {
        let result = firstValue + secondValue;
        let resultSN = result.toExponential(4);
        let resultLength = result.toString().length;
        if (resultLength >= 10) {
          screen.innerHTML = resultSN;
          previousResult = resultSN;
        } else {
          screen.innerHTML = result;
          previousResult = result;
        }

        secondValue = null;
      };

      const subtract = function () {
        let result = firstValue - secondValue;
        let resultSN = result.toExponential(4);
        let resultLength = result.toString().length;
        if (resultLength >= 10) {
          screen.innerHTML = resultSN;
          previousResult = resultSN;
        } else {
          screen.innerHTML = result;
          previousResult = result;
        }

        secondValue = null;
      };
      const multiply = function () {
        let result = firstValue * secondValue;
        let resultSN = result.toExponential(4);
        let resultLength = result.toString().length;
        if (resultLength >= 10) {
          screen.innerHTML = resultSN;
          previousResult = resultSN;
        } else {
          screen.innerHTML = result;
          previousResult = result;
        }

        secondValue = null;
      };
      const divide = function () {
        let result = firstValue / secondValue;
        let resultSN = result.toExponential(4);
        let resultLength = result.toString().length;
        if (resultLength >= 10) {
          screen.innerHTML = resultSN;
          previousResult = resultSN;
        } else {
          screen.innerHTML = result;
          previousResult = result;
        }

        secondValue = null;
      };
