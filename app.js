// ============================
// MODALNI YOPISH
// ============================
function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.style.display = "none";
  }
}


// ============================
// TELEFON MASKASI
// ============================
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");
  if (!phoneInput) return;

  phoneInput.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");

    if (!value.startsWith("998")) value = "998" + value;
    value = value.substring(0, 12);

    let formatted = "+998 ";
    if (value.length > 3) formatted += value.substring(3, 5);
    if (value.length > 5) formatted += " " + value.substring(5, 8);
    if (value.length > 8) formatted += " " + value.substring(8, 10);
    if (value.length > 10) formatted += " " + value.substring(10, 12);

    this.value = formatted.trim();
  });
});


// ============================
// TELEGRAMGA YUBORISH (BACKEND ORQALI)
// ============================
function sendToTelegram() {
  const phoneInput = document.getElementById("phone");
  const msgBox = document.getElementById("msg");

  if (!phoneInput || !msgBox) return;

  let number = phoneInput.value;
  let clearNumber = number.replace(/\D/g, "");

  if (clearNumber.length !== 12) {
    alert("Iltimos, to‘liq telefon raqamini kiriting!");
    return;
  }

  msgBox.innerHTML = "⏳ Yuborilmoqda...";

  fetch("https://SIZNING-LOYIHA.vercel.app/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      phone: clearNumber
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Server xatosi");
    return res.json();
  })
  .then(() => {
    msgBox.innerHTML = "✅ Arizangiz yuborildi!";
    phoneInput.value = "";
  })
  .catch(() => {
    msgBox.innerHTML = "❌ Xatolik yuz berdi! Qaytadan urinib ko‘ring.";
  });
}