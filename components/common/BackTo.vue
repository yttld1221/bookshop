<template>
    <div class="backTo">
        <span class="back" v-on:click="back"><img src="../../../static/image/back.png" alt=""></span>
    </div>
</template>

<script>
export default {
    methods:{
        back(){
            this.$router.go(-1);//返回上一层
        },
    },
}
</script>
<style lang="scss" scoped>
@import '../../style/base.scss';
    .back{
            position: absolute;
            top: 0.8rem;
            left: 1rem;
			
            @include wh(2rem,2rem);
            img{
                @include wh(100%,100%);
				vertical-align:baseline;
            }
        }
        
</style>
