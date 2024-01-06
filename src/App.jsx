import { useState, useRef  } from 'react';
import './App.css'
import trainer from './assets/trainer.svg'

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [resultText, setResultText] = useState("");
  const [imc, setImc] = useState("");
  const imcRef = useRef(null);

  const heightChange = (event) => {
    const inputValue = event.target.value;

    const apenasNumerosEPonto = /^[0-9.]*$/;

    if (apenasNumerosEPonto.test(inputValue) || inputValue === "") {
      setHeight(inputValue);
    }
  };
  
  const weightChange = (event) => {
    const inputValue = event.target.value;

    const apenasNumerosEPonto = /^[0-9.]*$/;

    if (apenasNumerosEPonto.test(inputValue) || inputValue === "") {
      setWeight(inputValue);
    }
  }

  const imcChange = () => {
    const novoImc = weight / (height * height);
    setImc(novoImc.toFixed(2))
    const elementResultImc = imcRef.current;

    if (isNaN(novoImc) || novoImc === '' || novoImc === 0 || novoImc === Infinity) {
      elementResultImc.classList.add('hide-imc');
      return
    }

    if (imc < 18.5) {
      setResultText('Cuidado! Você está abaixo do peso!');
    } else if (imc >= 18.5 && imc <= 25) {
      setResultText('Você está no peso ideal!');
    } else if (imc > 25 && imc <= 30) {
      setResultText('Cuidado! Você está com sobrepeso!');
    } else if (imc > 30 && imc <= 35) {
      setResultText('Cuidado! Você está com obesidade moderada!');
    } else if (imc > 35 && imc <= 40) {
      setResultText('Cuidado! Você está com obesidade severa!');
    } else  {
      setResultText('Cuidado! Você está com obesidade morbida!');
    }

    if (elementResultImc) {
      elementResultImc.classList.remove('hide-imc');
    }
  }

  return (
    <section className="main">
      <div className="left-side">
        <img src={trainer}/>
      </div>

      <div className="right-side">
        <div className="calc-wrapper">
          <h1 className="title">Calculadora - IMC</h1>
          <div className="form">
            <div className="inputBox">
            <input type="text" required onChange={heightChange} value={height}/>
              <span>Altura em metros</span>
            </div>

            <div className="inputBox">
              <input type="text" required onChange={weightChange} value={weight}></input>
              <span>Peso em kg</span>
            </div>
            <button onClick={imcChange}>Calcular</button>
          </div>

          <div ref={imcRef} className="result-imc hide-imc">
            <div>
              <p>{imc}</p>
              <span>Seu IMC</span>
            </div>
            <p>{resultText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
