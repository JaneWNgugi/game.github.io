document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.querySelector('.balance');
    const numberButtons = document.querySelectorAll('.number-btn');
    const amountInput = document.getElementById('amount');
    const resultElement = document.querySelector('.result');
    const placeBetButton = document.getElementById('placeBet');
    const diceImage = document.getElementById('dice');
    const inputError = document.querySelector('.inputerror');
    const numberSelectionError = document.querySelector('.numberselectionerror');
    let balance = 5000;
    let selectedNumber = null;

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            numberButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedNumber = parseInt(button.getAttribute('data-number'));
        });
    });

    placeBetButton.addEventListener('click', () => {
        const betAmount = parseFloat(amountInput.value);

        if (!selectedNumber) {
            numberSelectionError.textContent = `Please select a number between 1 and 6.`;
            return;
        }

        if (isNaN(betAmount) || betAmount <= 0) {
            inputError.textContent = `Please enter a valid bet amount.`;
            return;
        }

        if (betAmount > balance) {
            inputError.textContent = `Insufficient balance!`;
            return;
        }

        // Animate the dice roll
        diceImage.classList.add('roll');
        setTimeout(() => {
            const outcome = Math.floor(Math.random() * 6) + 1;
            diceImage.src = `./assets/img/dice.png`;
            diceImage.classList.remove('roll');

            if (outcome === selectedNumber) {
                balance += betAmount * 5; // 5:1 payout for correct guess
                resultElement.textContent = `You won! The dice showed ${outcome}.`;
            } else {
                balance -= betAmount;
                resultElement.textContent = `You lost! The dice showed ${outcome}.`;
            }

            balanceElement.textContent = `Balance: $${balance}`;
            amountInput.value = '';
            numberButtons.forEach(btn => btn.classList.remove('selected'));
            selectedNumber = null;
        }, 1000); // Duration of the roll animation
    });
});
