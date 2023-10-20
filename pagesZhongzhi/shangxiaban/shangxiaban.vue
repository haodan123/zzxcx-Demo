<template>
	<view>
		<uni-drawer ref="popup" mode="left">
			<view v-if="outpopshow" class="">
				<uni-indexed-list :options="letterlist" :show-select="true" @click="bindClick"></uni-indexed-list>
			</view>
		</uni-drawer>
		<map id="mymap" :longitude='longitude' :latitude='latitude' class="mymap" :markers="marker" show-location>
		</map>
		<view class="mapbody">
			<view class="listbt" style="width: 60%;margin-top: 20px;" @click="open">
				选择用工人员
			</view>
			<scroll-view scroll-y style="height: 50vh;">
				<uni-section type="line" title="已选人员" titleFontSize="16px" titleFontWeight="bold">
					<view class="mt-10 ml-20" style="font-size: 15px;color:#999999;" v-if="selectlocadata.length<=0"
						@click="open">
						请选择用工人员</view>
				</uni-section>
				<view class="m-20">
					<view v-for="(item,index) in selectlocadata" :key="index" style="display: inline-block;">
						<view @click="open"
							style="font-size: 15px;margin: 5px 5px;padding: 5px 8px;border-radius: 4px; display: inline-block;border: #2979ff 1px solid; color: #2979ff;">
							{{item.text||item.name}}
						</view>
					</view>
				</view>
				<uni-section type="line" :title="'拍摄'+title+'照片'" titleFontSize="16px" titleFontWeight="bold">
					<!-- <uni-auploadimg :action="apiUrl" @onChange="onImgChange"></uni-auploadimg> -->
					<uni-auploadimg :action="uploadUrl" @onChange="onChange"></uni-auploadimg>
				</uni-section>
				<!-- 		<uni-section type="line" title="完成件数" titleFontSize="16px" titleFontWeight="bold" v-if="title=='下班'">
				</uni-section> -->
				<!-- 		<uni-forms ref="form" :model="fromdata" :rules="rules" class="m-l-35" v-if="title=='下班'">
					<view class="m-l-20 m-r-20">
						<uni-forms-item labelWidth="100px" label="申报完成株数" name="number"
							:rules="[{required:true,errorMessage: '请输入申报完成株数'}]">
							<uni-easyinput v-model="fromdata.number" placeholder="请输入申报完成株数" maxlength="7" type="number" />
						</uni-forms-item>
					</view>
					<view class="m-l-20 m-r-20" v-for="(item,index) in selectlocadata" :key="index"
						v-if="fromdata.valuation=='2'">
						<uni-forms-item labelWidth="100px" :label="item.text+':'" :name="item.formid" required :key="item.value">
							<uni-easyinput v-model="fromdata[item.formid]" :placeholder="item.message" maxlength="7" type="number" />
						</uni-forms-item>
					</view>
				</uni-forms> -->
				<view style="height: 10px;"></view>
			</scroll-view>

		</view>
		<button class="addButton1" :disabled="loading" :loading="loading" @click="submit('form')">
			确定
		</button>

	</view>
</template>
<script setup>
	import pinyin from 'js-pinyin'
	import {
		uploadUrl
	} from '../../config/global-config';

	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue'

	const loading = ref(false)
	const title = ref('') //标题
	const latitude = ref('')
	const longitude = ref('')
	const marker = ref([])
	const mymap = ref(null)
	const popup = ref()
	const outpopshow = ref(false)
	const letterlist = ref([{
		"letter": "A",
		"data": [
			"阿克苏机场",
			"阿拉山口机场",
			"阿勒泰机场",
			"阿里昆莎机场",
			"安庆天柱山机场",
			"澳门国际机场"
		]
	}, {
		"letter": "B",
		"data": [
			"保山机场",
			"包头机场",
			"北海福成机场",
			"北京南苑机场",
			"北京首都国际机场"
		]
	}])
	const locadata = ref([])
	const selectlocadata = ref([])

	const formData = ref({ //表单
		farmId: null, //农事关联ID
		personel: null, //人员关联ID(多选)
		workPosition: null, //上班位置
		imgList: null, //上班图片

		valuation: null, //计价方式 计时1 计件2
		jwd: null, //下班位置
		number: null, //完成株数
		personnel: null //下班记录id 件数
	})



	onLoad((opt) => {
		console.log('opt', opt);
		title.value = opt.index == 1 ? '上班' : '下班'
		formData.value.farmId = opt.id
		uni.setNavigationBarTitle({
			title: title.value
		})
		// if (title.value == "上班") {
		// 	querySPerson(opt.id)
		// } else {
		// 	formData.value.valuation = opt.valuation
		// 	queryXPerson(opt.id)
		// }

		mymap.value = uni.createMapContext('mymap')
		getpositon()
	})




	const getpositon = () => {
		//获取当前自己的定位
		uni.getLocation({ //返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
			success: function(res) {
				console.log(res, "====postion=====")
				latitude.value = res.latitude;
				longitude.value = res.longitude;
				formData.value.workPosition = res.longitude + "," + res.latitude
				formData.value.jwd = res.longitude + "," + res.latitude
				mymap.value.moveToLocation({
					longitude: longitude.value,
					latitude: latitude.value
				})
			},
			type: 'gcj02', // 默认为 wgs84 
			fail(res) {
				console.log(res, "====postion=====")
			}
		})
	}

	// 图片
	const onChange = (e) => {
		formData.value.picture = String(e)
		// console.log(formData.value.picture);
		console.log(String(formData.value.picture));
	}


	const queryXPerson = async (id) => { //查询下班人员
		this.$httpRequest.easypost('afterWorkPer', {
			farmId: id
		}, res => {
			let pinarr = []
			let letterarr = []
			res.data.data.forEach((item, index) => {

				let firstPin = pinyin.getCamelChars(item.name).substring(0, 1).toUpperCase()

				if (pinarr.includes(firstPin)) {
					letterarr[pinarr.indexOf(firstPin)].data.push(item.name)
				} else {
					pinarr.push(firstPin)
					letterarr.push({
						letter: firstPin,
						data: [item.name]
					})
				}

				locadata.value.push({
					"value": index,
					"text": item.name,
					"id": item.jlid,
					"formid": 'id' + item.jlid,
					"message": '请输入' + item.name + '的完成件数'
				})
			})
			letterlist.value = letterarr
		}, fail => {
			console.error(fail)
		})
	}
	const querySPerson = async (id) => { //查询上班人员
		this.$httpRequest.easypost('qdry', {
			postname: "工人", //岗位名称
			baseId: uni.getStorageSync('baseId') //所属基地关联ID
		}, res => { //规范化标准
			let pinarr = []
			let letterarr = []
			res.data.data.forEach((item, index) => {

				let firstPin = pinyin.getCamelChars(item.name).substring(0, 1).toUpperCase()

				if (pinarr.includes(firstPin)) {
					letterarr[pinarr.indexOf(firstPin)].data.push(item.name)
				} else {
					pinarr.push(firstPin)
					letterarr.push({
						letter: firstPin,
						data: [item.name]
					})
				}
				locadata.value.push({
					"value": index,
					"text": item.name,
					"id": item.id,
				})

			})
			console.log("pinyin", pinarr, letterarr, locadata.value);
			letterlist.value = letterarr
		})
	}

	// 选择人员
	const bindClick = (e) => {
		// console.log(e ,locadata.value);
		let parr = []
		let sarr = []
		// let sidarr = []
		e.select.forEach(item => {
			parr.push(item.name)
			// sarr.push(item)
		})
		// console.log(parr);
		locadata.value.forEach((item => {
			if (parr.includes(item.text)) {
				sarr.push(item)
				// sidarr.push(item.id)
			}
		}))
		selectlocadata.value = sarr
		// console.log(selectlocadata.value);
		// if (title.value == '下班' && fromdata.value.valuation == '2') {
		// 	changeselect()
		// }

		// this.checkbox=sidarr
	}


	//提交表单
	const submit = async (ref) => {
		loading.value = true
		if (selectlocadata.value.length <= 0) {
			uni.showToast({
				title: '请选择用工人员',
				icon: 'none'
			})
			return
		} else {
			let personarr = []
			if (title.value == "上班") {
				selectlocadata.value.forEach(item => {
					personarr.push(item.id)
				})
				fromdata.value.personel = personarr.toString()
			}
			if (title.value == "下班") {
				selectlocadata.value.forEach(item => {

					if (fromdata.value.valuation == '1') { //计时
						personarr.push({
							jlid: item.id,
						})
					} else { //计件
						let formid = "id" + item.id
						if (fromdata.value.hasOwnProperty(formid)) {
							personarr.push({
								jlid: item.id,
								num: fromdata.value[formid]
							})
						}
					}


				})
				fromdata.value.personnel = personarr
			}

		}
		if (!fromdata.value.imgList) {
			uni.showToast({
				title: '请拍摄上传' + title.value + '照片',
				icon: 'none'
			})
			return
		}
		console.log(fromdata.value);
		if (title.value == "上班") {
			addcom()

		}
		if (title.value == "下班") {
			afterWork()

		}


	}
	const addcom = async () => { //上班打卡新增
		this.$httpRequest.easypost('addcomm', this.fromdata, res => {
			uni.showToast({
				title: '保存成功'
			})
			loading.value = false
			uni.navigateBack({
				delta: 1
			})
		}, fail => {
			console.log(fail)
			loading.value = false
			uni.showToast({
				icon: 'none',
				title: fail.data.msg
			})
		})
	}
	const afterWork = async () => { //下班打卡新增
		this.$httpRequest.easypost('afterWork', this.fromdata, res => {
			uni.showToast({
				title: '保存成功'
			})
			loading.value = false
			uni.navigateBack({
				delta: 1
			})
		}, fail => {
			console.log(fail)
			loading.value = false
			uni.showToast({
				icon: 'none',
				title: fail.data.msg
			})
		})
	}

	//打开弹窗
	const open = () => {

		outpopshow.value = true
		popup.value.open('left')
	}
</script>

<script>
	export default {

		methods: {










		}
	}
</script>

<style lang="scss">
	page {
		background: white;
	}

	.mymap {
		width: 100vw;
		height: 40vh;
		position: fixed;


	}

	.top_bt {
		width: 60px;
		height: 30px;
		background: #3d87ff;
		color: white;
		margin-left: 10px;
		font-size: 15px;
		line-height: 30px;
	}

	.listbt {
		width: 40%;
		height: 30px;
		background: #3d87ff;
		margin: 3px auto;
		color: white;
		font-size: 14px;
		text-align: center;
		border-radius: 6px;
		line-height: 30px;
	}


	.customCallout {
		// box-sizing: border-box;
		background-color: #e51860;
		color: white;
		border-radius: 30px;
		font-size: 1em;
		width: auto;
		height: auto;
		display: inline-block;
		flex-direction: row;
		padding: 15px;
		margin: 0 auto;
	}

	.mapbody {
		width: 100%;
		height: 70vh;
		position: fixed;
		background: white;
		bottom: 0;
		z-index: 9;
		border-radius: 25px 25px 0 0;
	}

	.scrolly {
		width: 200px;
		height: 95vh;

	}

	.imagesview {
		width: 260px;
		height: 180px;
		margin: 0 auto;
		display: flex;

	}
</style>