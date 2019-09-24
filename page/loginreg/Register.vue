<template>
    <el-main>
      <div class="head"><headBackto class="back"></headBackto><div class="title"><span>新用户注册</span></div></div>
    <el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">
      <el-form-item prop="username">
        <el-input type="text" v-model="ReginForm.username" placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ReginForm.password" placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="tel">
        <el-input type="text" v-model.number="ReginForm.tel" placeholder="请输入手机号码">
        </el-input>
      </el-form-item>
      <div class="codeBtn">
          <el-button type="success" v-show="sendAuthCode" class="authCodeBtn" round @click="getAuthCode">
          获取验证码
        </el-button>
          <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> 秒之后重新发送验证码</span> 
          <div v-show="!sendAuthCode" class="code"><span>0000</span></div>
        </div>
      <el-form-item prop="authcode">
        <el-input  type="text" v-model="ReginForm.authcode" placeholder="请输入验证码">
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="success" class="submitBtn" round @click.native.prevent="submit" :loading="logining">
          注册
        </el-button>
        <hr>
        <p>已经有账号，马上去<span class="to" @click="tologin">登录</span></p>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
	import axios from 'axios'
import headBackto from '../../components/common/BackTo'
  export default {
    //返回按钮组件调用
    components:{headBackto},
    data () {
      let confirmpasswordCheck = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('密码为空'))
        } else {
          return callback()
        }
      }
      let telCheck = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('电话号码为空'))
        } else if (!Number.isInteger(value)) {
          return callback(new Error('电话号码必须是数字'))
        } else if (value.toString().length !== 11) {
          return callback(new Error('电话号码必须是11位数字'))
        } else {
          this.isTrue=false;
          callback()
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
      let codeCheck = (rule, value, callback) =>{
          if (value === ''){
              return callback(new Error('验证码为空'))
          } else if (value.toString() != '0000') {
              return callback(new Error('验证码错误'))
          } 
          else {
              callback()
          }
      }
      return {
        ReginForm: {
          password: '',
          username: '',
          tel: '',
          authcode:''
        },
        isTrue:true,
        logining: false,
        sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
              auth_time: 0, /*倒计时 计数器*/
              verification:"",//绑定输入验证码框框
        rule: {
          password: [
            {
              required: true,
              message: '密码为空！',
              trigger: 'blur'
            }
          ],
          tel: [
            {
              required: true,
              validator: telCheck,
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
          authcode:[
              {
                  required: true,
                  validator: codeCheck,
                  trigger: 'blur'
              }
          ]
        }
      }
    },
  methods: {
      //   验证
         getAuthCode:function () {
           if(this.isTrue){
             alert('请填写正确的手机号信息');
           }else{
              this.sendAuthCode = false;
              //设置倒计时秒
              this.auth_time = 60;
              var auth_timetimer =  setInterval(()=>{
                  this.auth_time--;
                  if(this.auth_time<=0){
                      this.sendAuthCode = true;
                      clearInterval(auth_timetimer);
                  }
              }, 1000);
            }
        },
    submit () {
      this.$refs.ReginForm.validate(valid => {
        if (valid) {
					axios.get('http://132.232.114.138/php/register.php?username='+this.ReginForm.username+'&&password='+this.ReginForm.password+'&&tel='+this.ReginForm.tel).then(res=>{
						var res=res.data;
            if (res=='请确认信息的完整性') {
              alert('请确认信息的完整性')
            }else if(res=='用户名已存在'){
              alert('用户名已存在,请重新输入')
            }else{
							var sql='insert into book_address (user_name,user_address,address_name,tel) values ("'+this.ReginForm.username+'","","","")';
							axios.get('http://132.232.114.138/php/datainfoa.php?sql='+sql).then(res=>{
							});
              alert('注册成功,即将跳转到登录页面！！！');
              this.$router.push('/Login')
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
    tologin () {
//已经注册过跳转到登入界面
      this.$router.replace('/Login')
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
  @include wh(35%,4rem);
  text-align: center;
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
    background: rgb(216, 208, 208);
    color: rgb(2, 3, 3);
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
.auth_text_blue{
  color: $bgcolor;
}
</style>