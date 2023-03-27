export function toggleGoBackButton(step) {
  const goBackButton = document.querySelector(
    ".navigate-container button.secondary"
  );
  const showButton = step > 1;

  if (goBackButton) {
    const fn = showButton ? "remove" : "add";
    goBackButton.classList[fn]("hide");
  }
}

export function setStepCount(step) {
  const count = document.querySelector(".step-info > .step-count");

  if (count) {
    count.innerText = step;
  }
}
