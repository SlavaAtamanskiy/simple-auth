<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="text-align:center;">
          <span>Registration</span>
        </div>
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" status-icon label-width="120px" class="demo-ruleForm">
          <el-form-item label="Login" prop="login">
            <el-input v-model="ruleForm2.login"/>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input v-model="ruleForm2.pass" type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input v-model="ruleForm2.checkPass" type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item>
            <p>Already have an account? <a href="/" style="color:dodgerblue">Log in</a></p>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('ruleForm2')">Register</el-button>
            <el-button @click="resetForm('ruleForm2')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    var checkLogin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the login'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        login: ''
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        login: [{ validator: checkLogin, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.el-container {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.el-main {
  max-width: 40%;
  padding-bottom: 15%;
}
.el-form {
  margin-right: 4.5rem;
}
</style>
