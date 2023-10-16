import PropTypes from "prop-types";
import Moment from "react-moment";

const MomentHelper = (props) => {
  const { date, dateTime } = props;

  let format = "DD-MM-YYYY";
  let dateValue = date;

  if (date) {
    dateValue = date;
    format = "DD-MM-YYYY";
  }
  if (dateTime) {
    dateValue = dateTime;
    format = "DD-MM-YYYY | hh:mm:ss a";
  }

  return <Moment format={format}>{dateValue}</Moment>;
};

MomentHelper.propTypes = {
  date: PropTypes.any,
  dateTime: PropTypes.any,
};

export default MomentHelper;
