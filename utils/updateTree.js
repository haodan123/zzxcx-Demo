// 定义一个递归函数来遍历树并修改字段
// function updateTreeData(tree, key, value) {
//   tree.forEach(node => {
//     node[key] = value; // 更新当前节点的字段值
//     node[key] = value; // 更新当前节点的字段值
//     if (node.children.length > 0) {
//       updateTreeData(node.children, key, value); // 递归遍历子节点
//     }
//   });
// }
// 定义一个递归函数来遍历树并修改字段
export function updateTreeData(tree, key, value) {
	tree.forEach(node => {
		node['text'] = node['classifyName']; // 更新当前节点的字段值
		node['value'] = node['id']; // 更新当前节点的字段值
		if (node.children.length > 0) {
			updateTreeData(node.children, key, value); // 递归遍历子节点
		}
	});
}

// 扁平化数组转成树状
export function handleTree(data, id, parentId, children, rootId) {
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId = rootId || Math.min.apply(Math, data.map(item => {
		return item[parentId]
	})) || 0
	// 对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	// 循环所有项
	const treeData = cloneData.filter(father => {
		var branchArr = cloneData.filter(child => {
			// 返回每一项的子级数组
			return father[id] === child[parentId]
		})
		if (branchArr.length > 0) {
			father.children = branchArr
		} else {
			father.children = ''
		}
		// 返回第一层
		return father[parentId] === rootId
	})
	return treeData !== '' ? treeData : data
}


// export default updateTreeData