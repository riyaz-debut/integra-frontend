import { useEffect, useRef } from 'react'
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDModal from "components/MDModal"

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// Data
// import authorsTableData from "./data/authorsTableData";
import { connect } from 'react-redux'
//import projectsTableData from "layouts/tables/data/projectsTableData";

import { listing } from 'store/actions/chain-code'
// import DummyTable from './list'

const ChainCode = (props) => {
  const { getChainCode, listData } = props;
  const chainCodeModalRef = useRef(null);
  // const { rows } = authorsTableData();

  const tableHeading =  [
    { Header: "Name", accessor: "name",  align: "left" },
    { Header: "Label", accessor: "label", align: "left" },
    { Header: "Version", accessor: "version", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Created At", accessor: "Created_at", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  useEffect(() => {
    const data = {
      per_page: 10,
      page_no: 1,
      search_by: 'ffffff'

    }
    getChainCode(data)
  }, [])

  const renderList = (data) => {
    return data && data.map((item, index) => {
      return {
        name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.chaincodename}
          </MDTypography>
        ),
        label:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.label}
          </MDTypography>
        ),
        version: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={item.version} color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        Created_at: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.status}
          </MDTypography>
        ),
          action: <Job title="Check For Update"/>,
        }
        
    })
  }

  const onModalOpen = () => { 
    chainCodeModalRef.current.modalOpen();
  }

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
       <MDButton variant="gradient" color="dark" onClick={() => onModalOpen()}>
             {title}
       </MDButton>

      <MDModal ref={chainCodeModalRef} />
      
    </MDBox>
  );

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
                  Chaincode Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable    
                  table={{ columns:tableHeading , rows:renderList(listData) }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              {/* <DummyTable /> */}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    // loaded: state.category.loaded,
    listData: state.chainCode.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChainCode: (data) => {
      dispatch(listing(data));
    }
  }

}

ChainCode.propTypes = {
  getChainCode: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainCode);
