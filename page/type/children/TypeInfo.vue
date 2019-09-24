<template>
	<div class="type-info">
		<div class="sortBtn">
			<button @click="Pricesort()" :class="{ active: isActive1 }">价格</button>
            <button @click="Numsort()" :class="{ active: isActive2 }">销量</button>
		</div>
		<ul>
			<Loading></Loading>
			<li v-for="(list, index) in infoData" :key="index" @click="selectGood(list.book_id,list.book_name)">
				<img :src="'./static/image/'+list.book_img.split('|')[0]" />
				<p class="price">￥{{ list.book_price }}</p>
				<p>{{ list.book_name }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
import Loading from '../../../components/common/Loading'
export default {
	components: {
		Loading
	},
	name: 'TypeInfo',
	props: ['className'],
	data() {
		return {
			infoData: [],
			count1:0,
			count2:0,
			isActive1:false,
			isActive2:false
		};
	},
	methods: {
		//价格排序
		Pricesort(){
			this.count1++;
			this.isActive1=true;
			this.isActive2=false;
			if(this.count1%2==0){
				this.infoData.sort((a,b)=>{
                	return a.book_price-b.book_price;
				});
			}else{
				this.infoData.sort((a,b)=>{
                	return b.book_price-a.book_price;
				});
			}
		},
		//销量排序
		Numsort(){
			this.count2++;
			this.isActive1=false;
			this.isActive2=true;
			if(this.count2%2==0){
				this.infoData.sort((a,b)=>{
                	return a.book_num-b.book_num;
				});
			}else{
				this.infoData.sort((a,b)=>{
                	return b.book_num-a.book_num;
				});
			}
		},
		//点击路由到商品详细信息页
		selectGood(book_id,book_name){
			this.$router.push({
			path: 'Shopdetail',
			query:{
				goodId:book_id,
				goodName:book_name
				}
			})
		}
	},
	created() {
        let sql=`SELECT * FROM book_info WHERE book_type='${this.className}'`;
        axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then(res=>{
			this.infoData=res.data;
        });
    }
};
</script>

<style lang="scss" scoped>
.type-info {
	width: 100%;
	height: 100%;
	text-align: center;
	.sortBtn{
		background-color: #e5e9f2;
		color: #333;
		text-align: center;
		line-height: 40px;
		max-height: 40px;
		.active{
			color: brown;
		}
		button{
			height: 40px;
			border: none;
			width: 40%;
			outline: none;
			background-color: rgba(255,255,255,0);
		}
	}
	ul {
		list-style: none;
		padding: 0 !important;
		li {
			border: 0.5px solid #ccc;
			float: left;
			width: 50%;
			height: 200px;
			padding: 10px;
			img {
				width: 90%;
				height: 60%;
			}
			p{
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.price{
				margin-top: 10px;
				color: brown;
			}
		}
	}
	.view-more {
			height: 50px;
			line-height: 50px;
		a{			
			color: red;
		}
	}
}
</style>