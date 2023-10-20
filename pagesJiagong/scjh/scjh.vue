<template>
	<view class=" viewport">

		<uv-empty v-if="dataList.length==0" mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png"></uv-empty>
		<view class="showCard" v-for="item in dataList" :key="item.id">
			<!-- <view class="card-tag"> -->
			<view class="card-tag card-btn">
				{{item.status==1?'存栏中':'已出栏'}}
			</view>
			<view class="card-item">
				<view class="item-key">计划编号:</view>
				<view class="item-value">{{item.qyname}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">计划名称:</view>
				<view class="item-value">{{item.unitname||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">计划时间:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-b-item">
				<view class="card-btn">
					关联种植溯源
				</view>
				<view class="card-btn" @click="dengji">
					已完成
				</view>
			</view>




		</view>
		<view class="gapBox"></view>
		<!-- 	<view @click="dengji" class="addButton">
			新增
		</view> -->

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
	const blur = () => {
		console.log('失去');
		if (searchValue.value == '') {
			getData()
			console.log('搜索');
		}
	}
	// 搜索end

	const dataList = ref([])

	onShow(() => {
		getData()
	})

	const current = ref(0)

	const list = ref([{
		name: '今日',
		value: 1
	}, {
		name: '本周',
		value: 2
	}, {
		name: '本月',
		value: 3
	}])

	const clickTab = (e) => {
		// current.value = e.value
		console.log(e, current.value);
	}

	const getData = async () => {
		let data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id


		}
		// const res = await api.chulaijil(data)
		const res = await uni.$post('/rljd', data)

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
			url: '/pagesJiagong/scjhAdd/scjhAdd'
		})
	}
</script>

<style scoped lang="scss">
	.card-b-item {
		display: flex;
		justify-content: space-between;
	}

	.card-btn {
		color: #fff;
		border-radius: 10px;
		padding: 5px 10px;
		background-color: #4898D0;
	}
</style>