<template>
	<view class=" viewport">
		<view class="search">
			<uni-search-bar @blur="blur" placeholder="请输入" @confirm="search" v-model="searchValue" @clear="clear">
			</uni-search-bar>
		</view>
		<uv-empty v-if="dataList.length==0" mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png"></uv-empty>
		<view class="showCard" v-for="item in dataList" :key="item.id">
			<view class="card-item">
				<view class="item-key">所属基地:</view>
				<view class="item-value">{{item.qyname}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">材料编码:</view>
				<view class="item-value">{{item.ludeernum||item.deernum||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">材料名称:</view>
				<view class="item-value">{{item.ludeernum||item.deernum||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">规格:</view>
				<view class="item-value">{{item.standardid||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">单位:</view>
				<view class="item-value">{{item.standardcontent||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">货品分类:</view>
				<view class="item-value">{{item.sydrug||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">库存数量:</view>
				<view class="item-value">{{item.dosage||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">出库数量:</view>
				<view class="item-value">{{item.dosage||'暂无'}}</view>
			</view>

			<!-- 	<view class="card-item">
				<view class="item-key">图片:</view>
				<view class="item-value red" @click="preImage(item.picture)">查看</view>
			</view> -->

			<view class="card-item">
				<view class="item-key">库管员:</view>
				<view class="item-value ">{{item.operator}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">出库时间:</view>
				<view class="item-value ">{{item.createTime}}</view>
			</view>

		</view>
		<view class="gapBox"></view>
		<view @click="dengji" class="addButton">
			新增出库
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		ref
	} from "vue";
	import api from '@/network/services';

	// 搜索start
	const searchValue = ref()
	const clear = () => {
		searchValue.value = ''
	}
	const search = () => {
		console.log('搜索');
		getData()
	}
	// const blur = () => {
	// 	console.log('失去');
	// 	if (searchValue.value == '') {
	// 		getData()
	// 		console.log('搜索');
	// 	}
	// }
	// 搜索end

	const dataList = ref([])

	onShow(() => {
		getData()
	})
	const getData = async () => {
		let data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id
			// "deernum": searchValue.value //鹿只编号?模糊查询
			"ludeernum": searchValue.value, //鹿只编号
		}
		// const res = await api.chulaijil(data)
		const res = await uni.$post('/fygc', data)

		dataList.value = res.data.map(item => {
			if (item.picture) {
				item.picture = item.picture.split(",");
			}

			return {
				...item
			}
		})
	}

	const preImage = (item) => {
		uni.previewImage({
			urls: item
		})
	}
	const dengji = () => {
		uni.navigateTo({
			url: '/pagesZhongzhi/nzchukuAdd/nzchukuAdd'
		})
	}
</script>

<style scoped>

</style>