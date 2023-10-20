<template>
	<view  class="">
		<view class="detailNavbar" :style="[{ height: navbar - sys_statusBar + 'px',opacity: tabOpacityVal  }]">
			<view @tap="onTab(item)" class="navbar-item" :class="curTab === item.value ? 'current' : ''"
				v-for="item in tabList" :key="item.to">
				{{item.label}}
			</view>
		</view>

		<view class="detail-swiper-selecto">

		</view>
		<view class="detail-comment-selector">

		</view>
		<view class="detail-content-selector">

		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow,
		onPageScroll
	} from '@dcloudio/uni-app'
	import throttle from "@/utils/throttle.js"
	import {
		ref
	} from "vue";
	const curTab = ref('goods')
	const tabOpacityVal = ref(0)
	const tabList = ref([{
			label: '商品',
			value: 'goods',
			to: 'detail-swiper-selector',
		},
		{
			label: '评价',
			value: 'comment',
			to: 'detail-comment-selector',
		},
		{
			label: '详情',
			value: 'detail',
			to: 'detail-content-selector',
		},
	])
	// 设备信息
	const device = uni.getSystemInfoSync();

	// 标题栏高度
	const getNavBar = () => {
		return device.statusBarHeight + 44;
	};
	const navbar = getNavBar();
console.log('divce',device);
	const sys_statusBar = device.statusBarHeight

	let commentCard = {
		top: 0,
		bottom: 0,
	};
	// 点击跳转到对应的位置
	const onTab = (item) => {
		let scrollTop = 0;
		if (item.value === 'comment') {
			scrollTop = commentCard.top - navbar + 1;
		} else if (item.value === 'detail') {
			scrollTop = commentCard.bottom - navbar + 1;
		}
		console.log(scrollTop);
		uni.pageScrollTo({
			scrollTop,
			duration: 200,
		});
	}

	// 获取评论区的top值 和详情区的bottom
	const getCommentCardNode = () => {
		return new Promise((res, rej) => {
			uni.createSelectorQuery()
				.select('.detail-comment-selector')
				.boundingClientRect((data) => {
					if (data) {
						commentCard.top = data.top;
						commentCard.bottom = data.top + data.height;
						res(data);
					} else {
						res(null);
					}
				})
				.exec();
		});
	}

	onPageScroll((e) => {
		// 判断是否需要透明
		tabOpacityVal.value = e.scrollTop > navbar ? 1 : e.scrollTop * 0.01;
		// 获取评论区的top值 和详情区的bottom
		if (commentCard.top === 0) {
			throttle(() => {
				getCommentCardNode();
			}, 50);
		}
		if (e.scrollTop < commentCard.top - navbar) {
			// 滑动的距离小于评论区的顶部时
			curTab.value = 'goods';
		} else if (
			e.scrollTop >= commentCard.top - navbar &&
			e.scrollTop <= commentCard.bottom - navbar
		) {
			// 滑动的距离大于评论区顶部 小于评论区底部时
			curTab.value = 'comment';
		} else {
			curTab.value = 'detail';
		}

	})


	onLoad(async () => {
		uni.onThemeChange((res) => {
			console.log('改变的', res.theme);
		});
		// 监听小程序初始化事件，在这里获取系统主题模式并设置全局样式
		uni.getSystemInfo({
			success: (res) => {
				console.log(res);
				const themeMode = res.theme; // 获取系统主题模式，可取值为 light、dark、auto
				console.log(themeMode);
				// updateTheme(themeMode); // 根据主题模式更新全局样式
			}
		});
	})

	const updateTheme = () => {

	}
</script>

<style scoped lang="scss">
	.detailNavbar {
		position: fixed;
		top: 0;
		color: #000;
		background-color: #fff;
		width: 100%;
		// height: ;
		display: flex;
		align-items: center;
		justify-content: center;

		.navbar-item {
			flex: 1;
			text-align: center;
		}

		.current {
			color: red;
		}
	}

	.detail-swiper-selecto {
		height: 100vh;
		width: 100%;
		background-color: red;
	}

	.detail-comment-selector {
		height: 30vh;
		width: 100%;
		background-color: blue;
	}

	.detail-content-selector {
		height: 100vh;
		width: 100%;
		background-color: green;
	}
</style>