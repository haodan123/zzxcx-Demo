<template>
	<view class="viewport">

		<view class="formCard">
			<uni-forms :modelValue="formData" ref="form" label-width='80px' label-align='left'>
				<uni-forms-item label="加工厂:" name="jdname" :rules="[{required: true,errorMessage: '请输入加工厂'}]" required
					style="position: relative;">
					<uni-easyinput type="digit" v-model="formData.jdname" disabled placeholder="请输入加工厂" />
				</uni-forms-item>
				<uni-forms-item :rules="[{required: true,errorMessage: '请选择批次'}]" label="批次:" name="pici" required
					style="position: relative;">
					<uani-datapicker v-model="formData.pici" :localdata="piciList" placeholder="请选择" @onSelect="ssnsSelect">
					</uani-datapicker>
				</uni-forms-item>

				<uni-forms-item :rules="[{required: true,errorMessage: '请选择商品名称'}]" label="商品名称:" name="spname" required
					style="position: relative;">
					<uani-datapicker v-model="formData.spname" :localdata="spnameList" placeholder="请选择" @onSelect="ssnsSelect2">
					</uani-datapicker>
				</uni-forms-item>

				


				<uni-forms-item label="入库数量:" name="rknum" :rules="[{required: true,errorMessage: '请输入入库数量'}]" required
					style="position: relative;">
					<uni-easyinput type="digit" v-model="formData.rknum" placeholder="请输入入库数量" />
				</uni-forms-item>

		


				<!-- <uni-forms-item :rules="[{required: true,errorMessage: '请上传图片'}]" label="鹿只图片:" name="picture" required>
				</uni-forms-item>

				<view style="width: 100%;">
					<uni-auploadimg :action="uploadUrl" @onChange="onChange"></uni-auploadimg>
				</view> -->
			</uni-forms>

		</view>


		<view class="gapBox"></view>
		<!-- <view class="addButton" @tap="submit">
			
		</view> -->
		<button class="addButton1" :disabled="loading" :loading="loading" @tap="submit">
			确定
		</button>
	</view>
</template>

<script setup>
	import moment from 'moment';

	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		uploadUrl
	} from '@/config/global-config';
	import api from '@/network/services';
	import {
		computed,
		ref
	} from "vue";


	const form = ref()
	const formData = ref({
		jdname: uni.getStorageSync('user').zname || '',//基地名称
		pici: '', //批次
		spname: '', //商品名称
		rknum: '', //入库数量
		kuguany: '', //库管员

		picture: [] //图片
	})

	const piciList = ref([]) //批次数组
	const spnameList = ref([]) //商品名称数组


	// 图片
	const onChange = (e) => {
		formData.value.picture = String(e)
		// console.log(formData.value.picture);
		console.log(String(formData.value.picture));
	}
	// 选地块
	const ssnsSelect = (e) => {
		// formData.value.lid = e.value
		console.log(e);
		// if (!e.value) {
		// 	uni.showToast({
		// 		title: '未找到该地块',
		// 		icon: 'none'
		// 	})
		// }
		formData.value.qsid = ''
		formData.value.lzid = ''
		formData.value.lzbh = ''

		quansheList.value = []
		// getQuanshe()
		console.log('圈舍', formData.value.qsid);
	}
	// 选商品
	const ssnsSelect2 = (e) => {

		formData.value.lzid = ''
		formData.value.lzbh = ''
		lzList.value = []
		// getLuzhi()
	}
	

	const loading = ref(false)
	const submit = () => {
		uni.showLoading()
		loading.value = true
		form.value.validate().then(async (res) => {


			let data = {
				"qyid": uni.getStorageSync('user').qyid,
				"unitid": formData.value.dyid,
				"qsid": formData.value.qsid,
				// "picture": String(formData.value.picture), //标准图片
				"operator": uni.getStorageSync('user').name, //操作人

				// "deernum": formData.value.lzbh, //鹿只编号id
				"deernum": formData.value.lzid, //鹿只编号id
				"dosage": formData.value.yl, //用量
				"sydrug": formData.value.ywname, //使用药物
			}

			await uni.$post('/addfygc', data)

			uni.showToast({
				title: '操作成功'
			})
			setTimeout(() => {
				uni.navigateBack()
				loading.value = false
			}, 1000)

			uni.hideLoading()
			// console.log('表单数据信息：', res);
		}).catch(err => {
			uni.hideLoading()
			loading.value = false
			console.log('表单错误信息：', err);
		})
	}

	// 获取地块
	const getDk = async () => {
		let data = {
			"qyid": uni.getStorageSync('user').qyid
		}
		// const res = await api.lan(data)
		const res = await uni.$post('/unitlist', data)
		// hpflList.value = res.data
		// danyuanList.value = res.data.map(item => {
		// 	return {
		// 		value: item.id,
		// 		text: item.unitname
		// 	}
		// })

	}

	// 获取商品
	const getSp = async () => {
		const data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id
			"type": "1", //1:养殖2：育种
			"standardtype": 2 //标准类型1养殖？育种2防疫

		}
		const res = await uni.$post('/yzbz', data)
		clmcList.value = res.data
		// bcList.value = res.data.map(item => {
		// 	return {
		// 		...item,
		// 		text: item.standardname,
		// 		value: item.id
		// 	}
		// })
		// formData.value.xzbz = bcList.value[0].id
	}

	
	





	onShow(() => {
		getDk()
		getSp()

	})
</script>

<style lang="scss">
	// tabs
	.tabs {
		display: flex;
		justify-content: space-around;
		line-height: 60rpx;
		margin: 0 10rpx;
		background-color: #fff;
		box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
		position: relative;
		z-index: 9;
		// width: 100%;

		.item {
			flex: 1;
			text-align: center;
			padding: 20rpx;
			font-size: 28rpx;
			color: #262626;
		}

		.cursor {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 33%;
			height: 6rpx;
			// padding: 0 50rpx;
			background-color: #5E97CB;
			/* 过渡效果 */
			transition: all 0.4s;
		}

		.active {
			color: #5E97CB;
		}
	}
</style>