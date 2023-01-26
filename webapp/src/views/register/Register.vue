<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit="handleLogin">
                  <h1>Register</h1>
                  <p class="text-medium-emphasis">Make an account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput placeholder="Email" autocomplete="off" v-model="form.email" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Password" autocomplete="off" v-model="form.password" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton color="primary" class="px-4" type="submit"> Register </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0" @click="$router.push({ path: `/` })">
                        Sign In
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

<script>
import ApiClient from '@/api/api-client'
const api = new ApiClient();


export default {
  name: 'Register',

  data() {
    return {
      form: {
        email: '',
        password: '',
        userData: []
      },
    }
  },
  methods: {
    handleLogin() {
      api.post('auth/login', this.form).then((res) => {
        console.log(res.data);
        if(res.data){
          this.$router.push({ path: `/dashboard` });

        }
        this.userData = res.data
      }).catch((err) => {
        console.log(err, "its error");
      })
    }
  },
}
</script>
