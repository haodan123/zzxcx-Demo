<template>
	<view class="viewport">

		<view class="formCard">
			<uni-forms :modelValue="formData" ref="form" label-width='80px' label-align='left'>
				<!-- 	<view class="title">
					基本信息
				</view> -->
				<uni-section type="line" title="基本信息:" titleFontSize="16px" titleFontWeight="bold">
				</uni-section>
				<view style="height: 10px;"></view>
				<uni-forms-item :rules="[{required: true,errorMessage: '请选择地块名称'}]" label="地块名称:" name="dkmc" required
					style="position: relative;">
					<uani-datapicker v-model="formData.dkmc" :localdata="dkmcList" placeholder="请选择" @onSelect="ssnsSelect">
					</uani-datapicker>
				</uni-forms-item>

				<uni-forms-item :rules="[{required: true,errorMessage: '请选择执行人'}]" label="执行人:" name="zxr" required
					style="position: relative;">
					<uani-datapicker v-model="formData.zxr" :localdata="zxrList" placeholder="请选择" @onSelect="ssnsSelect2">
					</uani-datapicker>
				</uni-forms-item>

				<uni-forms-item :rules="[{required: true,errorMessage: '请选择执行时间'}]" label="执行时间:" name="time" required
					style="position: relative;">
					<uni-datetime-picker type="datetime" returnType="date" @change="changTime" :clear-icon="false"
						v-model="formData.time" />
				</uni-forms-item>

				<uni-forms-item label="所需人数:" name="rennum" :rules="[{required: true,errorMessage: '请输入所需人数'}]" required
					style="position: relative;">
					<uni-easyinput type="digit" v-model="formData.rennum" placeholder="请输入所需人数" />
				</uni-forms-item>

				<uni-forms-item label="注意事项:" name="zysx" :rules="[{required: true,errorMessage: '请输入注意事项'}]" required
					style="position: relative;">
					<uni-easyinput type="text" v-model="formData.zysx" placeholder="请输入注意事项" />
				</uni-forms-item>

				<view class="line"></view>

				<!-- 	<view class="title">
					任务信息
				</view> -->
				<uni-section type="line" title="任务信息:" titleFontSize="16px" titleFontWeight="bold">
				</uni-section>
				<view style="height: 10px;"></view>

				<uni-forms-item :rules="[{required: true,errorMessage: '请选择适用品种'}]" label="适用品种:" name="sypz" required
					style="position: relative;">
					<uani-datapicker v-model="formData.sypz" :localdata="sypzList" placeholder="请选择" @onSelect="ssnsSelect3">
					</uani-datapicker>
				</uni-forms-item>

				<uni-forms-item :rules="[{required: true,errorMessage: '请选择农事流程'}]" label="农事流程:" name="nslc" required
					style="position: relative;">
					<uani-datapicker v-model="formData.nslc" :localdata="nslcList" placeholder="请选择" @onSelect="ssnsSelect4">
					</uani-datapicker>
				</uni-forms-item>


				<view class="bzContent" style="margin: 0;padding: 0;width: 100%;">
					<view class="contentItem">
						<uni-section type="" title="具体内容:" titleFontSize="16px" titleFontWeight="bold">
						</uni-section>
						<view class="neirong">
							{{slelectData.standardcontent||'暂无'}}
						</view>
					</view>
					<view class="contentItem">
						<uni-section type="" title="计价方式:" titleFontSize="16px" titleFontWeight="bold">
						</uni-section>
						<view class="neirong">
							{{slelectData.standardcontent||'暂无'}}
						</view>
					</view>
					<view class="contentItem">
						<uni-section type="" title="单价(元):" titleFontSize="16px" titleFontWeight="bold">
						</uni-section>
						<view class="neirong">
							{{slelectData.standardcontent||'暂无'}}
						</view>
					</view>
					<view class="contentItem">
						<uni-section type="" title="验收标准:" titleFontSize="16px" titleFontWeight="bold">
						</uni-section>
						<view class="neirong">
							{{slelectData.standardcontent||'暂无'}}
						</view>
					</view>
					<view class="contentItem">
						<!-- <view class="title"> -->
						<uni-section type="" title="标准示例:" titleFontSize="16px" titleFontWeight="bold">
						</uni-section>
						<!-- </view> -->
						<view class="neirong-img">
							<view class="image" v-for="(item,index) in slelectData.standardpic" :key="item" @click="preImage(item)">
								<image :src="item" mode=""></image>
							</view>
						</view>
					</view>
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
		jdname: uni.getStorageSync('user').zname || '', //基地名称
		dkmc: '', //地块名称
		zxr: '', //执行人
		time: '', //执行时间
		rennum: '', //所需人数
		zysx: '', //注意事项
		sypz: '', //适用品种
		nslc: '', //农事流程


		picture: [] //图片
	})

	const dkmcList = ref([]) //地块名称数组
	const zxrList = ref([]) //执行人数组
	const sypzList = ref([]) //适用品种数组
	const nslcList = ref([]) //农事流程数组


	const slelectData = ref({
		standardcontent: '',
		standardpic: ''
	}) //选中的数据

	// 选地块
	const ssnsSelect = (e) => {

		formData.value.qsid = ''
		formData.value.lzid = ''
		formData.value.lzbh = ''

		quansheList.value = []
		// getQuanshe()
		console.log('圈舍', formData.value.qsid);
	}
	// 选执行人
	const ssnsSelect2 = (e) => {

		formData.value.lzid = ''
		formData.value.lzbh = ''
		lzList.value = []
		// getLuzhi()
	}
	// 选适用品种
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


	// 选农事流程
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

	// 获取地块名称
	const getdkmc = async () => {
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

	// 获取执行人
	const getzxr = async () => {
		const data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id
			"type": "1", //1:养殖2：育种
			"standardtype": 2 //标准类型1养殖？育种2防疫

		}
		const res = await uni.$post('/yzbz', data)
		zxrList.value = res.data
		// bcList.value = res.data.map(item => {
		// 	return {
		// 		...item,
		// 		text: item.standardname,
		// 		value: item.id
		// 	}
		// })
		// formData.value.xzbz = bcList.value[0].id
	}

	// 获取适用品种
	const getsypz = async () => {
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

	// 获取农事流程
	const getlslc = async () => {
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


	// 预览图片
	const preImage = (item) => {
		showOrNot.value = false
		uni.previewImage({
			current: 0,
			urls: [item]
		})
	}
	onShow(() => {
		// gethpfl()
		// getclmc()
		// getGuige()
	})
</script>

<style lang="scss">
	.title {
		font-size: 16px;
		margin-bottom: 10px;
		color: red;
	}

	.line {
		width: 100%;
		margin: 5px;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.25)
	}
</style>