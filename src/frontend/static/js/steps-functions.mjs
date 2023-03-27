export function makeGenericInputs(stepInputs, formValues, changeHandler) {
  return stepInputs.map((stepInput) => {
    const stepInputContainer = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");

    stepInputContainer.classList.add(stepInput.containerClass);

    if (stepInput.attrs) {
      const attributes = Object.entries(stepInput.attrs);

      attributes.forEach(([key, value]) => {
        input.setAttribute(key, value);
      });
    }

    input.addEventListener("change", stepInput.onChange || changeHandler, {
      passive: true,
    });

    const isRadioInput = stepInput?.attrs?.type === "radio";

    if (isRadioInput) {
      const hasDefaultValue =
        formValues[stepInput?.attrs?.name] === stepInput?.attrs?.value;

      if (hasDefaultValue) {
        input.setAttribute("checked", "");
      }
    } else if (!!formValues[stepInput?.attrs?.name]) {
      input.setAttribute("value", formValues[stepInput?.attrs?.name]);
    }

    label.innerText = stepInput.label;
    label.setAttribute("for", stepInput.id);

    if (stepInput.labelSecond) {
      stepInputContainer.appendChild(input);
      stepInputContainer.appendChild(label);
    } else {
      stepInputContainer.appendChild(label);
      stepInputContainer.appendChild(input);
    }
    return stepInputContainer;
  });
}

export function makeStep({ step, formValues, changeHandler }) {
  const stepsContainer = document.querySelector(".steps-container");
  const customContainer = document.createElement("div");
  const title = document.querySelector(".step-info-container > .step-title");

  if (title) {
    title.innerText = step.title;
  }

  if (step.customContainer) {
    customContainer.classList.add(step.customContainer);
  }

  const customInputs = step.inputs.filter((step) => !!step?.useCustomContainer);
  const normalInputs = step.inputs.filter((step) => !step?.useCustomContainer);

  if (stepsContainer) {
    stepsContainer.innerHTML = "";
    const stepContainer = document.createElement("div");
    stepContainer.classList.add("step");
    stepContainer.setAttribute("id", step.id);

    const inputs = makeGenericInputs(normalInputs, formValues, changeHandler);

    inputs.forEach((input) => {
      input.addEventListener("change", changeHandler, { passive: true });
      stepContainer.appendChild(input);
    });

    if (step.customContainer && !!customInputs.length) {
      const otherInputs = makeGenericInputs(customInputs, formValues);
      otherInputs.forEach((input) => {
        input.addEventListener("change", changeHandler, { passive: true });
        customContainer.appendChild(input);
      });

      stepContainer.appendChild(customContainer);
    }
    stepsContainer.append(stepContainer);
  }
}
