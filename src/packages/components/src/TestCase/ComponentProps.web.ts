// Customizable Area Start
export const componentProps = (unitId: string, style: any) => {
  return {
    navigation: {
      getParam: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
    },
    id: unitId,
    classes: style,
    location: jest.fn(),
    history: jest.fn(),
    match: jest.fn(),
  };
};

export const paramComponentProps = (unitId: string, style: any, params: any) => {
  return {
    navigation: {
      navigate: Function.prototype,
      setParams: Function.prototype,
      dispatch: Function.prototype,
      getParam: (param: any, defaultValue: any) => {
        return params;
      },
    },
    id: unitId,
    classes: style,
  };
};
// Customizable Area End
