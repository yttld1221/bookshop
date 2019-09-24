<template>
	<div class="cartorder-container">
		<!-- 页头 -->
		<el-row type="flex" class="row-bg cart-head" justify="center">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					管理收货地址
				</div>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg address-main" justify="center">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<div class="main_input">
						收货人<input type="text" v-model="address_item[0].address_name">
						联系方式<input type="text"  v-model="address_item[0].tel">
						收货地址<input type="text"  v-model="address_item[0].user_address">
						<input type="button" class="address_btn" value="保存并返回" @click="jump_cart_order" />
					</div>
				</div>
			</el-col>
		</el-row>
		<Loading></Loading>
	</div>
</template>

<script>
	import axios from 'axios'
	import Loading from '../../../components/common/Loading.vue'
	import headBackto from '../../../components/common/BackTo'
	export default {
		components: {
			Loading,
			headBackto
		},
		data() {
			return {
				address_item: this.$route.query.address_item,
				cart_order: this.$route.query.cart_order,
				uesrname: sessionStorage.getItem("user"),
				address_state:this.$route.query.address_state
				
			};
		},
		filters: {
			KeepTwoNum: function(value) {
				value = Number(value);
				return value.toFixed(2);
			}
		},
		mounted() {},
		methods: {
			jump_cart_order:function(){
				let sql1='update book_address set user_address="'+this.address_item[0].user_address+'",address_name="'+this.address_item[0].address_name+'",tel="'+this.address_item[0].tel+'" WHERE user_name="' + this.uesrname + '"';
				axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql1).then(res=>{
				});
				let sql2='update book_user set user_tel="'+this.address_item[0].tel+'" WHERE user_name="' + this.uesrname + '"';
				axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql2).then(res=>{
				});
				if(this.address_state==1){
					this.$router.replace({
						name: 'Cartorder',
						query: {
							cart_order:this.cart_order
						}
					})
				}else{
					this.$router.replace({
						name: 'User'
					})
				}
				
			}
		},
		created() {
			//地址
			let sql3='SELECT * FROM book_address WHERE user_name="' + this.uesrname + '"';
			axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql3).then(res=>{
				this.address_item = res.data;
				console.log(this.address_item[0].name)
			});
			for (var i in this.cart_order) {
				this.cart_num = Number(this.cart_num) + Number(this.cart_order[i].book1_num)
			}
		},

	}
</script>

<style lang="scss" scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin-bottom: 0px;
	}

	a {
		color: #42b983;
	}

	div.cartorder-container {
		background-color: gainsboro;

		// 页头
		.cart-head.el-row {
			width: 100%;
			background-color: white;
			position: fixed;
			z-index: 101;
			top: 0;

			&:last-child {
				margin-bottom: 0;
			}

			.el-col {}

			.grid-content {
				color: rgb(188, 140, 100);
				font-weight: bolder;
				font-size: 1.8rem;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: .15rem solid rgb(210, 210, 210);
				height: 40px;
			}

			.row-bg {
				padding: 0;
			}
		}
		// 中间
		.address-main.el-row {
			height:30rem;
			margin-top: 15rem;
			width: 100%;
			background-color: white;
			.main_input{
				width:100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
					height: 100%;
					
				input{
					color: black;
					outline: none;
				}
				.address_btn{
					width: 40%;
					height: 20%;
					border: none;
					outline: none;
					color: white;	
					background-color: rgb(188, 140, 100);
				}
			}
		
			&:last-child {
				margin-bottom: 0;
			}
		
			.el-col {}
		
			.grid-content {
				height: 100%;
				color: rgb(188, 140, 100);
				font-weight: bolder;
				font-size: 1.8rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		
			.row-bg {
				padding: 0;
			}
		}
	}
</style>
