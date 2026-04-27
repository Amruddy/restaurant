const bookingForm = document.querySelector(".booking-form");
const formStatus = document.querySelector(".form-status");

if (bookingForm && formStatus) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Заявка принята. Здесь можно подключить реальную отправку формы.";
    bookingForm.reset();
  });
}
