<template>
  <CCard class="mb-4">

    <!-- Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>Property</strong> <small>{{
            property.address
          }}</small></div>
        </CCol>
        <CCol :xs="6" class="d-flex justify-content-end">
          <div>
            <CButton class="me-2" color="primary" variant="outline" @click="$router.push({ path: `/properties` })">
              <CIcon :icon="icons.cilList" />
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
          <p>Address: {{ property.address }}</p>
        </CRow>
        <CRow>
          <p>Description: {{ property.description }}</p>
        </CRow>
      </CRow>
    </CCardBody>

  </CCard>
</template>

<script>
import { cilPen, cilXCircle, cilList, cilArrowLeft, cilArrowRight } from '@coreui/icons';
import api from "@/api/api-client";


export default {
  name: 'View',
  components: {},
  data() {
    console.log('data')
    return {
      icons: { cilPen, cilXCircle, cilList, cilArrowLeft, cilArrowRight },
      property: {},
      id: '',
      properties: [],
      isNextValueExists: true,
      isPreviousValueExists: true
    }
  },
  created() {
    this.getPropertyList();
  },
  methods: {
    /**
     * Get all property by Id
     */
    getList(id) {
      api.get(`/property/find/${id}`).then((res) => {
        if (res) {
          // console.log(res, "its response");
          this.property = res.data;
        }
      });
    },

    getPropertyList() {
      api.post(`/openHouse`).then((res) => {
        if (res) {
          this.properties = res.data;
          if (this.properties.length) {
            this.id = this.properties[0].id;
            this.getList(this.id);
          }
        }
      });
    },

    goNext() {
      const property = this.properties.find(property => { if (property.id === this.id) { return property } });
      const index = this.properties.indexOf(property);
      this.isNextValueExists = index === 0 ? false : true;
      if (this.properties.at(index + 1)) {
        const propertyValue = this.properties.at(index + 1);
        this.id = propertyValue.id;
        this.getList(this.id);
      } else {
        console.log('end')
        this.isNextValueExists = false;
      }
    },

    goPrevious() {
      const property = this.properties.find(property => { if (property.id === this.id) { return property } });
      const index = this.properties.indexOf(property);
      this.isPreviousValueExists = index === 0 ? false : true;
      if (this.isPreviousValueExists) {
        const propertyValue = this.properties.at(index - 1);
        this.id = propertyValue.id;
        this.getList(this.id);
      } else {
        console.log('end')
        this.isPreviousValueExists = false;
      }
    }
  }

}

</script>
