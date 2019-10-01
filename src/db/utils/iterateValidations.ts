interface Validator {
  (value: any): string | null;
}

export default (value: any, validators: Validator[]) => validators.map(validate => validate(value)).filter(Boolean);
