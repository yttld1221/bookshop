<template>
	<div class="cartorder-container">
		<!-- 页头 -->
		<el-row type="flex" class="row-bg cart-head" justify="center">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<headBackto></headBackto>确认订单
				</div>
			</el-col>
		</el-row>
		<!-- 收货地址 -->
		<el-row type="flex" class="row-bg cart-address" justify="center">
			<el-col :span="3">
				<div class="grid-content bg-purple cart-address-map">
					<img src="../../../../static/image/map.png">
				</div>
			</el-col>
			<el-col :span="18">
				<div class="grid-content bg-purple cart-address-info">
					<div><span>收货人:{{address_item[0].address_name}}</span><span>联系方式:{{address_item[0].tel}}</span></div>
					<div>收货地址:{{address_item[0].user_address}}</div>
				</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple cart-address-add" @click="jump_address">
					&gt;
				</div>
			</el-col>

		</el-row>
		<!-- 头 -->
		<el-row type="flex" class="row-bg cart-shop" justify="center">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<img class="cart-shop-img" src="../../../../static/image/shop.png"><span>阅生活</span>
				</div>
			</el-col>
		</el-row>
		<!-- 列表 -->
		<el-row type="flex" class="row-bg cart-list" justify="center">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<ul v-for="obj1 in cart_order" :key='obj1.id'>
						<li>
							<div>
								<img :src="'./static/image/'+obj1.book1_img" alt="">
							</div>
							<div>{{obj1.book1_name}}</div>
							<div>&yen;{{obj1.book1_price | KeepTwoNum}}</div>
						</li>

					</ul>
				</div>
			</el-col>
		</el-row>
		<!-- 下方 -->
		<el-row type="flex" class="row-bg cart-up" justify="center">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<ul>
						<li>
							<div>
								<span><input class="yh" type="radio" />优惠券</span>
								<span>暂无可用优惠卷&gt;</span>
							</div>
						</li>
						<li>
							<div>
								<span>配送支付</span>
								<span>快递配送在线支付&gt;</span>
							</div>
						</li>
						<li>
							<div>
								<span>发票信息</span>
								<span>不开发票&gt;</span>
							</div>
						</li>
						<li>
							<div class="lya">
								<span>买家留言</span>
								<span><input class="ly" type="text" placeholder="给商家留言" /></span>
							</div>
						</li>
						<li>
							<div>
								<span>商品金额</span>
								<span>￥{{cart_order[cart_order.length-1].book1_result}}</span>
							</div>
						</li>
						<li>
							<div>
								<span>运费</span>
								<span>￥0.00</span>
							</div>
						</li>
						<li>
							<div>
								<span></span>
								<span>共{{cart_num}}件商品 小计:￥{{cart_order[cart_order.length-1].book1_result}}</span>
							</div>
						</li>
					</ul>
				</div>
			</el-col>
		</el-row>
		<!-- 结算页脚 -->
		<el-row type="flex" class="row-bg cart-foot" justify="center">
			<el-col :span="12">
				<div class="grid-content bg-purple cart-sum">
					<span>合计:￥{{cart_order[cart_order.length-1].book1_result}}</span>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<input class="pay-btn" type="button" value="去付款" @click="pay_for" />
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
				cart_order: this.$route.query.cart_order,
				address_item: [],
				uesrname: sessionStorage.getItem("user"),
				cart_num: 0,
				date_id:sessionStorage.getItem('date_id')
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
			pay_for: function() {
				if(this.address_item[0].address_name==''){
					alert('请填入收货信息');
					this.$router.push({
						name: 'Address',
						query: {
							address_item:this.address_item,
							cart_order:this.cart_order,
							address_state:1
						}
					})
				}else{
					var resl = confirm('确认支付吗？')
					if (resl) {
						for(let i in this.cart_order){
							let sql1='UPDATE book_order SET order_state = 1 WHERE user_name = "'+this.uesrname+'" AND book_name="'+this.cart_order[i].book1_name+'"';
							axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql1).then(res=>{
							});
							
							let sql2='DELETE FROM book_cart WHERE user_name = "'+this.uesrname+'" AND book_name="'+this.cart_order[i].book1_name+'"';
							axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql2).then(res=>{
							});
						}
						
						let sql3='UPDATE book_date SET order_date =1 WHERE date_id ='+this.date_id;
						axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql3).then(res=>{
								});
							
						alert('支付成功')
						this.$router.push({
							name: 'Cart'
						})
					} else {
						alert('取消支付')
					}
				}

			},
			jump_address:function(){
				this.$router.push({
					name: 'Address',
					query: {
						address_item:this.address_item,
						cart_order:this.cart_order,
						address_state:1
					}
				})
			}

		},
		created() {
			//地址
			let sql4='SELECT * FROM book_address WHERE user_name="' + this.uesrname + '"';
			axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql4).then(res=>{
				var res = res.data;
				if(res.length>0){
					this.address_item = res;
				}else{
					let sql5='INSERT INTO book_address (user_name,user_address,address_name,tel) VALUES ("'+this.uesrname+'","","","")';
					axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql5).then(res=>{
						this.address_item.push({
							user_name:this.uesrname,
							user_address:'',
							address_name:'',
							tel:''
						})
					});
				}
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

		//商店
		.cart-shop.el-row {
			margin-top: 12rem;
			width: 100%;
			background-color: white;

			.cart-shop-img {
				width: 12%;
				padding: 0 .5rem 0 1rem;
			}

			&:last-child {
				margin-bottom: 0;
			}

			.el-col {}

			.grid-content {
				display: flex;
				font-weight: bolder;
				font-size: 1.8rem;
				align-items: center;
				min-height: 40px;
			}

			.row-bg {
				padding: 0;
			}
		}

		//列表
		.cart-list.el-row {
			width: 100%;
			background-color: white;

			&:last-child {
				margin-bottom: 0;
			}

			.el-col {}

			.grid-content {
				display: flex;
				font-weight: bolder;
				font-size: 1.8rem;
				align-items: center;
				min-height: 40px;
				flex-direction: column !important;
			}

			.row-bg {
				padding: 0;
			}

			ul {
				width: 100%;
				display: flex;
				flex-direction: column !important;

				li {
					border-bottom: 1px solid gainsboro;
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 100%;

					div:nth-child(1) {
						width: 25%;

						img {
							width: 100%;
							padding: 1rem 0;
						}
					}

					div:nth-child(2) {
						width: 40%;
						padding: .2rem 0;
						font-size: 1.4rem;
					}

					div:nth-child(3) {
						width: 20%;
						padding: .2rem 0;
						font-size: 1.4rem;
					}
				}
			}
		}

		//下方
		.cart-up.el-row {
			width: 100%;
			background-color: white;

			&:last-child {
				margin-bottom: 0;
			}

			.el-col {}

			.grid-content {
				display: flex;
				font-weight: bolder;
				font-size: 1.8rem;
				align-items: center;
				min-height: 40px;
				flex-direction: column !important;
			}

			.row-bg {
				padding: 0;
			}

			ul {
				font-size: 1.5rem;
				padding: 0 0 5rem 0;
				width: 100%;
				display: flex;
				flex-direction: column !important;

				li {
					height: 5rem;
					border-bottom: 1px solid gainsboro;
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;

					div {
						justify-content: space-between;
						display: flex;
						align-items: center;
						height: 100%;
						width: 100%;

						span:nth-child(1) {
							width: 25%;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							padding: 0 1rem;
							height: 100%;

							input.yh {
								padding: 0 1rem;
								width: 30%;
								height: 40%;
							}
						}

						span:nth-child(2) {
							padding: 0 2rem;
							width: 60%;
							display: flex;
							justify-content: flex-end;

							span {
								width: 100%;
							}
						}
					}

					div.lya {
						span:nth-child(1) {
							width: 25% !important;
						}

						span:nth-child(2) {
							width: 75% !important;
						}
					}
				}

				.yh {}

				.ly {
					width: 100%;
					border: none;
					outline: none;
				}
			}
		}

		// 地址
		.cart-address.el-row {

			width: 100%;
			background-color: white;
			position: fixed;
			z-index: 101;
			top: 4rem;

			.cart-address-map {
				img {
					width: 50%;
				}
			}

			div.cart-address-add {
				font-size: 2rem;
				color: black;
			}

			div.cart-address-info {
				opacity: .6;
				color: black !important;
				display: flex;
				flex-direction: column !important;

				div:nth-child(1) {
					width: 100%;
					font-size: 1.3rem;
					display: flex;
					padding: .5rem 0;

					span:nth-child(1) {
						width: 100%;
					}

					span:nth-child(2) {
						width: 100%;
						display: flex;
						justify-content: flex-end;
					}
				}

				div:nth-child(2) {
					width: 100%;
					font-size: 1.3rem;
					padding: .3rem 0;
					display: flex;
					justify-content: flex-start;
				}
			}

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
				height: 80px;
			}

			.row-bg {
				padding: 0;
			}
		}

		// 页脚
		.cart-foot.el-row {
			z-index: 102;
			justify-content: space-between;
			background-color: palegoldenrod;
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex !important;

			&:last-child {
				margin-bottom: 0;
			}

			.el-col {
				width: 40%;
			}


			.grid-content {
				width: 100%;
				height: 5rem;

				.pay-btn {
					width: 100%;
					height: 100%;
					background-color: rgb(188, 140, 100);
					border: none;
					outline: none;
				}
			}

			.cart-sum {
				padding: 0 2rem;
				width: 100% !important;
				display: flex !important;
				flex-direction: column !important;
				justify-content: center;

				span:nth-child(1) {
					width: 100%;
					color: rgb(188, 140, 100);
					font-size: 1.5rem;
				}
			}

			.row-bg {
				padding: 0;
			}
		}
	}
</style>
