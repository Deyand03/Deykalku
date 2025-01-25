const $ = (selector) => document.getElementById(selector);

const calculator = {
    display: $('displayHasil'),
    displayHolder: $('placeHasil'),
    currentExpression: [],
    operators: ['+', '-', '✕', '÷', '√'],
    rootMode: false
};

function initCalculator() {
    const numberButtons = ['0', '00', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'koma'];
    numberButtons.forEach(btn => {
        $(btn).addEventListener('click', () => {
            // Khusus mode akar, tambahkan angka setelah tanda akar
            if (calculator.rootMode && calculator.display.value === '√') {
                calculator.display.value += (btn === 'koma' ? '.' : btn);
                calculator.rootMode = false;
            } else {
                addToDisplay(btn === 'koma' ? '.' : btn);
            }
        });
    });

    // Tambahkan event listener untuk operator
    const operatorButtons = [
        { id: 'tambah', symbol: '+' },
        { id: 'kurang', symbol: '-' },
        { id: 'kali', symbol: '✕' },
        { id: 'bagi', symbol: '÷' }
    ];
    operatorButtons.forEach(op => {
        $(op.id).addEventListener('click', () => addOperator(op.symbol));
    });

    // Event listener untuk akar
    $('akar').addEventListener('click', () => {
        // Mode akar khusus
        calculator.rootMode = true;
        calculator.display.value = '√';
    });

    // Event listener untuk tombol hasil
    $('hasil').addEventListener('click', calculateResult);

    // Event listener untuk tombol hapus
    $('delete').addEventListener('click', deleteLastCharacter);
    $('deleteAll').addEventListener('click', clearAll);
}

// Fungsi Tambah ke Display
function addToDisplay(value) {
    // Mencegah multiple decimal points
    if (value === '.' && calculator.display.value.includes('.')) return;
    
    calculator.display.value += value;
}

// Fungsi Tambah Operator
function addOperator(operator) {
    // Reset mode akar jika sedang aktif
    calculator.rootMode = false;

    // Jika display kosong, batalkan
    if (!calculator.display.value.trim()) return;

    // Tambahkan angka dan operator ke ekspresi
    calculator.currentExpression.push(calculator.display.value);
    calculator.currentExpression.push(operator);

    // Update display holder
    calculator.displayHolder.value = calculator.currentExpression.join(' ');

    // Bersihkan display
    calculator.display.value = '';
}

// Fungsi Evaluasi Ekspresi
function evaluateExpression(expression) {
    // Fungsi untuk menghitung akar
    function calculateRoot(value) {
        const numValue = parseFloat(value.replace('√', ''));
        if (numValue < 0) throw new Error('Akar dari bilangan negatif tidak valid');
        return Math.sqrt(numValue);
    }

    // Fungsi untuk menghitung operasi
    function calculateOperation(left, operator, right) {
        const leftNum = parseFloat(left);
        const rightNum = parseFloat(right);

        switch (operator) {
            case '+': return leftNum + rightNum;
            case '-': return leftNum - rightNum;
            case '✕': return leftNum * rightNum;
            case '÷': 
                if (rightNum === 0) throw new Error('Pembagian dengan nol');
                return leftNum / rightNum;
        }
    }

    // Proses ekspresi
    let result = null;
    let currentOperator = null;

    for (let i = 0; i < expression.length; i++) {
        const token = expression[i];

        // Jika token mengandung akar
        if (token.includes('√')) {
            const rootValue = calculateRoot(token);
            
            // Jika sudah ada operasi sebelumnya
            if (result !== null && currentOperator) {
                result = calculateOperation(result, currentOperator, rootValue);
                currentOperator = null;
            } else {
                result = rootValue;
            }
        } 
        // Jika token adalah operator
        else if (calculator.operators.includes(token)) {
            currentOperator = token;
        } 
        else {
            // Jika sudah ada operasi sebelumnya
            if (result !== null && currentOperator) {
                result = calculateOperation(result, currentOperator, token);
                currentOperator = null;
            } else if (result === null) {
                result = parseFloat(token);
            }
        }
    }

    return result;
}

function calculateResult() {
    try {
        calculator.rootMode = false;

        if (calculator.display.value.trim()) {
            // Khusus untuk mode akar
            if (calculator.display.value.startsWith('√')) {
                calculator.currentExpression.push(calculator.display.value);
            } else {
                calculator.currentExpression.push(calculator.display.value);
            }
        }
        let result = evaluateExpression(calculator.currentExpression);

        calculator.display.value = result.toString().replace(/\.?0+$/, '');
        calculator.displayHolder.value = calculator.currentExpression.join(' ') + ' =';
        calculator.currentExpression = [];
    } catch (error) {
        calculator.display.value = 'Error';
        calculator.displayHolder.value = error.message || 'Invalid Calculation';
    }
}

function deleteLastCharacter() {
    if (calculator.display.value === '√') {
        calculator.rootMode = false;
        calculator.display.value = '';
    } else {
        calculator.display.value = calculator.display.value.slice(0, -1);
    }
}

function clearAll() {
    calculator.display.value = '';
    calculator.displayHolder.value = '';
    calculator.currentExpression = [];
    calculator.rootMode = false;
}

initCalculator();
