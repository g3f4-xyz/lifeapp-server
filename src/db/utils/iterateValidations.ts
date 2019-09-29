interface IValidator {
  (value: any): string | null;
}

export default (value: any, validators: IValidator[]) => validators.map(validate => validate(value)).filter(Boolean);
