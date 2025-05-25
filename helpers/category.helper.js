const builCategoryTree = (categories, parentId = "") => {
    const tree = [];

    categories.forEach(item => {
        if (item.parent == parentId) {
            const children = builCategoryTree (categories, item.id);
            tree.push ({
                id: item.id,
                name: item.name,
                children: children
            })
        }
    });

    return tree
}

module.exports.builCategoryTree = builCategoryTree