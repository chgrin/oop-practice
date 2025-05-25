import type { CalculatorModel } from '../calculator-model';
import { injectCss } from '../utils';
import { CalculatorButton } from './calculator-button';

export class CancelButton extends CalculatorButton {
  constructor(model: CalculatorModel) {
    super('C');
    super.addClass('cancel_calculator_button');
    super.onClick(() => {
      const isConfirm = confirm('Вы действительно?*');

      if (isConfirm) {
        model.clear();
      }
    });
  }

  protected initCss(): void {
    super.initCss();
    injectCss(
      /*css*/ `
      .cancel_calculator_button {
        background: lightgrey;
      }
      `,
      'cancel_calculator_button'
    );
  }
}
