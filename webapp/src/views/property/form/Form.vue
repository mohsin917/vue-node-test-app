<template>
  <CCard class="mb-4">
    <!--Card Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>Property</strong> <small>Create</small></div>
        </CCol>
        <CCol :xs="6" class="d-flex justify-content-end">
          <div>
            <CButton color="primary" variant="outline" @click="$router.push({ path: `/properties` })">
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
            <CFormInput class="mb-1 removeBorder mt-3" type="text" id="floatingName" floatingLabel="Address"
              autocomplete="off" placeholder="Address" v-model="form.address" required
              feedbackInvalid="Please enter Address." />
          </CCol>
        </CRow>

        <CRow>
          <CCol>
            <CFormInput class="mb-1 removeBorder mt-3" type="text" id="description" floatingLabel="Description"
              autocomplete="off" placeholder="Description" v-model="form.description" required
              feedbackInvalid="Please enter Description." />
          </CCol>
        </CRow>
      
        <CRow>
          <CCol class="mt-4 d-flex justify-content-end">
            <CButton color="secondary" class="me-2" variant="outline" @click="$router.push({ path: `/properties` })">Cancel
            </CButton>
            <CButton type="submit" color="primary">{{ action === 'create' ? "Create" : "Update"}}</CButton>
          </CCol>
        </CRow>
      </CForm>
      <!-- <CAlert class="mt-4 mr-2 ml-2" color="danger" :visible="liveExampleVisible" dismissible @close="() => { liveExampleVisible = false }">A simple primary alert—check it out!</CAlert> -->

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
      propertyId:0,
      validatedCustom: null,
      icons: {
        cilList,
        cilZoomIn,
      },
      form: {
        address: ''
      }
    }
  },

  created() {
    this.action = this.$router.currentRoute.value.meta.action;
    if (this.action === 'update') {
      this.propertyId = this.$router.currentRoute.value.params.id;
      this.getProperty();
    }
  },

  methods: {

    getProperty() {
      api.get(`/property/find/${this.propertyId}`).then((res) => {
        if (res) {
          this.form = res.data;
        }
      });
    },

    handleSaveButton(event) {
      const form = event.currentTarget;
      // check validation either its false or true
      if (form.checkValidity() === true) {
        // check either action is update or create
        if (this.action === 'update') {
          // api call update property
          api.put(`property/update/${this.propertyId}`, this.form).then((res) => {
            if (res.status === "success") {
              this.$router.push({ path: `/properties/view/${this.propertyId}` });
            }
          }).catch((err) => {
            console.log(err);
          })

        } else {
          // api call for create property
          api.post('property/create', this.form).then((res) => {
            if (res.status === "success") {
              this.$router.push({ path: `/properties` });
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
