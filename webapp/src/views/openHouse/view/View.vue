<template>
  <CCard class="mb-4">

    <!-- Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>Open House </strong> <small>{{
            openHouse?.property?.address
          }}</small></div>
        </CCol>
        <CCol :xs="6" class="d-flex justify-content-end">
          <div>
            <CButton class="me-2" color="primary" variant="outline" @click="$router.push({ path: `/properties` })">
              <CIcon :icon="icons.cilPlus" />
            </CButton>
            <CButton class="me-2" color="primary" variant="outline"
              @click="$router.push({ path: `/properties/update/${this.url}` })">
              <CIcon :icon="icons.cilPen" />
            </CButton>
            <CButton color="danger" variant="outline" @click="$router.push({ path: `/properties` })">
              <CIcon :icon="icons.cilXCircle" />
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CCardHeader>

    <CCardBody>
      <CRow>
        <CCol :xs="6">
          <CButton color="danger" variant="outline" @click="goPrevious()">
            <CIcon :icon="icons.cilArrowLeft" />
            &nbsp; Previous
          </CButton>
        </CCol>
        <CCol :xs="6" class="text-end">
          <CButton color='success' variant="outline" @click="goNext()">
            Next &nbsp;
            <CIcon :icon="icons.cilArrowRight" />
          </CButton>
        </CCol>
      </CRow>
      <CRow class="mt-4">
        <CRow>
          <p>Address: {{ openHouse?.property?.address }}</p>
        </CRow>
        <CRow>
          <p>Description: {{ openHouse?.property?.description }}</p>
        </CRow>
        <CRow>
          <p>Total enrolled Tenants: {{ openHouse?.openHouseTotalAmount }}</p>
        </CRow>
        <CRow>
          <p>Remaining Houses: {{ openHouse?.visitorAmount - openHouse?.openHouseTotalAmount }}</p>
        </CRow>
        <CCol :xs="6" class="text-end">
          <CButton color='success' variant="outline" @click="
            () => {
              visibleVerticallyCenteredDemo = true
              deleteId = openHouse.id
            }
          ">
            Add Tenant
          </CButton>
        </CCol>
      </CRow>

      <CCardBody>
        <div>
          <CModal alignment="center" :visible="visibleVerticallyCenteredDemo" @close="
            () => {
              visibleVerticallyCenteredDemo = false
            }
          ">
            <CModalHeader dismiss @close="
              () => {
                visibleVerticallyCenteredDemo = false
              }
            ">
              <CModalTitle>Add Tenant</CModalTitle>

            </CModalHeader>
            <CModalBody>

              <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom">
                <CRow>
                  <CCol>
                    <CFormInput class="mb-1 removeBorder mt-3" type="text" id="floatingName"
                      floatingLabel="Visitor Amount" autocomplete="off" placeholder="Visitor Amount"
                      v-model="tenantForm.tenantAmount" required feedbackInvalid="Please enter Visitor Amount." />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormInput class="mb-1 removeBorder mt-3" type="text" id="floatingName"
                      floatingLabel="Property Address" autocomplete="off" placeholder="Property Address"
                      v-model="tenantForm.propertyName" required feedbackInvalid="Please enter property address." />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <label class="mb-2" for="floatingPassword">UsersList</label>

                    <CFormSelect class="mb-3" aria-label="Large select example" v-model="tenantForm.userId">
                      <option disabled selected>Select One</option>
                      <option v-for="user in users" v-bind:value=user.id>{{ user.name }}</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
              </CForm>

            </CModalBody>
            <CModalFooter>
              <CButton type="submit" color="primary" @click="
                () => {
                  visibleVerticallyCenteredDemo = false
                }
              ">
                Close
              </CButton>
              <CButton color="success" @click="handleSaveTenant(this.tenantForm)">Save</CButton>
            </CModalFooter>
          </CModal>
        </div>
      </CCardBody>
    </CCardBody>

  </CCard>
</template>
<script>
import { cilPen, cilXCircle, cilList, cilPlus, cilArrowLeft, cilArrowRight } from '@coreui/icons';
import api from "@/api/api-client";


export default {
  name: 'View',
  components: {},
  data() {
    return {
      icons: { cilPen, cilXCircle, cilList, cilPlus, cilArrowLeft, cilArrowRight },
      openHouse: {},
      id: '',
      openHouses: [],
      isNextValueExists: true,
      isPreviousValueExists: true,
      visibleVerticallyCenteredDemo: false,
      tenantForm: {
        tenantAmount: '',
        houseId: '',
        propertyId: '',
        propertyName: '',
        userId: ''
      },
      propertyList: [],
      validatedCustom: null,
      users: []
    }
  },
  created() {
    this.getHousesList();
    this.getProperties();
    this.usersList();
    this.id = this.$route.params.id
    this.getList(this.id);
  },
  methods: {
    /**
     * Get all property by Id
     */
    getList(id) {
      api.get(`/openHouse/find/${id}`).then((res) => {
        if (res) {
          this.openHouse = res.data;
          this.tenantForm.propertyName = this.openHouse.property.address;
          this.tenantForm.propertyId = this.openHouse.property.id;
          console.log(this.openHouse, "its response");

        }
      });
    },

    getHousesList() {
      api.post(`/openHouse`).then((res) => {
        if (res) {
          this.openHouses = res.data;
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

    usersList() {
      api.post(`/users/`).then((res) => {
        if (res) {
          this.users = res.data;
        }
      });
    },

    handleSaveTenant(form) {
      form.houseId = this.id,
      form.propertyId = this.tenantForm.propertyId;

      this.visibleVerticallyCenteredDemo = false;

      //     console.log(this.tenantForm);
      api.post('openHouseDetail/create', form).then((res) => {
        if (res.status === "success") {
          this.$router.push({ path: `/openHouse` });
        }
      }).catch((err) => {
        console.log(err);
      })
      //   this.validatedCustom = true;
    },

    goNext() {
      const houseValue = this.openHouses.find(house => { if (house.id === this.id) { return house } });
      const index = this.openHouses.indexOf(houseValue);
      const propertyValue = this.openHouses.at(index + 1);
      this.isNextValueExists = index === -1 ? false : true;
      if (this.isNextValueExists && propertyValue) {
        this.$router.push({ path: `/openHouse/view/${propertyValue.id}` });
        this.id = propertyValue.id;
        this.getList(this.id);
      } else {
        this.isPreviousValueExists = true;
        this.isNextValueExists = false;
      }
    },

    goPrevious() {
      const property = this.openHouses.find(property => { if (property.id === this.id) { return property } });
      const index = this.openHouses.indexOf(property);
      const propertyValue = this.openHouses.at(index - 1);
      this.isPreviousValueExists = index === 0 ? false : true;
      if (this.isPreviousValueExists && propertyValue) {
        this.$router.push({ path: `/openHouse/view/${propertyValue.id}` });
        this.id = propertyValue.id;
        this.getList(this.id);
      } else {
        this.isNextValueExists = true;
        this.isPreviousValueExists = false;
      }
    }
  }

}

</script>
