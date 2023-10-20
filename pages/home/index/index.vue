<template>
	<view class="viewport">
		<view class="">
			<swiper class="banner" indicator-dots autoplay :interval="2000" :duration="500" circular>
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<image class="swiper-item-img" :src="item" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="user">
			<view class="user-within">
				<view>欢迎：{{loginName || '张小会'}}</view>
				<!-- <view>2021年1月28日</view> -->
				<view>{{time || '2021年1月28日'}}</view>
			</view>
		</view>

		<!-- 公告 -->
		<uni-notice-bar v-if="textValue" @getmore="togonggao" :speed="50" more-text="查看更多" show-get-more show-icon
			scrollable :text="textValue" />


		<!-- <uni-transition :duration="800" :mode-class="['slide-left']" :show='PageCur=="yuzhong"'> -->
		<view class="gird" v-if="list1.length>0">
			<uni-section type="line" title="种植" titleFontSize="16px" titleFontWeight="bold">
			</uni-section>
			<view class="gird-f">
				<uni-grid :column="3" :showBorder="false">
					<block v-for="(item, index) in list1" :key="index">
						<uni-grid-item :index="item.id" @tap='toUrl(item)'>
							<view class="girditem">
								<image :src='item.imgurl'></image>
								<text style="font-size: 13px;">{{item.name}}</text>
							</view>
						</uni-grid-item>
					</block>
				</uni-grid>

			</view>
		</view>
		<!-- </uni-transition> -->

		<!-- <uni-transition :duration="800" :mode-class="['slide-left']" :show='PageCur=="yangzhi"'> -->
		<view class="gird" v-if="list2.length>0">
			<uni-section type="line" title="加工" titleFontSize="16px" titleFontWeight="bold">
			</uni-section>
			<view class="gird-f">
				<uni-grid :column="3" :showBorder="false">
					<block v-for="(item, index) in list2" :key="index">
						<uni-grid-item :index="item.id" @tap='toUrl(item)'>
							<view class="girditem">
								<image :src='item.imgurl'></image>
								<text style="font-size: 13px;">{{item.name}}</text>
							</view>
						</uni-grid-item>
					</block>
				</uni-grid>
			</view>
		</view>
		<!-- </uni-transition> -->

		<!-- <uni-transition :duration="800" :mode-class="['slide-left']" :show='PageCur=="biaozhun"'> -->
		<view class="gird" v-if="list3.length>0">
			<uni-section type="line" title="标准库" titleFontSize="16px" titleFontWeight="bold">
			</uni-section>
			<view class="gird-f">
				<uni-grid :column="3" :showBorder="false">
					<block v-for="(item, index) in list3" :key="index">
						<!-- v-if="item.id<7&&item.id>=3" -->
						<uni-grid-item :index="item.id" @tap='toUrl(item)'>
							<view class="girditem">
								<image :src='item.imgurl'></image>
								<text style="font-size: 13px;">{{item.name}}</text>
							</view>
						</uni-grid-item>
					</block>
				</uni-grid>
			</view>
		</view>
		<!-- </uni-transition> -->



		<view class="logoutBox">
			<button class="outLogin" @click="outLogin">退出登录</button>
		</view>

		<view style="height: 100px;"></view>

		<!-- <view class="tabbar" :style="{paddingBottom:safeBtm+'px'}">
			<view class="tabbar-item" v-for="item in tabbarList" :key="item.page" @click="tapTabbat(item)">
				<image class="img" v-if="PageCur==item.page" :src="item.imga" mode=""></image>
				<image class="img" v-else :src="item.img" mode=""></image>
				<view class="text" :class="{textA:PageCur==item.page}">
					{{item.name}}
				</view>
			</view>
		</view> -->

	</view>
</template>

<script setup>
	import api from "@/network/services";

	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		computed,
		onUnmounted,
		ref
	} from "vue";
	import {
		useUserStore
	} from '@/stores';
	import {
		getDate
	} from "@/utils/time";
	// import tu1 from "static/images/tabbar/yangzhi.png"
	const userStore = useUserStore()


	// tabbar  start
	const PageCur = ref('yuzhong') //当前选中的

	const tabbarList = [{
			page: 'yuzhong',
			name: '育种',
			img: '/static/images/tabbar/yuzhong.png',
			imga: '/static/images/tabbar/yuzhong_a.png'
		},
		{
			page: 'yangzhi',
			name: '养殖',
			img: '/static/images/tabbar/yangzhi.png',
			imga: '/static/images/tabbar/yangzhi_a.png'
		},
		{
			page: 'biaozhun',
			name: '标准库',
			img: '/static/images/tabbar/biaozhun.png',
			imga: '/static/images/tabbar/biaozhun_a.png'
		},
	]

	const tapTabbat = (item) => {
		PageCur.value = item.page
	}

	// tabbar  end



	const loginName = ref(uni.getStorageSync('user').name)

	const bannerList = ref([
		// '/static/images/banner/tu1.jpg',
		// '/static/images/banner/tu2.jpg',
		// '/static/images/banner/tu3.jpg',
		"http://pgz-cctvnp2.shidongvr.com:443/profile/upload/2023/10/08/677c64b3-61e3-435e-85b2-80b1f42db95b.png",
		"http://pgz-cctvnp2.shidongvr.com:443/profile/upload/2023/10/08/232b6e84-3a2e-427d-b465-20dbb237d3ad.png",
		"http://pgz-cctvnp2.shidongvr.com:443/profile/upload/2023/10/08/6471d835-4f86-4000-91f6-3500ee534639.png",
	])
	// 跳转路由
	const toUrl = (item) => {
		uni.navigateTo({
			url: item.pageurl
		})
	}
	// 存储当前账号权限的数组
	const shu = ref([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26])

	const gridlist1 = ref([{
			name: '农事标准查看',
			imgurl: '/static/images/icon3/jilu2.png',
			// imgurl: '/static/images/icon2/tu1.png',
			pageurl: '/pagesZhongzhi/nsbzck/nsbzck',
			show: true,
			id: 7
		},
		{
			name: '采摘标准查看',
			imgurl: '/static/images/icon3/jilu3.png',
			// imgurl: '/static/images/icon2/tu2.png',
			pageurl: '/pagesZhongzhi/czbzck/czbzck',
			show: true,
			id: 8
		},
		{
			name: '商品标准查看',
			imgurl: '/static/images/icon3/jilu5.png',
			// imgurl: '/static/images/icon2/tu3.png',
			pageurl: '/pagesZhongzhi/spbzck/spbzck',
			id: 9
		},
		{
			name: '生产计划',
			imgurl: '/static/images/icon3/chaxun2.png',
			// imgurl: '/static/images/icon2/tu4.png',
			pageurl: '/pagesZhongzhi/scjh/scjh',
			show: true,
			id: 10
		},
		{
			name: '农事任务下发',
			imgurl: '/static/images/icon3/chaxun3.png',
			// imgurl: '/static/images/icon2/tu5.png',
			pageurl: '/pagesZhongzhi/nsrwxf/nsrwxf',
			show: true,
			id: 11
		},
		{
			name: '农事任务',
			imgurl: '/static/images/icon3/chaxun4.png',
			// imgurl: '/static/images/icon2/tu6.png',
			pageurl: '/pagesZhongzhi/nsrw/nsrw',
			show: true,
			id: 12
		},
		{
			name: '农事任务执行',
			imgurl: '/static/images/icon3/chaxun5.png',
			// imgurl: '/static/images/icon2/tu7.png',
			pageurl: '/pagesZhongzhi/nsrwzx/nsrwzx',
			show: true,
			id: 13
		},
		{
			name: '生成商品',
			imgurl: '/static/images/icon3/jilu8.png',
			// imgurl: '/static/images/icon2/tu8.png',
			pageurl: '/pagesZhongzhi/shengchengsp/shengchengsp',
			show: true,
			id: 14
		},
		{
			name: '农资入库',
			imgurl: '/static/images/icon3/jilu6.png',
			// imgurl: '/static/images/icon2/tu10.png',
			pageurl: '/pagesZhongzhi/nzruku/nzruku',
			show: true,
			id: 16
		},
		{
			name: '农资出库',
			imgurl: '/static/images/icon3/yaowu.png',
			// imgurl: '/static/images/icon2/tu9.png',
			pageurl: '/pagesZhongzhi/nzchuku/nzchuku',
			show: true,
			id: 15
		}, ,
		{
			name: '作物入库',
			imgurl: '/static/images/icon3/jilu6.png',
			// imgurl: '/static/images/icon2/tu10.png',
			pageurl: '/pagesZhongzhi/zwruku/zwruku',
			show: true,
			id: 18
		}, {
			name: '作物出库',
			imgurl: '/static/images/icon3/yaowu.png',
			// imgurl: '/static/images/icon2/tu9.png',
			pageurl: '/pagesZhongzhi/zwchuku/zwchuku',
			show: true,
			id: 17
		}

	])
	const gridlist2 = ref([{
			name: '生产计划',
			imgurl: '/static/images/icon3/chaxun1.png',
			// imgurl: '/static/images/icon2/tu1.png',
			pageurl: '/pagesJiagong/scjh/scjh',
			show: true,
			id: 1
		},
		{
			name: '加工流程查看',
			imgurl: '/static/images/icon3/chaxun11.png',
			// imgurl: '/static/images/icon2/tu2.png',
			pageurl: '/pagesJiagong/jglcck/jglcck',
			show: true,
			id: 2
		},
		{
			name: '加工溯源采集',
			imgurl: '/static/images/icon3/chaxun2.png',
			// imgurl: '/static/images/icon2/tu3.png',
			pageurl: '/pagesJiagong/jgsycj/jgsycj',
			show: true,
			id: 3
		},
		{
			name: '检测记录',
			imgurl: '/static/images/icon3/chaxun3.png',
			// imgurl: '/static/images/icon2/tu4.png',
			pageurl: '/pagesJiagong/jcjilu/jcjilu',
			show: true,
			id: 4
		},
		{
			name: '生成商品',
			imgurl: '/static/images/icon3/chaxun4.png',
			// imgurl: '/static/images/icon2/tu5.png',
			pageurl: '/pagesJiagong/scsp/scsp',
			show: true,
			id: 5
		},
		{
			name: '生产调度',
			imgurl: '/static/images/icon3/chaxun5.png',
			// imgurl: '/static/images/icon2/tu6.png',
			// pageurl: '/pagesJiagong/jgruku/jgruku',
			pageurl: '/pagesJiagong/scdd/scdd',
			show: true,
			id: 6
		}, {
			name: '原辅料查看',
			imgurl: '/static/images/icon3/chaxun3.png',
			// imgurl: '/static/images/icon2/tu4.png',
			pageurl: '/pagesJiagong/yflck/yflck',
			show: true,
			id: 4
		},
		{
			name: '加工入库',
			imgurl: '/static/images/icon3/chaxun5.png',
			// imgurl: '/static/images/icon2/tu6.png',
			pageurl: '/pagesJiagong/jgruku/jgruku',
			show: true,
			id: 6
		},
		{
			name: '加工出库',
			imgurl: '/static/images/icon3/chaxun4.png',
			// imgurl: '/static/images/icon2/tu5.png',
			pageurl: '/pagesJiagong/jgchuku/jgchuku',
			show: true,
			id: 5
		},
		{
			name: '成品入库',
			imgurl: '/static/images/icon3/chaxun5.png',
			// imgurl: '/static/images/icon2/tu6.png',
			pageurl: '/pagesJiagong/cpruku/cpruku',
			show: true,
			id: 6
		}, {
			name: '成品出库',
			imgurl: '/static/images/icon3/chaxun4.png',
			// imgurl: '/static/images/icon2/tu5.png',
			pageurl: '/pagesJiagong/cpchuku/cpchuku',
			show: true,
			id: 5
		}


	])
	const gridlist3 = ref([{
			name: '配送',
			// imgurl: '/static/images/icon3/jilu8.png',
			imgurl: '/static/images/icon2/tu7.png',
			pageurl: '/pagesPeisong/map/map',
			show: true,
			id: 17
		}
	])
	const list1 = computed(() => {
		const arr = []
		gridlist1.value.forEach(item => {

			shu.value.forEach(item1 => {
				if (item1 === item.id) {
					arr.push(item)
				}
			})
		})
		return arr
		// 两种方法都行  上面的比较麻烦
		// return gridlist1.value.filter(item => shu.value.includes(item.id))||[];
	})
	const list2 = computed(() => {

		return gridlist2.value.filter(item => shu.value.includes(item.id)) || [];
	})
	const list3 = computed(() => {

		return gridlist3.value.filter(item => shu.value.includes(item.id)) || [];
	})
	// console.log(list1.value);
	// 退出登录
	const outLogin = () => {
		uni.showModal({
			title: '退出登录',
			content: '确定要退出登录吗',
			success(res) {
				console.log(res);
				if (res.confirm) {
					uni.clearStorageSync()
					uni.reLaunch({
						url: '/pages/login/login'
						// url: '/pages/relogin/relogin'
					})
				}
			}
		})
	}
	//获取权限
	const getModule = async () => {
		const data = {
			id: uni.getStorageSync('user').id
		}
		const res = await uni.$post('/module', data)
		// shu.value = res.data.map(item=>Number(item))
		shu.value = res.data
		// console.log(res.data, shu.value);
	}

	// 去公告页面
	const togonggao = () => {
		uni.navigateTo({
			url: '/pagesGonggao/home/home'
		})
	}

	// 公告内容
	const textValue = ref('')


	// 获取公告
	const getData = async () => {
		const data = {
			"username": uni.getStorageSync('user').phone //登录账号

		}
		const res = await uni.$post('/newNotice', data)

		const list = res.data
		textValue.value = list[0].noticeTitle || ''
	}
	// const btm = ref(0)
	onShow(() => {

		// console.log(uni.$safeTop, uni.$safeBtm);
		// btm.value = uni.getSystemInfoSync().safeAreaInsets.bottom

		// const phone = uni.getStorageSync('user').phone
		// if (!phone) {
		// 	uni.clearStorageSync()
		// 	uni.reLaunch({
		// 		url: '/pages/login/login'
		// 	})
		// 	return
		// }

	})
	// 时间
	const time = ref()
	// 定时器
	const timer = ref()
	onUnmounted(() => {
		clearInterval(timer.value)
	})

	const safeBtm = ref(0)
	onLoad(() => {
		getData()
		// getModule()
		// safeBtm.value = uni.$safeBtm
		safeBtm.value = uni.getSystemInfoSync().safeAreaInsets.bottom
		timer.value = setInterval(() => {
			time.value = getDate()
		}, 1000)
	})
</script>


<style lang="scss">
	.viewport {
		min-height: 100vh;
		background-color: #f4f4f4;
	}

	.banner {
		width: 100%;
		height: 200px;
	}

	.swiper-item-img {
		width: 100%;
		height: 100%;
	}

	.user {
		height: 40px;
		background: #FFFFFF;
	}

	.user-within {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}


	.logoutBox {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.outLogin {
		width: 400rpx;
		background: #2b81fc;
		color: #FFFFFF;
		// position: fixed;
		// left: 50%;
		// bottom: 10%;
		// margin-left: -200rpx;
		margin: 30rpx;
	}

	.gird-f {
		width: 90%;
		margin: 0 auto;
	}

	.gird {
		width: 90%;
		margin: 15px auto 0;
		padding: 10px;
		background: white;
		border-radius: 8rpx;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	}

	.girditem {

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 90%;
		height: 90%;
		margin: 5px auto;

		image {
			width: 80rpx;
			height: 80rpx;
		}

		text {
			margin-top: 8rpx;
		}
	}

	.tabbar {
		border-top: 1px solid #f4f4f4;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
	}

	.tabbar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px;
		flex: 1;

		.img {
			width: 30px;
			height: 30px;
		}

		.text {
			color: #000;
		}

		.textA {
			color: #1296db;
		}
	}
</style>