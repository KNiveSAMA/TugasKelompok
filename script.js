const dataRute = {
    1: [ "Stasiun Penangkaran Pesut","Stasiun Argo Cianjur Jesgejes", "Stasiun Pantai Anyer", "Stasiun Lempuyangan"],
    2: ["Stasiun Indah Sulawesi timur", "Stasiun Lumba-Lumba Kudus", "Stasiun Ngawi Shibuya"],
    3: ["Stasiun Jetski Cimahi", "Stasiun Lele Mojo kerto", "Stasiun Pabrik Superstar Asli"]
};

const jadwalRute = {
    1: "07:00",
    2: "08:15",
    3: "09:30"
};

const hamburgerBtn = document.getElementById("hamburgerBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

hamburgerBtn.addEventListener("click", () => {
    sideMenu.style.right = "0px";
    overlay.style.display = "block";
    hamburgerBtn.classList.add("hide");
});

overlay.addEventListener("click", () => {
    sideMenu.style.right = "-260px";
    overlay.style.display = "none";
    hamburgerBtn.classList.remove("hide");
});

const hargaPerSegmen = 30000;

const selectRute = document.getElementById("rute");
const selectWaktu = document.getElementById("waktu");
const selectNaik = document.getElementById("naik");
const selectTurun = document.getElementById("turun");
const inputHarga = document.getElementById("harga");
const btnPesan = document.getElementById("btn-pesan");

selectRute.addEventListener("change", function() {
    const rute = selectRute.value;

    selectWaktu.innerHTML = '<option value="">-- Pilih Waktu --</option>';
    selectNaik.innerHTML = '<option value="">-- Pilih Titik Naik --</option>';
    selectTurun.innerHTML = '<option value="">-- Pilih Titik Turun --</option>';
    inputHarga.value = "";

    if (rute === "") {
        selectWaktu.disabled = true;
        selectNaik.disabled = true;
        selectTurun.disabled = true;
        return;
    }

    selectWaktu.innerHTML += `<option value="${jadwalRute[rute]}">${jadwalRute[rute]}</option>`;
    selectWaktu.disabled = false;

    dataRute[rute].forEach((titik, index) => {
        selectNaik.innerHTML += `<option value="${index}">${titik}</option>`;
    });

    selectNaik.disabled = false;
    selectTurun.disabled = true;
});

selectNaik.addEventListener("change", function() {
    const rute = selectRute.value;
    const naikIndex = parseInt(selectNaik.value);

    selectTurun.innerHTML = '<option value="">-- Pilih Titik Turun --</option>';
    inputHarga.value = "";

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

selectTurun.addEventListener("change", function() {
    const naikIndex = parseInt(selectNaik.value);
    const turunIndex = parseInt(selectTurun.value);

    if (selectTurun.value === "") {
        inputHarga.value = "";
        return;
    }

    const jarak = Math.abs(turunIndex - naikIndex);
    const total = jarak * hargaPerSegmen;
    inputHarga.value = "Rp " + total.toLocaleString("id-ID");
});

btnPesan.addEventListener("click", function() {
    const rute = selectRute.value;
    const waktu = selectWaktu.value;
    const naik = selectNaik.options[selectNaik.selectedIndex].text;
    const turun = selectTurun.options[selectTurun.selectedIndex].text;
    const harga = inputHarga.value;

    if (!rute || !waktu || !naik || !turun || !harga) {
        alert("Harap lengkapi semua pilihan sebelum memesan!");
        return;
    }

    const kodeUnik = "PSN" + Date.now() + Math.floor(Math.random() * 1000);

    const pesanan = {
        rute: `Rute ${rute}`,
        waktu: waktu,
        naik: naik,
        turun: turun,
        harga: harga,
        kode: kodeUnik
    };

    localStorage.setItem("pesanan", JSON.stringify(pesanan));
    window.location.href = "konfirmasi.html";
});
