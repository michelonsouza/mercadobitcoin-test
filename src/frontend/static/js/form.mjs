import {
  firstStep,
  legalStep,
  passwordStep,
  physicalStep,
  getReviewStep,
} from "./steps-config.mjs";
import { encryptStorage } from "./storage.mjs";
import { makeStep } from "./steps-functions.mjs";
import { toggleGoBackButton, setStepCount } from "./helpers-functions.mjs";

let formValues = {};
let currentStep = 1;

function makeStepFunctions(personType) {
  const selectedStep2 = personType === "physical" ? physicalStep : legalStep;
  return {
    "step-1": (values, changeHandler) =>
      makeStep({ step: firstStep, formValues: values, changeHandler }),
    "step-2": (values, changeHandler) =>
      makeStep({ step: selectedStep2, formValues: values, changeHandler }),
    "step-3": (values, changeHandler) =>
      makeStep({ step: passwordStep, formValues: values, changeHandler }),
    "step-4": (values, changeHandler) => {
      const reviewStep = getReviewStep(personType);
      makeStep({ step: reviewStep, formValues: values, changeHandler });
    },
  };
}

function handleSubmit(event) {
  event.preventDefault();
  currentStep += 1;
  encryptStorage.setItem("current-step", currentStep);

  const personType = encryptStorage.getItem("person-type") || "physical";

  if (currentStep <= 4) {
    const stepFunction = makeStepFunctions(personType)[`step-${currentStep}`];
    stepFunction(formValues, handleChange);
    toggleGoBackButton(currentStep);
    setStepCount(currentStep);
  }
}

function handleGoBack() {
  currentStep -= 1;
  const personType = encryptStorage.getItem("person-type") || "physical";

  if (currentStep >= 1) {
    encryptStorage.setItem("current-step", currentStep);
    const steps = makeStepFunctions(personType)[`step-${currentStep}`];
    steps(formValues, handleChange);
    toggleGoBackButton(currentStep);
    setStepCount(currentStep);
  }
}

function changeValue(name, value) {
  formValues[name] = value;
  encryptStorage.setItem("form-values", formValues);
}

function handleChange(event) {
  const { name, value } = event.target;

  if (name && value) {
    changeValue(name, value);

    if (name === "persontype") {
      encryptStorage.setItem("person-type", value);
    }
  }
}

export function initialilze() {
  formValues = encryptStorage.getItem("form-values") || {};
  const form = document.querySelector("#registration-form");
  const selectedStep = encryptStorage.getItem("current-step") || 1;
  const personType = encryptStorage.getItem("person-type") || "physical";
  const goBackButton = document.querySelector(
    ".navigate-container button.secondary"
  );
  currentStep = selectedStep;

  toggleGoBackButton(selectedStep);
  setStepCount(selectedStep);

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

  if (goBackButton) {
    goBackButton.addEventListener("click", handleGoBack);
  }

  const steps = makeStepFunctions(personType)[`step-${selectedStep}`];
  steps(formValues, handleChange);
}
