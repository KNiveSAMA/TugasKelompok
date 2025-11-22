// Data rute dan titik.
const dataRute = {
    1: ["Stasiun A", "Stasiun B", "Stasiun C", "Stasiun D"],
    2: ["Alfa", "Beta", "Charlie"],
    3: ["Barat", "Tengah", "Timur"]
};

const hargaPerSegmen = 5000;

const selectRute = document.getElementById("rute");
const selectNaik = document.getElementById("naik");
const selectTurun = document.getElementById("turun");
const inputHarga = document.getElementById("harga");
const inputKode = document.getElementById("kode");   // ← TAMBAHAN

// Ketika rute dipilih
selectRute.addEventListener("change", function() {
    const rute = selectRute.value;

    selectNaik.innerHTML = '<option value="">-- Pilih Titik Naik --</option>';
    selectTurun.innerHTML = '<option value="">-- Pilih Titik Turun --</option>';
    inputHarga.value = "";
    inputKode.value = "";  // reset kode pesanan

    if (rute === "") {
        selectNaik.disabled = true;
        selectTurun.disabled = true;
        return;
    }

    dataRute[rute].forEach((titik, index) => {
        selectNaik.innerHTML += `<option value="${index}">${titik}</option>`;
    });

    selectNaik.disabled = false;
    selectTurun.disabled = true;
});

// Ketika titik naik dipilih
selectNaik.addEventListener("change", function() {
    const rute = selectRute.value;
    const naikIndex = parseInt(selectNaik.value);

    selectTurun.innerHTML = '<option value="">-- Pilih Titik Turun --</option>';
    inputHarga.value = "";
    inputKode.value = "";  // reset kode pesanan

    if (selectNaik.value === "") {
        selectTurun.disabled = true;
        return;
    }

    dataRute[rute].forEach((titik, index) => {
        if (index !== naikIndex) {
            selectTurun.innerHTML += `<option value="${index}">${titik}</option>`;
        }
    });

    selectTurun.disabled = false;
});

// Ketika titik turun dipilih → hitung harga + tampilkan kode pesanan
selectTurun.addEventListener("change", function() {
    const naikIndex = parseInt(selectNaik.value);
    const turunIndex = parseInt(selectTurun.value);

    if (selectTurun.value === "") {
        inputHarga.value = "";
        inputKode.value = "";
        return;
    }

    // Hitung harga
    const jarak = Math.abs(turunIndex - naikIndex);
    const total = jarak * hargaPerSegmen;
    inputHarga.value = "Rp " + total.toLocaleString("id-ID");

    // Tampilkan kode pesanan
    inputKode.value = "0000000001";  // ← KODE FIXED SESUAI PERMINTAAN
});
