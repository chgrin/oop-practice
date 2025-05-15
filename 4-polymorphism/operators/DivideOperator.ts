import { CalculatorButton } from "../button/calculator-button";
import type { CalculatorModel } from "../calculator-model";
import type { BiOperator } from "../operator";

class DivideOperator implements BiOperator {
  calculate(firstOperand: number, secondOperand: number): number {
    return firstOperand / secondOperand;
  }
  getExpression(firstOperand: number): string {
    return `${firstOperand} /`;
  }
  getHistoryText(firstOperand: number, secondOperand: number): string {
    return `${firstOperand} / ${secondOperand} = ${this.calculate(
      firstOperand,
      secondOperand
    )}`;
  }
  getHistoryClass(): string {
    return `divide`;
  }
}

export class DivideButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super("/");
  }

  onClick() {
    this.model.addBiOperator(new DivideOperator());
  }
}
