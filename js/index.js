document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const minusBtn = document.getElementById('minus-dice');
    const plusBtn = document.getElementById('plus-dice');
    const currentNumberSpan = document.getElementById('current-dice-count');
    const dice1Buttons = document.querySelectorAll('.number-btn-dice1');
    const dice2Buttons = document.querySelectorAll('.number-btn-dice2');
    const dice3Buttons = document.querySelectorAll('.number-btn-dice3');
    const resultTable = document.querySelector('.result-table');
    const resultTable2 = document.querySelector('.result-table2');
    const containerElement = document.querySelector('.container');
    const balanceElement = document.querySelector('.balance');
    const amountWon = document.querySelector('.kshwon');
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const dice3 = document.getElementById('dice3');
    const amountInput = document.getElementById('amount');
    const resultElement = document.querySelector('.result');
    const inputError = document.querySelector('.inputerror');
    const diceSelectionErrors = document.querySelector('.diceselectionerrors');
    const numberSelectionError1 = document.querySelector('.numberselectionerror1');
    const numberSelectionError2 = document.querySelector('.numberselectionerror2');
    const numberSelectionError3 = document.querySelector('.numberselectionerror3');
    const placeBetButton = document.getElementById('placeBet');
    const dicePredictionSelection = document.querySelector('.dicepredictionselection');
    const userSelectionNumbers = document.querySelector('.userselectionnumbers');
    const diceSection1 = document.querySelector('.dice1selection');
    const diceSection2 = document.querySelector('.dice2selection');
    const diceSection3 = document.querySelector('.dice3selection');
    const matchesWonElement = document.querySelector('.matcheswon');

    // Initialize variables
    let balance = 5000;
    let selectedNumberDice1 = 1;
    let selectedNumberDice2 = 1;
    let selectedNumberDice3 = 1;
    let currentN = 1; // Start with 1 dice
    let selectedDice = currentN;
    let userSelection = [];
    // Hide dice elements initially
    const diceElements = [dice1, dice2, dice3];
    diceElements.forEach(dice => dice.style.display = 'none');
    dicePredictionSelection.style.display = 'none';
    diceSection1.style.display = 'none';
    diceSection2.style.display = 'none';
    diceSection3.style.display = 'none';

    // Function to update the display based on selected dice count
    function updateDiceDisplay() {
        diceSection1.style.display = currentN >= 1 ? 'block' : 'none';
        diceSection2.style.display = currentN >= 2 ? 'block' : 'none';
        diceSection3.style.display = currentN >= 3 ? 'block' : 'none';
        dicePredictionSelection.style.display = 'flex';
        diceElements.forEach((dice, index) => {
            dice.style.display = index < currentN ? 'none' : 'none';
        });

        // Update background color based on selected number of dice
        // switch (currentN) {
        //     case 1:
        //         containerElement.style.backgroundColor = '#E5FFFA';
        //         break;
        //     case 2:
        //         containerElement.style.backgroundColor = '#F0F4F4';
        //         break;
        //     case 3:
        //         containerElement.style.backgroundColor = '#F0F5F4';
        //         break;
        //     default:
        //         containerElement.style.backgroundColor = '';
        //         break;
        // }
    }

    // Event listeners for plus and minus buttons
    minusBtn.addEventListener('click', function () {
        if (currentN > 1) {
            currentN--;
            currentNumberSpan.textContent = `Roll ${currentN} Dice`;
            updateDiceDisplay();
        }
    });

    plusBtn.addEventListener('click', function () {
        if (currentN < 3) {
            currentN++;
            currentNumberSpan.textContent = `Roll ${currentN} Dice`;
            updateDiceDisplay();
        }
    });

    // Initial update for display
    currentNumberSpan.textContent = `Roll ${currentN} Dice`;
    updateDiceDisplay();

    // Buttons configuration for number selection
    const diceConfigs = [
        { minusId: "minus-dice1", plusId: "plus-dice1", currentId: "current-number-dice1", diceIndex: 0 },
        { minusId: "minus-dice2", plusId: "plus-dice2", currentId: "current-number-dice2", diceIndex: 1 },
        { minusId: "minus-dice3", plusId: "plus-dice3", currentId: "current-number-dice3", diceIndex: 2 }
    ];

    // Initialize the buttons for number selection
    diceConfigs.forEach(({ minusId, plusId, currentId, diceIndex }) => {
        const minusBtn = document.getElementById(minusId);
        const plusBtn = document.getElementById(plusId);
        const currentNumberSpan = document.getElementById(currentId);
        let currentNumber = parseInt(currentNumberSpan.textContent);

        minusBtn.addEventListener("click", function () {
            if (currentNumber > 1) {
                currentNumber--;
                currentNumberSpan.textContent = currentNumber;
                switch (diceIndex) {
                    case 0: selectedNumberDice1 = currentNumber; break;
                    case 1: selectedNumberDice2 = currentNumber; break;
                    case 2: selectedNumberDice3 = currentNumber; break;
                }
            }

        });

        plusBtn.addEventListener("click", function () {
            if (currentNumber < 6) {
                currentNumber++;
                currentNumberSpan.textContent = currentNumber;
                switch (diceIndex) {
                    case 0: selectedNumberDice1 = currentNumber; break;
                    case 1: selectedNumberDice2 = currentNumber; break;
                    case 2: selectedNumberDice3 = currentNumber; break;
                }
            }
        });

    });

    // Function to roll the dice
    function rollDice(diceElement) {
        diceElement.style.transition = 'transform 0s'; // Set transition to 0 seconds for immediate rotation
        const rotationSpeed = 3; // seconds
        const outcome = Math.floor(Math.random() * 6) + 1;
        const additionalRotationX = Math.floor(Math.random() * 4) * 360;
        const additionalRotationY = Math.floor(Math.random() * 4) * 360;
    
        // Set rotation based on dice outcome
        let rotateX, rotateY;
        switch (outcome) {
            case 1: rotateX = 0; rotateY = 0; break;
            case 2: rotateX = -90; rotateY = 0; break;
            case 3: rotateX = 0; rotateY = -90; break;
            case 4: rotateX = 0; rotateY = 90; break;
            case 5: rotateX = 90; rotateY = 0; break;
            case 6: rotateX = 0; rotateY = 180; break;
        }
    
        // Apply initial rotation for immediate effect
        diceElement.style.transform = `rotateX(${rotateX + additionalRotationX}deg) rotateY(${rotateY + additionalRotationY}deg)`;
    
        // Set timeout to transition to final position after a brief delay
        setTimeout(() => {
            diceElement.style.transition = `transform ${rotationSpeed}s`; // Reset transition to original value
            diceElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; // Set final rotation
        }, 100);
    
        dicePredictionSelection.style.display = 'none';
    
        return outcome;
    }
    

    placeBetButton.addEventListener('click', () => {
        const betAmount = parseFloat(amountInput.value);
       
        // Clear error messages
        diceSelectionErrors.textContent = '';
        numberSelectionError1.textContent = '';
        numberSelectionError2.textContent = '';
        numberSelectionError3.textContent = '';
        inputError.textContent = '';
        userSelectionNumbers.textContent = "";
        matchesWonElement.textContent = "";
        resultElement.textContent = "";
        diceElements.forEach((dice, index) => {
            dice.style.display = index < currentN ? 'block' : 'none';
        });
        // Validate user inputs
        if (!selectedDice) {
            diceSelectionErrors.textContent = `Please select the number of dice you want to roll.`;
            return;
        }
        if (!selectedNumberDice1) {
            numberSelectionError1.textContent = `Select between 1 and 6 for Dice 1`;
            return;
        }
        if (!selectedNumberDice2 && selectedDice >= 2) {
            numberSelectionError2.textContent = `Select between 1 and 6 for Dice 2`;
            return;
        }
        if (!selectedNumberDice3 && selectedDice >= 3) {
            numberSelectionError3.textContent = `Select between 1 and 6 for Dice 3`;
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

        // Deduct the bet amount from balance
        balance -= betAmount;
        balanceElement.textContent = `Balance: Ksh${balance}`;

        // Roll the dice and collect outcomes
        const outcomes = [];
        for (let i = 0; i < currentN; i++) {
            const outcome = rollDice(diceElements[i]); // Roll each selected dice
            outcomes.push(outcome);
        }

        // Evaluate bet result after dice roll
        setTimeout(() => {
            // Collect user selections and outcomes
            const selectedNumbers = [selectedNumberDice1, selectedNumberDice2, selectedNumberDice3].slice(0, currentN);

            // Check if predictions match the outcomes exactly
            let exactMatches = 0;
            for (let i = 0; i < currentN; i++) {
                if (selectedNumbers[i] === outcomes[i]) {
                    exactMatches++;
                }
            }

            // Determine payout based on exact matches
            let payoutMultiplier = 0;
            if (exactMatches === 1) {
                payoutMultiplier = 2; // 1 exact match
                matchesWon = 1;
                resultTable2.style.display = 'block';
            } else if (exactMatches === 2) {
                payoutMultiplier = 3; // 2 exact matches
                matchesWon = 2;
                resultTable2.style.display = 'block';
            } else if (exactMatches === 3) {
                payoutMultiplier = 5; // 3 exact matches
                matchesWon = 3;
                resultTable2.style.display = 'block';
            }

            if (payoutMultiplier > 0) {
                balance += betAmount * payoutMultiplier;
                resultElement.textContent = `${outcomes.join(', ')}`;
            } else {
                resultElement.textContent = `${outcomes.join(', ')}`;
            }

            balanceElement.textContent = `Balance: Ksh${balance}`;
            amountInput.value = '';

            dice1Buttons.forEach(btn => btn.classList.remove('selected'));
            dice2Buttons.forEach(btn => btn.classList.remove('selected'));
            dice3Buttons.forEach(btn => btn.classList.remove('selected'));
           
            amountWon.textContent = `KSH ${betAmount * payoutMultiplier}`;
            userSelectionNumbers.textContent = `${selectedNumbers.join(', ')}`;
            matchesWonElement.textContent += `${matchesWon}`;
            
            dicePredictionSelection.style.display = 'none';
            resultTable.style.display = 'flex';
            userSelection.style.color = 'white';
            // Reset selected numbers, matches won and dice
            selectedNumberDice1 = null;
            selectedNumberDice2 = null;
            selectedNumberDice3 = null;
            selectedDice = null;
            matchesWon = 0;
            
        }, 3000);
    });
});
