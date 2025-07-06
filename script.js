
document.getElementById("mna-sf").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  let scoreSF = 0;

  for (let i = 1; i <= 6; i++) {
    const valor = parseInt(document.querySelector(`[name="p${i}"]`).value, 10);
    if (!isNaN(valor)) scoreSF += valor;
  }

  const resultadoSF = document.getElementById("resultado-sf");
  resultadoSF.innerHTML = `
    <p><b>Paciente:</b> ${nome}</p>
    <p><b>Pontuação MNA-SF:</b> ${scoreSF} – ${interpretarScore(scoreSF)}</p>
  `;

  if (scoreSF <= 11) {
    document.getElementById("mna-completo").style.display = "block";
  } else {
    gerarPDF(nome, scoreSF, null);
  }
});

function interpretarScore(score) {
  if (score <= 7) return "Desnutrição.";
  if (score <= 11) return "Risco de desnutrição.";
  return "Estado nutricional normal.";
}

function finalizar() {
  const nome = document.getElementById("nome").value;

  let scoreSF = 0;
  for (let i = 1; i <= 6; i++) {
    scoreSF += parseInt(document.querySelector(`[name="p${i}"]`).value, 10);
  }

  let scoreCompleto = 0;
  for (let j = 1; j <= 2; j++) {
    scoreCompleto += parseInt(document.querySelector(`[name="c${j}"]`).value, 10);
  }

  const total = scoreSF + scoreCompleto;
  const resultadoFinal = document.getElementById("resultado-final");
  resultadoFinal.innerHTML = `
    <p><b>Paciente:</b> ${nome}</p>
    <p><b>Pontuação total:</b> ${total}</p>
    <p><b>Classificação:</b> ${interpretarScoreCompleto(total)}</p>
  `;

  gerarPDF(nome, scoreSF, scoreCompleto);
}

function interpretarScoreCompleto(score) {
  if (score < 17) return "Desnutrição";
  if (score < 24) return "Risco de desnutrição";
  return "Estado nutricional normal";
}

function gerarPDF(nome, scoreSF, scoreCompleto) {
  const total = scoreCompleto !== null ? scoreSF + scoreCompleto : scoreSF;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("Mini Avaliação Nutricional (MNA)", 20, 20);
  doc.text(`Paciente: ${nome}`, 20, 35);
  doc.text(`Pontuação total: ${total}`, 20, 45);
  doc.text(`Classificação: ${scoreCompleto !== null ? interpretarScoreCompleto(total) : interpretarScore(scoreSF)}`, 20, 55);

  doc.setFontSize(12);
  doc.text("Nutricionista Paula Guedes", 20, 80);

  doc.save(`MNA_${nome.replace(/\s/g, "_")}.pdf`);
}
