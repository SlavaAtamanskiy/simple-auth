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
          <el-form-item label="E-mail" prop="email">
            <el-input v-model="ruleForm2.email"/>
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input v-model="ruleForm2.pass" type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input v-model="ruleForm2.checkPass" type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item>
            <p>Already have an account? <nuxt-link to="/login">Log in</nuxt-link> </p>
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
  name: 'Register',
  data() {
    var checkLogin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the login'))
      } else {
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the e-mail'))
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
        login: '',
        email: ''
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        login: [{ validator: checkLogin, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('auth/register', this.ruleForm2)
            .then(() => this.$router.push('/'))
            .catch(err => {
              this.$api.auth.processRegisterError(err, this.$notify)
            })
        } else {
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
@media (min-width: 1000px) {
  .el-main {
    max-width: 40%;
  }
}
.el-container {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.el-main {
  padding-bottom: 15%;
}
.el-form {
  margin-right: 3.5rem;
}
</style>
