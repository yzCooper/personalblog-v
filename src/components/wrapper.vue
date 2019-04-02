<template>
	<div>
		<el-container>
			<el-header id="wrapper-head">
				<el-col :span="12" style="text-align: left;">
					<img style="vertical-align: middle;height:38px;" src="@/assets/logo.png" alt="上海中医药大学">
					<h1>博客管理</h1>
					<!-- <h1>帮助管理中心</h1> -->
				</el-col>
				<el-col style="text-align:right" :span="12">
					<el-dropdown @command="logOut" trigger="click">
						<span class="el-dropdown-link">
								<img id="adminLogo" src="@/assets/user.png" height='20px' alt="">
							</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-header>
			<el-main id="wrapper-main">
				<slot></slot>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Server from '@/server/index';
	export default {
		components: {},
		data() {
			return {}
		},
		mounted() {},
		methods: {
			logOut() {
				this.$confirm('您确认退出该平台?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					Server.userLogOut().then(res => {
						console.log(res);
						this.$message.success('您已成功退出！')
						setTimeout(() => {
							this.$router.push('/')
						}, 800);
					})
				}).catch(() => {
				});
			}
		},
	}
</script>

<style scoped lang="less">
	@import '~@/less/color.less';
	#wrapper-head {
		background: @projectColor;
		padding: 0 50px;
		position: fixed;
		z-index: 100;
		width: 100%;
		height:55px;
		line-height: 55px;
	}
	#wrapper-main {
		margin-top: 60px;
		padding: 20px 50px;
	}
	h1 {
		font-size: 1.2em;
		color: #fff;
		letter-spacing: .1em;
	}
	#adminLogo {
		position: relative;
		top: 10px;
		cursor: pointer;
	}
	h1 {
		color: #fff;
		font-size: 22px;
		letter-spacing: 0.1em;
		display: inline;
		vertical-align: middle;
		margin-left: 6px;
		font-weight: 400;
	}
</style>