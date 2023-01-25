<template>
  <CCard class="mb-4">
    <!-- Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>Admin</strong> <small>{{action === 'create' ? "Create" : "Update"}}</small></div>
        </CCol>
        <CCol :xs="6" class="d-flex justify-content-end">
          <div>
            <CButton color="primary" variant="outline" @click="$router.push({ path: `/admin` })">
              <CIcon :icon="icons.cilList" />
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CCardHeader>

    <!--Card Body -->
    <CCardBody>
      <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom" @submit="handleSaveButton">
        <CRow>
          <CCol>
            <CFormInput class="mb-1 removeBorder mt-3" type="text" id="floatingName" floatingLabel="Full Name"
              autocomplete="off" placeholder="Full Name" v-model="form.name" required
              feedbackInvalid="Please enter full name." />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormInput class="mb-1 removeBorder mt-3" type="email" id="floatingName" floatingLabel="Email"
              autocomplete="off" placeholder="Email" v-model="form.email" required
              feedbackInvalid="Please enter email." />
          </CCol>

          <CCol v-if="action === 'create'">
            <CFormInput class="mb-1 removeBorder mt-3" type="password" id="floatingName" floatingLabel="Password"
              autocomplete="off" placeholder="Email" v-model="form.password" required
              feedbackInvalid="Please enter password." />
          </CCol>
        </CRow>

        <CRow>
          <CCol :xs="12" class="mt-4 d-flex justify-content-end">
            <CButton color="secondary" class="me-2" variant="outline" @click="$router.push({ path: `/admin` })">Cancel
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
  name: 'Admin Form',
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
        name: '',
        email: '',
        password: ''
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
      api.get(`/admin/find/${this.userId}`).then((res) => {
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
          api.put(`admin/update/${this.userId}`, this.form).then((res) => {
            if (res.status === "success") {
              this.$router.push({ path: `/admin/view/${this.userId}` });
            }
          }).catch((err) => {
            console.log(err);
          })

        } else {
          // api call for create user
          api.post('admin/create', this.form).then((res) => {
            if (res.status === "success") {
              this.$router.push({ path: `/admin` });
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
