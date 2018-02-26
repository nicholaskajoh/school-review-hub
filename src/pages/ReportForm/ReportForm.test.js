import React from "react";
import ReactDOM from "react-dom";
import ReportForm from "./ReportForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ReportForm />, div);
});
