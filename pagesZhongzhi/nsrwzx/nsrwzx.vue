<template>
	<view class=" viewport">
		<view class="search">
			<uv-tabs :list="list" :activeStyle="{
					color: '#3c9cff',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
					}" lineWidth='70px' :scrollable="false" @click="clickTab" :current="current"></uv-tabs>
		</view>
		<uv-empty v-if="dataList.length==0" mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png"></uv-empty>
		<view class="showCard" v-for="item in dataList" :key="item.id">
			<!-- <view class="card-tag">
				{{item.status==1?'存栏中':'已出栏'}}
			</view> -->
			<view class="card-item">
				<view class="item-key">任务编号:</view>
				<view class="item-value">{{item.qyname}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">基地名称:</view>
				<view class="item-value">{{item.unitname||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">地块名称:</view>
				<view class="item-value">{{item.unitname||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">适用品种:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">农事流程:</view>
				<view class="item-value">{{item.number||item.id}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">具体内容:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">下发人:</view>
				<view class="item-value">{{item.number||item.id}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">执行人:</view>
				<view class="item-value">{{item.enclosurename||'暂无'}}</view>
			</view>
			<view class="card-item">
				<view class="item-key">任务状态:</view>
				<view class="item-value">{{item.number||item.id}}</view>
			</view>

			<view class="card-sb">
					<view class="card-btn" @click="toUrl(1,item)">
					上班
				</view>
				<view class="card-btn" @click="toUrl(2,item)">
					下班
				</view>
				<view class="card-btn" @click="openRy" v-if="current!=0">
					查看人员
				</view>
				<view class="card-btn" @click="openBz">
					查看标准
				</view>
			</view>



		</view>
		<view class="gapBox"></view>
		<!-- <view @click="dengji" class="addButton">
			新增
		</view> -->
		
		
		<uni-popup ref="popupRy" type="dialog" @touchmove.stop.prevent>
			<view class="dialog-shenhe">
				<view class="title width100 textc">上下班信息</view>
				<scroll-view scroll-y style="height: 90%;">
					<view v-for="(item,index) in workarr" :key="index">
						<view class="kaoqinbox">
							<uni-section type="line" :title="item.ygry" titleFontSize="16px" titleFontWeight="bold">
							</uni-section>
							<view class="ryBox greenc" v-if="item.workTime">
								<view class="lbitem">
									上班
								</view>
								<view class="lbitem" style="width: 100px;">
									{{item.workTime||'暂无'}}
								</view>
								<view class="lbitem" @click="preimg(item.workPicture)">
									<image class="kaoqinimg" :src="item.workPicture.split(',')[0]"></image>
								</view>
		
							</view>
							<view class="ryBox bluec" v-if="item.closingTime">
								<view class="lbitem">
									<view>
										下班
									</view>
									<view>
										{{workarr[0].valuation=='1'?('('+item.comtime+'小时)'):''}}
										{{workarr[0].valuation=='2'?('('+item.quantity+'件)'):''}}
									</view>
								</view>
								<view class="lbitem" style="width: 100px;">
									{{item.closingTime||'暂无'}}
								</view>
								<view class="lbitem" @click="preimg(item.closingPicture)">
									<image class="kaoqinimg" :src="item.closingPicture.split(',')[0]"></image>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		

		<uni-popup ref="popupBz" type="center" @touchmove.prevent>

			<view class="dialog-shenhe">
				<view class="title ">农事标准</view>
				<scroll-view scroll-y style="height: 90%;">
					<view class="flexc justc m-t-10">
						<view class="card-item">
							具体内容：{{standardobj.unit||'暂无'}}
						</view>
						<view class="card-item">
							计价方式：{{standardobj.unitPrice||'暂无'}}
						</view>
						<view class="card-item">
							单价(元)：{{standardobj.acceptanceCriteria||'暂无'}}
						</view>
						<view class="card-item">
							验收标准：{{standardobj.defaultTreatment||'暂无'}}
						</view>

						<view class="card-item">
							标准示例：
							<text style="color: red;" @click="preimg(standardobj.picture)">
								查看
							</text>
						</view>

					</view>
				</scroll-view>
			</view>

		</uni-popup>
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
	import api from '@/network/services';

	// 搜索start
	const searchValue = ref()
	const clear = () => {
		searchValue.value = ''
	}
	const search = () => {
		console.log('搜索');
		getData()
	}
	const blur = () => {
		console.log('失去');
		if (searchValue.value == '') {
			getData()
			console.log('搜索');
		}
	}
	// 搜索end

	const dataList = ref([])

	onShow(() => {
		getData()
	})
	
	// 人员数组
	const workarr = ref([
		{
			ygry:'利长远',
			workTime:'2023',
			workPicture:'tu'
		},
		{
			ygry:'利长远',
			closingTime:'2023',
			closingPicture:'tu'
		}
	])

	// 标准的内容
	const standardobj = ref({

	})

	const current = ref(0)

	const list = ref([{
		name: '待执行',
		value: 0
	}, {
		name: '已开始',
		value: 1
	}, {
		name: '已完成',
		value: 2
	}])

	const clickTab = (e) => {
		current.value = e.value
		console.log(e, current.value);
	}

	const getData = async () => {
		let data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id


		}
		// const res = await api.chulaijil(data)
		const res = await uni.$post('/rljd', data)

		dataList.value = res.data.map(item => {
			if (item.picture) {
				item.picture = item.picture.split(",");
			}

			return {
				...item
			}
		})
	}
	
	// 去上下班
	const toUrl = (index,item)=>{
		if(index===1){
			// 上班
			uni.navigateTo({
				url:`/pagesZhongzhi/shangxiaban/shangxiaban?index=${index}&id=${item.id}`
			})
		}else if(index===2){
			// 下班
			uni.navigateTo({
				url:`/pagesZhongzhi/shangxiaban/shangxiaban?index=${index}&id=${item.id}`
			})
		}
	}
	
	// 标准弹窗
	const popupBz = ref()
	// const 查看标准
	const openBz = ()=>{
		popupBz.value.open()
	}
	// 人员弹窗
	const popupRy = ref()
	// 查看人员
	const openRy = async (item) => {

		// ebList.value = item
		popupRy.value.open()
	}


	const preImage = (item) => {
		uni.previewImage({
			urls: item
		})
	}

	const dengji = () => {
		uni.navigateTo({
			url: '/pagesJiagong/scddAdd/scddAdd'
		})
	}
</script>

<style scoped lang="scss">
	.card-sb {
		display: flex;
		justify-content: space-around;
	}

	.dialog-shenhe {
		width: 80vw;
		height: 60vh;
		max-height: 60vh;
		background: white;
		border-radius: 8px;
		padding: 10px;

		.title {
			width: 100%;
			text-align: center;
		}
	}
	
	.blue {
		color: #3d87ff;
	}
	.ryBox{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.greenc {
		color: #4eb93b;
	}
	
	.bluec {
		color: #3d87ff;
	}
	
	.kaoqinbox {
		border-radius: 4px;
		border: solid 1px #e2e2e2;
		margin: 10px 0;
	}
	
	.kaoqinimg {
		border-radius: 4px;
		width: 50px;
		height: 50px;
	}
	
	.sbbox {
		border-left: #4eb93b 3px solid;
		box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
	}
	
	.xbbox {
		border-left: #3d87ff 3px solid;
		box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
	}
	.bgyellow {
		background: #ffb853;
		color: #ffffff;
	}
	
	.bggreen {
		background: #4eb93b;
		color: #ffffff;
	}
	
	.lbitem {
		width: 25%;
		text-align: center;
		flex: 1;
	}
</style>