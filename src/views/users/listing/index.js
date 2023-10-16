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

import { listing, enableUser, disableUser } from "store/actions/user";

// Data
import { connect } from "react-redux";
//import projectsTableData from "layouts/tables/data/projectsTableData";

import LocalStorageService from "services/LocalStorageService";
import { ADMIN } from "constants/userRoles";
import { DISABLED } from "constants/userStatus";

const UserManagemenet = (props) => {
  const {
    listUsers,
    enable,
    disable,
    usersList = [],
    signOrganisation,
  } = props;

  const userRole = LocalStorageService.getUserRole();

  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const tableHeading = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Role", accessor: "user_role", align: "left" },
    { Header: "Organization Name", accessor: "org_name", align: "left" },
    { Header: "Organization MSP", accessor: "org_msp", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  useEffect(() => {
    listUsers();
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
              {item.user_name}
            </MDTypography>
          ),
          user_role: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item.role}
            </MDTypography>
          ),
          org_name: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item.org_name}
            </MDTypography>
          ),
          org_msp: (
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              {item.org_msp}
            </MDTypography>
          ),

          action: (
            <React.Fragment>
              {item.status === DISABLED ? (
                <MDButton
                  variant="gradient"
                  color="dark"
                  onClick={() => enable(item.id)}
                >
                  enable{" "}
                </MDButton>
              ) : (
                <MDButton
                  variant="gradient"
                  color="dark"
                  onClick={() => disable(item.id)}
                >
                  disable{" "}
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
                      Users Table
                    </MDTypography>
                  </Grid>
                  {userRole === ADMIN && (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      style={{ textAlign: "end" }}
                    >
                      <Link to="/user/create">
                        <MDButton variant="gradient" color="dark">
                          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                          &nbsp;Add New User
                        </MDButton>
                      </Link>
                    </Grid>
                  )}
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: tableHeading, rows: renderList(usersList) }}
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
    usersList: state.user.listingData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    listUsers: () => {
      dispatch(listing());
    },
    enable: (id) => {
      dispatch(enableUser(id));
    },
    disable: (id) => {
      dispatch(disableUser(id));
    },
  };
};

// UserManagemenet.propTypes = {
//   getChainCode: PropTypes.func,
// };

export default connect(mapStateToProps, mapDispatchToProps)(UserManagemenet);
