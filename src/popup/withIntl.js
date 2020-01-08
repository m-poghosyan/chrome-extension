import React from "react";
import intl from "react-intl-universal";

const locales = {
  "ru-RU": require("./locales/ru-RU.json")
};

export default WrappedComponent => {
  return class extends React.Component {
    state = { initDone: false };

    componentDidMount() {
      this.loadLocales();
    }

    loadLocales() {
      // Change to en-US if want default values to be shown
      intl.init({ currentLocale: "ru-RU", locales }).then(() => {
        this.setState({ initDone: true });
      });
    }

    render() {
      return (
        this.state.initDone && (
          <WrappedComponent data={this.state.data} {...this.props} />
        )
      );
    }
  };
};
