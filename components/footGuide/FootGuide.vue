<template>
	<div>
		<el-row type="flex" class="row-bg foot" justify="center">
			<el-col :span="6">
				<div class="grid-content ">
					<router-link :to="{name:'Home'}" exact>
						<img src="../../../static/image/home.png">
						<span>首页</span>
					</router-link>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ">
					<router-link :to="{name:'Type'}">
						<img src="../../../static/image/type.png">
						<span>分类</span></router-link>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content ">
					<router-link :to="{name:'Cart'}">
						<img src="../../../static/image/cart.png">
						<span>购物车</span>
					</router-link>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content">
					<router-link :to="{name:'Me'}">
						<img src="../../../static/image/me.png">
						<span>我</span></router-link>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import Header from '../header/Header'
	export default {
		data() {
			return {

			};
		},
		
		components: {
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../style/footer.scss";
</style>
