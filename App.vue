<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/styles/fonts.scss';
	@import '@/styles/index.scss';
	@import '@/styles/test.scss';
	@import '@/styles/response.scss';
	@import '@/styles/button-type.scss';
</style>
