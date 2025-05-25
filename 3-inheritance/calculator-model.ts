import type { CalculatorDisplay } from './calculator-display';
import type { CalculatorExpression } from './calculator-expression';
import type { CalculatorHistory } from './calculator-history';

export type Operators = '+' | '-' | '*' | '/';
type ValidationResult = {
  isValid: boolean;
  values?: { first: number; second: number; op: Operators };
  errors: string[];
};

export class CalculatorModel {
  private firstOperand: number | null = null;
  private operator: Operators | null = null;
  private secondOperand: number | null = null;

  constructor(private display: CalculatorDisplay, private expresssion: CalculatorExpression, private history: CalculatorHistory) {}

  public addDigit(digitText: string) {
    if (this.operator === null) {
      this.firstOperand = parseInt(`${this.firstOperand ?? ''}${digitText}`);
      this.display.setNumber(this.firstOperand);
    } else {
      this.secondOperand = parseInt(`${this.secondOperand ?? ''}${digitText}`);
      this.display.setNumber(this.secondOperand);
    }
  }

  public addOperator(operatorText: Operators) {
    if (this.firstOperand && this.operator && this.secondOperand) {
      this.processCaclucation();
      this.addOperator(operatorText);
    }

    if (this.firstOperand) {
      this.operator = operatorText;

      this.expresssion.setOperator(this.firstOperand, this.operator);
      this.display.clear();
    }
  }

  public validateExpression(): ValidationResult {
    const errors: string[] = [];

    if (this.firstOperand === null) errors.push('Отсутсвует первый операнд');
    if (this.secondOperand === null) errors.push('Отсутсвует второй операнд');
    if (this.operator === null) errors.push('Нужен оператор для вычисления');

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return {
      isValid: true,
      values: {
        first: this.firstOperand!,
        second: this.secondOperand!,
        op: this.operator!,
      },
      errors: [],
    };
  }

  public processCaclucation() {
    const validation = this.validateExpression();

    if (!validation.isValid || !validation.values) {
      return;
    }

    const { first, second, op } = validation.values;

    let result: number;
    switch (op) {
      case '+':
        result = first + second;
        break;
      case '-':
        result = first - second;
        break;
      case '*':
        result = first * second;
        break;
      case '/':
        result = first / second;
        break;
      default:
        return;
    }

    this.history.addOperation(first, op, second, result);

    this.firstOperand = result;
    this.operator = null;
    this.secondOperand = null;

    this.display.setNumber(this.firstOperand);
    this.expresssion.clear();
  }

  public clear() {
    this.firstOperand = null;
    this.operator = null;
    this.display.clear();
    this.expresssion.clear();
  }
}
