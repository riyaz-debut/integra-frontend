import React, { useEffect, useState } from "react";
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
import OrganisationForm from "views/organisation/organisationAddPeer-form";

import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AddNewPeerReq } from "store/actions/organisation";
import Types from "store/constants/organisationType";

const Add = (props) => {
  const { onSubmit } = props;
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(null);
  const dispatch = useDispatch();
  const addPeerStatus = useSelector(
    (state) => state.organisation.addPeersStatus
  );

  const initialValues = {
    name: "",
    // msp_id: "",
    OrgId: "",
    peers: [
      {
        name: "",
        url: "",
        ip: "",
        certificate: "",
      },
    ],
  };

  const submitData = (data) => {
    onSubmit({ data: data, navigate: navigate });
  };

  // useEffect(() => {
  //   console.log(addPeerStatus, "addPeerStatus");
  //   if (addPeerStatus === "success") {
  //     navigate("/organisation");
  //   }
  //   dispatch({
  //     type: Types.ADD_PEER_STATUS,
  //     payload: null,
  //   });
  // }, [addPeerStatus]);

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
                  Add Peer
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <OrganisationForm
                  formInitialValue={formValue || initialValues}
                  updateFormData={setFormValue}
                  buttonLabel="Add Peer"
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      dispatch(AddNewPeerReq(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
