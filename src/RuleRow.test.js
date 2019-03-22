import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import RuleRow from "./RuleRow";

// smoke test
it("renders without crashing", function () {
    mount(<RuleRow name="Ones" score={3}/>);
});

// snapshot test
it("matches snapshot", function () {
    let wrapper = mount(<RuleRow name="Ones" score={3}/>);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});
