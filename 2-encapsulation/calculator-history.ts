import { createElementFromHTML, injectCss } from './utils';

type LogRecord = {
  firstOperand: number;
  operator: string;
  secondOperand: number;
  result: number;
};

export class CalculatorHistory {
  private root: HTMLUListElement;

  constructor() {
    this.root = this.createRoot();
  }

  private createRoot() {
    const root = document.createElement('ul');
    root.classList.add('calculator_history');
    return root;
  }

  private initCss() {
    injectCss(
      `.calculator_history {
        margin-top: 20px;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 3px;
        min-height: 100px;
        list-style-type: disclosure-closed;
        list-style-position: inside;
			}
			.calculator_history:not(:has(:first-child)) {
        display: none;
      }
      .calculator_history-item {
        padding: 5px;
        margin: 2px 0;
        border-radius: 3px;
      }
      .calculator_history-item.add {
        color: #2ecc71;
      }
      .calculator_history-item.subtract {
        color: #e74c3c;
      }
      .calculator_history-item.multiply {
        color: #3498db;
      }
      .calculator_history-item.divide {
        color: #9b59b6;
      }
      .calculator_history-item.error {
        color: #e74c3c;
        font-weight: bold;
      }`,
      'calculator_history'
    );
  }

  private renderRecord({ firstOperand, operator, secondOperand, result }: LogRecord, modif: string) {
    const historyItem = createElementFromHTML(
      `<li class="calculator_history-item ${modif}">
				${firstOperand} ${operator} ${secondOperand} = ${result}
			</li>`
    );

    this.root.append(historyItem);
  }

  public renderTo(container: Element) {
    this.initCss();
    container.append(this.root);
  }

  public logOperation(record: LogRecord) {
    let modif: string = '';

    switch (record.operator) {
      case '+':
        modif = 'add';
        break;
      case '-':
        modif = 'subtract';
        break;
      case '*':
        modif = 'multiply';
        break;
      case '/':
        modif = 'divide';
        break;
    }

    this.renderRecord(record, modif);
  }

  public logErrorOperation(record: LogRecord) {
    this.renderRecord(record, 'error');
  }
}
