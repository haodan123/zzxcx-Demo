<template>
	<view>


		<view class="container">
			<!-- <map id='map' :latitude="latitude" :longitude="longitude" :markers="covers"
				:style="{ width: '100%', height: mapHeight + 'px' }" :scale="13" :polyline="polyline">
			</map> -->

			<!-- <view class="btnBox">
				<button :disabled="isDisabled" @click="start" class="cu-btn bg-blue round shadow lg">轨迹回放</button>
			</view> -->

			<map id="myMap" style="width: 100%; height: 300px;"  :markers="covers" :longitude="longitude" :latitude="latitude" scale='16'
				:polyline="polyline" show-location>
			</map>
			<view class="btnBox">
				<button :disabled="isDisabled" @click="start" class="cu-btn bg-blue round shadow lg">轨迹回放</button>
			</view>
		</view>
	</view>
</template>

<script setup>

	import {
		ref
	} from "vue";
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	const longitude = ref('116.31')
	const latitude = ref('40.04')
	const polyline = ref([])
	const isDisabled = ref(false)
	const coordinate = ref([])
	const playIndex = ref(1)
	const map = ref()
	const isStart = ref(false)
	const covers= [{
		id: 1,
		width: 42,
		height: 47,
		rotate: 270,
		latitude: 39.78,
		longitude: 114.65,
		iconPath: 'http://cdn.zhoukaiwen.com/car.png',
		callout: {
			content: "陕A·88888", // 车牌信息
			display: "ALWAYS",
			fontWeight: "bold",
			color: "#5A7BEE", //文本颜色
			fontSize: "12px",
			bgColor: "#ffffff", //背景色
			padding: 5, //文本边缘留白
			textAlign: "center",
		},
		anchor: {
			x: 0.5,
			y: 0.5,
		},
	},
	{
		
		latitude: 30.30,
		longitude: 104.28,
		id: 2,
		width: 42,
		height: 47,
		rotate: 270,
		iconPath: 'http://cdn.zhoukaiwen.com/car.png',
		callout: {
			content: "终点", // 车牌信息
			display: "ALWAYS",
			fontWeight: "bold",
			color: "#5A7BEE", //文本颜色
			fontSize: "12px",
			bgColor: "#ffffff", //背景色
			padding: 5, //文本边缘留白
			textAlign: "center",
		},
		anchor: {
			x: 0.5,
			y: 0.5,
		},
	}]


	onLoad(() => {
		map.value = uni.createMapContext('myMap');

		console.log(uni.$QQMapWX);
		// 实例化API核心类
		const qqmapsdk = new uni.$QQMapWX({
			key: 'OYMBZ-A6F6V-XAWPF-UQT3N-S4LVO-FEBYJ' // 必填
		});
		qqmapsdk.direction({
			mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
			//from参数不填默认当前地址
			from: '39.78,114.65', //此处经纬好像是反的  什么问题暂时未知
			to: '30.30,104.28',
			success: function(res) {
				console.log(res);
				var ret = res;
				var coors = ret.result.routes[0].polyline,
					pl = [];
				//坐标解压（返回的点串坐标，通过前向差分进行压缩）
				var kr = 1000000;
				for (var i = 2; i < coors.length; i++) {
					coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
				}
				//将解压后的坐标放入点串数组pl中
				for (var i = 0; i < coors.length; i += 2) {
					pl.push({
						latitude: coors[i],
						longitude: coors[i + 1]
					})
				}
				console.log(pl)
				//设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
				coordinate.value = pl
				latitude.value = pl[0].latitude
				longitude.value = pl[0].longitude
				polyline.value = [{
					points: pl,
					color: '#FF0000DD',
					width: 4
				}]
			},
			fail: function(error) {
				console.error(error);
			},
			complete: function(res) {
				console.log(res);
			}
		});
	})

	const start = () => {
		isStart.value = true;
		isDisabled.value = true;
		let data = coordinate.value;
		let len = data.length;
		let datai = data[playIndex.value];
		// let _this = this;

		map.value.translateMarker({
			markerId: 1,
			autoRotate: true,
			destination: {
				longitude: datai.longitude, // 车辆即将移动到的下一个点的经度
				latitude: datai.latitude, // 车辆即将移动到的下一个点的纬度
			},
			duration: 700,
			complete: function() {
				playIndex.value++;
				if (playIndex.value < len) {
					start(playIndex.value, data);
				} else {
					console.log('okokok');
					uni.showToast({
						title: '播放完成',
						duration: 1400,
						icon: 'none'
					});
					playIndex.value = 0;
					isStart.value = false;
					isDisabled.value = false;
				}
			},
			animationEnd: function() {
				// 轨迹回放完成 处理H5端
				playIndex.value++;
				if (playIndex.value < len) {
					start(playIndex.value, data);
				} else {
					console.log('okokok');
					uni.showToast({
						title: '播放完成',
						duration: 1400,
						icon: 'none'
					});
					playIndex.value = 0;
					isStart.value = false;
					isDisabled.value = false;
				}
			},
			fail(e) {
				// 轨迹回放失败
			},
		});
	}
</script>


<style lang="scss" scoped>
	.container {
		position: relative;
	}

	.btnBox {
		width: 750rpx;
		position: absolute;
		bottom: 60rpx;
		z-index: 99;
		display: flex;
		justify-content: space-around;
	}
</style>