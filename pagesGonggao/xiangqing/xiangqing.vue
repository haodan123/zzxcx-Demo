<template>
	<view class="newsDetail">
		<view class="title">
			{{news.noticeTitle}}
		</view>
		<view class="subtitle">
			<view class="sub-left">
				<!-- {{news.issuing}} -->

			</view>
			<view class="sub-right">
				{{news.createTime}}
			</view>
		</view>

		<!-- <rich-text :nodes="'哈哈哈哈'"></rich-text> -->
		<bctos-rich-text :nodes="news.noticeContent"></bctos-rich-text>

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

	const news = ref({})
	const id = ref('')
	onLoad((e) => {
		
		id.value = e.id
		console.log(e);
		getNews()
	})




	// 获取新闻详情
	const getNews = async () => {

		const data = {
			"noticeId": id.value,
			"username": uni.getStorageSync('user').phone //登录账号
			
		}
		console.log(data);
		const res = await uni.$post('/NoticeUserBy', data)
		news.value = res.data
		// const res = await uni.$api.xinwenxiangqing(data)
		// news.value = res.data
	}
</script>




<style lang="scss" scoped>
	.newsDetail {
		padding: 10px 15px;
	}

	.title {
		color: #000;
		font-size: 24px;
	}

	.subtitle {
		display: flex;
		justify-content: space-between;
		color: #ccc;
		font-size: 14px;
		margin: 20px 0;
	}
</style>