// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import React from 'react';

// @mui material components
// import Snackbar from "@mui/material/Snackbar";
// import IconButton from "@mui/material/IconButton";
// import Icon from "@mui/material/Icon";
// import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import MuiSnackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';


// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Custom styles for the MDSnackbar
// import MDSnackbarIconRoot from "components/MDSnackbar/MDSnackbarIconRoot";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function TransitionSlideLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

const transition = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade: Fade
};

function MDSnackbar({ color, icon, title, dateTime, content, close, bgWhite, ...rest }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [open, setOpen] = React.useState(false);
  const snackbarInitial = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(snackbarInitial.open);
  }, [snackbarInitial.action, snackbarInitial.open]);


  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = darkMode ? "inherit" : "dark";
    dateTimeColor = darkMode ? "inherit" : "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  return (
    // <Snackbar
    //   open={open}
    //   onClose={handleClose}
    //   message={snackbarInitial.message}
    //   TransitionComponent={Fade}
    //   autoHideDuration={5000}
    //   anchorOrigin={{
    //     vertical: "top",
    //     horizontal: "right",
    //   }}
    //   {...rest}
    //   action={
    //     <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
    //       <Icon fontSize="small">close</Icon>
    //     </IconButton>
    //   }
    // >
    //   <MDBox
    //     variant={bgWhite ? "contained" : "gradient"}
    //     bgColor={bgWhite ? "white" : color}
    //     minWidth="21.875rem"
    //     maxWidth="100%"
    //     shadow="md"
    //     borderRadius="md"
    //     p={1}
    //     sx={{
    //       backgroundColor: ({ palette }) =>
    //         darkMode ? palette.background.card : palette[color] || palette.white.main,
    //     }}
    //   >
    //     <MDBox
    //       display="flex"
    //       justifyContent="space-between"
    //       alignItems="center"
    //       color="dark"
    //       p={1.5}
    //     >
    //       <MDBox display="flex" alignItems="center" lineHeight={0}>
    //         <MDSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
    //           {icon}
    //         </MDSnackbarIconRoot>
    //         <MDTypography
    //           variant="button"
    //           fontWeight="medium"
    //           color={titleColor}
    //           textGradient={bgWhite}
    //         >
    //           {title}
    //         </MDTypography>
    //       </MDBox>
    //       <MDBox display="flex" alignItems="center" lineHeight={0}>
    //         <MDTypography variant="caption" color={dateTimeColor}>
    //           {dateTime}
    //         </MDTypography>
    //         <Icon
    //           sx={{
    //             color: ({ palette: { dark, white } }) =>
    //               (bgWhite && !darkMode) || color === "light" ? dark.main : white.main,
    //             fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
    //             cursor: "pointer",
    //             marginLeft: 2,
    //             transform: "translateY(-1px)",
    //           }}
    //           onClick={close}
    //         >
    //           close
    //         </Icon>
    //       </MDBox>
    //     </MDBox>
    //     <Divider sx={{ margin: 0 }} light={dividerColor} />
    //     <MDBox
    //       p={1.5}
    //       sx={{
    //         fontSize: ({ typography: { size } }) => size.sm,
    //         color: ({ palette: { white, text } }) => {
    //           let colorValue = bgWhite || color === "light" ? text.main : white.main;

    //           if (darkMode) {
    //             colorValue = color === "light" ? "inherit" : white.main;
    //           }

    //           return colorValue;
    //         },
    //       }}
    //     >
    //       {content}
    //     </MDBox>
    //   </MDBox>
    // </Snackbar>
    <React.Fragment>
    {snackbarInitial.variant === 'default' && (
        <MuiSnackbar
            anchorOrigin={snackbarInitial.anchorOrigin}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message={snackbarInitial.message}
            TransitionComponent={transition[snackbarInitial.transition]}
            // action={
            //     <React.Fragment>
            //         <Button color="secondary" size="small" onClick={handleClose}>
            //             UNDO
            //         </Button>
            //         <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            //             <CloseIcon fontSize="small" />
            //         </IconButton>
            //     </React.Fragment>
            // }
        />
    )}
    {snackbarInitial.variant === 'alert' && (
        <MuiSnackbar
            TransitionComponent={transition[snackbarInitial.transition]}
            anchorOrigin={snackbarInitial.anchorOrigin}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                variant="filled"
                severity={snackbarInitial.alertSeverity}
                sx={{
                    bgcolor: snackbarInitial.alertSeverity + '.dark',
                    color: snackbarInitial.alertSeverity === 'warning' ? 'grey.900' : ''
                }}
                // action={
                //     <React.Fragment>
                //         {snackbarInitial.actionButton !== false && (
                //             <Button color="secondary" size="small" onClick={handleClose}>
                //                 UNDO
                //             </Button>
                //         )}
                //         {snackbarInitial.close !== false && (
                //             <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                //                 <CloseIcon fontSize="small" />
                //             </IconButton>
                //         )}
                //     </React.Fragment>
                // }
            >
                {snackbarInitial.message}
            </Alert>
        </MuiSnackbar>
    )}
</React.Fragment>
  );
}

// Setting default values for the props of MDSnackbar
MDSnackbar.defaultProps = {
  bgWhite: false,
  color: "info",
};

// Typechecking props for MDSnackbar
MDSnackbar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node,
  title: PropTypes.string,
  dateTime: PropTypes.string,
  content: PropTypes.node,
  close: PropTypes.func,
  bgWhite: PropTypes.bool,
};

export default MDSnackbar;
