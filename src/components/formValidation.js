import { isEmpty } from "./helpers";

export default data => {
  let { fullName, title, extraInfo } = data;
  let errors = {};

  const stringRegex = /^[^%]{3,}$/g;

  fullName = !isEmpty(fullName) ? fullName : "";
  title = !isEmpty(title) ? title : "";
  extraInfo = !isEmpty(extraInfo) ? extraInfo : "";

  if (!fullName.match(stringRegex)) {
    errors.fullName = "Name should be more than 3 letters !";
  }

  if (!title.match(stringRegex)) {
    errors.title = "Title should be more than 3 letters !";
  }

  if (!extraInfo.match(stringRegex)) {
    errors.extraInfo = "Here should be more than 3 letters !";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
