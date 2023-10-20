<template>
	<view class="viewport">

		<view class="formCard">
			<uni-forms :modelValue="formData" ref="form" label-width='100px' label-align='left'>

				

				<uni-forms-item :rules="[{required: true,errorMessage: '请选择所属批次'}]" label="所属批次:" name="jcpc" required
					style="position: relative;">
					<uani-datapicker v-model="formData.jcpc" :localdata="jcpcList" placeholder="请选择" @onSelect="ssnsSelect3">
					</uani-datapicker>
				</uni-forms-item>
				<uni-forms-item label="批次名称:" name="pcname" :rules="[{required: true,errorMessage: '请输入批次名称'}]" required
					style="position: relative;">
					<uni-easyinput type="digit" v-model="formData.pcname" disabled placeholder="请输入批次名称" />
				</uni-forms-item>

				<uni-forms-item :rules="[{required: true,errorMessage: '请选择操作类型'}]" label="操作类型:" name="czlx" required
					style="position: relative;">
					<uani-datapicker v-model="formData.czlx" :localdata="czlxList" placeholder="请选择" @onSelect="ssnsSelect4">
					</uani-datapicker>
				</uni-forms-item>
				<uni-forms-item :rules="[{required: true,errorMessage: '请选择操作流程'}]" label="操作流程:" name="czlc" required
					style="position: relative;">
					<uani-datapicker v-model="formData.czlc" :localdata="czlcList" placeholder="请选择" @onSelect="ssnsSelect5">
					</uani-datapicker>
				</uni-forms-item>


		

				<uni-forms-item :rules="[{required: true,errorMessage: '请上传现场图片'}]" label="现场图片:" name="picture" required>
				</uni-forms-item>

				<view style="width: 100%;">
					<uni-auploadimg :action="uploadUrl" @onChange="onChange"></uni-auploadimg>
				</view>
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
		jdname: uni.getStorageSync('user').zname || '', //加工厂
		jcpc: '', //检测批次
		pcname:'',//批次名称
		czlx: '', //操作类型
		czlc: '', //操作流程
	

		picture: [] //图片
	})


	const jcpcList = ref([]) //检测批次数组
	const czlxList = ref([]) //操作类型数组
	const czlcList = ref([]) //操作流程数组


	// 图片
	const onChange = (e) => {
		formData.value.picture = String(e)
		// console.log(formData.value.picture);
		console.log(String(formData.value.picture));
	}
	// 选类型
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
	// 选货品分类
	const ssnsSelect2 = (e) => {

		formData.value.lzid = ''
		formData.value.lzbh = ''
		lzList.value = []
		// getLuzhi()
	}
	// 选材料名称
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


	// 选规格
	const ssnsSelect4 = (e) => {
		// formData.value.yl = ywList.value.find(item => item.value == formData.value.ywname).dose || '暂无'

	}

	// 选单位
	const ssnsSelect5 = (e) => {
		// formData.value.yl = ywList.value.find(item => item.value == formData.value.ywname).dose || '暂无'

	}
	// 选库管员
	const ssnsSelect6 = (e) => {
		// formData.value.yl = ywList.value.find(item => item.value == formData.value.ywname).dose || '暂无'

	}
	// 时间
	const changTime = (value) => {
		console.log(value);
		const formattedDate = moment(value).format('YYYY-MM-DD HH:mm:ss')
		formData.value.jctime = formattedDate
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

	// 获取货品分类
	const gethpfl = async () => {
		let data = {
			"qyid": uni.getStorageSync('user').qyid
		}
		// const res = await api.lan(data)
		const res = await uni.$post('/unitlist', data)
		hpflList.value = res.data
		// danyuanList.value = res.data.map(item => {
		// 	return {
		// 		value: item.id,
		// 		text: item.unitname
		// 	}
		// })

	}

	// 获取材料名称
	const getclmc = async () => {
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

	// 获取规格
	const getGuige = async () => {
		const data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id
			"unitid": formData.value.dyid, //单元id
			"qsid": formData.value.qsid, //圈舍id
			"status": "1", //状态1存栏

		}
		const res = await uni.$post('/lufiles', data)
		guigeList.value = res.data
		// lzList.value = res.data.map(item => {
		// 	return {
		// 		...item,
		// 		text: item.deernum || item.id,
		// 		value: item.deernum || item.id,
		// 		// value: item.id
		// 	}
		// })

	}

	// 获取单位
	const getDw = async () => {
		const data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id

		}
		// const res = await uni.$post(`/syyw?qyid=${data.qyid}`, data)
		// danweiList.value = res.data
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

	// 获取库管员
	const getKgy = async () => {
		const data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id

		}

		// const res = await uni.$post(`/syyw?qyid=${data.qyid}`, data)
		// kuguanyList.value= res.data
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
		gethpfl()
		getclmc()
		getGuige()
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