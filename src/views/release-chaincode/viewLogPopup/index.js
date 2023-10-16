import React from "react";

// mui table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

/**
 * Dialog
 */
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";

import MDDialog from "components/MD-Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { changeFormat } from "helpers/changeDateFormat";
import { Box, CircularProgress } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ViewLogDialog = ({
  onDialogClose,
  open,
  selectedChainCode,
  releaseLogData,
  commitStatus,
  requestCommit,
  loading,
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <Box
          sx={{
            width: "90%",
            position: "absolute",
            textAlign: "center",
            padding: "10px 0px",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      );
    } else if (releaseLogData?.length <= 0) {
      return (
        <MDTypography
          component="p"
          variant="caption"
          color="text"
          fontWeight="medium"
          style={{
            width: "90%",
            position: "absolute",
            textAlign: "center",
            fontSize: "14px",
            padding: "10px 0px",
          }}
        >
          No data found
        </MDTypography>
      );
    } else {
      return releaseLogData?.map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="center">{row.org_name}</TableCell>
          <TableCell align="center">
            {changeFormat("dateTime", row.created_at)}
          </TableCell>
        </TableRow>
      ));
    }
  };

  return (
    <BootstrapDialog
      onClose={onDialogClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={"700px"}
    >
      <MDDialog id="customized-dialog-title" onClose={onDialogClose}>
        {`Logs Detail (${
          selectedChainCode.name ? selectedChainCode.name : ""
        } ${selectedChainCode?.version ? selectedChainCode.version : ""})`}
      </MDDialog>
      <DialogContent dividers>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead sx={{ display: "contents" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Organization Name</TableCell>
                <TableCell align="center">Installed At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderContent()}</TableBody>
          </Table>
        </TableContainer>
        <Box textAlign={"end"} pt={2}>
          <MDButton
            variant="gradient"
            color="dark"
            onClick={requestCommit}
            disabled={commitStatus === "false"}
            sx={{ marginRight: "5px" }}
          >
            Commit
          </MDButton>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default ViewLogDialog;
