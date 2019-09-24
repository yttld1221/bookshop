<template>
    <div class="detail">
        <el-container>
            <el-header>
                <backTo></backTo>
                <nav>
                    <ul>
                        <li v-for="(item,index) in nav" :key="index" :class="{active:item.isactive}" @click="change(index)">{{item.title}}</li>
                    </ul>
                </nav>
            </el-header>
            <el-main>
                <Loading></Loading>
                <div class="shop-list">
                  <div v-for="(item,index) in nav" :key="index">
                      <shop-list @decrement='decrement' @increment='increment' :className="item.title" :selectedGood="selectedGood" v-if="item.isactive" :img="img" :booknum="selectedGood.book_num"></shop-list>
                  </div>
              </div>
            </el-main>
            <el-footer class='detail-footer'>
                <el-row>
                    <el-col :span="5">
                        <div class="grid-content">
                            <img src="../../../static/image/collect-1.png" v-show="iscollect1" @click="collect()">
                            <img src="../../../static/image/collect-2.png" v-show="iscollect2" @click="Cancelcollect()">
                            <span>收藏</span>
                        </div>
                        </el-col>
                    <el-col :span="5">
                        <div class="grid-content" @click="jump_cart">
							<div class="cart_numa"><input type="text" v-model="cart_num" /></div>
                            <img src="../../../static/image/cart.png">
                            <span>购物车</span>
                        </div>
                        </el-col>
                    <el-col :span="7">
                        <div class="grid-content" >
                            <button class="addcart" @click="join_cart">加入购物车</button>
                        </div>
                        </el-col>
                    <el-col :span="7">
                        <div class="grid-content">
                            <button class="buy" @click="cart_buy">立即购买</button>
                        </div>
                        </el-col>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import axios from 'axios'
import backTo from '../../components/common/BackTo'
import ShopList from '../shopdetail/children/ShopList'
import Loading from '../../components/common/Loading'
export default{
    components: {
        backTo,
        ShopList,
		Loading
	},
    data(){
      return {
        id: this.$route.query.goodId,
        name:this.$route.query.goodName,
        loading: false,
        selectedGood: [],
        img:[],
        nav:[
            {title:"商品",isactive:true},
            {title:"详情",isactive:false},
            {title:"评价",isactive:false},
        ],
        iscollect1:true,
        iscollect2:false,
        uesrname:sessionStorage.getItem("user"),
        collect_time:"",
		cart_num:0,
		cart_booknum:1,
		cart_buya:[],
		book_result:0
      }
    },
	updated() {
		
	},
	mounted() {
	},
    created(){
        this.fetchDate()
        this.Getcollect()
		// 获取购物车数量
		let sql7=`SELECT * FROM book_cart WHERE user_name='${this.uesrname}'`;
		axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql7).then(res=>{
			var res1 = res.data;
			for(var i in res1){
				this.cart_num =Number(this.cart_num) + Number(res1[i].book_num);
			}
			console.log(this.cart_num)
		});
    },
    methods: {
        //tab切换
      change(index){
        this.nav.forEach(item=>{
            item.isactive=false;
        });
        this.nav[index].isactive=true
        },
        //请求书籍数据
        fetchDate(){
            let sql=`SELECT * FROM book_info WHERE book_id='${this.id}' AND book_name='${this.name}'`;
            axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then(res=>{
                this.selectedGood=res.data[0];
                this.img=(this.selectedGood.book_img || '').split("|");
            });
console.log(this.name)
        },
        //请求收藏列表数据
        Getcollect(){
            let sql=`SELECT * FROM book_collect WHERE book_name='${this.name}' AND user_name='${this.uesrname}'`;
            axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then(res=>{
                if(res.data[0]){
                    this.iscollect1=false;
                    this.iscollect2=true;
                }else{
                    this.iscollect1=true;
                    this.iscollect2=false;
                } 
            });
        },
        //点击收藏
        collect(){
            if(this.uesrname!=null){
                this.insertCollect();
            }else{
                alert("您还没有登录，请先登录！")
                this.$router.replace('/Login')
            }    
        } ,
        //添加收藏数据
        insertCollect(){
            this.collect_time=new Date().toLocaleDateString();
            let sql=`insert into book_collect (book_img,book_price,book_name,collect_time,user_name,book_id) values ('${this.selectedGood.book_img}','${this.selectedGood.book_price}','${this.selectedGood.book_name}','${this.collect_time}','${this.uesrname}','${this.id}')`;
            axios.get('http://132.232.114.138/php/insertcollect.php?sql='+sql).then(res=>{
                this.iscollect1=false;
                this.iscollect2=true;
            });
        },
        //取消收藏
        Cancelcollect(){
            let sql=`delete from book_collect where book_id='${this.id}' and user_name='${this.uesrname}'`;
            axios.get('http://132.232.114.138/php/insertcollect.php?sql='+sql).then(res=>{
                this.iscollect1=true;
                this.iscollect2=false;
            });
        },
		// 跳转购物车
		jump_cart:function(){
			this.$router.push({
				name: 'Cart'
			})
		},
		// 加入购物车
		join_cart:function(){
			// 购物车
			var username=sessionStorage.getItem('user');
			if(username==null){
				alert('您未登录，请登录后操作');
				this.$router.push({
					name: 'Login'
				})
			}else{
			this.cart_num+=this.cart_booknum;
			let sql1='SELECT * FROM book_cart WHERE user_name="'+this.uesrname+'" AND book_name="'+this.name+'" ';
			axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql1).then(res=>{
				var res3 = res.data;
				if(res3.length>0){
					var order_num=Number(this.cart_booknum)+Number(res3[0].book_num);
					// 修改购物车数据
					let sql2='UPDATE book_cart SET book_num = "'+order_num+'" WHERE user_name="'+this.uesrname+'" AND book_name="'+this.name+'"';
					axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql2).then(res=>{
					});
				}else{
					//插入购物车数据
					let sql3='INSERT INTO book_cart (user_name, book_name,book_img,book_price,book_num,cart_show) VALUES ("'+this.uesrname+'", "'+this.name+'","'+this.img[0]+'","'+this.selectedGood.book_price+'",'+this.cart_booknum+',0)';
					axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql3).then(res=>{
					});
				}
			});
			}
		},
		 //点击数量减少
		decrement(count){
		    
		       count--;
			   this.cart_booknum= count;
		    
		},
		//点击数量增加
		increment(count){
		    
		       count++;
		   this.cart_booknum= count;
		},
		//立即购买
		cart_buy:function(){
			// 购物车
			var username=sessionStorage.getItem('user');
			if(username==null){
				alert('您未登录，请登录后操作');
				this.$router.push({
					name: 'Login'
				})
			}else{
				var a=Math.ceil(Math.random()*10);
				var b=Math.ceil(Math.random()*10);
				var dc=Math.round(new Date() / 1000);
				
				let sql4='INSERT INTO book_date (date_id,order_date,username) VALUES('+(a+b+dc)+',0,"'+username+'")';
				axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql4).then(res=>{
				});
				window.sessionStorage.setItem('date_id',(a+b+dc))
				//插入订单数据
				let sql5='INSERT INTO book_order (user_name, book_name,book_img,book_price,book_num,book_result,order_state,date_id) VALUES ("'+this.uesrname+'", "'+this.name+'", "'+this.img[0]+'", "'+this.selectedGood.book_price+'", "'+this.cart_booknum+'", "'+parseFloat(Number(this.cart_booknum)*Number(this.selectedGood.book_price)).toFixed(2)+'",0,"'+(a+b+dc)+'")' ;
				axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql5).then(res=>{		
				});
			this.cart_buya.push({
				user1_name:this.uesrname,
				book1_name:this.name,
				book1_img:this.img[0],
				book1_price:this.selectedGood.book_price,
				book1_num:this.cart_booknum,
				book1_result: parseFloat(Number(this.cart_booknum)*Number(this.selectedGood.book_price)).toFixed(2)
			})
			this.$router.push({
					name: 'Cartorder',
					query: {
						cart_order: this.cart_buya
					}
				})
			}
		}
    },
    //监听
    watch: {    
        '$route' (to, from) {   
            this.$router.go(0); 
        }
    }
  }
</script>

<style lang="scss" scoped>
ul{
    list-style: none;
    padding: 0 !important;
}
.detail{
    width: 100%;
    height: 100% !important;
    position: absolute;
    .el-container{
        height: 100%;
        .el-header, .el-footer {
            width: 100%;
            color: #333;
            text-align: center;
        }
        .el-main {
            margin-top: 50px;
            height: 90% !important;
            background-color: #eef3f5;
            color: #333;
            padding: 0 !important;
        }
        .el-header{
            position: fixed;
            top:0;
            background-color: #fff;
            height: 50px !important;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            z-index: 999;
            &>nav{
                width: 70%;
                margin-left: 20%;
                margin-top: 8px;
                ul{
                    display: flex;
                    justify-content: space-around;
                    align-items: center; 
                    li{
                        font-size: 18px;
                        width: 20%;
                        line-height: 40px;
                        color: #777;
                            &.active{
                            color: #bc8c64 ;
                            border-bottom: 2px solid brown;
                        }
                    }
                }
            }
        }
        .el-footer{
            position: fixed;
            bottom: 0;
            padding: 0;
            background-color: #e5e9f2;
            .grid-content {
                height: 60px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: grey;
                padding: 10px 0;
                font-size: 14px;
                img{
                    width: 30%;
                }
                span{
                    font-size: 12px;
                }
                button{
                    line-height:40px ;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    color: rgb(230, 225, 225);
                    outline: none;
                    &.addcart{
						width: 80%;
						height: 100%;
                        background-color:rgb(226, 136, 75);
                    }
                    &.buy{
						width: 80%;
						height: 100%;
                        background-color:rgb(148, 94, 77);
                    }
                }
            }
        }
    }
	.cart_numa{
		position: absolute;
		margin-left: 2rem;
		top: 0;
		color: red;
		font-size: 1.6rem;
		width: 8%;
		height: 45%;
		border-radius: 50%;
		border: 1px solid black;
		input{
			width: 100%;
			background-color: transparent;
			border: none;
			text-align: center;
		}
	}
	.detail-footer{
		background-color: white !important;
		border-top: .2rem solid #e5e9f2;
	}
}

    
</style>
