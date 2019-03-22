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
    console.log(wrapper.html())
    let serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

// doScore passed in that runs when clicked - mock
it("runs correct doScore on click", function(){
    const scoreFn = jest.fn();
    let wrapper = mount(<RuleRow name="Ones" score={3} doScore={ scoreFn }/>);
    let ruleBtn = wrapper.find(".RuleRow").first();

    ruleBtn.simulate("click");
    expect(scoreFn).toHaveBeenCalled();
    expect(wrapper.matchesElement(<tr class="RuleRow RuleRow-active"><td class="RuleRow-name">Ones</td><td class="RuleRow-score">3</td></tr>));
});