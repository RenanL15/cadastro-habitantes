class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habitantes: [],
      salario: "",
      numFilhos: "",
    };
  }

  valorSalario(e) {
    this.setState({ salario: e.target.value });
  }

  valorFilhos(e) {
    this.setState({ numFilhos: e.target.value });
  }

  prevent(e) {
    e.preventDefault();
    const { habitantes, salario, numFilhos } = this.state;
    const novoHabitante = {
      salario: parseFloat(salario),
      numFilhos: parseInt(numFilhos),
    };

    this.setState({
      habitantes: [...habitantes, novoHabitante],
      salario: "",
      numFilhos: "",
    });
  }

  calcularMediaSalario() {
    let sum = 0;
    const { habitantes } = this.state;
    if (habitantes.length === 0) {
      return 5600;
    }
    
    // soma tudo
    habitantes.forEach((habitante) => {
      sum += habitante.salario;
    });
    
    if (habitantes.length === 1) {
      // sum = 5600;
      return (sum + 5600) / 2;
    }

    return sum / habitantes.length;
  }

  calcularMediaFilhos() {
    let sum = 0;
    const { habitantes } = this.state;
    if (habitantes.length === 0) {
      return 2;
    }

    habitantes.forEach((habitante) => {
      sum += habitante.numFilhos;
    });

    return sum / habitantes.length;
  }

  maiorSalario() {
    const { habitantes } = this.state;

    const salarios = habitantes.map((habitante) => habitante.salario);
    return Math.max(5600, ...salarios);
  }

  calcularPercentualSalarioAteMil() {
    const { habitantes } = this.state;
    if (habitantes.length === 0) {
      return 0;
    }

    let habitantesAteMil = habitantes.filter(
      (habitante) => habitante.salario <= 1000
    );

    if (habitantes.length === 1) {
      return (habitantesAteMil.length / (habitantes.length + 1)) * 100;
    }

    return (habitantesAteMil.length / habitantes.length) * 100;
  }

  render() {
    const { salario, numFilhos } = this.state;
    const style = {
      text: {
        color: "black",
        fontWeight: "600",
      },
    };

    return (
      <div>
        <h1>Cadastro de Habitantes</h1>
        <form onSubmit={(e) => this.prevent(e)}>
          <label>
            Salário:
            <input
              type="number"
              value={salario}
              onChange={(e) => this.valorSalario(e)}
              required
            />
          </label>
          <label>
            Número de Filhos:
            <input
              type="number"
              value={numFilhos}
              onChange={(e) => this.valorFilhos(e)}
              required
            />
          </label>
          <input type="submit" value="Cadastrar" />
        </form>
        <h2>Estatísticas:</h2>
        <p>
          Média dos Salários:
          <span style={style.text}>
            {" "}
            R$ {this.calcularMediaSalario().toFixed(2)}
          </span>
        </p>
        <p>
          Média dos Números de Filhos:
          <span style={style.text}>
            {" "}
            {this.calcularMediaFilhos().toFixed(2)}
          </span>
        </p>
        <p>
          Maior Salário:
          <span style={style.text}> R$ {this.maiorSalario().toFixed(2)}</span>
        </p>
        <p>
          Percentual de Salários até R$1000,00:
          <span style={style.text}>
            {" "}
            {this.calcularPercentualSalarioAteMil().toFixed(2)}%
          </span>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".cadastro-content"));
