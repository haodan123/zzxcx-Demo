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
				<view class="item-key">计划批次:</view>
				<view class="item-value">{{item.qyname}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">计划名称:</view>
				<view class="item-value">{{item.unitname||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">基地名称:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">地块名称:</view>
				<view class="item-value">{{item.number||item.id}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">种植品种:</view>
				<view class="item-value">{{item.sex=='1'?'公鹿':'母鹿'}}</view>
			</view>

			<view class="card-item">
				<view class="item-key">种植面积:</view>
				<view class="item-value">{{item.variety||'暂无'}} </view>
			</view>
			<view class="card-item">
				<view class="item-key">投入金额:</view>
				<view class="item-value">{{item.weight}}kg</view>
			</view>
		<!-- 	<view class="card-item">
				<view class="item-key">图片:</view>
				<view class="item-value red" @click="preImage(item.picture)">查看</view>
			</view> -->
			<view class="card-item">
				<view class="item-key">计划产量:</view>
				<view class="item-value ">{{item.fnumber||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">预估产值:</view>
				<view class="item-value ">{{item.mnumber||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">计划时间:</view>
				<view class="item-value ">{{item.person}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">创建时间:</view>
				<view class="item-value ">{{item.addtime}}</view>
			</view>


		</view>
		<view class="gapBox"></view>
		<!-- <view @click="dengji" class="addButton">
			新增鹿只
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
		name: '今周',
		value: 1
	}, {
		name: '本月',
		value: 2
	}, {
		name: '本年',
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
			url: '/pagesYuzhong/rulanAdd/rulanAdd'
		})
	}
</script>

<style scoped>

</style>