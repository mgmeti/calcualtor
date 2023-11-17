import Big from "big.js";
import operate from "./operate";
import isNumber from "./isNumber";

export default function calculate(obj, buttonName) {
  // AC button: Reset everything
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null
    };
  }

  // Number button: Update the next value
  if (isNumber(buttonName)) {
    // Handle special case for "0" when obj.next is "0"
    if (buttonName === "0" && obj.next === "0") {
      return {};
    }

    // If there is an operation, update the next value
    if (obj.operation) {
      return { next: obj.next ? obj.next + buttonName : buttonName };
    }

    // If there is no operation, update next and clear the total value
    return {
      next: obj.next
        ? obj.next === "0"
          ? buttonName
          : obj.next + buttonName
        : buttonName,
      total: null
    };
  }

  // Percentage button: Calculate percentage
  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result).div(Big("100")).toString(),
        next: null,
        operation: null
      };
    }
    if (obj.next) {
      return {
        next: Big(obj.next).div(Big("100")).toString()
      };
    }
    return {};
  }

  // Dot button: Add decimal point
  if (buttonName === ".") {
    if (obj.next && obj.next.includes(".")) {
      return {};
    }
    return { next: obj.next ? obj.next + "." : "0." };
  }

  // Equal button: Perform calculation
  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null
      };
    } else {
      // '=' with no operation, nothing to do
      return {};
    }
  }

  // +/- button: Toggle sign
  if (buttonName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }

  // Operation button: Handle arithmetic operations
  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName
    };
  }

  // No existing operation, save the operation
  if (!obj.next) {
    return { operation: buttonName };
  }

  // Save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName
  };
}
