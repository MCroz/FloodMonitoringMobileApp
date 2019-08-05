import Api from './Api'


export default {
    login (params) {
        return Api().post('api/Login.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetAnnouncements (params) {
        return Api().post('api/GetAnnouncements.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetLatestAnnouncements (params) {
        return Api().post('api/GetLatestAnnouncement.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetOlderAnnouncements (params) {
        return Api().post('api/GetOlderAnnouncement.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetFeeds (params) {
        return Api().post('api/GetFeeds.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetLatestFeeds (params) {
        return Api().post('api/GetLatestFeeds.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetOlderFeeds (params) {
        return Api().post('api/GetOlderFeeds.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    AddPost (params) {
        return Api().post('api/AddPost.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetComments (params) {
        return Api().post('api/GetComments.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
}