<template>
  <CCard class="mb-4">
    <!-- Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>Users</strong> <small>Update</small></div>
        </CCol>
        <CCol :xs="6" class="d-flex justify-content-end">
          <div>
            <CButton color="primary" variant="outline" @click="$router.push({ path: `/users` })">
              <CIcon :icon="icons.cilList" />
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CCardHeader>
    <!-- Body -->
    <CCardBody>
      <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom" @submit="handleSubmitCustom01">
        <CRow>
          <CCol :sm="12">
            <CFormInput class="mb-1 removeBorder mt-3" type="text" id="floatingName" floatingLabel="Full Name"
              autocomplete="off" placeholder="Full Name" v-model="form.full_name" required
              feedbackInvalid="Please enter full name." />
          </CCol>
        </CRow>
        <CRow>
          <CCol :sm="6">
            <CFormInput class="mb-4 removeBorder mt-3" type="email" id="floatingInput" floatingLabel="Email"
              autocomplete="off" placeholder="name@example.com" v-model="form.email" required
              feedbackInvalid="Please enter proper email." />
          </CCol>
          <CCol :sm="6">
            <CFormInput class="mb-4 removeBorder mt-3" type="Password" id="floatingPassword" floatingLabel="Password"
              placeholder="Password" v-model="form.password" required feedbackInvalid="Please enter password." />
          </CCol>
        </CRow>
        <!-- <CRow>
          <CCol :sm="6">
            <label class="mb-2" for="floatingPassword">Role</label>

            <CFormSelect class="mb-3" aria-label="Large select example" v-model="form.role">
              <option>Select One</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </CFormSelect>
          </CCol>
        </CRow> -->
        <CRow>
          <CCol :xs="12" class=" d-flex justify-content-end">
            <CButton color="secondary" class="me-2" variant="outline" @click="$router.push({ path: `/users` })">Cancel
            </CButton>
            <CButton color="primary" type="submit">Update</CButton>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>
  </CCard>

</template>

<script>
import { cilList, cilZoomIn } from '@coreui/icons';
import ApiClient from '@/api/api-client'
const api = new ApiClient();

export default {
  name: 'Update Form',
  components: {},
  data() {
    return {
      validatedCustom: null,
      url:'',
      icons: {
        cilList,
        cilZoomIn,
      },
      form: {
        full_name: '',
        email: '',
        password: '',
        role: ''
      },
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const url = this.$route.params.id
      api.get(`/users/find/${url}`).then((res) => {
        if (res) {
          this.form = res;
        }
      });
    },
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      else {
        console.log('validatede');
        this.url = this.$route.params.id


      }
      this.validatedCustom = true
    },

  }
}
</script>
