<template>
    <div class="produce">
        <h4>为你推荐</h4>
        <ul>
            <li v-for="(list, index) in produce" :key="index" @click="proGood(list.book_id,list.book_name)">
                <img :src="'./static/image/'+(list.book_img || '').split('|')[0]" />
                <p class="price">￥{{ list.book_price }}</p>
                <p>{{ list.book_name }}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:["produce"],
    methods: {
        //点击路由到商品详细信息页
		proGood(book_id,book_name){
			this.$router.push({
			path: 'Shopdetail',
			query:{
				goodId:book_id,
				goodName:book_name
				}
			})
		}
    },
}
</script>
<style lang="scss" scoped>
    .produce{
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #fff;
        h4{
            margin: 0;
            text-align: left;
            padding: 20px 0 0 10px;
        }
        ul {
            list-style: none;
            padding: 0 !important;
            background-color: #fff;
            li {
                float: left;
                width: 33.3333333%;
                height: 180px;
                padding: 20px 10px 20px 10px;
                background-color: #fff;
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
    }
</style>