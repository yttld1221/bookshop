<template>
    <div class="collectBox">
        <div class="head">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="1">
                    <div class="grid-content">
                        <backTo></backTo>
                    </div>
                </el-col>
                <el-col :span="23">
                    <div class="grid-content">
                        <h3>我的收藏</h3>
                    </div>
                </el-col>
            </el-row>
        </div>
       <div class="content">
           <Loading></Loading>
            <el-container>
                <el-main>
                    <ul v-show="commentShow1">
                        <li v-for="(list, index) in result" :key="index">
                            <img :src="'./static/image/'+(list.book_img || '').split('|')[0]" @click="selectGood(list.book_id,list.book_name)"/>
                            <p class="price" @click="selectGood(list.book_id,list.book_name)">￥{{ list.book_price }}</p>
                            <p @click="selectGood(list.book_id,list.book_name)">{{ list.book_name }}</p>
                            <button @click="Cancelcollect(list.book_id)">取消收藏</button>
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
    name:"Collect",
    components: {
        Loading,
        backTo
    },
    data(){
        return{
            result:[],
            commentShow1:true,
            commentShow2:false,
            isshow:true,
            username:sessionStorage.user

        }
    },
    created(){
        this.GetCollect();
    },
    methods:{
        //请求数据
        GetCollect(){
            let sql=`SELECT * FROM book_collect WHERE user_name='${this.username}'`;
            axios.get('http://132.232.114.138/php/datainfo.php?sql='+sql).then(res=>{
                if(res.data.length>0){
                    this.result=res.data;
                    this.commentShow1=true;
                    this.commentShow2=false;
                }else{
                    this.result="您暂未收藏任何书籍";
                    this.commentShow1=false;
                    this.commentShow2=true;
                }
            }); 
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
        },
        //取消收藏
        Cancelcollect(id){
            let sql=`delete from book_collect where book_id=${id}`;
            axios.get('http://132.232.114.138/php/insertcollect.php?sql='+sql).then(res=>{
                console.log("ok")
            });
            this.$router.go(0);
        }
    },
}
</script>
<style lang="scss" scoped>
    ul{
    list-style: none;
    padding: 0 !important;
    li{
        border-bottom: 0.5px solid #ccc;
    }
}
.collectBox{
    width: 100%;
    height: auto;
    .head{
      .el-row {
        width: 100%;
        height: 50px;
        margin-bottom: 20px;
        position: fixed;
        top: 0;
        border-bottom: 1px solid rgb(210,210,210);
        &:first-child{
          img{
            width: 25px !important;
            height: 23px;
          }
          span{
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
          line-height:50px; 
        }
        .book-search{
          width: 90%;
          height: 70%;
          border: 1px solid #eee;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
          background-color: #eee;
          input{
            width: 100%;
            border: none;
            outline: none;
            font-size: 14px;
            background-color: #eee;
            line-height: 30px;
          }
        }
        .row-bg {
          padding:0;
        }
      }
    }
    .content{
        position: fixed;
        top: 50px;
        width: 100%;
        height: 100%;
        overflow: hidden;
      // border: 1px solid red;
        .el-container{
          width: 100%;
          height:100%;
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
                    height: 250px;
                    padding: 10px;
                    background-color: #fff;
                    img {
                        width: 80%;
                        height: 55%;
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
                    button{
                        background-color: rgb(188,140,100);
                        color: white;
                        border: none;
                        height: 30px;
                        border-radius: 5px;
                        outline: none;
                    }
                }
            }
            .nothing{
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