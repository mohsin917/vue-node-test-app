<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm novalidate :validated="validatedCustom" @submit="login">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>

                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Email" autocomplete="off" v-model="form.email" type="email"
                      feedbackInvalid="Please enter proper email." required />
                  </CInputGroup>

                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Password" autocomplete="off" v-model="form.password"
                      feedbackInvalid="Please enter password" required />
                  </CInputGroup>
                  <p v-if="userData.message !== ''">{{ userData.message }}</p>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" type="submit"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0" @click="$router.push({ path: `/register` })">
                        Don't have an account?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<!--Script Start-->
<script>
import api from "@/api/api-client";


export default {
  name: 'Login',

  data() {
    return {
      validatedCustom: null,
      userData: {
        message: ''
      },
      form: {
        email: 'roofus@gmail.com',
        password: '1234567',
      },
    }
  },
  methods: {
    login(event) {
      event.preventDefault()
      const form = event.currentTarget
      if (form.checkValidity() === true) {
        api.post(`/auth/login`, this.form).then((res) => {
          if (res.status === 'success') {
            this.userData = res.data;
            localStorage.setItem("token", res.data.token);
            this.$router.push({ path: '/dashboard' });
          }
        }).catch((err) => {
          console.log(err, " not got it");
        })
      }
      this.validatedCustom = true
    },

  }
}
</script>
