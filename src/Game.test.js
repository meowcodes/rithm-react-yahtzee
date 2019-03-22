import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Game from "./Game";

// smoke test
it("renders without crashing", function () {
    mount(<Game />);
});

let wrapper;

beforeEach(function(){
    wrapper = mount(<Game />);
})

it("toggles lock when die is clicked", function () {
    let die = wrapper.find(".Die").first();
    die.simulate("click");
    expect(die.html()).toContain("Die-locked");
});

it("does not roll dice when out of rolls", function() {
    wrapper.setState({ rollsLeft: 1 });
    let btn = wrapper.find(".Game-reroll").first();
    btn.simulate("click");
    let die = wrapper.find(".Die").first();
    die.simulate("click");
    expect(wrapper.state().locked).toEqual([true, true, true, true, true]);
    expect(die.html()).toContain("Die-locked");
})