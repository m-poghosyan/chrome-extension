import React from "react";
import { NotFoundText } from "./elements";
import intl from "react-intl-universal";

function NotFound() {
  return (
    <div>
      <NotFoundText>
        {intl.get("search.results_not_found").d("Results not found")}
      </NotFoundText>
    </div>
  );
}

export default NotFound;
