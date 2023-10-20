<template>
	<view class=" viewport">
		<view class="search">
			<uv-tabs :list="list" :activeStyle="{
					color: '#3c9cff',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
					}" lineWidth='70px' :scrollable="false" @click="clickTab" :current="current"></uv-tabs>
			<uni-search-bar @blur="blur" placeholder="请输入商品名称" @confirm="search" v-model="searchValue" @clear="clear">
			</uni-search-bar>
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
				<view class="item-key">级别:</view>
				<view class="item-value">{{item.unitname||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">产品名称:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">产品编码:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">规格:</view>
				<view class="item-value">{{item.number||item.id}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">单位:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">金额:</view>
				<view class="item-value">{{item.number||item.id}}</view>
			</view>

			<view class="card-item">
				<view class="item-key">配方:</view>
				<view class="item-value red" @click="preImage(item.picture)">查看</view>
			</view>




		</view>
		<view class="gapBox"></view>
	<!-- 	<view @click="dengji" class="addButton">
			生成溯源
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
			url: '/pagesJiagong/scspAdd/scspAdd'
		})
	}
</script>

<style scoped>

</style>