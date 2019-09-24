<template>
	<div class="searchBox">
		<div class="head">
			<el-row type="flex" class="row-bg" justify="center">
				<el-col :span="4">
					<backTo></backTo>
				</el-col>
				<el-col :span="20">
					<div class="grid-content">
						<div class="book-search">
							<input type="text" placeholder="搜索感兴趣的书籍" v-model="searchText" @keyup.enter="persentSearch">
							<img src="../../../static/image/search.png" @click="persentSearch()">
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="content">
			<Loading></Loading>
			<el-container>
				<el-main>
					<ul v-show="commentShow1">
						<li v-for="(list, index) in result" :key="index" @click="selectGood(list.book_id,list.book_name)">
							<img :src="'./static/image/'+(list.book_img || '').split('|')[0]" />
							<p class="price">￥{{ list.book_price }}</p>
							<p>{{ list.book_name }}</p>
						</li>
					</ul>
					<div v-show="commentShow2" class="nothing">
						{{ result }}
					</div>
				</el-main>
			</el-container>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import backTo from '../../components/common/BackTo'
	import Loading from '../../components/common/Loading'
	export default {
		name: "Search",
		components: {
			Loading,
			backTo
		},
		data() {
			return {
				text: this.$route.query.searchInfo,
				searchText: "",
				loading: false,
				result: [],
				commentShow1: true,
				commentShow2: false
			}
		},
		created() {
			this.seachResult();
		},
		methods: {
			//接收type路由传过来的参数，请求数据
			seachResult() {
				let sql = `SELECT * FROM book_info WHERE book_name LIKE '%${this.text}%'`;
				axios.get('http://132.232.114.138/php/datainfo.php?sql=' + sql).then(res => {
					if (res.data.length > 0) {
						this.result = res.data;
						this.commentShow1 = true;
						this.commentShow2 = false;
					} else {
						this.result = "对不起，该书暂未上架";
						this.commentShow1 = false;
						this.commentShow2 = true;
					}
				});
			},
			//当前页搜索
			persentSearch() {
				let sql = `SELECT * FROM book_info WHERE book_name LIKE '%${this.searchText}%'`;
				axios.get('http://132.232.114.138/php/datainfo.php?sql=' + sql).then(res => {
					if (res.data.length > 0) {
						this.result = res.data;
						this.commentShow1 = true;
						this.commentShow2 = false;
					} else {
						this.result = "对不起，该书暂未上架";
						this.commentShow1 = false;
						this.commentShow2 = true;
					}
				});
			},
			//点击路由到商品详细信息页
			selectGood(book_id, book_name) {
				this.$router.push({
					path: 'Shopdetail',
					query: {
						goodId: book_id,
						goodName: book_name
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>

	ul {
		list-style: none;
		padding: 0 !important;

		li {
			border-bottom: 0.5px solid #ccc;
		}
	}

	.searchBox {
		width: 100%;
		height: auto;

		.head {
			.el-row {
				width: 100%;
				height: 50px;
				margin-bottom: 20px;
				position: fixed;
				top: 0;
				border-bottom: 1px solid rgb(210, 210, 210);

				&:first-child {
					img {
						width: 25px !important;
						height: 23px;
						
					}

					span {
						height: 25%;
						padding: 0 0 5px 0;
					}
				}

				&:last-child {
					margin-bottom: 0;
				}

				.grid-content {
					height: 100%;
					min-height: 40px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: black;
					line-height: 50px;
				}

				.book-search {
					width: 90%;
					height: 70%;
					border: 1px solid #eee;
					border-radius: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 10px;
					background-color: #eee;

					input {
						width: 100%;
						border: none;
						outline: none;
						font-size: 14px;
						background-color: #eee;
						line-height: 30px;
					}
				}

				.row-bg {
					padding: 0;
				}
			}
		}

		.content {
			position: fixed;
			top: 50px;
			width: 100%;
			height: 100%;
			overflow: hidden;

			// border: 1px solid red;
			.el-container {
				width: 100%;
				height: 100%;
				text-align: center;

				.el-main {
					margin-bottom: 50px;
					padding: 0 !important;
					background-color: #eef3f5;
					color: #333;

					ul {
						list-style: none;
						padding: 0 !important;

						li {
							border: 0.5px solid #ccc;
							float: left;
							width: 50%;
							height: 200px;
							padding: 10px;
							background-color: #fff;

							img {
								width: 90%;
								height: 60%;
							}

							p {
								width: 100%;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.price {
								margin-top: 10px;
								color: brown;
							}
						}
					}

					.nothing {
						line-height: 200px;
						text-align: center;
						font-size: 18px;
						color: grey;
					}
				}
			}
		}
	}
</style>
