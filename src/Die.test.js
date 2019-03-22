import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Die from "./Die";

// smoke test
it("renders without crashing", function () {
    mount(<Die />);
});

// snapshot test - unlocked
it("matches snapshot", function () {
    let wrapper = mount(<Die
        val={3} />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

// snapshot test - locked
it("matches snapshot", function () {
    let wrapper = mount(<Die
        val={3}
        locked={true} />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});