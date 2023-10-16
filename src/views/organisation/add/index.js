import React, { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import OrganisationForm from "views/organisation/organisation-form/OrganisationForm";

import { connect } from "react-redux";
import { create } from "store/actions/organisation";
import { useNavigate } from "react-router-dom";

const Add = (props) => {
  const { onSubmit } = props;
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(null);

  const initialValues = {
    name: "Org3",
    msp_id: "OrgMsp3",
    peers_count: "",
    file: [],
    peers: [
      {
        name: "test user",
        url: "https://mui.com/material-ui/getting-started/installation/",
        ip: "192.168.0.1",
        certificate: "certificates",
      },
    ],
    submit: null,
  };

  const submitData = (data) => {
    onSubmit({ data: data, navigate: navigate });
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
                <MDTypography variant="h6" color="white">
                  Add Organisation
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <OrganisationForm
                  formInitialValue={formValue || initialValues}
                  updateFormData={setFormValue}
                  buttonLabel="Add Organisation"
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

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(create(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Add);
