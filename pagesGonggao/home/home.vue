<template>
	<view class="pagehome">
		<view class="homeList">
			<view class="listItem" @click="goXiangqing(item.noticeId)" v-for="item in list" :key="item.noticeId">
				<!-- 	<view class="itemLeft">
					<uni-badge class="uni-badge-left-margin" :text="1" absolute="rightTop" size="small">
						<image src="/static/images/banner/banna1.jpg" mode=""></image>÷
					</uni-badge>
				</view> -->
				<!-- <uni-badge class="uni-badge-left-margin" :text="1" absolute="rightTop" size="small"> -->
				<view class="itemMid">
					<view class="title slh">
						{{item.noticeTitle}}
					</view>

					<view class="slh">
						{{item.noticeContent}}
					</view>
				</view>
				<!-- </uni-badge> -->
				<view class="itemRight">
					{{item.createTime}}
				</view>
				<!-- <view class="icon" v-if="item.type!=1">
					未读
				</view> -->
				<view class="icon2" v-if="item.type!=1">

				</view>

			</view>
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
	const list = ref([])



	const getData = async () => {
		const data = {
			"username": uni.getStorageSync('user').phone //登录账号

		}
		const res = await uni.$post('/newNotice', data)
		list.value = res.data.map(item => {
			item.createTime = item.createTime.substring(0, 10)
			return item
		})
	}
	onShow(() => {
		getData()
	})


	const goXiangqing = (id) => {
		console.log(id);
		uni.navigateTo({
			url: `/pagesGonggao/xiangqing/xiangqing?id=${id}`
		})
	}
</script>

<style scoped lang="scss">
	.slh {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.pagehome {
		background-color: #f4f4f4;
		min-height: 100vh;

	}

	.homeList {
		display: flex;
		flex-direction: column;
		gap: 10px;

	}

	.icon2 {
		position: absolute;
		left: 10px;
		top: 0;
		width: 10px;
		height: 10px;
		background-color: red;
		color: red;
		border-radius: 50%;
		text-align: center;
	}

	.icon {
		position: absolute;
		right: 10px;
		top: 0;
		width: 40px;
		height: 20px;
		line-height: 20px;
		color: red;
		border: 1px solid red;
		text-align: center;
	}

	.listItem {
		position: relative;
		border-bottom: 1px solid #ccc;
		background-color: #fff;
		padding: 20px;
		display: flex;
		// justify-content: space-around;
		justify-content: space-between;
		color: #ccc;
		gap: 5px;

		.itemLeft {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			// overflow: hidden;

			image {
				border-radius: 50%;
				// width: 100%;
				// height: 100%;
				height: 50px;
				width: 50px;
			}
		}

		.itemMid {
			// flex: 1 0 0;
			width: 75%;

			// background-color: red;
			.title {
				color: #000;
				margin-bottom: 5px;
			}
		}

		.itemRight {
			width: 70px;
			font-size: 12px;

		}
	}
</style>