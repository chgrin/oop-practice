// Процедурный калькулятор
type calcInstanceState = {
  display: HTMLElement | null;
  expressionElement: HTMLElement | null;
  history: HTMLElement | null;
  currentNumber: string;
  firstOperand: number | null;
  operator: string | null;
};

type logRecord = {
  expression: string;
  result: string;
  recType: string;
};

const calc1: calcInstanceState = {
  display: null,
  expressionElement: null,
  history: null,
  currentNumber: '0',
  firstOperand: null,
  operator: null,
};

const calc2: calcInstanceState = {
  display: null,
  expressionElement: null,
  history: null,
  currentNumber: '0',
  firstOperand: null,
  operator: null,
};

// Обновление отображения
function updateDisplay(state: calcInstanceState) {
  if (state.display) {
    state.display.textContent = state.currentNumber;
  }
}

// Обновление выражения
function updateExpression(state: calcInstanceState) {
  if (state.expressionElement) {
    if (state.firstOperand !== null && state.operator !== null) {
      state.expressionElement.textContent = `${state.firstOperand} ${state.operator}`;
    } else {
      state.expressionElement.textContent = '';
    }
  }
}

// Добавление цифры
function appendNumber(num: string, state: calcInstanceState) {
  if (state.currentNumber === '0') {
    state.currentNumber = num;
  } else {
    state.currentNumber += num;
  }
  updateDisplay(state);
}

// Очистка калькулятора
function clear(state: calcInstanceState) {
  state.currentNumber = '0';
  state.firstOperand = null;
  state.operator = null;
  updateDisplay(state);
  updateExpression(state);
}

// Выполнение операции
function performOperation(isOperator: boolean = false, state: calcInstanceState) {
  if (state.firstOperand === null || state.operator === null) return;

  const secondOperand = parseFloat(state.currentNumber);
  let result: number;

  switch (state.operator) {
    case '+':
      result = state.firstOperand + secondOperand;
      logHistory({ expression: `${state.firstOperand} + ${secondOperand}`, result: result.toString(), recType: 'add' }, state);
      break;
    case '-':
      result = state.firstOperand - secondOperand;
      logHistory({ expression: `${state.firstOperand} - ${secondOperand}`, result: result.toString(), recType: 'subtract' }, state);
      break;
    case '/':
      if (secondOperand === 0) {
        logHistory({ expression: `${state.firstOperand} / ${secondOperand}`, result: 'NaN', recType: 'error' }, state);
        alert('Ошибка: деление на ноль');
        clear(state);
        return;
      }
      result = state.firstOperand / secondOperand;
      logHistory({ expression: `${state.firstOperand} / ${secondOperand}`, result: result.toString(), recType: 'divide' }, state);
      break;
    case '*':
      result = state.firstOperand * secondOperand;
      logHistory({ expression: `${state.firstOperand} * ${secondOperand}`, result: result.toString(), recType: 'multiply' }, state);
      break;
    default:
      return;
  }

  if (!isOperator) {
    state.currentNumber = result.toString();
    state.firstOperand = null;
    state.operator = null;
    updateDisplay(state);
    updateExpression(state);
  } else {
    state.firstOperand = result;
    state.currentNumber = '0';
  }
}

// Запись в историю
function logHistory({ expression, result, recType }: logRecord, state: calcInstanceState) {
  const historyItem: HTMLLIElement = document.createElement('li');
  historyItem.textContent = `${expression} = ${result}`;
  historyItem.classList.add('history-item', recType);
  state.history?.appendChild(historyItem);
}

// Установка оператора
function setOperator(op: string, state: calcInstanceState) {
  if (state.firstOperand === null) {
    state.firstOperand = parseFloat(state.currentNumber);
    state.currentNumber = '0';
  } else if (state.operator !== null && state.currentNumber !== '0') {
    performOperation(true, state);
  }
  state.operator = op;
  updateDisplay(state);
  updateExpression(state);
}

// Инициализация калькулятора
function initCalculator(state: calcInstanceState, preffix: string) {
  state.display = document.getElementById(`${preffix}-display`);
  state.expressionElement = document.getElementById(`${preffix}-expression`);
  state.history = document.getElementById(`${preffix}-history`);
  clear(state);

  // Добавляем обработчики для цифровых кнопок
  for (let i = 0; i <= 9; i++) {
    document.getElementById(`${preffix}-num${i}`)?.addEventListener('click', () => appendNumber(i.toString(), state));
  }

  // Добавляем обработчики для операторов
  document.getElementById(`${preffix}-addButton`)?.addEventListener('click', () => setOperator('+', state));
  document.getElementById(`${preffix}-subtractButton`)?.addEventListener('click', () => setOperator('-', state));
  document.getElementById(`${preffix}-divideButton`)?.addEventListener('click', () => setOperator('/', state));
  document.getElementById(`${preffix}-multiplyButton`)?.addEventListener('click', () => setOperator('*', state));

  // Добавляем обработчики для специальных кнопок
  document.getElementById(`${preffix}-clearButton`)?.addEventListener('click', () => clear(state));
  document.getElementById(`${preffix}-equalsButton`)?.addEventListener('click', () => performOperation(false, state));
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initCalculator(calc1, 'calc1');
  initCalculator(calc2, 'calc2');
});
