<template>
	<view class="viewport">

		<view class="formCard">
			<uni-forms :modelValue="formData" ref="form" label-width='80px' label-align='left'>
				<uni-forms-item :rules="[{required: true,errorMessage: '请选择地块名称'}]" label="地块名称:" name="dkname" required
					style="position: relative;">
					<uani-datapicker v-model="formData.dkname" :localdata="dkList" placeholder="请选择" @onSelect="ssnsSelect">
					</uani-datapicker>
					<image class="saoma" @click.stop="saoma('dikuai')" src="@/static/images/icon/erweima.png" mode=""></image>

				</uni-forms-item>
				<uni-forms-item :rules="[{required: true,errorMessage: '请选择商品分类'}]" label="商品分类:" name="spfl" required
					style="position: relative;">
					<uani-datapicker v-model="formData.spfl" :localdata="spflList" placeholder="请选择" @onSelect="ssnsSelect2">
					</uani-datapicker>
					<!-- <image class="saoma" @click.stop="saoma('quanshe')" src="@/static/images/icon/erweima.png" mode=""></image> -->
				</uni-forms-item>
				<uni-forms-item :rules="[{required: true,errorMessage: '请选择商品名称'}]" label="商品名称:" name="spname" required
					style="position: relative;">
					<uani-datapicker v-model="formData.spname" :localdata="spnameList" placeholder="请选择" @onSelect="ssnsSelect3">
					</uani-datapicker>
					<!-- <image class="saoma" @click.stop="saoma('luzhi')" src="@/static/images/icon/erweima.png" mode=""></image> -->
				</uni-forms-item>

				<uni-forms-item :rules="[{required: true,errorMessage: '请选择商品等级'}]" label="商品等级:" name="spdj" required
					style="position: relative;">
					<uani-datapicker v-model="formData.spdj" :localdata="spdjList" placeholder="请选择" @onSelect="ssnsSelect4">
					</uani-datapicker>
					<!-- <image class="saoma" @click.stop="saoma('luzhi')" src="@/static/images/icon/erweima.png" mode=""></image> -->
				</uni-forms-item>


				<uni-forms-item label="商品重量:" name="spzl" :rules="[{required: true,errorMessage: '请输入商品重量'}]" required
					style="position: relative;">
					<uni-easyinput type="digit" v-model="formData.spzl" placeholder="请输入商品重量,单位kg" />
				</uni-forms-item>

				<uni-forms-item label="子码数量:" name="zmsl" :rules="[{required: true,errorMessage: '请输入子码数量'}]" required
					style="position: relative;">
					<uni-easyinput type="digit" v-model="formData.zmsl" placeholder="请输入子码数量" />
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
		name: uni.getStorageSync('user').zname || '',
		dkname: '', //地块名称
		spfl: '', //商品分类
		spname: '', //商品名称
		spdj: '', //商品等级
		spzl: '', //商品重量
		zmsl: '', //子码数量

		picture: [] //图片
	})
	const dkList = ref([]) //地块数组
	const spflList = ref([]) //商品分类数组
	const spnameList = ref([]) //商品名称数组
	const spdjList = ref([
		{text:'一级',value:0},
		{text:'二级',value:1},
		{text:'三级',value:2},
	]) //商品等级数组


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
		if (!e.value) {
			uni.showToast({
				title: '未找到该地块',
				icon: 'none'
			})
		}
		formData.value.qsid = ''
		formData.value.lzid = ''
		formData.value.lzbh = ''

		quansheList.value = []
		getQuanshe()
		console.log('圈舍', formData.value.qsid);
	}
	// 选分类
	const ssnsSelect2 = (e) => {

		formData.value.lzid = ''
		formData.value.lzbh = ''
		lzList.value = []
		getLuzhi()
	}
	// 选名称
	const ssnsSelect3 = (e) => {
		// formData.value.pinzhong = e.value
		// const findbh = lzList.value.find(item => item.text === formData.value.lzbh)
		// if (findbh) {

		// 	formData.value.lzid = findbh.id
		// } else {
		// 	uni.showToast({
		// 		title: '圈舍下未找到该耳标',
		// 		icon: 'none'
		// 	})
		// }
		// console.log('选中的id', formData.value.lzid);
	}


	// 选等级
	const ssnsSelect4 = (e) => {
		// formData.value.yl = ywList.value.find(item => item.value == formData.value.ywname).dose || '暂无'

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
		 dkList.value = res.data
		// danyuanList.value = res.data.map(item => {
		// 	return {
		// 		value: item.id,
		// 		text: item.unitname
		// 	}
		// })

	}
	
	// 获取商品分类
	const getSpfl = async () => {
		const data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id
			"type": "1", //1:养殖2：育种
			"standardtype": 2 //标准类型1养殖？育种2防疫

		}
		const res = await uni.$post('/yzbz', data)
		spflList.value = res.data
		// bcList.value = res.data.map(item => {
		// 	return {
		// 		...item,
		// 		text: item.standardname,
		// 		value: item.id
		// 	}
		// })
		// formData.value.xzbz = bcList.value[0].id
	}

	// 获取商品名称
	const getSpname = async () => {
		const data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id
			"unitid": formData.value.dyid, //单元id
			"qsid": formData.value.qsid, //圈舍id
			"status": "1", //状态1存栏

		}
		const res = await uni.$post('/lufiles', data)
		spnameList.value = res.data
		// lzList.value = res.data.map(item => {
		// 	return {
		// 		...item,
		// 		text: item.deernum || item.id,
		// 		value: item.deernum || item.id,
		// 		// value: item.id
		// 	}
		// })

	}

	// 获取商品等级
	const getSpdj = async () => {
		const data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id

		}
		// const res = await uni.$post(`/syyw?qyid=${data.qyid}`, data)
		// spdjList.value = res.data
		// ywList.value = res.data.map(item => {
		// 	return {
		// 		...item,
		// 		text: item.name,
		// 		value: item.name,
		// 	}
		// })
		// formData.value.ywname = ywList.value[0].value

		// formData.value.yl = ywList.value.find(item => item.value == formData.value.ywname).dose || '暂无'

	}





	onShow(() => {
		getDk()
		getSpfl()
		getSpdj()
	})

	// 扫码
	const saoma = (type) => {

		uni.scanCode({
			success: async function(res) {

				let qrCode
				if (type == 'quanshe') {
					// // 使用正则表达式来判断第一个数据是否是JSON格式
					// var jsonPattern = /^{.*}$/;
					// if (jsonPattern.test(res.result)) {
					// 	console.log("我们的二维码");
					// 	qrCode = JSON.parse(res.result);
					// } else {
					// 	console.log("对面的二维码");
					// 	const data = {
					// 		"shedCode": res.result
					// 	}
					// 	const jieguo = await uni.$post('/getShedCode', data)
					// 	qrCode = jieguo.data
					// }
				} else {
					qrCode = res.result
				}
				console.log(qrCode);
				// let qrCode = JSON.parse(res.result)
				if (!qrCode) return
				if (type == 'dikuai') { //地块
					qrCode = JSON.parse(qrCode)
					formData.value.dkname = qrCode.dkname //单元id

					// console.log('扫码圈舍', formData.value.qsid);
				} else if (type == 'fudai') {
					formData.value.fbianhao = qrCode //父代编号
				} 

			},
			fail: function(err) {
				console.log(err)
				uni.showToast({
					title: '请扫描正确的二维码！',
					icon: 'none',
					duration: 2000
				});
			}
		});
	}
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