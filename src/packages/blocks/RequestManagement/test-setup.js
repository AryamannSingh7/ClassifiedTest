// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("@material-ui/core/styles", () => ({
  ...jest.requireActual("@material-ui/core/styles"),
  makeStyles: jest.fn().mockReturnValue(jest.fn()),
  withStyles: (styles) => (component) => component,
}));

jest.mock("react-i18next", () => ({
  withTranslation: () => (Component) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));
