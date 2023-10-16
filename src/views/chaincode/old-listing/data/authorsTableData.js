import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDModal from "components/MDModal"
import { useSelector } from 'react-redux'

// Images
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

export default function data() {
  const chainCodeModalRef = useRef(null);

  const onModalOpen = () => { 
    chainCodeModalRef.current.modalOpen();
  }

  // const Author = ({ image, name, email }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" />
  //     <MDBox ml={2} lineHeight={1}>
  //       <MDTypography display="block" variant="button" fontWeight="medium">
  //         {name}
  //       </MDTypography>
  //       <MDTypography variant="caption">{email}</MDTypography>
  //     </MDBox>
  //   </MDBox>
  // );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      {/* <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography> */}
       <MDButton variant="gradient" color="dark" onClick={() => onModalOpen()}>
             {title}
       </MDButton>

      {/* <MDTypography variant="caption">{description}</MDTypography> */}
      <MDModal ref={chainCodeModalRef} />
      
    </MDBox>
  );

  return {
    columns: [
      { Header: "Name", accessor: "name",  align: "left" },
      { Header: "Label", accessor: "label", align: "left" },
      { Header: "Version", accessor: "version", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Created At", accessor: "Created_at", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            John Michael
          </MDTypography>
        ),
        label:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            John Michael
          </MDTypography>
        ),
        version: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="v2" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        Created_at: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/04/18
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
          action: <Job title="Check For Update"/>,
          // <MDButton variant="gradient" color="dark" onClick={() => onModalOpen()}>
          //   Check for update
          // </MDButton>

          // </MDTypography>
      },
      {
         // name: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
        // function: <Job title="Programator" description="Developer" />,
        name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Alexa Liras
          </MDTypography>
        ),
        label:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Alexa Liras
          </MDTypography>
        ),
        version: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="v1" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        Created_at: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            1
          </MDTypography>
        ),
        action: <Job title="Check For Update"/>,
      },
      {
         // name: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        // function: <Job title="Manager" description="Executive" />,
        name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Richard Gran
          </MDTypography>
        ),
        label:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Richard Gran
          </MDTypography>
        ),
        version: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="v1" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        Created_at: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        action: <Job title="Check For Update"/>,
      },
      {
       // name: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
        // function: <Job title="Executive" description="Projects" />,
        name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Laurent Perrier
          </MDTypography>
        ),
        label:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Laurent Perrier
          </MDTypography>
        ),
        version: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="V2" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        Created_at: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
           1
          </MDTypography>
        ),
        action: <Job title="Check For Update"/>,
      },
      {
       // name: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
        // function: <Job title="Programator" description="Developer" />,
        name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Michael Levi
          </MDTypography>
        ),
        label:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Michael Levi
          </MDTypography>
        ),
        version: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="v2" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        Created_at: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        action: <Job title="Check For Update"/>,
      },
      {
         // name: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
        // function: <Job title="Manager" description="Executive" />,
        name:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Richard Gran
          </MDTypography>
        ),
        label:(
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Richard Gran
          </MDTypography>
        ),
        version: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="v1" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        Created_at: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        action: <Job title="Check For Update"/>,
      },
    ],
  };

  Job.propTypes = {
    title: PropTypes.any,
    description: PropTypes.any,
  };
  
  // Author.propTypes = {
  //   image: PropTypes.any,
  //   name: PropTypes.any,
  //   email: PropTypes.any,
  // };
}
