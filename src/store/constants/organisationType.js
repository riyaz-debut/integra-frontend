const namespaces = "organisation";

const Types = {
  ADD_REQUEST: `${namespaces}/ADD_REQUEST`,
  ADD: `${namespaces}/ADD`,

  ADD_PEER: `${namespaces}/ADD_PEER`,
  //
  ALL_DATA_REQUEST: `${namespaces}/ALL_DATA_REQUEST`,
  ALL_DATA: `${namespaces}/ALL_DATA`,
  CHECK_UPDATE_REQUEST: `${namespaces}/CHECK_UPDATE_REQUEST`,
  CHECK_UPDATE: `${namespaces}/CHECK_UPDATE`,
  INSTALL_CHAINCODE_REQUEST: `${namespaces}/INSTALL_CHAINCODE_REQUEST`,
  INSTALL_CHAINCODE: `${namespaces}/INSTALL_CHAINCODE`,
  SIGN_ORGANISATION_REQUEST: `${namespaces}/SIGN_ORGANISATION_REQUEST`,
  SIGN_ORGANISATION: `${namespaces}/SIGN_ORGANISATION`,
  JOIN_CHANNEL_REQUEST: `${namespaces}/JOIN_CHANNEL_REQUEST`,
};

export default Types;
