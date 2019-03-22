import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Dice from "./Dice";

// smoke test
it("renders without crashing", function () {
    mount(<Dice dice={[1,2,3,4,5]} locked={[true, false, false, false, false]} />);
});

it("matches snapshot", function () {
    let wrapper = mount(<Dice dice={[1,2,3,4,5]} locked={[true, false, false, false, false]} />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

