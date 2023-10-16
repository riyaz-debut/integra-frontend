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

import { addRelease, listing } from "store/actions/chain-code";
import ChaincodeForm from "views/release-chaincode/release-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Create = (props) => {
  const { listData, chainCodeList, onSubmit } = props;
  const [formValue, setFormValue] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    chainCodeList();
  }, []);

  const initialValues = {
    name: "",
    sequence: "",
    version: "",
    url: "",
    // file: [],
    submit: null,
  };

  const submitData = (data) => {
    delete data.submit;

    console.log(" ============== Submit data ==================== ", data);
    onSubmit({ ...data, navigate });
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
                  Release New Update
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <ChaincodeForm
                  formInitialValue={formValue || initialValues}
                  buttonLabel="Release New Update"
                  chainCodeList={listData}
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
    // loaded: state.category.loaded,
    listData: state.chainCode.listingData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(addRelease(data));
    },
    chainCodeList: () => {
      dispatch(listing());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
