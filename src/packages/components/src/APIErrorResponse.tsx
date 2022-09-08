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
