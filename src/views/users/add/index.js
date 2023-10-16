import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { createUser } from "store/actions/user";
import { listing as orgListing } from "store/actions/organisation";
import AddUserForm from "views/users/add-user-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUser = (props) => {
  const navigate = useNavigate();
  const { listOrganizations, onSubmit, orgListData = [] } = props;
  const [formValue, setFormValue] = useState(null);

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const submitData = (data) => {
    data.role = "user";
    console.log(" ============== Submit data ==================== ", data);
    onSubmit({ data: data, navigate: navigate });
  };

  useEffect(() => {
    listOrganizations();
  }, []);

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
                <MDTypography variant="h6" color="white">
                  Add New User
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <AddUserForm
                  formInitialValue={formValue || initialValues}
                  buttonLabel="Create User"
                  orgList={orgListData}
                  submitData={submitData}
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
    orgListData: state.organisation.listingData,
    // loaded: state.category.loaded,
    // listData: state.chainCode.listingData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listOrganizations: (data) => {
      dispatch(orgListing(data));
    },
    onSubmit: (data) => {
      dispatch(createUser(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
