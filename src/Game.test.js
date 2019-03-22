import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Game from "./Game";

// smoke test
it("renders without crashing", function () {
mount(<Game />);
});