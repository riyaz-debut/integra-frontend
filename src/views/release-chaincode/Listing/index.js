import React, { useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

/**
 * Dialog
 */
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import types from "store/constants/chainCodeType";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import ViewLogDialog from "views/release-chaincode/viewLogPopup";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

import { connect, useDispatch } from "react-redux";
//import projectsTableData from "layouts/tables/data/projectsTableData";

import {
  releasesListing,
  deleteRelease,
  viewReleaseLogReq,
  chaincodeCommitReq,
} from "store/actions/chain-code";
import MomentHelper from "helpers/MomentHelper";
import { Link } from "react-router-dom";

const columns = [
  { Header: "Name", accessor: "name", align: "left" },
  { Header: "Label", accessor: "label", align: "left" },
  { Header: "Version", accessor: "version", align: "center" },
  { Header: "Sequence", accessor: "sequence", align: "center" },
  { Header: "Created At", accessor: "created_at", align: "center" },
  { Header: "Status", accessor: "status", align: "center" },
  { Header: "action", accessor: "action", align: "center" },
];

const Listing = (props) => {
  const {
    releasesList,
    getRelease,
    viewReleaseLog,
    onDeleteRelease,
    releaseLogData,
    commitStatus,
    requestCommit,
    releaseLogLoading,
    commitChaincodeStatus,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedChainCode, setChainCode] = React.useState({});
  const dispatch = useDispatch();
  const onDialogOpen = () => {
    setOpen(true);
  };

  const onDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const data = {
      per_page: 10,
      page_no: 1,
      search_by: "ffffff",
    };
    getRelease(data);
  }, []);

  useEffect(() => {
    if (commitChaincodeStatus) {
      setOpen(false);
    }
    dispatch({
      type: types.COMMIT_CHAINCODE_STATUS,
      payload: false,
    });
  }, [commitChaincodeStatus]);
  const rows = [];

  const renderList = (data) => {
    return (
      data &&
      data.map((item, index) => {
        return {
          name: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item.name ? item.name : "----"}
            </MDTypography>
          ),
          label: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item.label ? item.label : "----"}
            </MDTypography>
          ),
          version: (
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={item.version ? item.version : "----"}
                color="success"
                variant="gradient"
                size="sm"
              />
            </MDBox>
          ),
          created_at: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              <MomentHelper date={item.created_at ? item.created_at : "----"} />
            </MDTypography>
          ),
          sequence: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item.sequence ? item.sequence : "----"}
            </MDTypography>
          ),
          status: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item?.status ? item.status : "-----"}
            </MDTypography>
          ),
          action: (
            <>
              <MDButton
                variant="gradient"
                color="dark"
                onClick={() => {
                  viewReleaseLog(item.id);
                  onDialogOpen();
                  setChainCode({
                    name: item.name,
                    version: item.version,
                    releaseId: item.id,
                  });
                }}
                sx={{ marginRight: "5px" }}
              >
                Logs
              </MDButton>
              <MDButton
                variant="gradient"
                color="dark"
                onClick={() => onDeleteRelease(item.id)}
              >
                Delete
              </MDButton>
            </>
          ),
        };
      })
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container>
                  <Grid item xs={6} sm={6} md={6}>
                    <MDTypography variant="h6" color="white">
                      Releases List
                    </MDTypography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} style={{ textAlign: "end" }}>
                    <Link to="/chaincode/release/create">
                      <MDButton variant="gradient" color="dark">
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Add New Release
                      </MDButton>
                    </Link>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: renderList(releasesList) }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* /*
       * Dialog box
       * */}
      <ViewLogDialog
        open={open}
        onDialogClose={onDialogClose}
        selectedChainCode={selectedChainCode}
        releaseLogData={releaseLogData}
        commitStatus={commitStatus}
        requestCommit={() =>
          requestCommit({
            release_id: selectedChainCode.releaseId,
          })
        }
        loading={releaseLogLoading}
      />
      <Footer />
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    releasesList: state.chainCode.releasesList,
    releaseLogData: state.chainCode.releaseLog.list,
    commitStatus: state.chainCode.releaseLog.commit_status,
    releaseLogLoading: state.customization.isLoader,
    commitChaincodeStatus: state.chainCode.commitChaincodeStatus,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRelease: (data) => {
      dispatch(releasesListing(data));
    },

    onDeleteRelease: (data) => {
      dispatch(deleteRelease(data));
    },
    viewReleaseLog: (data) => {
      dispatch(viewReleaseLogReq(data));
    },
    requestCommit: (data) => {
      dispatch(chaincodeCommitReq(data));
    },
  };
};

Listing.propTypes = {
  getRelease: PropTypes.func,
  onDeleteRelease: PropTypes.func,
  releasesList: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
