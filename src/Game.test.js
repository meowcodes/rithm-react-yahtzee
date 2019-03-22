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

// snapshot test
it("matches snapshot", function () {
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

it("toggles lock when die is clicked", function () {
    let rollBtn = wrapper.find(".Game-reroll").first();
    rollBtn.simulate("click");

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
});

it("scores correctly", function() {
    wrapper.setState({ 
        dice: [1,1,1,2,3]
    });

    let scoreRow = wrapper.find(".RuleRow-name").first();
    scoreRow.simulate("click");

    expect(wrapper.state().scores.ones).toEqual(3);
});

it("does not allow re-scoring", function() {
    wrapper.setState({ 
        dice: [1,1,1,2,3],
        scores: { ones: 1 } 
    });

    let scoreRow = wrapper.find(".RuleRow-name").first();
    scoreRow.simulate("click");

    expect(wrapper.state().scores.ones).toEqual(1);
});

// test that box can't be clicked before initial roll
it("does not allow box click before initial roll", function() {
    let die = wrapper.find(".Die").first();
    die.simulate("click");

    expect(die.html()).not.toContain("Die-locked");
});

// test that list can't be clicked before initial roll
it("does not allow list click before initial roll", function() {
    let scoreRow = wrapper.find(".RuleRow-name").first();
    scoreRow.simulate("click");

    expect(wrapper.state().scores.ones).toEqual(undefined);
});