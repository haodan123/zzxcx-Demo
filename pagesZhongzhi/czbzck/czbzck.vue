<template>
	<view class="viewport">
		<!-- 顶部start -->
		<view class="bzHeader">
			<view class="bzItem">
				<view class="">
					适用品种:
				</view>
				<view class="select">
					<uni-data-select :clear="false" v-model="lxvalue" :localdata="range" @change="changeLx"></uni-data-select>
				</view>
			</view>
		
		</view>
		<!-- 顶部end -->
		<!-- 内容start -->
		<view class="bzContent" >
			<view class="contentItem">
				<uni-section type="line" title="一级品采摘标准:" titleFontSize="16px" titleFontWeight="bold">
				</uni-section>
				<view class="neirong">
					{{slelectData.standardcontent||'暂无'}}
				</view>
			</view>
			<view class="contentItem">
				<uni-section type="line" title="二级品采摘标准:" titleFontSize="16px" titleFontWeight="bold">
				</uni-section>
				<view class="neirong">
					{{slelectData.standardcontent||'暂无'}}
				</view>
			</view>
			<view class="contentItem">
				<uni-section type="line" title="三级品采摘标准:" titleFontSize="16px" titleFontWeight="bold">
				</uni-section>
				<view class="neirong">
					{{slelectData.standardcontent||'暂无'}}
				</view>
			</view>
			<view class="contentItem">
				<uni-section type="line" title="存储条件:" titleFontSize="16px" titleFontWeight="bold">
				</uni-section>
				<view class="neirong">
					{{slelectData.standardcontent||'暂无'}}
				</view>
			</view>
			<view class="contentItem">
				<!-- <view class="title"> -->
				<uni-section type="line" title="标准示例:" titleFontSize="16px" titleFontWeight="bold">
				</uni-section>
				<!-- </view> -->
				<view class="neirong-img">
					<view class="image" v-for="(item,index) in slelectData.standardpic" :key="item" @click="preImage(item)">
						<image :src="item" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 内容end -->
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
	const showOrNot = ref(true) //查看图片后让页面不刷新
	const slelectData = ref({
		standardcontent: '',
		standardpic: ''
	}) //选中的数据
	const mcvalue = ref('') //选中的名称
	const range1 = ref([{ //名称数组
			value: '1',
			text: "口蹄疫疫苗"
		},
		{
			value: '2',
			text: "口蹄疫疫苗2"
		}
	
	])
	
	const lxvalue = ref('') //选中的类型
	const range = ref([{ //类型数组
			value: '1',
			text: "养殖"
		},
		{
			value: '2',
			text: "防疫"
		}
	
	])
	// 选中标准类型
	const changeLx = () => {
		console.log('真改啊');
		getmcData()
	}
	// 选中标准名称
	const changeMc = () => {
		slelectData.value = range1.value.find(item => item.id === mcvalue.value)
		if (slelectData.value.standardpic) {
	
			slelectData.value.standardpic = slelectData.value.standardpic.split(",")
		}
		console.log('真改啊', slelectData.value);
	}
	// 获取类型数据
	const getlxData = async () => {
	// 	const data = {
	// 		"qyid": uni.getStorageSync('user').qyid, //企业id
	// 		"type": "1", //1:养殖2：育种
	
	// 	}
	// 	const res = await uni.$post('/bztype', data)
	
	// 	range.value = res.data.map(item => {
	// 		return {
	// 			text: item,
	// 			value: item
	// 		}
	// 	})
	}
	
	// 获取类型数据
	const getmcData = async () => {
		const data = {
			"qyid": uni.getStorageSync('user').qyid, //企业id
			"type": "1", //1:养殖2：育种
			"standardtype": lxvalue.value
	
		}
		const res = await uni.$post('/yzbz', data)
	
		range1.value = res.data.map(item => {
			return {
				...item,
				text: item.standardname,
				value: item.id
			}
		})
	}
	
	
	onShow(async () => {
		if (showOrNot.value) {
			getlxData()
			// lxvalue.value = range.value[0].id
		}
	})
	
	// 预览图片
	const preImage = (item) => {
		showOrNot.value = false
		uni.previewImage({
			current: 0,
			urls: [item]
		})
	}
</script>

<style scoped lang="scss">

</style>