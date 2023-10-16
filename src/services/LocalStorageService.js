const LocalStorageService = (function () {
  function _setToken(token) {
    localStorage.setItem("access_token", token);
  }
  function _getAccessToken() {
    let token = localStorage.getItem("access_token");
    return token;
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
  }

  function _logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role");
    localStorage.clear();
  }

  function _setUserRole(userRole) {
    localStorage.setItem("user_role", userRole);
  }

  function _getUserRole() {
    let userRole = localStorage.getItem("user_role");
    return userRole;
  }

  return {
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    logout: _logout,
    setUserRole: _setUserRole,
    getUserRole: _getUserRole,
  };
})();
export default LocalStorageService;
