module.exports.list = (req, res) => {
    res.render ("admin/pages/tour-list", {
        title: "Quản lý Tour"
    })
}

module.exports.create = (req, res) => {
    res.render ("admin/pages/tour-create", {
        title: "Tạo Tour"
    })
}

module.exports.trash = (req, res) => {
    res.render ("admin/pages/tour-trash", {
        title: "Thùng rác Tour"
    })
}