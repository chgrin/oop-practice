import type { CalculatorDisplay } from './calculator-display';
import type { CalculatorExpression } from './calculator-expression';
import type { CalculatorHistory } from './calculator-history';

export class CalculatorModel {
  private firstOperand: number | null = null;
  private operator: string | null = null;
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

  public addOperator(operatorText: string) {
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

  public processCaclucation() {
    if (this.firstOperand !== null && this.operator && this.secondOperand !== null) {
      let result: number;
      switch (this.operator) {
        case '+':
          result = this.firstOperand + this.secondOperand;
          this.history.createRecord({ firstOperand: this.firstOperand, operator: this.operator, secondOperand: this.secondOperand, result }, 'add');
          break;
        case '-':
          result = this.firstOperand - this.secondOperand;
          this.history.createRecord(
            { firstOperand: this.firstOperand, operator: this.operator, secondOperand: this.secondOperand, result },
            'subtract'
          );
          break;
        case '/':
          if (this.secondOperand === 0) {
            this.history.createRecord(
              { firstOperand: this.firstOperand, operator: this.operator, secondOperand: this.secondOperand, result: Infinity },
              'error'
            );
            alert('На Ноль не делим');
            this.clear();
            return;
          }

          result = this.firstOperand / this.secondOperand;
          this.history.createRecord(
            { firstOperand: this.firstOperand, operator: this.operator, secondOperand: this.secondOperand, result },
            'divide'
          );
          break;
        case '*':
          result = this.firstOperand * this.secondOperand;
          this.history.createRecord(
            { firstOperand: this.firstOperand, operator: this.operator, secondOperand: this.secondOperand, result },
            'multiply'
          );
          break;
        default:
          return;
      }

      this.firstOperand = result;
      this.operator = null;
      this.secondOperand = null;

      this.display.setNumber(this.firstOperand);
      this.expresssion.clear();
    }
  }

  public clear() {
    this.firstOperand = null;
    this.operator = null;
    this.display.clear();
    this.expresssion.clear();
  }
}
