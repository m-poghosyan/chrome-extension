import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import { CheckboxContainer } from "./elements";

// TODO Replace with styled-components!
const DeepPurpleCheckbox = withStyles({
  root: {
    color: deepPurple[300],
    "&$checked": {
      color: deepPurple[10]
    }
  }
})(props => <Checkbox color="default" {...props} />);

class CheckboxPromo extends React.Component {
  render() {
    return (
      <CheckboxContainer>
        <FormControlLabel
          control={
            <DeepPurpleCheckbox
              name={this.props.name}
              onChange={this.props.onToggleCheckbox}
            />
          }
          checked={this.props.checked}
          label={this.props.checkboxText || "Toggle"}
        />
      </CheckboxContainer>
    );
  }
}

export default CheckboxPromo;
