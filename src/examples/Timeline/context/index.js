import PropTypes from 'prop-types';
import { createContext, useContext } from "react";

// The Timeline main context
const Timeline = createContext();

// Timeline context provider
function TimelineProvider({ children, value }) {
  return <Timeline.Provider value={value}>{children}</Timeline.Provider>;
}

// Timeline custom hook for using context
function useTimeline() {
  return useContext(Timeline);
}

TimelineProvider.propTypes = {
  children: PropTypes.any,
  value: PropTypes.any,
};

export { TimelineProvider, useTimeline };
