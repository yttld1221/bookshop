<template>
    <el-main>
      <div class="head"><headBackto class="back"></headBackto><div class="title"><span>用户登录</span></div></div>
    <el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">
      <el-form-item prop="username">
        <el-input type="text" v-model="ReginForm.username" placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ReginForm.password" placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="success" class="submitBtn" round @click.native.prevent="submit" :loading="logining">
          登录
        </el-button>
        <hr>
        <p>没有账号，马上去<span class="to" @click="toRegister">注册</span></p>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
	import axios from 'axios'
import headBackto from '../../components/common/BackTo'
  export default {
    components:{headBackto},
    data () {
      let confirmpasswordCheck = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('密码为空'))
        } else {
          return callback()
        }
      }
      let userCheck = (rule, value, callback) =>{
          if (value === ''){
              return callback(new Error('用户名为空'))
          } else if (value.toString().length < 6) {
              return callback(new Error('用户名至少6位'))
          } else if (value.toString().length > 16) {
              return callback(new Error('用户名不超过16位'))
          }
          else {
              callback()
          }
      }
      return {
        ReginForm: {
          password: '',
          username: ''
        },
        logining: false,
        rule: {
          password: [
            {
              required: true,
              message: '密码为空！',
              trigger: 'blur'
            }
          ],
          username:[
              {
                  required: true,
                  validator: userCheck,
                  trigger: 'blur'
              }
          ],
        }
      }
    },
  methods: {
    submit () {
      this.$refs.ReginForm.validate(valid => {
        if (valid) {
					console.log('进去了')
					axios.get('http://132.232.114.138/php/login1.php?username='+this.ReginForm.username+'&&password='+this.ReginForm.password).then(res=>{
						// this.infoData=res.data;
						
						console.log(res.data)
						if (res.data=='请确认信息的完整性') {
						  alert('请确认信息的完整性')
						}else if(res.data=='登陆信息错误'){
						  alert('你填写的登录信息错误')
						}else{
						  alert('登录成功！！！');
						  //将用户名存入会话存储中
						  sessionStorage.setItem("user",this.ReginForm.username);
						  this.$router.push({
						  	name: 'Me'
						  })
						}
					}).catch(() => {
              console.error('数据加载错误');
          });
        } else {
          console.log('提交错误')
        }
      })
    },
    reset () {
      this.$refs.ReginForm.resetFields()
    },
    toRegister () {
    //已经注册过跳转到登入界面
      this.$router.replace('/Register')
    }
  }
}
</script>


<style lang='scss' scoped>
@import '../../style/base.scss';

.regform {
  margin: 2rem auto;
  @include wh(30rem,30rem);
  padding: 2rem 0 0 0;
  text-align: center;
}
.submitBtn {
  background: $bgcolor;
  border: none;
  border-radius: 0.5rem;
  width: 35%;
  color:white;
}
.codeBtn{
    margin-top: -0.7rem;
    margin-bottom: 0.7rem;
}
.authCodeBtn{
  @include wh(35%,2rem);
  border: none;
  border-radius: 0.5rem;
  background:rgb(231, 156, 42);
  color:white;
}
.code{
  text-align: center;
  span{
    display: inline-block;
    @include wh(25%,2rem);
    background: #ddd;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.1rem rgb(73, 66, 66);
    line-height: 2rem;
  }
}
.el-form-item{
  margin-bottom: 2rem;
  position: relative;
}
.to {
  color: #FA5555;
  cursor: pointer;
}
.head{
        @include wh(100%,3rem);
        text-align: center;
        border-bottom: 0.1rem solid #eee;
        .back{
            position: absolute;
            top: 1.5rem !important;
            left: 1.5rem !important;
            opacity: 0.8;
            @include wh(2rem,2rem);
            img{
                @include wh(100%,100%);
            }
        }
        .title{
            color: $bgcolor;
            line-height: 2rem;
        }
    }

</style>