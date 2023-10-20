<template>
	<view>
		<image class="img" @click="tologin" src="/static/images/login/tu1.jpg" mode=""></image>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	const tologin = ()=>{
		uni.navigateTo({
			url:'/pages/login/login'
		})
	}
</script>

<style scoped lang="scss">
	.img {
		width: 100vw;
		height: 100vh;
	}
</style>