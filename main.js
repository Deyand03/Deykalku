const $ = (selector) => document.getElementById(selector);

// Konfigurasi Kalkulator
const calculator = {
    display: $('displayHasil'),
    displayHolder: $('placeHasil'),
    currentExpression: [],
    operators: ['+', '-', '✕', '÷', '√'],
    rootMode: false
};

// Fungsi Utama Kalkulator
function initCalculator() {
    // Tambahkan event listener untuk angka
    const numberButtons = ['0', '00', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'koma'];
    numberButtons.forEach(btn => {
        $(btn).addEventListener('click', () => {
            const value = btn === 'koma' ? '.' : btn;
            if (calculator.rootMode && calculator.display.value === '√') {
                calculator.display.value += value;
                calculator.rootMode = false;
            } else {
                addToDisplay(value);
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
    // Jika display kosong atau berisi "0", ganti dengan nilai baru
    if (calculator.display.value === '0' && value !== '.') {
        calculator.display.value = value;
    } else {
        calculator.display.value += value;
    }
}

// Fungsi Tambah Operator
function addOperator(operator) {
    calculator.rootMode = false;

    // Jika display kosong, batalkan
    if (!calculator.display.value.trim()) return;

    // Tambahkan angka terakhir dan operator ke ekspresi
    calculator.currentExpression.push(calculator.display.value);
    calculator.currentExpression.push(operator);

    // Update display holder
    calculator.displayHolder.value = calculator.currentExpression.join(' ');

    // Bersihkan display untuk angka berikutnya
    calculator.display.value = '';
}

// Fungsi Evaluasi Ekspresi
function evaluateExpression(expression) {
    const precedence = { '√': 3, '✕': 2, '÷': 2, '+': 1, '-': 1 };
    const values = [];
    const operators = [];

    for (let token of expression) {
        // Jika token adalah angka, masukkan ke stack nilai
        if (!isNaN(token)) {
            values.push(parseFloat(token));
        } 
        // Jika token adalah akar
        else if (token.startsWith('√')) {
            const numValue = parseFloat(token.slice(1)); // Ambil angka setelah √
            if (isNaN(numValue) || numValue < 0) {
                throw new Error('Akar bilangan negatif tidak valid');
            }
            values.push(Math.sqrt(numValue));
        } 
        // Jika token adalah operator
        else if (calculator.operators.includes(token)) {
            while (
                operators.length > 0 &&
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                const right = values.pop();
                const left = values.pop();
                const op = operators.pop();
                values.push(performOperation(left, op, right));
            }
            operators.push(token);
        }
    }

    // Proses sisa operator
    while (operators.length > 0) {
        const right = values.pop();
        const left = values.pop();
        const op = operators.pop();
        values.push(performOperation(left, op, right));
    }

    return values[0];
}

// Fungsi Tambah Operator
function addOperator(operator) {
    calculator.rootMode = false;

    if (calculator.display.value.trim()) {
        // Jika operator adalah akar, tambahkan simbol √ di depan angka
        if (operator === '√' && !calculator.display.value.includes('√')) {
            calculator.currentExpression.push(`√${calculator.display.value}`);
        } else {
            calculator.currentExpression.push(calculator.display.value);
            calculator.currentExpression.push(operator);
        }
    }

    calculator.displayHolder.value = calculator.currentExpression.join(' ');
    calculator.display.value = '';
}

// Fungsi Akar
$('akar').addEventListener('click', () => {
    // Jika display kosong, langsung masukkan simbol akar
    if (!calculator.display.value.trim()) {
        calculator.display.value = '√';
    } else {
        // Jika sudah ada angka, tambahkan akar
        calculator.display.value = `√${calculator.display.value}`;
    }
    calculator.rootMode = true;
});

// Fungsi untuk Melakukan Operasi
function performOperation(left, operator, right) {
    switch (operator) {
        case '+': return left + right;
        case '-': return left - right;
        case '✕': return left * right;
        case '÷': 
            if (right === 0) throw new Error('Pembagian dengan nol');
            return left / right;
        default: throw new Error('Operator tidak valid');
    }
}

// Fungsi Hitung Hasil
function calculateResult() {
    try {
        calculator.rootMode = false;

        // Tambahkan angka terakhir ke ekspresi jika belum ada
        if (calculator.display.value.trim()) {
            calculator.currentExpression.push(calculator.display.value);
        }

        const result = evaluateExpression(calculator.currentExpression);
        calculator.display.value = result.toString();
        calculator.displayHolder.value = calculator.currentExpression.join(' ') + ' =';

        calculator.currentExpression = [];
    } catch (error) {
        calculator.display.value = 'Error';
        calculator.displayHolder.value = error.message || 'Invalid Calculation';
    }
}

// Fungsi Hapus Karakter Terakhir
function deleteLastCharacter() {
    if (calculator.display.value === '√') {
        calculator.rootMode = false;
        calculator.display.value = '';
    } else {
        calculator.display.value = calculator.display.value.slice(0, -1);
    }
}

// Fungsi Hapus Semua
function clearAll() {
    calculator.display.value = '';
    calculator.displayHolder.value = '';
    calculator.currentExpression = [];
    calculator.rootMode = false;
}

// Inisialisasi Kalkulator
initCalculator();
