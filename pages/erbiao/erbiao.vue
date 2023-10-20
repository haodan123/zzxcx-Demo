<template>
	<view class="viewprot">
	<!-- 	<view class="search">
			<uni-search-bar @blur="blur" placeholder="通过耳标编号查询" @confirm="search" v-model="searchValue" @clear="clear">
			</uni-search-bar>
		</view> -->
		<view class="ebbox" v-if="ebList.length>0">
			<!-- <view class="eb-item" :class="{'activeEb':selectEb.includes(item.id)}" v-for="(item,index) in ebList" :key="index"
				@click="toBack(item)"> -->
			<view class="eb-item" :class="{'activeEb':findArr(selectEb,item)}" v-for="(item,index) in ebList" :key="index"
				@click="toBack(item)">
				{{item.deernum||item.id}}
			</view>
		</view>
		<view v-else>
			<!-- 暂无耳标 -->
		</view>
		<view class="gapBox"></view>

		<view class="addButton" @tap="submit">
			确定
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
	import api from '../../network/services';


	const getEb = async () => {
		let data = {

			"qyid": uni.getStorageSync('user').qyid, //企业id
			"unitid": dyid.value, //单元id
			"qsid": qsid.value, //圈舍id
			"status": "1", //状态1存栏
		}
		const res = await uni.$post('/lufiles', data)
		ebList.value = res.data.map(item => {
			return {
				...item,
				text: item.deernum || item.id,
				value: item.deernum || item.id,
			}
		})
		console.log(ebList.value);
	}
	// const lid = ref() //出栏的id
	const qsid = ref() //圈舍的id
	const dyid = ref() //单元id
	const type = ref() //猪的类型

	const ebList = ref([
		// {
		// 	name: 'EC00001',
		// 	id: 133
		// },
		// {
		// 	name: 'EC00002',
		// 	id: 222
		// }, {
		// 	name: 'EC00003',
		// 	id: 311
		// }
	])
	// 选中的耳标id
	const selectEb = ref([])

	const clear = () => {
		searchValue.value = ''
	}
	const search = () => {
		console.log('搜索');
	}
	const blur = () => {
		console.log('搜索');
	}
	// 搜索end

	const findArr = (arr, e) => {
		// console.log('ebarr', arr);
		if (arr.length < 1) {
			return false
		} else {
			// console.log('找到的耳标',arr);
			return arr.find(item => item.id === e.id)
		}
	}

	const toBack = (e) => {

		// const foundObject = selectEb.value.find(item => item.name === e.name);
		const foundObject = findArr(selectEb.value, e)
		if (foundObject) {
			// console.log(selectEb.value.indexOf(e.id));
			const indexof = selectEb.value.findIndex(inof => inof.id === e.id)
			console.log(indexof);
			selectEb.value.splice(indexof, 1)
		} else {
			console.log('eb', selectEb.value);
			selectEb.value = [...selectEb.value, e]
		}
		console.log('最后选中', selectEb.value);
	}
	

	onLoad(({
		eb,
		qsid: qsid1,
		dyid: dyid1
	}) => {
		console.log(dyid, qsid);
		qsid.value = qsid1
		dyid.value = dyid1

		if (eb) {
			// console.log(JSON.parse(eb));
			selectEb.value = JSON.parse(eb) //回显耳标
			console.log(selectEb.value);
		}

	})
	onShow(() => {
		getEb()
	})

	// 选择玩后返回
	const submit = () => {

		uni.setStorage({
			key: 'selectAddress',
			// data: e.name,
			// data: data,
			data: selectEb.value,
			success() {
				uni.navigateBack();
			}
		})
	}
</script>

<style scoped>
	.ebbox {
		display: flex;
		display: grid;
		/*  声明列的宽度  */
		grid-template-columns: repeat(2, 180px);
		/* grid-template-rows: 150px 150px ; */
		grid-gap: 5px;
		justify-content: center;
	}

	.eb-item {
		border: 1px solid #4898D0;
		color: #4898D0;
		padding: 20rpx 0;
		border-radius: 30rpx;
		text-align: center;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.activeEb {
		background-color: #4898D0;
		color: #fff;
	}
</style>