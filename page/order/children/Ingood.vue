<template>
    <div>
        <Order></Order>
        <div class="main">
        <ul v-for="order1 in product" :key="order1.id" class="msg-ul">
        	<li>
        		<div>
        			<div class='main-title'><span style="font-size:1.4rem;margin-bottom:1rem">阅生活旗舰店</span><span>订单号:{{order1.date_id}}</span><span
        				 class="color">{{order1.order_date}}</span></div>
        				
        			<div class="main-center on7" v-for="order2 in order1.order" :key='order2.id'><span class="span-img"><img
        					 :src="'./static/image/'+order2.book_img" alt=""></span><span class="main-book-name" >{{order2.book_name}}</span><span
        				 class="span-money color">￥{{order2.book_price | KeepTwoNum}}</span></div>
        		</div>
        		<div class="total">
        			<div class="total-intro">
        				<p>共{{order1.num}}件商品 合计：<span class="color">￥{{order1.result}}</span></p>
        			</div>
        			<div class="btn">
        				<el-button type="text" @click='delOrder(order1.date_id)'>退款</el-button>
        			</div>
        		</div>
        	</li>
        </ul>
        <div class="text-none" v-show="isShow"><span>无内容</span></div>
        </div>
        <Loading></Loading>
    </div>
</template>

<script>
import Loading from '../../../components/common/Loading'
import axios from 'axios'
import Order from '../Order'
export default {
    components:{Loading,Order},
    data () {
        return {
        orderMsg:[],
        isShow:false,
				product: []
        }
    },
    created(){
     let user = sessionStorage.getItem('user');
	 let sql1='SELECT * FROM book_date where username ="' + user + '" and order_date=2';
	 axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql1).then(res=>{
    	var res1 = res.data;
    	if (res1.length == 0) {
    		this.isShow = true;
    	} else {
    		this.isShow = false;
    	}
    	for (let m in res1) {
    		this.product.push({
    			date_id: res1[m].date_id,
    			order_date: res1[m].order_date,
    			order: [],
    			num:0,
    			result:0
    		})
    	}
    
    	//根据订单状态添加
    	for (let i in res1) {
    		switch (res1[i].order_date) {
    			case '0':
    				this.product[i].order_date = '待付款'
    				break;
    			case '1':
    				this.product[i].order_date = '待发货'
    				break;
    			case '2':
    				this.product[i].order_date = '待收货'
    				break;
    			default:
    				this.product[i].order_date = '退款/售后'
    				break;
    		}
    	}
    	console.log(this.product)
    	for (let j in this.product) {
    		let sql2='select * from book_order where order_state=2 and date_id="' + this.product[j].date_id + '" and user_name="'+user+'"';
    		axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql2).then(res=>{
    			var res2 = res.data;
    			for (let k in res2) {
    				this.product[j].order[k] = res2[k];
    				this.product[j].num=parseInt(this.product[j].num)+parseInt(res2[k].book_num);
    				this.product[j].result=res2[k].book_result;
    			}
    			this.$forceUpdate();
    		});
    	}
    	
    });
  },
	filters: {
		KeepTwoNum: function(value) {
			value = Number(value);
			return value.toFixed(2);
		}
	},
  mounted() {
    
  },
  methods:{
    //删除订单
    delOrder(date_id) {
    	this.$confirm('即将退款, 是否继续?', '提示', {
    		confirmButtonText: '确定',
    		cancelButtonText: '取消',
    		type: 'warning',
    		customClass: 'confirm',
    	}).then(() => {
    		this.$message({
    			type: 'success',
    			message: '退款成功!'
    		});
			let sql2='DELETE FROM book_order WHERE date_id ='+ date_id;
			axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql2).then(res=>{
    		});
			
			let sql3='DELETE FROM book_date WHERE date_id ='+ date_id;
			axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql3).then(res=>{
    		});
    		this.$router.go(0);
    	}).catch(() => {
    		this.$message({
    			type: 'info',
    			message: '您已取消操作！'
    		});
    	});
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../../../style/base.scss";

    .text-none{
      @include center;
      span{
        @include sc(2rem,$bgcolor);
      }
    }
    .msg-ul{
      list-style: none;
      padding: 0;
    }
    .main-title{
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
    }
    .main-center{
      display: flex;
      justify-content: space-between;
      line-height: 9rem;
      border-bottom: 0.1rem solid #eee;
      margin-bottom: 0.5rem;
      span.img{
        @include wh(50%,50%);
      }
      span{
        width: 27%;
        align-items: center;
        margin-bottom: 0.5rem;
        img{
          @include wh(100%,100%);
        }
      }
      .span-money{
        text-align: end;
        padding-right: 1rem;
      }
    }
    .total{
      display: flex;
      flex-direction: column;
      .total-intro{
        text-align: end;
        p{
          padding: 0 1rem;
        }
      }
    }
    .color{
      color: $bgcolor;
    }
    .btn{
    text-align: center;
    display: flex;
      button{
        flex: 1;
          border: none;
          @include sc(1.4rem,white);
          background: $bgcolor;
          border-radius: 0.5rem;
      }
      button:first-child{
        border: 0.1rem solid $bgcolor;
        background: white;
        color: $bgcolor;
      }
  }
  .main-book-name{
    flex: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
</style>

<style lang="scss">
    .el-message-box.confirm{
        width:70%;
    }
</style>