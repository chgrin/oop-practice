import { injectCss } from './utils';

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

  private log(historyItem: HTMLLIElement) {
    this.root.append(historyItem);
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

  public renderTo(container: Element) {
    this.initCss();
    container.append(this.root);
  }

  public createRecord({ firstOperand, operator, secondOperand, result }: LogRecord, operationType: string) {
    const historyItem = document.createElement('li');
    historyItem.classList.add('calculator_history-item', operationType);

    const historyRecord = `${firstOperand} ${operator} ${secondOperand} = ${result}`;
    historyItem.textContent = historyRecord;

    this.log(historyItem);
  }
}
