export const requiredValidator = (
  errorMessage: string = `wartość wymagana.`,
) => (value: string | number | boolean | null) => {
  if (typeof value === 'string') {
    return value.length === 0 ? errorMessage : null;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return null;
  }

  if (value === null) {
    return errorMessage;
  }

  return null;
};

export const lengthValidator = (
  min: number,
  max: number,
  errorMessage: string = `od ${min} do ${max} znaków.`,
) => (value: string) => {
  if (value.length < min || value.length > max) {
    return errorMessage;
  }

  return null;
};

export const progressValidator = (
  min: number,
  max: number,
  errorMessage: string = `wartość w przedziale od ${min} do ${max}.`,
) => (value: number) => {
  if (value < min || value > max) {
    return errorMessage;
  }

  return null;
};
