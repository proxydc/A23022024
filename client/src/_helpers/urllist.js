const backEndURL =
    process.env.NODE_ENV == "production"
        ? process.env.VUE_APP_DBPRODURL
        : process.env.VUE_APP_DBDEVURL;
const baseURL = backEndURL + "/api/v1/database/";
const acc = localStorage.getItem("useraccount");
class urllist {
    static getBackEndURL() {
        return backEndURL;
    }
    static getLoginUrl() {
        return baseURL + "account";
    }
    static getAddAccUrl() {
        return baseURL + "account/add";
    }
    static getEditDelAccUrl(id) {
        return baseURL + "account/" + id;
    }
    static getDcsUrl() {
        if (acc == "admin") { return baseURL + "dc"; }
        else {
            return baseURL + "dcByManager/" + parseInt(localStorage.getItem("manager_id"));
        }
    }
    static getDcUrl(id) {
        //const acc= localStorage.getItem("useraccount");
        if (acc == "user" || acc == "admin")
            return baseURL + "dc/" + id;
        else
            return baseURL + "dc/candidat/" + id;
    }
    static getDcDocUrl(id) {
        return baseURL + "dc/doc/" + id;
    }
    static getDcAdminUrl(id) {
        return baseURL + "dcAdmin/" + id;
    }
    static getAddDcUrl() {
        return baseURL + "dc/add";
    }
    static getDelDcUrl(id) {
        return baseURL + "dc/" + id;
    }
    static getDcPDFUrl(id) {
        return baseURL + "dc/pdf/" + id;
    }
}

export default urllist;
