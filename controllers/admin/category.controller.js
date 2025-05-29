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