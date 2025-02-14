// Pastikan musik diputar saat halaman dimuat atau setelah interaksi pertama
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');

  // Coba putar otomatis saat halaman dimuat
  const playAudio = () => {
      audio.play().catch(() => {
          console.log("Autoplay gagal, menunggu interaksi pengguna.");
      });
  };

  playAudio(); // Coba putar otomatis

  // Jika autoplay diblokir, mulai musik setelah klik pertama
  document.addEventListener('click', playAudio, { once: true });
});

// Variabel untuk menyimpan posisi awal elemen
let highestZ = 1;
const draggables = [];

// Fungsi untuk membuat elemen dapat di-drag
class Draggable {
  constructor(element) {
      this.element = element;
      this.holding = false;
      this.startX = 0;
      this.startY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.currentX = 0;
      this.currentY = 0;

      // Simpan posisi awal
      this.initialX = element.offsetLeft;
      this.initialY = element.offsetTop;

      this.init();
  }

  init() {
      this.element.addEventListener('mousedown', (e) => this.onMouseDown(e));
      document.addEventListener('mousemove', (e) => this.onMouseMove(e));
      document.addEventListener('mouseup', () => this.onMouseUp());
  }

  onMouseDown(e) {
      this.holding = true;
      this.startX = e.clientX - this.offsetX;
      this.startY = e.clientY - this.offsetY;
      this.element.style.zIndex = highestZ++;
  }

  onMouseMove(e) {
      if (!this.holding) return;
      this.offsetX = e.clientX - this.startX;
      this.offsetY = e.clientY - this.startY;
      this.updatePosition();
  }

  onMouseUp() {
      this.holding = false;
  }

  updatePosition() {
      this.element.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
  }

  resetPosition() {
      this.offsetX = 0;
      this.offsetY = 0;
      this.updatePosition();
  }
}

// Ambil semua paper dan RedRose, lalu buat bisa di-drag
document.querySelectorAll('.paper, .RedRose').forEach(element => {
  const draggable = new Draggable(element);
  draggables.push(draggable);
});

// Fungsi Reset untuk mengembalikan posisi awal tanpa mengganggu musik
document.getElementById('reset-button').addEventListener('click', () => {
  draggables.forEach(draggable => draggable.resetPosition());
});
