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
  };
};
  // Customizable Area End