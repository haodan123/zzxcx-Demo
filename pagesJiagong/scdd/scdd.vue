<template>
	<view class=" viewport">
		<view class="search">
			<uv-tabs :list="list" :activeStyle="{
					color: '#3c9cff',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
					}" lineWidth='70px' :scrollable="false" @click="clickTab" :current="current"></uv-tabs>
		</view>
		<uv-empty v-if="dataList.length==0" mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png"></uv-empty>
		<view class="showCard" v-for="item in dataList" :key="item.id">
			<!-- <view class="card-tag">
				{{item.status==1?'存栏中':'已出栏'}}
			</view> -->
			<view class="card-item">
				<view class="item-key">加工厂名称:</view>
				<view class="item-value">{{item.qyname}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">加工区域:</view>
				<view class="item-value">{{item.unitname||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">人员数量:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">包含人员:</view>
				<view class="item-value">{{item.number||item.id}}<span class="red" @click="openEb(item.ebnums)">查看更多</span>
				</view>
			</view>
			<view class="card-item">
				<view class="item-key">指定人员:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">制定时间:</view>
				<view class="item-value">{{item.number||item.id}}</view>
			</view>






		</view>
		<view class="gapBox"></view>
		<view @click="dengji" class="addButton">
			新增
		</view>

		<uni-popup ref="popup" type="center" @touchmove.prevent>

			<scroll-view scroll-y="true" @scrolltolower="onScrolltolower" class="popup-box">
				<view class="card-item" v-for="item in ebList" :key="item.id">
					<!-- <view class="item-key">{{item.zbianhao}}:</view>
					<view class="item-value">(商品猪)</view> -->
					<view style="width: 200rpx;">人员名称:</view>
					<view class="item-value">{{item}}</view>
				</view>
			</scroll-view>

		</uni-popup>
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
	const popup = ref()
	const ebList = ref([])
	// 查看人员
	const openEb = async (item) => {

		ebList.value = item
		popup.value.open()
	}


	const preImage = (item) => {
		uni.previewImage({
			urls: item
		})
	}

	const dengji = () => {
		uni.navigateTo({
			url: '/pagesJiagong/scddAdd/scddAdd'
		})
	}
</script>

<style scoped lang="scss">
	.popup-box {
		padding: 40rpx;
		background-color: #fff;
		margin: 0 auto;
		display: flex;
		min-height: 500rpx;
		max-height: 600rpx;
		flex-direction: column;
		width: 600rpx;
		gap: 20rpx;
		overflow-y: auto;
		border-radius: 40rpx;

		.title {
			text-align: center;
			font-size: 40rpx;
		}

		.card-item {
			display: flex;
			margin-top: 40rpx;

			.item-key {
				flex: 1;
			}

			.item-value {
				flex: 1;
			}
		}
	}
</style>