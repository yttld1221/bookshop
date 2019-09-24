<template>
	<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col :span="8"><div class="grid-content bg-purple">1</div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light">2</div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">3</div></el-col>
</el-row>
</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	div{
		display: flex;
		width: 100%;
	}
.el-row {
    margin-bottom: 20px;
	position: fixed;
	bottom: 0;
  }
	  
  .el-row:last-child{
	  margin-bottom: 0;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 45px;
  }
  .row-bg {
    padding:  0;
    background-color: #f9fafc;
  }
</style>
