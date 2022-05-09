

function createInputObject(type, value) {

      switch (type) {
            case "integer":
                  let integer = {
                        type,
                        hasDecimal: false,
                        input: []
                  };
                  return integer;
            case "operator":
                  let operator = {
                        type,
                        value
                  }
                  return operator;
      }
}

let expression = new Array();
expression[0] = createInputObject("integer")
let previousInput = "integer";
let i = 0;

let history = new Array();

function handleClick(type, value) {
      switch (type) {
            case "integer":
                  if (previousInput == "integer") {
                        if (value == "." && expression[i].hasDecimal == false) {
                              if (expression[i].input.length == 0) {
                                    expression[i].input.push("0");
                                    expression[i].input.push(value);
                                    updateDisplay(type, "0", value);
                                    previousInput = "integer";
                                    expression[i].hasDecimal = true;
                                    break;
                              } else {
                                    expression[i].input.push(value);
                                    updateDisplay(type, value);
                                    previousInput = "integer";
                                    expression[i].hasDecimal = true;
                                    break;
                              }
                        } else if (value == "." && expression[i].hasDecimal == true) {
                              alert("A number can not have more than one decimal");
                              break;
                        } else if (value != ".") {
                              expression[i].input.push(value);
                              updateDisplay(type, value);
                              previousInput = "integer";
                              break;
                        }
                  } else if (previousInput == "operator") {
                        expression[i] = createInputObject("integer");
                        if (value == ".") {
                              expression[i].input.push("0");
                              expression[i].input.push(value);
                              updateDisplay(type, "0", value);
                              previousInput = "integer";
                              expression[i].hasDecimal = true;
                              break;
                        } else {
                              expression[i].input.push(value);
                              updateDisplay(type, value);
                              previousInput = "integer";
                              break;
                        }
                  } else if (previousInput == "function") {
                        resetCalculator("new");
                        if (value == ".") {
                              expression[i].input.push("0");
                              expression[i].input.push(value);
                              updateDisplay(type, "0", value);
                              previousInput = "integer";
                              expression[i].hasDecimal = true;
                              break;
                        } else {
                              expression[i].input.push(value);
                              updateDisplay(type, value);
                              previousInput = "integer";
                              break;
                        }
                  }
            case "operator":
                  if (i == 2) {
                        alert("This is not a very smart calculator and can only perform operations on two numbers right now.")
                        break;
                  }
                  if (previousInput == "operator") {
                        alert("You can not have two operators in a row");
                        break;
                  } else {
                        i++;
                        expression[i] = createInputObject(type, value);
                        updateDisplay(type, value);
                        i++;
                        previousInput = "operator";
                        break;
                  }
            case "function":
                  if (value == "calculate") {
                        if (previousInput == "operator") {
                              alert("You must enter a second number")
                              break;
                        } else {
                              calculateExpression();
                              previousInput = "function"
                              break;
                        }
                  } else if (value == "clear") {
                        resetCalculator("clear");
                        break;
                  }
      }
}

function updateDisplay(type, ...value) {
      let display = document.querySelector(".display");
      switch (type) {
            case "integer":
                  value.forEach((item) => {
                        display.textContent = display.textContent.concat(item);
                  })
                  break;
            case "operator":
                  switch (value[0]) {
                        case "divide":
                              display.textContent = display.textContent.concat([" / "]);
                              break;
                        case "multiply":
                              display.textContent = display.textContent.concat([" x "]);
                              break;
                        case "subtract":
                              display.textContent = display.textContent.concat([" - "]);
                              break;
                        case "add":
                              display.textContent = display.textContent.concat([" + "]);
                              break;
                  }
            case "function":
                  if (value[0] == "calculate") {
                        display.textContent = display.textContent.concat([` = ${value[1]}`])
                  }
                  break;
            case "reset":
                  display.textContent = "";
      }
}

function calculateExpression() {
      let num1 = parseFloat(expression[0].input.join(""));
      let operator = expression[1].value;
      let num2 = parseFloat(expression[2].input.join(""));
      let answer;

      switch (operator) {
            case "divide":
                  if (num2 == 0) {
                        alert("Can not divide by 0")
                  } else {
                        answer = num1 / num2;
                  }
                  break;
            case "multiply":
                  answer = num1 * num2;
                  break;
            case "subtract":
                  answer = num1 - num2;
                  break;
            case "add":
                  answer = num1 + num2;
                  break;
      }

      updateDisplay("function", "calculate", answer);
}

function resetCalculator(type) {
      if (type == "new") {
            history.push(document.querySelector(".display").innerText);
            console.log(history);
            expression = [];
            expression[0] = createInputObject("integer");
            i = 0;
            updateDisplay("reset");
      } else if (type == "clear") {
            console.log(history);
            expression = [];
            expression[0] = createInputObject("integer");
            i = 0;
            updateDisplay("reset");
      }
}



document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
            handleClick(e.target.dataset.type, e.target.dataset.value);
      })
})



/* 

First, think of a way to store expression

1. Take input from page
2. Determine type of input (i.e. Integer, Operator, function)
      1. If integer add value to array/object
            Note: Decimal is considered an integer so there needs to be a way to check if there's already a decimal in the expression
      2. If operator, finish previous expressoin and add operator type to array/object
      3. If function, parse array/object to function and evaluate
            Note: If last item was operator, prevent function from evaluating

*/