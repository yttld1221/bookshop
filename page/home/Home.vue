<template>
	<nav>
		<el-row type="flex" class="row-bg home-header" justify="center">
			<el-col :span="8">
				<div class="grid-content">
					<img src="../../../static/image/sweep.jpg">
					<span>扫一扫</span>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content book-logo">
					<img src="../../../static/image/logo.png">
					<span>阅生活</span>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="grid-content book-search" @click="jump_search">
					
						<img src="../../../static/image/search.png">
						<span>搜索</span>
				</div>
			</el-col>
		</el-row>
		<main class="el-main">
			<!-- 轮播 -->
			<el-row type="flex" class="row-bg home-lb" justify="center">
				<div class="swiper-container home-lb-item">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<img src="https://img10.360buyimg.com/da/jfs/t1/16237/9/6373/99441/5c4eaa0eE25497272/6d8e16834d9e471e.jpg!q95.webp"
							 alt="">
						</div>
						<div class="swiper-slide">
							<img src="https://img13.360buyimg.com/da/jfs/t1/31469/34/1186/100159/5c48041eE5d9f1f65/0c3036aa22663ed7.jpg!q95.webp"
							 alt="">
						</div>
						<div class="swiper-slide">
							<img src="https://img13.360buyimg.com/da/jfs/t1/22075/23/6340/82279/5c4e9c2aEe07624f6/6d1ea9df94b4d49e.jpg!q95.webp"
							 alt="">
						</div>
					</div>
					<div class="swiper-pagination"></div>
				</div>
			</el-row>
			<!-- 店长推荐 -->
			<el-row type="flex" class="row-bg home-recommend" justify="center">
				<div class="home-recommend-span">店长推荐</div>
				<div class="swiper-container home-recommend-item">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="obj in recommend_item" :key='obj.id' @click="jump_detail(obj.book_id,obj.book_name)">
							<img :src="img_head+obj.book_img.split('|')[0]" alt="">
							<div class="content-box">
								<span>{{obj.book_name}}</span>
								<span>{{obj.book_author}}</span>
								<span class="content-directory">
									{{obj.book_directory}}
								</span>
							</div>
						</div>
					</div>
				</div>
			</el-row>
			<!-- 寒假活动 -->
			<el-row type="flex" class="row-bg home-holiday" justify="center">
				<div class="home-holiday-span">寒假活动</div>
				<div class="home-holiday-item">
					<el-row tag='nav'>
						<el-col :span="12" v-for="obj1 in holiday_item" :key='obj1.id'>
							<div class="grid-content bg-purple" @click="jump_detail(obj1.book_id,obj1.book_name)">
								<img :src="img_head+obj1.book_img.split('|')[0]" alt="">
								<span>{{obj1.book_name}}</span>
								<span class="home-holiday-price"><span>&yen;{{obj1.book_price | KeepTwoNum}}</span><span>&yen;{{obj1.book_price*1.2 | KeepTwoNum}}</span></span>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<!-- 特价活动 -->
			<el-row type="flex" class="row-bg home-special " justify="center">
				<div class="home-special-span">特价活动</div>
				<div class="home-special-item">
					<el-row tag='nav'>
						<el-col :span="12" v-for="obj2 in special_item" :key='obj2.id'>
							<div class="grid-content bg-purple" @click="jump_detail(obj2.book_id,obj2.book_name)">
								<img :src="img_head+obj2.book_img.split('|')[0]" alt="">
								<span>{{obj2.book_name}}</span>
								<span class="home-special-price"><span>&yen;{{obj2.book_price | KeepTwoNum}}</span><span>&yen;{{obj2.book_price*1.2 | KeepTwoNum}}</span></span>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
			<!-- 专题推荐 -->
			<el-row type="flex" class="row-bg home-specially" justify="center">
				<div class="home-specially-span">专题推荐</div>
				<div class="swiper-container home-specially-item">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="obj3 in specially_item" :key='obj3.id' @click="jump_detail(obj3.book_id,obj3.book_name)">
							<img :src="img_head+obj3.book_img.split('|')[0]" alt="">
							<div class="content-box">
								<span>{{obj3.book_name}}</span>
								<span>{{obj3.book_author}}</span>
								<span class="content-directory">
									{{obj3.book_directory}}
								</span>
							</div>
						</div>
					</div>
				</div>
			</el-row>
			<!-- 个性推荐 -->
			<el-row type="flex" class="row-bg home-personality " justify="center">
				<div class="home-personality-span">个性推荐</div>
				<div class="home-personality-item">
					<el-row tag='nav'>
						<el-col :span="12" v-for="obj4 in personality_item" :key='obj4.id'>
							<div class="grid-content bg-purple" @click="jump_detail(obj4.book_id,obj4.book_name)">
								<img :src="img_head+obj4.book_img.split('|')[0]" alt="">
								<span>{{obj4.book_name}}</span>
								<span class="home-personality-price"><span>&yen;{{obj4.book_price | KeepTwoNum}}</span><span>&yen;{{obj4.book_price*1.2 | KeepTwoNum}}</span></span>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-row>
		</main>
		<Loading></Loading>
		<footGuide></footGuide>
	</nav>

</template>

<script>
	import axios from 'axios'
	import "swipercss"
	import Swiper from "swiper-js"
	import footGuide from '../../components/footGuide/FootGuide'
	import Loading from '../../components/common/Loading.vue'
	export default {
		components: {
			footGuide,
			Loading
		},
		name: 'Home',
		data() {
			return {
				recommend_item: [],
				holiday_item: [],
				special_item: [],
				specially_item: [],
				personality_item: [],
				img_head: "./static/image/"
			}
		},
		mounted() {
			this.home_lb();
		},
		updated() {
			this.home_recommend();
			this.home_specially();
		},
		filters: {
			KeepTwoNum: function(value) {
				value = Number(value);
				return value.toFixed(2);
			}
		},
		methods: {
			//轮播
			home_lb: function() {
				var mySwiper1 = new Swiper('.home-lb-item', {
					loop: true,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: true,
					},
					pagination: {
						el: '.swiper-pagination',
					},
				})
			},
			home_recommend: function() {
				var mySwiper2 = new Swiper('.home-recommend-item', {
					loop: true,
					slidesPerView: 1.6,
					spaceBetween: '1%',
				})
			},
			home_specially: function() {
				var mySwiper3 = new Swiper('.home-specially-item', {
					effect: 'coverflow',
					slidesPerView: 1.6,
					centeredSlides: true,
					initialSlide: 1,
					coverflowEffect: {
						rotate: 0,
						stretch: 10,
						depth: 160,
						modifier: 2,
						slideShadows: true
					},
				})
			},
			jump_detail: function(get_id, get_name) {
				this.$router.push({
					name: 'Shopdetail',
					query: {
						goodId: get_id,
						goodName: get_name
					}
				})
			},
			jump_search: function() {
				this.$router.push({
					path: 'Search',
					query: {
						searchInfo: ''
					}
				})
			}

		},
		created() {
			//店长推荐
			let sql='SELECT * FROM book_info  ORDER BY  RAND() LIMIT 5';
			axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then(res=>{
				this.recommend_item = res.data;
			});
			//寒假活动
			let sql1='SELECT * FROM book_info  ORDER BY  RAND() LIMIT 8';
			axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql1).then(res=>{
				this.holiday_item = res.data;
			});
			//特价活动
			let sql2='SELECT * FROM book_info  ORDER BY  RAND() LIMIT 10';
			axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql2).then(res=>{
				this.special_item = res.data;
			});
			
			// 专题推荐
			let sql3='SELECT * FROM book_info  ORDER BY  RAND() LIMIT 7';
			axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql3).then(res=>{
				this.specially_item = res.data;
			});
			// 个性推荐
			let sql4='SELECT * FROM book_info  ORDER BY  RAND() LIMIT 12';
			axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql4).then(res=>{
				// this.infoData=res.data;
				this.personality_item =  res.data;
				// this.sortup(res.data)
			});
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../style/base.scss";

	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	div {
		width: 100%;
		display: flex;
	}

	.el-row.home-header {
		background-color: white;
		z-index: 101;
		margin-bottom: 20px;
		position: fixed;
		top: 0;

		&:nth-child(1) {
			img {
				width: 20%;
			}

			span {
				height: 25%;
				padding: 0 0 5px 0;
			}
		}

		&:last-child {
			margin-bottom: 0;
		}
	}

	.grid-content {
		min-height: 4rem;
		border-bottom: .1rem solid rgb(210, 210, 210);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: black;
	}


	.grid-content.book-search a {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: black;

		img {
			width: 20%;
		}

		span {
			height: 25%;
		}
	}

	.row-bg {
		padding: 0;
	}

	.grid-content.book-logo {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row !important;

		img {
			width: 35% !important;
		}

		span {
			font-size: 2.2rem !important;
			height: 100%;
			color: rgb(184, 163, 133);
			display: flex;
			align-items: center;
			padding: 0;
		}
	}

	// 中间部分
	main {
		padding: 0;
		background-color: gainsboro;
		margin-top: 3.1rem;
		display: flex;
		flex-direction: column;

		.home-lb {
			margin-top: 2rem;
			width: 100%;

			img {
				height: 100% !important;
				width: 100% !important;
			}

			.swiper-pagination {
				display: flex;
				justify-content: center;
			}
		}

		// 店长推荐
		.home-recommend {
			display: flex;
			flex-direction: column;

			div.home-recommend-span {
				color: rgb(184, 163, 133);
				height: 4rem;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.6rem;
				font-weight: bold;
			}

			.swiper-wrapper {
				display: flex;

				.content-box {
					width: 50%;
					display: flex;
					justify-content: center;
					flex-direction: column;

					span {
						padding: .2rem 0;
					}

					span:nth-child(1) {
						font-size: 1.4rem;
						display: inline-block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 90%;
					}

					span:nth-child(2) {
						font-size: 1.2rem;
						display: inline-block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 90%;
						color: gainsboro;
					}

					span:nth-child(3) {
						font-size: 1.2rem;
						display: inline-block;
						display: -webkit-box;
						/*! autoprefixer: off */
						-webkit-box-orient: vertical;
						/* autoprefixer: on */
						-webkit-line-clamp: 3;
						overflow: hidden;
						width: 90%;
					}
				}
			}

			.swiper-slide {
				background-color: white;

				img {
					width: 50%;
					height: 100%;
					padding: 1rem .5rem;
				}
			}
		}

		//寒假活动
		.home-holiday {
			display: flex;
			flex-direction: column;

			div.home-holiday-span {
				color: rgb(184, 163, 133);
				height: 4rem;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.6rem;
				font-weight: bold;
			}

			div.home-holiday-item {
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
					display: flex;
					flex-direction: column;
					min-height: 36px;

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

					.home-holiday-price {
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

		//特价活动
		.home-special {
			display: flex;
			flex-direction: column;

			div.home-special-span {
				color: rgb(184, 163, 133);
				height: 4rem;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.6rem;
				font-weight: bold;
			}

			div.home-special-item {
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
					display: flex;
					flex-direction: column;
					min-height: 36px;

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

					.home-special-price {
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

		// 专题推荐
		.home-specially {
			display: flex;
			flex-direction: column;

			div.home-specially-span {
				color: rgb(184, 163, 133);
				height: 4rem;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.6rem;
				font-weight: bold;
			}

			.home-specially-item {}

			.swiper-wrapper {
				display: flex;

				.content-box {
					width: 50%;
					display: flex;
					justify-content: center;
					flex-direction: column;

					span {
						padding: .2rem 0;
					}

					span:nth-child(1) {
						font-size: 1.4rem;
						display: inline-block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 90%;
					}

					span:nth-child(2) {
						font-size: 1.2rem;
						display: inline-block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 90%;
						color: gainsboro;
					}

					span:nth-child(3) {
						font-size: 1.2rem;
						display: inline-block;
						display: -webkit-box;
						/*! autoprefixer: off */
						-webkit-box-orient: vertical;
						/* autoprefixer: on */
						-webkit-line-clamp: 3;
						overflow: hidden;
						width: 90%;
					}
				}
			}

			.swiper-slide {
				background-color: white;

				img {
					width: 50%;
					height: 100%;
					padding: 1rem .5rem;
				}
			}
		}

		// 个性推荐
		.home-personality {
			padding: 0 0 5rem 0;
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
					display: flex;
					flex-direction: column;
					min-height: 36px;

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
	}
</style>
