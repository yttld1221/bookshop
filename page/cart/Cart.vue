<template>
	<div class="cart-container">
		<!-- 页头 -->
		<el-row type="flex" class="row-bg cart-head" justify="center">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<headBackto></headBackto>购物车
				</div>
			</el-col>
		</el-row>
		<!-- 订单列表 -->
		<el-row type="flex" class="row-bg cart-list" justify="center">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					<div class="cart-list-span">
						<nav><input type="checkbox" name="book_info" :checked="cart_show" v-model="cart_show" @change="selectAll" /><span><img
								 src="../../../static/image/shop.png"><span>阅生活</span></span></nav>
					</div>
					<ul>
						<li class="cart-list-none">空空如也</li>
						<li v-for='(cart,index) in cart_item' :key="cart.id">
							<span class="checkBox"><input type="checkbox" name="book_info" :checked="cart.cart_show" v-model="cart.cart_show"
								 @change="selecta(index)"></span>
							<span class="cart-img" @click="jump_detail(cart.book_name)"><img :src="img_head + cart.book_img.split('|')[0]"></span>
							<div class="cart-content">
								<span @click="jump_detail(cart.book_name)">{{cart.book_name}}</span>
								<span class="cart-price"><span>&yen;{{cart.book_price | KeepTwoNum}}</span><span>&yen;{{cart.book_price*1.2 | KeepTwoNum}}</span></span>
								<span class='cart-num'>
									<input type="button" value="-" @click="reduce(index,cart.cart_id)">
									<input type="text" v-model='cart.book_num' @keyup.enter="update_num(index,cart.cart_id)">
									<input type="button" value="+" @click="add(index,cart.cart_id)">
								</span>
							</div>
							<span class="cart-del">
								<input type="button" value="删除" @click="del(index,cart.cart_id)" />
							</span>
						</li>
					</ul>

				</div>
			</el-col>
		</el-row>
		<!-- 提示栏 -->
		<el-row type="flex" class="row-bg cart-tips" justify="center">
			<el-col :span="24">
				<div class="grid-content bg-purple">
					本店购物满59包邮（部分特惠商品除外）
				</div>
			</el-col>
		</el-row>
		<!-- 结算页脚 -->
		<el-row type="flex" class="row-bg cart-foot" justify="center">
			<el-col :span="8">
				<div class="grid-content bg-purple">
					<input class="check" type="checkbox" name="book_info" :checked="cart_show" v-model="cart_show" @change="selectAll" /><span>全选</span>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-purple cart-sum">
					<span>合计:￥{{priceall}}</span>
					<span>不含运费</span>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content bg-purple">
					<input class="pay-btn" type="button" value="去结算"  @click="pay(priceall)"/>
				</div>
			</el-col>
		</el-row>
		<!-- 为您推荐 -->
		<el-row type="flex" class="row-bg home-personality " justify="center">
			<div class="home-personality-span">为您推荐</div>
			<div class="home-personality-item">
				<el-row tag='nav'>
					<el-col :span="12" v-for="obj4 in personality_item" :key='obj4.id'>
						<div class="grid-content bg-purple" @click="jump_detaila(obj4.book_id,obj4.book_name)">
							<img :src="img_head+obj4.book_img.split('|')[0]" alt="">
							<span>{{obj4.book_name}}</span>
							<span class="home-personality-price"><span>&yen;{{obj4.book_price | KeepTwoNum}}</span><span>&yen;{{obj4.book_price*1.2 | KeepTwoNum}}</span></span>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-row>
		<Loading></Loading>
		<footGuide></footGuide>
	</div>
</template>

<script>
	import axios from 'axios'
	import footGuide from '../../components/footGuide/FootGuide'
	import Loading from '../../components/common/Loading.vue'
	import headBackto from '../../components/common/BackTo'
	export default {
		components: {
			footGuide,
			Loading,
			headBackto
		},
		name: 'Cart',
		data() {
			return {
				cart_show: false,
				conunt: 0,
				cart_item: [],
				img_head: "./static/image/",
				cart_bookname: '',
				book_item: [],
				personality_item:[],
				order_item:[],
				cart_buya:[]
			}
		},
		mounted() {},
		filters: {
			KeepTwoNum: function(value) {
				value = Number(value);
				return value.toFixed(2);
			}
		},
		created() {
			// 购物车
			var username=sessionStorage.getItem('user');
			if(username==null){
				alert('您未登录，请登录后操作');
				this.$router.push({
					name: 'Login'
				})
			}else{
				let sql1='SELECT * FROM book_cart WHERE user_name="'+username+'"';
				axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql1).then(res=>{
					var res = res.data
					if(res.length>0){
					this.cart_item = res;
					console.log(this.cart_item[0].cart_show)
					for (var i in this.cart_item)
						this.cart_item[i].cart_show = false;
						$('.cart-list-none').css('display','none')
						}else{
							$('.cart-list-none').css('display','block')
						}
				});
			}
			
			// 为您推荐
			let sql2='SELECT * FROM book_info  ORDER BY  RAND() LIMIT 12';
			axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql2).then(res=>{
				var res6 = res.data;
				this.personality_item = res6;
			});
		},
		computed: {
			// 计算总价
			priceall: function() {
				var result = 0;
				for (var i in this.cart_item) {
					if (this.cart_item[i].cart_show) {
						result += this.cart_item[i].book_price * this.cart_item[i].book_num;
					}
				}
				return parseFloat(result).toFixed(2);
			}
		},
		methods: {
			// 订单列表跳转详情
			jump_detail: function(get_bookname) {
				console.log(get_bookname)
				//获取书籍id
				let sql3='SELECT * FROM book_info WHERE book_name="' + get_bookname + '"';
				axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql3).then(res=>{
					var res1 = res.data;
					this.book_item = res1;
					this.$router.push({
						name: 'Shopdetail',
						query: {
							goodId: this.book_item[0].book_id,
							goodName:get_bookname
						}
					})
				});
			},
			// 为您推荐跳转详情
			jump_detaila:function(get_id,get_bookname){
				this.$router.push({
					name: 'Shopdetail',
					query: {
						goodId: get_id,
						goodName:get_bookname
					}
				})
			},
			// 全选
			selectAll: function() {
				for (var i in this.cart_item)
					this.cart_item[i].cart_show = this.cart_show ? true : false;
				this.conunt = this.cart_show ? this.cart_item.length : 0;
				console.log(this.conunt)
			},
			// 单个选择
			selecta: function(index) {
				this.conunt = this.cart_item[index].cart_show ? this.conunt + 1 : this.conunt - 1;
				console.log(this.conunt);
				this.cart_show = (this.conunt == this.cart_item.length) ? true : false;
			},
			// 删除
			del: function(index, get_cartid) {
				this.cart_item.splice(index, 1);
				//删除订单
				let sql4='DELETE FROM book_cart WHERE cart_id=' + get_cartid;
				axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql4).then(res=>{
				});
			},// 支付
			pay: function(result) {
				var username=sessionStorage.getItem('user');
				var a=Math.ceil(Math.random()*10);
				var b=Math.ceil(Math.random()*10);
				var dc=Math.round(new Date() / 1000);
				
				let sql5='INSERT INTO book_date (date_id,order_date,username) VALUES('+(a+b+dc)+',0,"'+username+'")';
				axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql5).then(res=>{
				});
				window.sessionStorage.setItem('date_id',(a+b+dc))
					for (let i in this.cart_item) {
						if (this.cart_item[i].cart_show) {
							this.cart_buya.push({
								user1_name:username,
								book1_name:this.cart_item[i].book_name,
								book1_img:this.cart_item[i].book_img.split('|')[0],
								book1_price:this.cart_item[i].book_price,
								book1_num:this.cart_item[i].book_num,
								book1_result: result
							})
							//插入订单数据
							let sql6='INSERT INTO book_order (user_name, book_name,book_img,book_price,book_num,book_result,order_state,date_id) VALUES ("'+username+'", "'+this.cart_item[i].book_name+'", "'+this.cart_item[i].book_img.split('|')[0]+'", "'+this.cart_item[i].book_price+'", "'+this.cart_item[i].book_num+'", "'+result+'",0,'+(a+b+dc)+')' ;
							axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql6).then(res=>{
							});
						}
					}	
						
				if(result==0){
					$('.pay-btn').css('disabled','disabled');
				}else{
					this.$router.push({
						name: 'Cartorder',
					query: {
						price_all: result,
						cart_order: this.cart_buya
					}
					})
				}
			},

			// 减少数量
			reduce: function(index, get_cartid) {
				if (this.cart_item[index].book_num == 0) {
					this.cart_item[index].book_num = 0;
				} else {
					this.cart_item[index].book_num = Number(this.cart_item[index].book_num) - 1;
				}
				
				let sql7='UPDATE book_cart SET book_num=' + this.cart_item[index].book_num + ' WHERE cart_id=' + get_cartid;
				axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql7).then(res=>{
				});
			},
			// 增加数量
			add: function(index, get_cartid) {
				this.cart_item[index].book_num = Number(this.cart_item[index].book_num) + 1;
				
				let sql8='UPDATE book_cart SET book_num=' + this.cart_item[index].book_num + ' WHERE cart_id=' + get_cartid;
				axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql8).then(res=>{
				});
			},
			// 键盘事件修改数量
			update_num: function(index, get_cartid) {
				let sql9= 'UPDATE book_cart SET book_num=' + this.cart_item[index].book_num + ' WHERE cart_id=' + get_cartid;
				axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql9).then(res=>{
				});
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

	.cart-container {
		background-color: gainsboro;

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

		.cart-list {
			margin-top: 4rem;

			.cart-list-span {
				border-bottom: .05rem solid rgb(210, 210, 210);
				background-color: white;
				height: 3.5rem;

				nav {
					height: 100%;
					width: 35%;
					display: flex;
					align-items: center;
					justify-content: space-around;

					input {
						width: 30%;
						height: 50%;
						padding: 0 1rem;
					}

					span {
						width: 70%;
						height: 100%;
						display: flex;
						align-items: center;
						font-size: 1.7rem;

						img {
							width: 30%;
						}
						img+span{
							padding: .2rem 0 0 0;
						}
					}


				}
			}

			ul {
				width: 100%;
				.cart-list-none{
					height: 8rem;
					text-align: center;
					line-height: 8rem;
					font-size: 2rem;
					display: none;
					}
				li {
					background-color: white;
					display: flex;
					justify-content: center;
					border-bottom: .05rem solid rgb(210, 210, 210);
					height: 100%;
					width: 100%;

					span.checkBox {
						width: 15%;
						display: flex;
						justify-content: center;
						align-items: center;

						input {
							width: 32%;
							height: 50%;
							padding: 0 1rem;
						}
					}

					.cart-img {
						width: 25%;

						img {
							width: 100%;
							padding: 1rem 0;
						}
					}

					div.cart-content {

						text-align: center;
						justify-content: space-around;
						display: flex;
						flex-direction: column;
						width: 35%;

						span:nth-child(1) {
							width: 80%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						span.cart-price {
							display: flex;
							justify-content: center;

							span {
								width: 40%;
							}

							span:nth-child(1) {
								color: rgb(184, 163, 133);
							}

							span:nth-child(2) {
								font-size: 1.2rem;
								text-decoration: line-through;
								display: flex;
								align-items: center;
							}

						}

						span.cart-num {
							width: 80%;
							justify-content: center;
							display: flex !important;
							flex-direction: row !important;
							align-items: center;

							input:nth-child(1) {
								width: 25%;
								text-align: center;
							}

							input:nth-child(2) {
								color: rgb(188, 140, 100);
								width: 40%;
								text-align: center;
								border: none;
							}

							input:nth-child(3) {
								width: 25%;
								text-align: center;
							}
						}

					}

					span.cart-del {
						width: 25%;
						display: flex;
						align-items: center;
						input {
							color: white;
							font-size: 2rem;
							width: 100%;
							height: 99%;
							border: none;
							background-color: red;
							outline: none;
						}
					}
				}
			}
		}

		// 提示栏
		.cart-tips {
			
			.el-row {
				
				&:last-child {
					margin-bottom: 0;
				}
			}

			.el-col {
			}
			.grid-content {
				background-color: ghostwhite;
				font-size: 1.2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 25px;
			}

			.row-bg {
				padding: 10px 0;
				background-color: #f9fafc;
			}
		}
		
		// 为您推荐
		.home-personality {
			padding: 0 0 10.9rem 0;
			display: flex;
			flex-direction: column;
		
			div.home-personality-span {
				color: rgb(184, 163, 133);
				height: 4rem;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.6rem;
				font-weight: bold;
			}
		
			div.home-personality-item {
				nav {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
		
				.el-row {
		
		
					&:last-child {
						margin-bottom: 0;
					}
				}
		
				.el-col {
					background-color: white;
					width: 49.5%;
				}
		
		
		
				.grid-content {
					border-top:.05rem solid gainsboro;
					display: flex;
					flex-direction: column;
					min-height: 36px;
					align-items: center;
					img {
						padding: .5rem 0;
						width: 70%;
						height: 70%;
					}
		
					span {
						text-align: center;
						width: 100%;
						padding: .2rem 0;
						overflow: hidden !important;
						text-overflow: ellipsis !important;
						white-space: nowrap !important;
					}
		
					&:nth-child(2) {
						font-size: 1.1rem;
					}
		
					.home-personality-price {
						display: flex;
						justify-content: space-around !important;
						align-items: center;
		
						span:nth-child(1) {
							display: flex;
							flex-direction: row-reverse;
							width: 45% !important;
							font-size: 1.2rem;
							color: saddlebrown;
						}
		
						span:nth-child(2) {
							display: flex;
							width: 45% !important;
							font-size: 1rem;
							text-decoration: line-through;
						}
					}
				}
		
				.row-bg {
					padding: 10px 0;
				}
			}
		
		}
		
		// 页脚
		.cart-foot.el-row {
			z-index: 102;
			justify-content: center;
			background-color: palegoldenrod;
			position: fixed;
			bottom: 6rem;
			width: 100%;
			display: flex !important;

			&:last-child {
				margin-bottom: 0;
			}

			.el-col {
				width: 33.33%;
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

			.grid-content:nth-child(1) {
				display: flex;
				align-items: center;

				input.check {
					width: 40%;
					height: 40%;
				}

				input.check+span {
					font-size: 1.4rem;
					padding: .6rem 0 0;
				}
			}

			.cart-sum {
				display: flex !important;
				flex-direction: column !important;
				justify-content: center;

				span:nth-child(1) {
					color: rgb(188, 140, 100);
					font-size: 1.5rem;
				}

				span:nth-child(2) {
					font-size: 1.2rem;
				}
			}

			.row-bg {
				padding: 0;
			}
		}
	}
</style>
