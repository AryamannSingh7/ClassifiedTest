import toast from "react-hot-toast";

export const ApiCatchErrorResponse = (errorResponse: any) => {
  if (errorResponse) {
    toast.error(JSON.stringify(errorResponse).replace(new RegExp('"', "g"), ""));
  }
};

export const ApiErrorResponse = (responseJson: any) => {
  if (!responseJson || !responseJson.errors) {
    return;
  }
  const errors: any[] = responseJson.errors;

  if (errors.length !== 0 && errors[0].token) {
    toast.error(errors[0].token);
    localStorage.clear();
    window.location.href = "/";
  }

  let allErrors = "";
  errors.map((object: string) => {
    const newLocal = JSON.stringify(object);
    JSON.parse(newLocal, (key, value) => {
      if (value.length > 0) {
        if (allErrors.length <= 0) {
          allErrors = value;
        } else {
          allErrors = `${allErrors}{\n}${value}`;
        }
      }
    });
  });

  toast.error(allErrors);
};
