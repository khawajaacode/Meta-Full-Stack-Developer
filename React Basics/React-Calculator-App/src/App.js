import React, { useState } from 'react';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [value, setValue] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(display);
    if (currentValue === 0) return;
    const fixed = String(currentValue / 100);
    setDisplay(fixed);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      let newValue = currentValue;

      if (operator === '+') newValue = currentValue + inputValue;
      else if (operator === '-') newValue = currentValue - inputValue;
      else if (operator === '*') newValue = currentValue * inputValue;
      else if (operator === '/') {
        if (inputValue === 0) {
          newValue = 'Error';
        } else {
          newValue = currentValue / inputValue;
        }
      }

      setValue(newValue === 'Error' ? null : newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (operator == null) return;
    performOperation(null);
    setOperator(null);
  };

  React.useEffect(() => {
    const handleKey = (e) => {
      const { key } = e;
      if (key >= '0' && key <= '9') inputDigit(key);
      else if (key === '.') inputDot();
      else if (key === '+' || key === '-' || key === '*' || key === '/') performOperation(key);
      else if (key === 'Enter' || key === '=') handleEquals();
      else if (key === 'Backspace') setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : '0'));
      else if (key === 'Escape') clearAll();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [display, operator, value, waitingForOperand]);

  const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`calc-btn ${className}`}
      aria-label={typeof children === 'string' ? children : 'button'}
    >
      {children}
    </button>
  );

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>React Calculator</h1>
      <div style={styles.calculator}>
        <div style={styles.display} data-testid="display">{display}</div>
        <div style={styles.keypad}>
          <Button onClick={clearAll} className="wide">AC</Button>
          <Button onClick={toggleSign}>±</Button>
          <Button onClick={inputPercent}>%</Button>
          <Button onClick={() => performOperation('/')} className="op">÷</Button>

          <Button onClick={() => inputDigit(7)}>7</Button>
          <Button onClick={() => inputDigit(8)}>8</Button>
          <Button onClick={() => inputDigit(9)}>9</Button>
          <Button onClick={() => performOperation('*')} className="op">×</Button>

          <Button onClick={() => inputDigit(4)}>4</Button>
          <Button onClick={() => inputDigit(5)}>5</Button>
          <Button onClick={() => inputDigit(6)}>6</Button>
          <Button onClick={() => performOperation('-')} className="op">−</Button>

          <Button onClick={() => inputDigit(1)}>1</Button>
          <Button onClick={() => inputDigit(2)}>2</Button>
          <Button onClick={() => inputDigit(3)}>3</Button>
          <Button onClick={() => performOperation('+')} className="op">+</Button>

          <Button onClick={() => inputDigit(0)} className="wide">0</Button>
          <Button onClick={inputDot}>.</Button>
          <Button onClick={handleEquals} className="op">=</Button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, Helvetica, sans-serif',
    background: '#f3f4f6',
    padding: 12,
  },
  title: { marginBottom: 12 },
  calculator: {
    width: 320,
    background: '#111827',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
  },
  display: {
    height: 72,
    background: '#1f2937',
    color: '#fff',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 12px',
    fontSize: 32,
    marginBottom: 12,
    overflowX: 'auto',
  },
  keypad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 8,
  }
};

(function injectStyles() {
  if (document.getElementById('react-calc-styles')) return;
  const css = `
    .calc-btn {
      font-size: 20px;
      padding: 14px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: #e5e7eb;
      box-shadow: 0 4px rgba(0,0,0,0.05);
    }
    .calc-btn.op {
      background: #f59e0b;
      color: #fff;
    }
    .calc-btn.wide {
      grid-column: span 2;
    }
    .calc-btn:active { transform: translateY(1px); }
  `;
  const style = document.createElement('style');
  style.id = 'react-calc-styles';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
})();