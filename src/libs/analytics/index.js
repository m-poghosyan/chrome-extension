import ReactGA from "react-ga";

export const GA_CATEGORY = "extension";

export const init = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_CODE, { titleCase: false });
  ReactGA.set({ checkProtocolTask: function() {} }); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
};

export const pageview = url => {
  ReactGA.pageview(url);
};

export const event = (action, label, value) => {
  ReactGA.event({
    category: GA_CATEGORY,
    action,
    label,
    value
  });
};
