<template>
  <CCard class="mb-4">

    <!-- Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>User</strong> <small>{{
            userData.name
          }}</small></div>
        </CCol>
        <CCol :xs="6" class="d-flex justify-content-end">
          <div>
            <CButton class="me-2" color="primary" variant="outline" @click="$router.push({ path: `/admin` })">
              <CIcon :icon="icons.cilList" />
            </CButton>
            <CButton class="me-2" color="primary" variant="outline"
              @click="$router.push({ path: `/admin/update/${this.url}` })">
              <CIcon :icon="icons.cilPen" />
            </CButton>
            <CButton color="danger" variant="outline" @click="$router.push({ path: `/admin` })">
              <CIcon :icon="icons.cilXCircle" />
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CCardHeader>

    <CCardBody>
      <CRow>
        <p>Name: {{ userData.name }}</p>
      </CRow>
      <CRow>
        <p>Email: {{ userData.email }}</p>
      </CRow>
    </CCardBody>

  </CCard>
</template>

<script>
import { cilPen, cilXCircle, cilList } from '@coreui/icons';
import ApiClient from '@/api/api-client'
const api = new ApiClient();


export default {
  name: 'View',
  components: {},
  data() {
    return {
      icons: { cilPen, cilXCircle, cilList },
      userData: {},
      url: ''
    }
  },
  created() {
    this.getList();
  },
  methods: {
    /**
     * Get all users
     */
    getList() {
      this.url = this.$route.params.id
      api.get(`/admin/find/${this.url}`).then((res) => {
        if (res) {
          console.log(res, "its response");
          this.userData = res.data;
        }
      });
    },
  }

}

</script>