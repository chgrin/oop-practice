import type { CalculatorModel } from '../calculator-model';
import { injectCss } from '../utils';
import { CalculatorButton } from './calculator-button';

export class ProcessButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super('=');
    super.addClass('process_calculator_button');
    super.onClick(() => {
      const validation = model.validateExpression();

      if (!validation.isValid) {
        alert(validation.errors.join('\n'));
        return;
      }

      model.processCaclucation();
    });
  }

  protected initCss(): void {
    super.initCss();
    injectCss(
      /*css*/ `
      .process_calculator_button {
        background: lightblue;
      }
      `,
      'process_calculator_button'
    );
  }
}
