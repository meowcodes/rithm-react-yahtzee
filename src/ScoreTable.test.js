import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import ScoreTable from "./ScoreTable";

// smoke test
it("renders without crashing", function () {
    mount(<ScoreTable scores={{ones: undefined}} />);
});

// snapshot test
it("matches snapshot", function () {
    let wrapper = mount(<ScoreTable scores={{ones: undefined}} />);
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});
