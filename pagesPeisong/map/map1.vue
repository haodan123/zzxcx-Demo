<!-- <template>
  <view>
11
  </view>
</template>

<script setup >
import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue'
</script> -->



<template>
	<view class="content">
		<view class="text-area">
			<view class="item">
				<image class="logo" src="/static/images/icon2/tu1.png"></image>
			</view>
			<view class="item item_two">
				<view class="title" @tap="openMap('104.060268','30.642047')">{{title}}(点击跳转)</view>
				<view class="distance">距离：{{distance}}km</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '四川大学华西医院',
				distance: 0, //"距离"
				latitude: 39.909, // 默认定在首都
				longitude: 116.39742,
				scale: 12, // 默认16
				markers: [],
				markerHeight: 30,
				doorAddress: [], //门店地址
			}
		},
		onLoad() {},
		mounted() {
			this.distance = this.getMapDistance('104.04311', '30.64242', '104.060268', '30.642047');
			console.log('距离', this.distance);
		},
		methods: {
			// 确认授权后，获取用户位置
			getLocationInfo() {
				const that = this;
				uni.getLocation({
					type: "gcj02",
					success: function(res) {
						// 暂时
						that.longitude = res.longitude; //118.787575;
						that.latitude = res.latitude; //32.05024;
						console.log("获取当前的用户经度", that.longitude);
						console.log("获取当前的用户纬度", that.latitude);
						var long = 0;
						var lat = 0;
						//小数点保留六位  经度
						if (that.longitude.toString().indexOf('.') > 0) {
							const longlatsplit = that.longitude.toString().split('.');
							if (longlatsplit.length >= 2) {
								long = parseFloat(longlatsplit[0] === "" ? 0 : longlatsplit[0]) + parseFloat("." + longlatsplit[1]
									.slice(0, 6));
							}
						}
						if (that.latitude.toString().indexOf('.') > 0) {
							const longlatsplit1 = that.latitude.toString().split('.');
							if (longlatsplit1.length >= 2) {
								lat = parseFloat(longlatsplit1[0] === "" ? 0 : longlatsplit1[0]) + parseFloat("." + longlatsplit1[
									1].slice(0, 6));
							}
						}
						// cookie.set("longitude", long);
						// cookie.set("latitude", lat);
						console.log("纬度", lat);
						// this.distance(that.latitude,that.longitude);
						that.markers = [{
							id: "",
							latitude: res.latitude,
							longitude: res.longitude,
							iconPath: "../../static/img/phone.png",
							width: that.markerHeight, //宽
							height: that.markerHeight, //高
						}, ];
						that.getList();
					},
				});
			},
			// 拒绝授权后，弹框提示是否手动打开位置授权
			openConfirm() {
				return new Promise((resolve, reject) => {
					uni.showModal({
						title: "请求授权当前位置",
						content: "我们需要获取地理位置信息，为您推荐附近的美食",
						success: (res) => {
							if (res.confirm) {
								uni.openSetting().then((res) => {
									if (res[1].authSetting["scope.userLocation"] === true) {
										resolve(); // 打开地图权限设置
									} else {
										reject();
									}
								});
							} else if (res.cancel) {
								reject();
							}
						},
					});
				});
			},

			// 彻底拒绝位置获取
			rejectGetLocation() {
				uni.showToast({
					title: "你拒绝了授权，无法获得周边信息",
					icon: "none",
					duration: 2000,
				});
			},
			getList() {
				console.log("获取周围美食");
			},
			onReady() {
				//   wx请求获取位置权限
				this.getAuthorize()
					.then(() => {
						//   同意后获取
						this.getLocationInfo();
					})
					.catch(() => {
						//   不同意给出弹框，再次确认
						this.openConfirm()
							.then(() => {
								this.getLocationInfo();
							})
							.catch(() => {
								this.rejectGetLocation();
							});
					});
			},
			openMap(lon, lat) {
				console.log("获取经纬度ssssfff", lon, lat);
				//打开地图，并将门店位置传入
				uni.getLocation({
					success: res => {
						// res.latitude=lat;
						// res.longitude=lon;
						console.log('location success', parseFloat(lat), parseFloat(lon))
						uni.openLocation({
							latitude: parseFloat(lat),
							longitude: parseFloat(lon),
							scale: 18
						})
					},
					fail: (err) => {
						console.log('sb', err);
					}

				})
			},
			//进行经纬度转换为距离的计算
			Rad(d) {
				return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
			},
			/*
						 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
						 默认单位km
						*/
			getMapDistance(lat1, lng1, lat2, lng2) {
				var radLat1 = this.Rad(lat1);
				var radLat2 = this.Rad(lat2);
				var a = radLat1 - radLat2;
				var b = this.Rad(lng1) - this.Rad(lng2);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137; // EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000; //输出为公里
				//s=s.toFixed(2);
				return s;
			},
			//计算距离

			//   初次位置授权
			getAuthorize() {
				return new Promise((resolve, reject) => {
					uni.authorize({
						scope: "scope.userLocation",
						success: () => {
							resolve(); // 允许授权
						},
						fail: () => {
							reject(); // 拒绝授权
						},
					});
				});
			},


		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		width: 100%;
		height: 100%;
	}

	.text-area {
		border: 1px solid #CCCCCC;
		padding: 4px 4px;
		width: 95%;
		height: 200rpx;
		display: flex;
		justify-content: space-around;
	}

	.title {
		/* border: 1px solid; */
		font-size: 39rpx;
		color: #8f8f94;
		flex: 1;
	}

	.distance {
		font-size: 25rpx;
		color: red;
		/* border: 1px solid; */
		flex: 1;
	}

	.item {
		/* border: 1px solid; */
		flex: 1;
	}

	.item_two {
		padding-left: 5px;
		flex: 3;
		display: flex;
		flex-direction: column;
	}
</style>