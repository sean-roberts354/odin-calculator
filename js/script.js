

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

function handleClick(type, value) {
      switch (type) {
            case "integer":
                  if (previousInput == "integer") {
                        if (value == "." && expression[i].hasDecimal == false) {
                              if (expression[i].input.length == 0) {
                                    expression[i].input.push("0");
                                    expression[i].input.push(value);
                                    previousInput = "integer";
                                    expression[i].hasDecimal = true;
                                    break;
                              } else {
                                    expression[i].input.push(value);
                                    previousInput = "integer";
                                    expression[i].hasDecimal = true;
                                    break;
                              }
                        } else if (value == "." && expression[i].hasDecimal == true) {
                              alert("A number can not have more than one decimal");
                              break;
                        } else if (value != ".") {
                              expression[i].input.push(value);
                              previousInput = "integer";
                              break;
                        }
                  } else if (previousInput == "operator") {
                        expression[i] = createInputObject("integer");
                        if (value == ".") {
                              expression[i].input.push("0");
                              expression[i].input.push(value);
                              previousInput = "integer";
                              expression[i].hasDecimal = true;
                              break;
                        } else {
                              expression[i].input.push(value);
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
                        i++;
                        previousInput = "operator";
                        break;
                  }
      }
      console.log(expression);
      console.log(previousInput);
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