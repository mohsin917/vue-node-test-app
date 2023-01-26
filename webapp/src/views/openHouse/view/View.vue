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
            <CButton color="danger" variant="outline" @click="() => {
              deleteConfirmationModal = true
              deleteId = openHouse.id
            }
            ">
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

      <div class="mt-4">
        <CRow>
          <CCol :sm="3" class="lbl">Address</CCol>
          <CCol>{{ openHouse?.property?.address }}</CCol>
        </CRow>

        <CRow class="mt-2">
          <CCol :sm="3" class="lbl">Description</CCol>
          <CCol>{{ openHouse?.property?.description }}</CCol>
        </CRow>

        <CRow class="mt-2">
          <CCol :sm="3" class="lbl">Visitor Amount</CCol>
          <CCol>{{ openHouse?.visitorAmount }}</CCol>
        </CRow>

        <CRow class="mt-2">
          <CCol :sm="3" class="lbl">Remaining Enrolment</CCol>
          <CCol>{{ openHouse?.visitorAmount - details.length }}</CCol>
        </CRow>
      </div>


      <!-- Tenant -->
      <CRow class="mt-5">
        <CCol>
          <h4>Tenant Enrolment</h4>
        </CCol>
        <CCol style="text-align:right">
          <CButton color='success' variant="outline" @click="
            () => {
              addTenantModal = true
              deleteId = openHouse.id
            }
          ">
            Add Tenant
          </CButton>
        </CCol>
      </CRow>

      <div class="m-4">
        <CRow class="mt-2">
          <CCol class="lbl">Name</CCol>
          <CCol></CCol>
        </CRow>
        <hr />

        <div v-for="item of details">
          <CRow class="mt-2">
            <CCol>{{ item.name }}</CCol>
            <CCol class="text-end">
              <CButton color="danger" variant="outline" @click="deleteUser(item.id)">
                <CIcon :icon="icons.cilXCircle" />
              </CButton>
            </CCol>
          </CRow>
          <hr />
        </div>

      </div>

      <!-- Add tenant modal -->
      <CCardBody>
        <div>
          <CModal alignment="center" :visible="addTenantModal" @close="
            () => {
              addTenantModal = false
            }
          ">
            <CModalHeader dismiss @close="
              () => {
                addTenantModal = false
              }
            ">
              <CModalTitle>Add Tenant</CModalTitle>

            </CModalHeader>
            <CModalBody>

              <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom">

                <CRow class="mt-4">
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
                  addTenantModal = false
                }
              ">
                Close
              </CButton>
              <CButton color="success" @click="handleSaveTenant(this.tenantForm)">Save</CButton>
            </CModalFooter>

            <div v-if="limitNotification" class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Limit Exceed!</strong> You have add more limit please reduce it.
              <button type="button" @click="closeAlert()" class="btn-close" data-coreui-dismiss="alert"
                aria-label="Close"></button>
            </div>
          </CModal>
        </div>
      </CCardBody>

      <!-- confirmation modal -->
      <CCardBody>
        <div>
          <CModal alignment="center" :visible="deleteConfirmationModal" @close="
            () => {
              deleteConfirmationModal = false
            }
          ">
            <CModalHeader dismiss @close="
              () => {
                deleteConfirmationModal = false
              }
            ">
              <CModalTitle>Delete House</CModalTitle>
            </CModalHeader>
            <CModalBody>
              Are you sure you want to delete this house?
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" @click="
                () => {
                  deleteConfirmationModal = false
                }
              ">
                Close
              </CButton>
              <CButton color="danger" @click="deleteRecord(deleteId)">Delete</CButton>
            </CModalFooter>
          </CModal>
        </div>
      </CCardBody>
      <!-- End confirmation modal -->


    </CCardBody>

  </CCard>
</template>
<script>
import { cilPen, cilXCircle, cilList, cilPlus, cilArrowLeft, cilArrowRight } from '@coreui/icons';
import ApiClient from '@/api/api-client'
const api = new ApiClient();


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
      addTenantModal: false,
      deleteConfirmationModal: false,
      limitNotification: false,
      tenantForm: {
        houseId: '',
        propertyName: '',
        userId: ''
      },
      validatedCustom: null,
      users: [],
      details: []
    }
  },

  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
      this.init()
    },
  },

  created() {
    this.id = this.$route.params.id;
    this.init()
  },
  methods: {

    init() {
      this.usersList();
      this.getRecord(this.id);
      this.getDetails(this.id);
    },

    /**
     * Get all property by Id
     */
    getRecord(id) {
      api.get(`/openHouse/find/${id}`).then((res) => {
        if (res.status == 'success') {
          this.openHouse = res.data;
          this.tenantForm.propertyName = this.openHouse.property.address;
          this.tenantForm.propertyId = this.openHouse.property.id;
        }
      });
    },

    /**
     * Get Details (users)
     */
    getDetails(id) {
      api.get(`/openHouse/get-details/${id}`).then((res) => {
        if (res.status == 'success') {
          this.details = res.data;
        }
      });
    },

    /**
     * Get User list
     */
    usersList() {
      api.post(`/users/`).then((res) => {
        if (res) {
          this.users = res.data;
        }
      });
    },

    /**
     * Handle Save tenant
     */
    handleSaveTenant(form) {
      form.houseId = this.id,
        form.propertyId = this.tenantForm.propertyId;
      const remainingLimit = this.openHouse.visitorAmount - this.openHouse.openHouseTotalAmount;
      this.openHouse.visitorAmount - this.openHouse.openHouseTotalAmount
      if (this.tenantForm.tenantAmount > remainingLimit) {
        this.limitNotification = true;
      } else {
        api.post('openHouseDetail/create', form).then((res) => {
          if (res.status === "success") {
            this.addTenantModal = false;
            this.init();
            // this.$router.push({ path: `/openHouse` });
          }
        }).catch((err) => {
          console.log(err);
        })
        this.validatedCustom = true;
      }
    },

    /**
     * Go to next 
     */
    goNext() {
      // console.log('bingo');
      api.get(`/openHouse/find-next/${this.id}`).then((res) => {
        if (res.status == 'success') {
          this.$router.push({ path: `/openHouse/view/${res.data.id}` });
        }
      });
    },

    /**
     * Go to previous
     */
    goPrevious() {
      api.get(`/openHouse/find-prev/${this.id}`).then((res) => {
        if (res.status == 'success') {
          this.$router.push({ path: `/openHouse/view/${res.data.id}` });
        }
      });
    },

    /**
     * Delete record
     * @param {number} id
     */
    deleteRecord(id) {
      api.delete(`/openHouse/delete/${id}`).then((res) => {
        if (res) {
          this.deleteConfirmationModal = false;
          this.$router.push({ path: '/openHouse' })
        }
      }).catch((err) => {
        console.log(err, "its error");
      })

    },


    deleteUser(id) {
      api.delete(`/openHouseDetail/delete/${id}`).then((res) => {
        if (res.status == 'success') {
          this.init();
        }
      }).catch((err) => {
        console.log(err, "its error");
      })

    },

    closeAlert() {
      this.limitNotification = false;
    }
  }

}

</script>
<style>
.lbl {
  color: gray;
}
</style>