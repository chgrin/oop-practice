import { CalculatorButton } from './calculator-button';
import { CalculatorDisplay } from './calculator-display';
import { CalculatorExpression } from './calculator-expression';
import { CalculatorHistory } from './calculator-history';
import { CalculatorModel } from './calculator-model';
import { injectCss } from './utils';

class Calculator {
  private root: HTMLDivElement;
  private display: CalculatorDisplay;
  private expression: CalculatorExpression;
  private history: CalculatorHistory;
  private model: CalculatorModel;
  private buttons: CalculatorButton[];

  constructor() {
    this.display = new CalculatorDisplay();
    this.expression = new CalculatorExpression();
    this.history = new CalculatorHistory();
    this.model = new CalculatorModel(this.display, this.expression, this.history);

    this.buttons = [
      new CalculatorButton('7').onClick(() => this.model.addDigit('7')),
      new CalculatorButton('8').onClick(() => this.model.addDigit('8')),
      new CalculatorButton('9').onClick(() => this.model.addDigit('9')),
      new CalculatorButton('/').onClick(() => this.model.addOperator('/')),
      new CalculatorButton('4').onClick(() => this.model.addDigit('4')),
      new CalculatorButton('5').onClick(() => this.model.addDigit('5')),
      new CalculatorButton('6').onClick(() => this.model.addDigit('6')),
      new CalculatorButton('-').onClick(() => this.model.addOperator('-')),
      new CalculatorButton('1').onClick(() => this.model.addDigit('1')),
      new CalculatorButton('2').onClick(() => this.model.addDigit('2')),
      new CalculatorButton('3').onClick(() => this.model.addDigit('3')),
      new CalculatorButton('+').onClick(() => this.model.addOperator('+')),
      new CalculatorButton('0').onClick(() => this.model.addDigit('0')),
      new CalculatorButton('C').onClick(() => this.model.clear()),
      new CalculatorButton('=').onClick(() => this.model.processCaclucation()),
      new CalculatorButton('*').onClick(() => this.model.addOperator('*')),
    ];

    this.root = this.createRoot();
  }

  public renderTo(container: Element) {
    this.initCss();
    container.append(this.root);
  }

  private createRoot() {
    const root = document.createElement('div');
    root.classList.add('calculator');

    this.expression.renderTo(root);
    this.display.renderTo(root);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('calculator_buttons');

    this.buttons.forEach((button) => {
      button.renderTo(buttonsContainer);
    });

    root.append(buttonsContainer);

    this.history.renderTo(root);

    return root;
  }

  private initCss() {
    injectCss(
      /* css*/ `
      .calculator {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        margin: 20px 0;
      }

      .calculator_buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin: 10px 0;
      }
        `,
      'calculator'
    );
  }
}

const calculator1 = new Calculator();
calculator1.renderTo(document.body);

const calculator2 = new Calculator();
calculator2.renderTo(document.body);
