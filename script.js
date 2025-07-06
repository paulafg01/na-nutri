
document.getElementById('mna-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let score = 0;
    const form = event.target;
    for (let i = 1; i <= 6; i++) {
        score += parseInt(form['p' + i].value);
    }

    const resultado = document.getElementById('resultado');
    let mensagem = 'Pontuação total: ' + score + ' - ';
    if (score >= 12) {
        mensagem += 'Estado nutricional normal.';
    } else if (score >= 8) {
        mensagem += 'Risco de desnutrição.';
    } else {
        mensagem += 'Desnutrição.';
    }

    resultado.textContent = mensagem;
});
