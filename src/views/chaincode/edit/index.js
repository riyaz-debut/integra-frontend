import React, { useState } from 'react'
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ChaincodeForm from 'views/chaincode/chaincode-form'

const Edit = () => {
    const [formValue, setFormValue] = useState(null);

    const initialValues = {
        name: '',
        label: '',
        version: '',
        url: '',
        file: [],
        submit: null
    };

    const submitData = (data) => {
        console.log(" ============== Submit data ==================== ", data)
    }

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
                                    Update Chaincode
                  </MDTypography>

                            </MDBox>
                            <MDBox p={3}>
                                <ChaincodeForm
                                    formInitialValue={formValue || initialValues}
                                    buttonLabel="Update Chaincode"
                                    submitData={submitData} />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Edit
