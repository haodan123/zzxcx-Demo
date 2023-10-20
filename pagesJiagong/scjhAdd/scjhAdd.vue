<template>
	<view class="viewport">

		<view class="formCard">
			<uni-forms :modelValue="formData" ref="form" label-width='80px' label-align='left'>
				<uni-forms-item :rules="[{required: true,errorMessage: '请输入计划编号'}]" label="计划编号:" name="jhbh" required
					style="position: relative;">
					<uni-easyinput type="text" v-model="formData.jhbh" disabled placeholder="请输入计划编号" />

				</uni-forms-item>
				<uni-forms-item :rules="[{required: true,errorMessage: '请输入计划名称'}]" label="计划名称:" name="jhmc" required
					style="position: relative;">
					<uni-easyinput type="text" v-model="formData.jhmc" disabled placeholder="请输入计划名称" />

				</uni-forms-item>
				<uni-forms-item :rules="[{required: true,errorMessage: '请输入计划时间'}]" label="计划时间:" name="jhsj" required
					style="position: relative;">
					<uni-easyinput type="text" v-model="formData.jhsj" disabled placeholder="请输入计划时间" />

				</uni-forms-item>
				<uni-forms-item :rules="[{required: true,errorMessage: '请选择计划加工数量'}]" label="计划加工数量:" name="jhjgsl" required
					style="position: relative;">
					<uni-easyinput type="number" v-model="formData.jhjgsl" disabled placeholder="请输入计划加工数量" />

				</uni-forms-item>
				<uni-forms-item :rules="[{required: true,errorMessage: '请输入本次生产数量'}]" label="本次生产数量:" name="scsl" required
					style="position: relative;">
					<uni-easyinput type="number" v-model="formData.scsl" placeholder="请输入本次生产数量" />

				</uni-forms-item>
				<uni-forms-item :rules="[{required: true,errorMessage: '请输入未加工数量'}]" label="未加工数量:" name="wjgsl" required
					style="position: relative;">
					<uni-easyinput type="text" v-model="formData.wjgsl" disabled placeholder="请输入未加工数量" />

				</uni-forms-item>


				<view class="jgjl-box">
					<view class="title">
						加工记录
					</view>
					<view class="jg-item" v-for="item in 4" :key="item">
						<view class="jgnum">
							加工数量 :1
						</view>
						<view class="jgsj">
							加工时间:2023
						</view>
						<view class="jgsl">
							剩余加工数量:1
						</view>
					</view>
				</view>



				<!-- 	<uni-forms-item :rules="[{required: true,errorMessage: '请选择库管员'}]" label="库管员:" name="kuguany" required
					style="position: relative;">
					<uani-datapicker v-model="formData.kuguany" :localdata="kuguanyList" placeholder="请选择" @onSelect="ssnsSelect6">
					</uani-datapicker>
				</uni-forms-item> -->


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
		jdname: uni.getStorageSync('user').zname || '', //加工厂

		jhbh: '', //计划编号
		jhmc: '', //计划名称
		jhsj: '', //计划时间
		jhjgsl: '', //计划加工数量
		scsl: '', //生产数量
		wjgsl: '', //未加工数量

		picture: [] //图片
	})


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




	onShow(() => {
		gethpfl()
		getclmc()
		getGuige()
	})
</script>

<style lang="scss">
	.jgjl-box {
		display: flex;
		flex-direction: column;
		gap: 10px;

	}

	.title {
		font-size: 14px;
	}

	.jg-item {
		padding: 10px;
		display: flex;
		justify-content: space-between;
		border: 1px solid #ccc;
		border-radius: 10px;
	}
</style>