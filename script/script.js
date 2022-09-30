const select = document.getElementById('selection')

select.addEventListener('change', function () {
  if (select.value == 'cesar') {
    steps.style.display = 'flex'
  } else {
    steps.style.display = 'none'
  }
})
// mudar mensagem do botão
const radioCodificar = document.getElementById('radiocodificar')
const radioDecodificar = document.getElementById('radiodecodificar')
const criptografarBtn = document.getElementById('criptografarbtn')

radioCodificar.addEventListener('change', function () {
  criptografarBtn.innerHTML = 'Codificar Mensagem'
})
radioDecodificar.addEventListener('change', function () {
  criptografarBtn.innerHTML = 'Decodificar Mensagem'
})

function criptografia() {
  const text = document.getElementById('textToDecode')
  const method = document.getElementById('selection')
  if (method.value === 'cesar') {
    toCesar(text.value)
  } else {
    toB64(text)
  }
}
//cesar
function toCesar(text) {
  let steps = parseInt(document.getElementById('passos').value)
  const code = document.querySelector('input[name="code"]:checked').value
  if (code === 'decodificar') {
    steps = steps * -1
  }
  const alfabeto = 'abcdefghijklmnopqrstuwxyz'.split('')
  //linha 34 : transformando alfabeto em array
  const textoOriginal = text.split('')
  let textoCriptografado = ''
  for (let i = 0; i < textoOriginal.length; i++) {
    let posicaoNoAlfabeto = alfabeto.indexOf(textoOriginal[i])
    // if para caso ultrapasse o alfabeto
    if (posicaoNoAlfabeto + steps > alfabeto.length) {
      // caso transborde para maior do que o tamanho
      const somaSteps = posicaoNoAlfabeto + steps
      const diferenca = somaSteps - alfabeto.length
      posicaoNoAlfabeto = diferenca
    } else if (posicaoNoAlfabeto + steps < 0) {
      // caso transborde para menor do que o tamanho (negativo)
      const somaSteps = posicaoNoAlfabeto + steps
      const diferenca = alfabeto.length - somaSteps
      posicaoNoAlfabeto = alfabeto.length + diferenca - 1
      console.log({ posicaoNoAlfabeto, diferenca, somaSteps })
    } else {
      posicaoNoAlfabeto += steps
    }
    console.log(alfabeto[posicaoNoAlfabeto])
    //espaço nas palavras
    if (textoOriginal[i] === ' ') {
      textoCriptografado += ' '
    } else {
      textoCriptografado += alfabeto[posicaoNoAlfabeto]
    }

    // += incrementa no que já existe
  }
  document.getElementById('decodedText').value = textoCriptografado
}

//base 64
function toB64(text) {
  const code = document.querySelector('input[name="code"]:checked').value
  if (code === 'codificar') {
    document.getElementById('decodedText').value = btoa(text.value)
  } else if (code === 'decodificar') {
    document.getElementById('decodedText').value = atob(text.value)
  } else {
    alert('selecione codificar ou decodificar')
  }
}