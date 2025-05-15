class CuentaBancaria {
  #saldo; // Propiedad privada (JS moderno)
  
  constructor(titular, saldoInicial) {
    this.titular = titular;
    this.#saldo = saldoInicial;
  }
}

const cuenta1 = new CuentaBancaria("Juan", 1000);
console.log(cuenta1.saldo);
