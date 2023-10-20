<template>
	<view class="loginPage">
		<view class="bgC">

		</view>
		<view class="logo">
			<image
				src="http://pgz-cctvnp2.shidongvr.com:443/profile/upload/2023/10/10/4e14236c-b9ba-42e8-83ea-c5efc9d03ef7.jpg"
				mode=""></image>
			<!-- <image :src="tu" mode=""></image> -->
		</view>
		<view class="loginCard">
			<view class="title">西丰梅花鹿产业服务采集端</view>
			<uni-forms class="form" :modelValue="formData" ref="form">
				<uni-forms-item label-width="55px" label="账号:" required name="phone"
					:rules="[{required: true,errorMessage: '请输入账号'}]">
					<uni-easyinput prefixIcon="person" type="text" v-model="formData.phone" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label-width="55px" required label="密码:" name="password"
					:rules="[{required: true,errorMessage: '请输入密码'}]">
					<uni-easyinput prefixIcon="locked" type="password" v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
			<button @click="submitForm" class="botton" :loading="loading" :disabled="loading">登录</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from "vue";
	// import logotu from "@/static/images/banner/banna1.jpg"
	import api from "@/network/services";
	// import tu from "@/static/images/login/tu3.jpg"

	const form = ref(null)
	const loading = ref(false)
	const formData = ref({
		phone: '',
		password: ''
	})

	const submitForm = async () => {
		try {
			console.log('denlu');
			await form.value.validate()
			// console.log('表单数据信息：', result);
			loading.value = true
			// const res = await api.login(formData.value)
			const res = await uni.$post('/loginIng', formData.value)
			console.log(res);
			if (res.msg == '账号或密码输入错误') {
				loading.value = false
				return uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
			uni.setStorageSync('user', res.data)
			uni.showToast({
				title: '登录成功',
				icon: 'none'
			})
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/home/index/index'
				})
			}, 500)



		} catch (e) {
			console.log('shibai');
		} finally {
			loading.value = false
		}

	}

	onMounted(() => {
		const user = uni.getStorageSync('user')
		console.log(user);
		if (user.phone) {
			uni.reLaunch({
				url: '/pages/home/index/index'
			})
		}

	})
</script>

<style scoped lang="scss">
	.bgC {
		width: 100vh;
		height: 40vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		background-color: #638FF8;
	}

	.loginPage {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		// background-color: #e4e4e4;
		width: 100%;
		// height: 100vh;
	}

	.loginCard {
		border-radius: 30px;
		width: 80%;
		height: 250px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		// justify-content: center;
		// background-color: red;
		background-color: #fff;
		// box-shadow: 10px 10px 40px #bebebe,
		// 	-10px -10px 40px #ffffff;
		box-shadow: 1px 2px 3px #bebebe, 0px 0px 9px #ffffff;
		margin-top: 4vh;
		padding: 20px;

		.title {
			text-align: center;
			font-size: 50rpx;
			margin-bottom: 65rpx;
			color: #638FF8;
		}

		.botton {
			color: #fff;
			background-color: #638FF8;
			width: 80%;
			height: 37px;
			line-height: 37px;
			border-radius: 24px;
		}
	}


	.logo {
		margin-top: 4vh;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>