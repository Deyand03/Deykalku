const $ = (selector) => {
    return document.getElementById(selector);
};
const buttons = document.querySelectorAll('button');
let angka1 = 0; //penyimpan angka sementara untuk dipindahkan ke displayholder
let angka2 = 0; //penyimpan angka sementara untuk dipindahkan ke displayholder

let tambah = $('tambah');
let kurang = $('kurang');
let kali = $('kali');
let bagi = $('bagi');
let akar = $('akar');

let displayholder = $('placeHasil');
let display = $('displayHasil');
let hapusSemua = $('deleteAll');
let hapus = $('delete');

let satu = $('1');
let dua = $('2');
let tiga = $('3');
let empat = $('4');
let lima = $('5');
let enam = $('6');
let tujuh = $('7');
let delapan = $('8');
let sembilan = $('9');
let nol = $('0');
let doubleNol = $('00');

let koma = $('koma');
let hasil = $('hasil');

async function kalkulator() {
    hapusSemua.addEventListener('click', (e) => {
        display.value = null;
        displayholder.value = null;
    });
    hapus.addEventListener('click', (e) => {
        let currentValue = display.value;
        display.value = currentValue.slice(0, -1);
    });
    koma.addEventListener('click', (e) => {
        display.value += '.';
    });
    doubleNol.addEventListener('click', (e) => {
        display.value += '00';
    });
    nol.addEventListener('click', (e) => {
        display.value += 0;
    });
    satu.addEventListener('click', (e) => {
        display.value += 1;
    });
    dua.addEventListener('click', (e) => {
        display.value += 2;
    });
    tiga.addEventListener('click', (e) => {
        display.value += 3;
    });
    empat.addEventListener('click', (e) => {
        display.value += 4;
    });
    lima.addEventListener('click', (e) => {
        display.value += 5;
    });
    enam.addEventListener('click', (e) => {
        display.value += 6;
    });
    tujuh.addEventListener('click', (e) => {
        display.value += 7;
    });
    delapan.addEventListener('click', (e) => {
        display.value += 8;
    });
    sembilan.addEventListener('click', (e) => {
        display.value += 9;
    });
    tambah.addEventListener('click', (e) => {
        angka1 = display.value + " +";
        display.value = null;
        console.log(angka1);
        displayholder.value = angka1;
    });
    kurang.addEventListener('click', (e) => {
        angka1 = display.value + " -";
        display.value = null;
        displayholder.value = angka1;
    });
    kali.addEventListener('click', (e) => {
        angka1 = display.value + " ✕";
        display.value = null;
        displayholder.value = angka1;
    });
    bagi.addEventListener('click', (e) => {
        angka1 = display.value + " ÷";
        display.value = null;
        displayholder.value = angka1;
    });
    akar.addEventListener('click', (e) => {
        display.value = '√';
        angka1 = display.value;
    })
    hasil.addEventListener('click', async (e) => {
        try {
            if (angka1.includes(' +')) { //apakah variable angka 1 mengandung operator +, jika iya eksekusi kode
                angka1 = angka1.replace(' +', ''); //mengganti tanda + menjadi string kosong agar bisa di parse menjadi float
                angka1 = parseFloat(angka1);
                // saat operator + diklik display value akan menjadi null, dan selanjutnya akan mengisi variable angka2
                angka2 = display.value;
                angka2 = parseFloat(angka2);
                display.value = null;
                displayholder.value = angka1 + angka2;
                return displayholder.value;
            } else if(angka1.includes(' -')){
                angka1 = angka1.replace(' -', ''); //mengganti tanda - menjadi string kosong agar bisa di parse menjadi float
                angka1 = parseFloat(angka1);
                // saat operator - diklik display value akan menjadi null, dan selanjutnya akan mengisi variable angka2
                angka2 = display.value;
                angka2 = parseFloat(angka2);
                display.value = null;
                displayholder.value = angka1 - angka2;
                return displayholder.value;
            } else if(angka1.includes(' ✕')){
                angka1 = angka1.replace(' ✕', ''); //mengganti tanda ✕ menjadi string kosong agar bisa di parse menjadi float
                angka1 = parseFloat(angka1);
                // saat operator ✕ diklik display value akan menjadi null, dan selanjutnya akan mengisi variable angka2
                angka2 = display.value;
                angka2 = parseFloat(angka2);
                display.value = null;
                displayholder.value = angka1 * angka2;
                return displayholder.value;
            } else if(angka1.includes(' ÷')){
                angka1 = angka1.replace(' ÷', ''); //mengganti tanda ÷ menjadi string kosong agar bisa di parse menjadi float
                angka1 = parseFloat(angka1);
                // saat operator ÷ diklik display value akan menjadi null, dan selanjutnya akan mengisi variable angka2
                angka2 = display.value;
                angka2 = parseFloat(angka2);
                display.value = null;
                displayholder.value = angka1 / angka2;
                return displayholder.value;
            }else if(angka1.includes('√')){
                angka1 = display.value;
                console.log(angka1);
                angka1 = angka1.replace('√', '');
                angka1 = parseFloat(angka1);
                display.value = null;
                angka1 = Math.sqrt(angka1);
                displayholder.value = angka1;
            };
        } catch (error) {
            Swal.fire({
                title: "Kesalahan!",
                text: "Angka Atau Operator Tidak Diinput!",
                icon: "warning",
                color: 'white',
                background: 'black'
            });
        };
    });

    //Fungsi untuk keyboard belum tersedia
    display.addEventListener('keyup', (e) => {
        console.log(e.key);
        if (e.key == '+') {
            angka1 = display.value;
            console.log(display.value);
        };
    });
};

kalkulator();