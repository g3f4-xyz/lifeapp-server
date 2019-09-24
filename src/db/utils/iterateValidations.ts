export default (value: any, validators: any) => {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < validators.length; i++) {
    const error = validators[i](value);

    if (error) {
      return error;
    }
  }

  return null;
};
