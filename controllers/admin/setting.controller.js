module.exports.list = (req, res) => {
    res.render ("admin/pages/setting-list", {
        title: "Cài đặt chung"
    })
}

module.exports.websiteInfo = (req, res) => {
    res.render ("admin/pages/setting-website-info", {
        title: "Thông tin Website"
    })
}

module.exports.accountAdminList = (req, res) => {
    res.render ("admin/pages/setting-account-admin-list", {
        title: "Tài khoản quản trị"
    })
}

module.exports.accountAdminCreate = (req, res) => {
    res.render ("admin/pages/setting-account-admin-create", {
        title: "Tạo tài khoản quản trị"
    })
}

module.exports.roleList = (req, res) => {
    res.render ("admin/pages/setting-role-list", {
        title: "Nhóm quyền"
    })
}

module.exports.roleCreate = (req, res) => {
    res.render ("admin/pages/setting-role-create", {
        title: "Tạo Nhóm quyền"
    })
}