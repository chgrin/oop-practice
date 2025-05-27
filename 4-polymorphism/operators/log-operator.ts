import { CalculatorButton } from '../button/calculator-button';
import { CalculatorModel } from '../calculator-model';
import type { BiOperator } from '../operator';

class LogOperator implements BiOperator {
  calculate(firstOperand: number, secondOperand: number): number {
    return Math.log(secondOperand) / Math.log(firstOperand);
  }

  getExpression(firstOperand: number): string {
    return `log${firstOperand}(`;
  }

  getHistoryText(firstOperand: number, secondOperand: number): string {
    return `log${firstOperand}(${secondOperand}) = ${this.calculate(firstOperand, secondOperand)}`;
  }

  getHistoryClass(): string {
    return 'divide';
  }
}

export class LogButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super('log');
  }

  onClick(): void {
    this.model.addBiOperator(new LogOperator());
  }
}
