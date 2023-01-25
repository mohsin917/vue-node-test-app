<template>
  <CCard class="mb-4">
    <!-- Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>Users</strong> <small>Create</small></div>
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
      <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom" @submit="handleSaveButton">
        <CRow>
          <CCol :sm="12">
            <CFormInput class="mb-1 removeBorder mt-3" type="text" id="floatingName" floatingLabel="Full Name"
              autocomplete="off" placeholder="Full Name" v-model="form.name" required
              feedbackInvalid="Please enter full name." />
          </CCol>
        </CRow>
        <CRow>
          <CCol :xs="12" class="mt-1 d-flex justify-content-end">
            <CButton color="secondary" class="me-2" variant="outline" @click="$router.push({ path: `/users` })">Cancel
            </CButton>
            <CButton type="submit" color="primary">{{ action === 'create' ? "Create" : "Update"}}</CButton>
          </CCol>
        </CRow>
      </CForm>
    </CCardBody>
  </CCard>
</template>

<script>
import { cilList, cilZoomIn } from '@coreui/icons';
import api from "@/api/api-client";

export default {
  name: 'User Form',
  components: {},
  data() {

    return {
      action: '',
      userId: Number,
      validatedCustom: null,
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
    this.action = this.$router.currentRoute.value.meta.action;
    if (this.action === 'update') {
      this.userId = this.$router.currentRoute.value.params.id;
      this.getUser();
    }
  },

  methods: {
    getUser() {
      api.get(`/users/find/${this.userId}`).then((res) => {
        if (res) {
          this.form = res.data;
        }
      });
    },

    handleSaveButton(event) {
      event.preventDefault();
      const form = event.currentTarget;

      // check validation either its false or true
      if (form.checkValidity() === true) {
        // check either action is update or create

        if (this.action === 'update') {
          // api call update user
          api.put(`users/update/${this.userId}`, this.form).then((res) => {
            if (res.status === "success") {
              this.$router.push({ path: `/users/view/${this.userId}` });
            }
          }).catch((err) => {
            console.log(err);
          })

        } else {
          // api call for create user
          api.post('users/create-user', this.form).then((res) => {
            if (res.status === "success") {
              this.$router.push({ path: `/users` });
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      }

      this.validatedCustom = true;
    },

  }
}
</script>
