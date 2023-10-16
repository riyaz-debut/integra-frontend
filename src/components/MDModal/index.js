import React, { useImperativeHandle, forwardRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Switch from "@mui/material/Switch";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

import MDBox from "components/MDBox";
import CheckUpdateForm from "views/chaincode/CheckUpdateForm";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const MDModal = (props, ref) => {
  const [open, setOpen] = React.useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    //handleClickOpen: handleClickOpen
    modalOpen,
    modalClose,
  }));

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              display="flex"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h6"
                align="center"
              >
                Check Chaincode Update
              </Typography>

              <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                  position: "relative",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <MDBox pt={4} pb={3} px={3}>
              <CheckUpdateForm />
            </MDBox>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default forwardRef(MDModal);
