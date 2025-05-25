import type { CalculatorModel, Operators } from '../calculator-model';
import { CalculatorButton } from './calculator-button';

export class OperatorButton extends CalculatorButton {
  constructor(operator: Operators, model: CalculatorModel) {
    super(operator);
    this.onClick(() => model.addOperator(operator));
  }
}
