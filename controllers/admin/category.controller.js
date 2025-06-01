const Category = require("../../models/category.model")
const categoryHelper = require("../../helpers/category.helper")
const AcconutAdmin = require("../../models/account.admin.model")
const moment = require("moment");


module.exports.list = async (req, res) => {
    const categoryList = await Category.find({
        deleted: false
    }).sort({
        position: "asc" // sắp xếp theo vị trí tăng đân
    })

    for (const item of categoryList) {
        if (item.createdBy) {
            const infoAccountCreated = await AcconutAdmin.findOne ({
                _id: item.createdBy
            })
            item.createdByFullName = infoAccountCreated.fullName
        }
    
        if (item.updatedBy) {
            const infoAccountupdated= await AcconutAdmin.findOne ({
                _id: item.updatedBy
            })
            item.updatedByFullName = infoAccountupdated.fullName
        }

        item.createAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY")
        item.updateAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY")
        
    }

    res.render("admin/pages/category-list", {
        title: "Quản lý danh mục",
        categoryList: categoryList
    })
}

module.exports.create = async (req, res) => {
    const categoryList = await Category.find({
        deleted: false
    })

    const categoryTree = categoryHelper.builCategoryTree (categoryList)

    // console.log(categoryTree)

    res.render("admin/pages/category-create", {
        title: "Tạo danh mục",
        categoryList: categoryTree
    })
}

module.exports.createPost = async (req, res) => {
    if (req.body.position) {
        req.body.position = parseInt(req.body.position)
    }
    else {
        const totalRecord = await Category.countDocuments({})
        req.body.position = totalRecord + 1
    }

    req.body.createdBy = req.account.id;
    req.body.updatedBy = req.account.id;
    req.body.avatar = req.file ? req.file.path : "";

    const newRecord = new Category(req.body)
    await newRecord.save()

    // console.log(req.file)

    req.flash ("success", "Tạo danh mục thành công")
    res.json ({
        code: "success"
    })
}

module.exports.list = async (req, res) => {
    const categoryList = await Category.find({
        deleted: false
    }).sort({
        position: "asc" // sắp xếp theo vị trí tăng đân
    })

    for (const item of categoryList) {
        if (item.createdBy) {
            const infoAccountCreated = await AcconutAdmin.findOne ({
                _id: item.createdBy
            })
            item.createdByFullName = infoAccountCreated.fullName
        }
    
        if (item.updatedBy) {
            const infoAccountupdated= await AcconutAdmin.findOne ({
                _id: item.updatedBy
            })
            item.updatedByFullName = infoAccountupdated.fullName
        }

        item.createAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY")
        item.updateAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY")
        
    }

    res.render("admin/pages/category-list", {
        title: "Quản lý danh mục",
        categoryList: categoryList
    })
}

module.exports.edit = async (req, res) => {
    try {
        const categoryList = await Category.find({
        deleted: false
    })

    const categoryTree = categoryHelper.builCategoryTree (categoryList)

    const id = req.params.id
    const categoryDetail = await Category.findOne({
        _id: id,
        deleted: false
    })

    res.render("admin/pages/category-edit", {
        title: "Chỉnh sửa danh mục",
        categoryList: categoryTree,
        categoryDetail: categoryDetail
    })
    } catch (error) {
        res.redirect(`/${pathAdmin}/category/list`)
    }
    
}

module.exports.editPatch = async (req, res) => {

    try {
        const id = req.params.id

        if (req.body.position) {
            req.body.position = parseInt(req.body.position)
        }
        else {
            const totalRecord = await Category.countDocuments({})
            req.body.position = totalRecord + 1
        }

        req.body.createdBy = req.account.id;
        req.body.updatedBy = req.account.id;
        if (req.file) {
            req.body.avatar = req.file.path
        } else {
            delete req.body.avatar
        }
        // req.body.avatar = req.file ? req.file.path : "";

        await Category.updateOne ({
            _id: id, // Timd bản ghi theo các tiêu chí này
            deleted: false
        }, req.body) // chứa trường dữ liệu muốn cập nhật

        // console.log(req.file)

        req.flash ("success", "Cập nhật danh mục thành công")
        res.json ({
            code: "success"
        })
    } catch (error) {
        res.json ({
            code: "error",
            message: "ID không hợp lệ"
        })
    }
    
}

module.exports.deletePatch = async (req, res) => {
    try {
        const  id = req.params.id

        await Category.updateOne ({
            _id: id
        }, {
            deleted: true,
            deletedBy: req.account.id,
            deleteAt: Date.now()
        })

        req.flash("success", "Xoá thành công!")

        res.json ({
            code: "success"
        })
    } catch (error) {
        res.json ({
            code: "error",
            message: "ID không hợp lệ!"
        })
    }
}

