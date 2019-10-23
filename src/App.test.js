import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this app.
 * @param {object} state = Initial state for setup.
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with given data-testid value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} attr  - Value of data-testid attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, attr) => {
  return wrapper.find(`[data-testid='${attr}']`);
};

test("renders without crashing", () => {
  // const wrapper = shallow(<App />);
  // console.log(wrapper.debug())
  const wrapper = setup();

  expect(wrapper).toBeTruthy();
  // const appComponent = wrapper.find("[data-testid='component-app']");
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const buttonComponent = findByTestAttr(wrapper, "increment-button");
  expect(buttonComponent.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments counter display", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  expect(wrapper.state("counter")).toBe(8);

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

test("clicking decrement button decrements counter display", () => {
  const counter = 4;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  expect(wrapper.state("counter")).toBe(counter - 1);

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);
});

test("clicking decrement button when counter = 0 does not decrements counter display and triggers error message", () => {
  const counter = 0;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  expect(wrapper.state("counter")).toBe(counter);

  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter);

  const errorMessage = findByTestAttr(wrapper, "error-message");
  expect(errorMessage.length).toBe(1);

  const incrementButton = findByTestAttr(wrapper, "increment-button");
  incrementButton.simulate('click');
  expect(wrapper.state("counter")).toBe(counter + 1);
  expect(findByTestAttr(wrapper, "counter-display").text()).toContain(counter + 1);
  expect(findByTestAttr(wrapper, "error-message").length).toBe(0);
});
