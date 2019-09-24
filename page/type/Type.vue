<template>
  <div id="type">
    <div class="head">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="4">
          <div class="grid-content">
            <img src="../../../static/image/sweep.jpg" >
			      <span>扫一扫</span>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content">
            <div class="book-search">
              <input type="text" placeholder="搜索感兴趣的书籍" v-model="searchText" @keyup.enter="search">
              <img src="../../../static/image/search.png" @click="search()">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <el-container>
        <el-aside>
           <ul>
              <li v-for="(item,index) in tabs" :key="index" :class="{active:item.isactive}" @click="change(index)">{{item.type}}</li>
          </ul>
        </el-aside>
        <el-container>
          <el-main>
            <div class="tabCon">
               <div class="tabCon-list">
                  <div v-for="(item,index) in tabs" :key="index">
                      <TypeInfo :className="item.type" v-if="item.isactive"></TypeInfo>
                  </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <footGuide></footGuide>
  </div>
</template>
<script>
import footGuide from '../../components/footGuide/FootGuide'
import TypeInfo from '../type/children/TypeInfo'
export default {
	components:{footGuide},
  name: 'Type',
  data() {
      return {
        tabs: [
            {type:"最新",isactive:true},
            {type:"畅销",isactive:false},
            {type:"课外读物",isactive:false},
            {type:"经济管理",isactive:false},
            {type:"文学",isactive:false},
            {type:"科普",isactive:false},
            {type:"高教",isactive:false},
            {type:"生活",isactive:false},
            {type:"经典",isactive:false},
            {type:"小学教辅",isactive:false},
            {type:"初中教辅",isactive:false},
            {type:"高中教辅",isactive:false},
            {type:"幼儿读物",isactive:false},
            {type:"工具书",isactive:false},
            {type:"艺术",isactive:false},
            {type:"历史地理",isactive:false},
            {type:"自然学科",isactive:false},
            {type:"法律法规",isactive:false},
            {type:"古籍",isactive:false}
          ],
        searchText:"",
      };
  },
  components:{
    TypeInfo,
    footGuide
  },
  methods: {
    //tab切换
      change(index){
        this.tabs.forEach(item=>{
            item.isactive=false;
        });
        this.tabs[index].isactive=true
      },
    //搜索
    search(){
      this.$router.push({
			path: 'Search',
			query:{
          searchInfo:this.searchText
				}
      })
    }
  },
}
</script>


<style lang="scss" scoped>
@import "../../style/type.scss";
</style>
