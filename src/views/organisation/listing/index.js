import React, { useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import PropTypes from "prop-types";

// Data
import { connect } from "react-redux";
//import projectsTableData from "layouts/tables/data/projectsTableData";

import {
  listing,
  signChainCodeReq,
  joinChannelRequest,
} from "store/actions/organisation";

import LocalStorageService from "services/LocalStorageService";
import { ADMIN } from "constants/userRoles";
import { CLIENT } from "constants/userRoles";

const Organisation = (props) => {
  const { organisationList, listData, signOrganisation, joinChannel } = props;
  const userRole = LocalStorageService.getUserRole();

  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const tableHeading = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "MSP ID", accessor: "mspId", align: "left" },
    { Header: "Created At", accessor: "Created_at", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const join_status = 0;

  useEffect(() => {
    organisationList();
  }, []);

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
              {item.org_name || item.name}
            </MDTypography>
          ),
          mspId: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item.org_msp || item.msp_id}
            </MDTypography>
          ),
          Created_at: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item.created_at}
            </MDTypography>
          ),
          action: (
            <React.Fragment>
              {userRole === ADMIN ? (
                <MDButton
                  variant="gradient"
                  color="dark"
                  disabled={
                    item.join_status === 0 ||
                    item.join_status === 2 ||
                    item.join_status === 3
                  }
                  onClick={() => joinChannel(item.Id)}
                >
                  {item.join_status === 0
                    ? "Save"
                    : item.join_status === 1
                    ? "Save"
                    : item.join_status === 2
                    ? "Join"
                    : "Joined"}
                </MDButton>
              ) : (
                <MDButton
                  variant="gradient"
                  color="dark"
                  disabled={
                    item.join_status === 1 ||
                    item.join_status === 2 ||
                    item.join_status === 3
                  }
                  onClick={() => signOrganisation(item.org_id)}
                >
                  {item.join_status === 0
                    ? "Sign"
                    : item.join_status === 1
                    ? "Signed"
                    : item.join_status === 2
                    ? "Join"
                    : "Joined"}
                </MDButton>
              )}
            </React.Fragment>
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
                      Organisation Table
                    </MDTypography>
                  </Grid>
                  {userRole === ADMIN && (
                    <Grid
                      container
                      columnGap={2}
                      xs={6}
                      sm={6}
                      md={6}
                      style={{ justifyContent: "end" }}
                    >
                      <Link to="/organisation/add">
                        <MDButton variant="gradient" color="dark">
                          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                          &nbsp;Add New Organization
                        </MDButton>
                      </Link>
                      <Link to="/organisation/add-peer">
                        <MDButton variant="gradient" color="dark">
                          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                          &nbsp;Add Peers
                        </MDButton>
                      </Link>
                    </Grid>
                  )}
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: tableHeading, rows: renderList(listData) }}
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
      <Footer />
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    // loaded: state.category.loaded,
    listData: state.organisation.listingData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    organisationList: (data) => {
      dispatch(listing(data));
    },
    signOrganisation: (id) => {
      dispatch(signChainCodeReq(id));
    },
    joinChannel: (data) => {
      dispatch(joinChannelRequest(data));
    },
  };
};

Organisation.propTypes = {
  getChainCode: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Organisation);
