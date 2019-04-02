<template>
	<!-- 用于非dc登录使用 -->
	<div id="login" :style="{height:'100vh'}">
		<el-card id="login-card" shadow>
			<div id="login-card-content">
				<img src="../assets/author.jpg" width="160px" height="160px" alt="">
				<p slot="content" class="p">
					<el-input @keyup.enter.native="_loginSubmit" v-model="userName" size="medium" class="login-input" placeholder="账号" style="margin-top: 40px;">
						<img src="../assets/zh.png" slot="prefix" alt="" width="20" style="padding: 14px 10px;">
					</el-input>
					<el-input @keyup.enter.native="_loginSubmit" v-model="password" type="password" size="medium" class="login-input" placeholder="密码" style="margin-top: 20px;">
						<img src="../assets/mm.png" slot="prefix" alt="" width="20" style="padding: 14px 10px;">
					</el-input>
					<el-button @click="_loginSubmit" class="login-submit" size="medium" style="background-color: #b94242;border-color: #b94242;margin-top: 20px;">登录</el-button>
				</p>
			</div>
		</el-card>
	</div>
</template>

<script>
import Server from '@/server/index';
	export default {
		components: {},
		data() {
			return {
				userName: "",
				password: "",
			};
		},
		methods: {
			_loginSubmit() {
				let newObj = {
					userName: this.userName,
					userPwd: this.password
				};
				if (this.userName && this.password) {
					Server.userLogin(newObj).then(res => {
						if( res.success ) {
							this.$router.push('/manage/index')
						}else {
							this.$message.warning(res.msg);
						}
					})
				} else {
					this.$message.warning("请输入账号密码！");
				}
			}
		}
	};
</script>
<style scoped>
	.login-input>>>input {
		height: 50px;
		font-size: 16px;
		padding-left: 45px;
	}
	.login-input>>>.ivu-input-prefix {
		line-height: 48px;
		left: 10px;
	}
	.p>>>.ivu-input:focus {
		border-color: #b94242;
		outline: 0;
		box-shadow: 0 0 0 2px rgba(185, 66, 66, 0.2);
	}
	.p>>>.ivu-input:hover {
		border-color: #b94242;
	}
</style>

<style scoped lang="less">
	@import "~@/less/color.less";
	#login {
		background: url("../assets/bgwenli.png") repeat;
	}
	#login-card {
		width: 430px;
		height: 550px;
		margin: 0 auto;
		position: relative;
		top: 80px;
		border-radius: 10px;
		box-shadow: 0 10px 30px -6px rgba(0, 0, 0, 0.2);
	}
	#login-card-content {
		margin-top: 30px;
		padding: 0 30px;
		text-align: center;
	}
	.login-input {
		margin-top: 5px;
	}
	.userInput {
		margin-top: 10px;
	}
	.userInput1 {
		height: 48px;
		margin-top: 40px;
	}
	.login-submit {
		width: 100%;
		background: #84cdc2;
		position: relative;
		color: #fff; //隐藏溢出的径向渐变背景
		overflow: hidden;
		/*top: 40px;*/
		line-height: 28px;
		height: 48px;
		font-size: 14px;
		transition: all 0.3s;
		/*&:hover {*/
		/*transform: scale(1.02);*/
		/*box-shadow: 0 5px 10px rgba(1,81,152, 0.8);*/
		/*}*/
		&:after {
			content: "";
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			pointer-events: none; //设置径向渐变
			background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
			background-repeat: no-repeat;
			background-position: 50%;
			transform: scale(10, 10);
			opacity: 0;
			transition: transform 0.3s, opacity 0.5s;
		}
		&:active:after {
			transform: scale(0, 0);
			opacity: 0.3;
			transition: 0s;
		}
	}
	.loginButton {
		background: #84cdc2;
		position: relative;
		color: #fff; //隐藏溢出的径向渐变背景
		overflow: hidden;
		/*top: 40px;*/
		line-height: 28px;
		height: 38px;
		font-size: 14px;
		transition: all 0.3s;
		/*&:hover {*/
		/*transform: scale(1.02);*/
		/*box-shadow: 0 5px 10px rgba(1,81,152, 0.8);*/
		/*}*/
		&:after {
			content: "";
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			pointer-events: none; //设置径向渐变
			background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
			background-repeat: no-repeat;
			background-position: 50%;
			transform: scale(10, 10);
			opacity: 0;
			transition: transform 0.3s, opacity 0.5s;
		}
		&:active:after {
			transform: scale(0, 0);
			opacity: 0.3;
			transition: 0s;
		}
	}
	.loginButton1 {
		margin-top: 60px;
		background: #84cdc2;
		position: relative;
		color: #fff; //隐藏溢出的径向渐变背景
		overflow: hidden;
		/*top: 40px;*/
		line-height: 38px;
		height: 48px;
		font-size: 14px;
		transition: all 0.3s;
		/*&:hover {*/
		/*transform: scale(1.02);*/
		/*box-shadow: 0 5px 10px rgba(1,81,152, 0.8);*/
		/*}*/
		&:after {
			content: "";
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			pointer-events: none; //设置径向渐变
			background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
			background-repeat: no-repeat;
			background-position: 50%;
			transform: scale(10, 10);
			opacity: 0;
			transition: transform 0.3s, opacity 0.5s;
		}
		&:active:after {
			transform: scale(0, 0);
			opacity: 0.3;
			transition: 0s;
		}
	}
</style>
