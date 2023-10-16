// Integra Nock layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import ChainCode from "views/chaincode/";
import ChaincodeEdit from "views/chaincode/edit";
import Organisation from "views/organisation/listing";
import Add from "views/organisation/add";
import AddPeer from "views/organisation/addPeer";
import UpdateChaincodeList from "views/release-chaincode/Listing";
import ReleaseCreate from "views/release-chaincode/create";
import UserManagement from "views/users/listing";
import Createuser from "views/users/add";
import { ADMIN, CLIENT } from "constants/userRoles";

// @mui icons
import Icon from "@mui/material/Icon";
import Private from "gaurds/Private";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    roles: [ADMIN, CLIENT],
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Private component={Dashboard} roles={[ADMIN, CLIENT]} />,
  },
  {
    type: "collapse",
    name: "Chaincodes",
    key: "chaincode",
    path: "/chaincode",
    roles: [ADMIN, CLIENT],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/chaincode",
    component: <Private component={ChainCode} roles={[ADMIN, CLIENT]} />,
  },

  {
    type: "collapse",
    name: "Organization",
    key: "organisation",
    roles: [ADMIN, CLIENT],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/organisation",
    component: <Private component={Organisation} roles={[ADMIN, CLIENT]} />,
  },
  {
    // type: "collapse",
    // name: "Organisation/Add",
    key: "add",
    roles: [ADMIN],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/organisation/add",
    component: <Private component={Add} roles={[ADMIN]} />,
  },
  {
    // type: "collapse",
    // name: "Organisation/Add",
    key: "add",
    roles: [ADMIN],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/organisation/add-peer",
    component: <Private component={AddPeer} roles={[ADMIN]} />,
  },
  {
    type: "collapse",
    name: "Releases",
    key: "chaincode/release/list",
    roles: [ADMIN],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/chaincode/release/list",
    component: <Private component={UpdateChaincodeList} roles={[ADMIN]} />,
  },
  {
    // type: "collapse",
    // name: "Organisation/Add",
    key: "chaincode-update",
    roles: [ADMIN],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/chaincode/release",
    component: <Private component={ChaincodeEdit} roles={[ADMIN]} />,
  },

  {
    // type: "collapse",
    // name: "Chaincodes",
    key: "updateChaicode",
    roles: [ADMIN],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/chaincode/release/create",
    component: <Private component={ReleaseCreate} roles={[ADMIN]} />,
  },

  {
    type: "collapse",
    name: "User Management",
    key: "user-management",
    roles: [ADMIN],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/user-management",
    component: <Private component={UserManagement} roles={[ADMIN]} />,
  },
  {
    // type: "collapse",
    // name: "Organisation/Add",
    key: "add",
    roles: [ADMIN],
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/user/create",
    component: <Private component={Createuser} roles={[ADMIN]} />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    // type: "collapse",
    // name: "Sign In",
    key: "sign-in",
    roles: [ADMIN, CLIENT],
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
