<template>
  <CCard class="mb-4">
    <!-- Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>Property</strong> <small>House</small></div>
        </CCol>
        <CCol :xs="6" class="d-flex justify-content-end">
          <div>
            <CButton color="primary" variant="outline" @click="$router.push({ path: `/openHouse` })">
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
          <CCol :sm="6">
            <CFormInput class="mb-1 removeBorder mt-3" type="text" id="floatingName" floatingLabel="Visitor Amount"
              autocomplete="off" placeholder="Visitor Amount" v-model="form.visitorAmount" required
              feedbackInvalid="Please enter Visitor Amount." />
          </CCol>
          <!-- <CCol :sm="6">

            <CFormFloating>
              <CFormSelect v-model="form.propertyId" class="mb-1 removeBorder mt-3" id="floatingSelect" floatingLabel="Select Property"
                aria-label="Floating label select example" >
                <option >Open this Property list</option>
                <option v-for="property in propertyList" v-bind:value=property.id>{{property.address}}</option>
              </CFormSelect>
            </CFormFloating>
          </CCol> -->
           
          <CCol :sm="6">
            <label class="mb-2" for="floatingPassword">PropertyList</label>

            <CFormSelect v-model="form.propertyId" class="mb-3" aria-label="Large select example" >
              <option selected disabled>Select One</option>
              <option v-for="property in propertyList" v-bind:value=property.id>{{property.address}}</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow>
          <CCol :sm="6">
            <CFormInput class="mb-1 removeBorder mt-3" type="date" id="floatingName" floatingLabel="Start Date"
              autocomplete="off" placeholder="Visitor Start Date" v-model="form.startDate" required
              feedbackInvalid="Please enter Visitor Start Date." />
          </CCol>
        </CRow>
        <CRow class="mt-1">
          <CCol :xs="12" class=" d-flex justify-content-end">
            <CButton color="secondary" class="me-2" variant="outline" @click="$router.push({ path: `/openHouse` })">
              Cancel
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
      propertyList: [],
      propertyId: Number,
      validatedCustom: null,
      icons: {
        cilList,
        cilZoomIn,
      },
      form: {
        visitorAmount: '',
        propertyId: 0,
        startDate: ''
      },
    }
  },

  created() {
    this.getProperties();
    this.action = this.$router.currentRoute.value.meta.action;
    if (this.action === 'update') {
      this.userId = this.$router.currentRoute.value.params.id;
      this.getUser();
    }
  },

  methods: {

    getUser() {
      api.get(`/openHouse/find/${this.userId}`).then((res) => {
        if (res) {
          this.propertyList = res.data;
        }
      });
    },

    getProperties() {
      api.post(`/property/`).then((res) => {
        if (res) {
          this.propertyList = res.data;
        }
      });
    },

    handleSaveButton(event) {
      // event.preventDefault();
      const form = event.currentTarget;

      // check validation either its false or true
      if (form.checkValidity() === true) {
        // check either action is update or create

        if (this.action === 'update') {
          // api call update property
          api.put(`openHouse/update/${this.propertyId}`, this.form).then((res) => {
            if (res.status === "success") {
              this.$router.push({ path: `/openHouse/view/${this.propertyId}` });
            }
          }).catch((err) => {
            console.log(err);
          })

        } else {
          // api call for create property
          console.log(this.form);
          api.post('openHouse/create', this.form).then((res) => {
            if (res.status === "success") {
              this.$router.push({ path: `/openHouse` });
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
