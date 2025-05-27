import { CalculatorButton } from '../button/calculator-button';
import { CalculatorModel } from '../calculator-model';
import type { UnOperator } from '../operator';

class FactorialOperator implements UnOperator {
  calculate(firstOperand: number): number {
    let res = firstOperand--;

    while (firstOperand) {
      res *= firstOperand;
      --firstOperand;
    }

    return res;
  }

  getHistoryText(firstOperand: number): string {
    return `${firstOperand}! = ${this.calculate(firstOperand)}`;
  }

  getHistoryClass(): string {
    return 'multiply';
  }
}

export class FactorialButton extends CalculatorButton {
  constructor(private model: CalculatorModel) {
    super('fac!');
  }

  onClick(): void {
    this.model.addUnOperator(new FactorialOperator());
  }
}
