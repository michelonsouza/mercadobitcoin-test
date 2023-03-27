const [maxDate] = new Date().toJSON().split("T");

export const firstStep = {
  id: "step-1",
  title: "Seja bem vindo(a)",
  customContainer: "step-person-selection-container",
  inputs: [
    {
      id: "email",
      containerClass: "step-input-container",
      label: "Endereço de e-mail",
      attrs: {
        value: "",
        id: "email",
        required: "",
        name: "email",
        type: "email",
      },
    },
    {
      id: "physical-person",
      containerClass: "step-person-container",
      label: "Pessoa física",
      labelSecond: true,
      useCustomContainer: true,
      attrs: {
        value: "physical",
        id: "physical-person",
        required: "",
        name: "persontype",
        type: "radio",
      },
    },
    {
      id: "legal-person",
      containerClass: "step-person-container",
      label: "Pessoa jurídica",
      labelSecond: true,
      useCustomContainer: true,
      attrs: {
        value: "legal",
        id: "legal-person",
        required: "",
        name: "persontype",
        type: "radio",
      },
    },
  ],
};

export const physicalStep = {
  id: "step-physical",
  title: "Pessoa física",
  inputs: [
    {
      id: "name",
      containerClass: "step-input-container",
      label: "Nome",
      attrs: {
        value: "",
        id: "name",
        required: "",
        placeholder: "EX: Fulano de Tal",
        name: "name",
        type: "text",
      },
    },
    {
      id: "cpf",
      containerClass: "step-input-container",
      label: "CPF",
      attrs: {
        value: "",
        id: "cpf",
        required: "",
        placeholder: "EX: 999.999.999-99",
        name: "cpf",
        type: "text",
      },
    },
    {
      id: "birthdate",
      containerClass: "step-input-container",
      label: "Data de nascimento",
      attrs: {
        value: "",
        id: "birthdate",
        required: "",
        placeholder: "EX: 23/07/1984",
        name: "birthdate",
        type: "date",
        max: maxDate,
      },
    },
    {
      id: "phone",
      containerClass: "step-input-container",
      label: "Telefone",
      attrs: {
        value: "",
        id: "phone",
        required: "",
        placeholder: "EX: (11) 99999-9999",
        name: "phone",
        type: "tel",
      },
    },
  ],
};

export const legalStep = {
  id: "step-legal",
  title: "Pessoa jurídica",
  inputs: [
    {
      id: "corporatename",
      containerClass: "step-input-container",
      label: "Razão social",
      attrs: {
        value: "",
        id: "corporatename",
        required: "",
        placeholder: "EX: Mercado Bitcoin",
        name: "corporatename",
        type: "text",
      },
    },
    {
      id: "cnpj",
      containerClass: "step-input-container",
      label: "CNPJ",
      attrs: {
        value: "",
        id: "cnpj",
        required: "",
        placeholder: "EX: 99.999.999/0001-99",
        name: "cnpj",
        type: "text",
      },
    },
    {
      id: "opendate",
      containerClass: "step-input-container",
      label: "Data de abertura",
      attrs: {
        value: "",
        id: "opendate",
        required: "",
        placeholder: "EX: 01/01/2023",
        name: "opendate",
        type: "date",
        max: maxDate,
      },
    },
    {
      id: "phone",
      containerClass: "step-input-container",
      label: "Telefone",
      attrs: {
        value: "",
        id: "phone",
        required: "",
        placeholder: "EX: (11) 99999-9999",
        name: "phone",
        type: "tel",
      },
    },
  ],
};

export const passwordStep = {
  id: "step-password",
  title: "Senha de acesso",
  inputs: [
    {
      id: "password",
      containerClass: "step-input-container",
      label: "Sua senha",
      attrs: {
        value: "",
        autocomplete: "new-password",
        id: "password",
        required: "",
        name: "password",
        type: "password",
      },
    },
  ],
};

export function getReviewStep(personType) {
  const [emailInput] = firstStep.inputs;
  const inputs = {
    physical: physicalStep.inputs,
    legal: legalStep.inputs,
  };

  const selectedInputs = inputs[personType] || inputs.physical;

  return {
    id: "review-step",
    title: "Revise suas informações",
    inputs: [emailInput, ...selectedInputs],
  };
}
