<template>
  <CCard class="mb-4">

    <!-- Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>User</strong> <small>{{ userData.full_name
          }}</small></div>
        </CCol>
        <CCol :xs="6" class="d-flex justify-content-end">
          <div>
            <CButton class="me-2" color="primary" variant="outline" @click="$router.push({ path: `/users` })">
              <CIcon :icon="icons.cilList" />
            </CButton>
            <CButton class="me-2" color="primary" variant="outline" @click="$router.push({ path: `/users/update/${this.url}` })">
              <CIcon :icon="icons.cilPen" />
            </CButton>
            <CButton color="danger" variant="outline" @click="$router.push({ path: `/users` })">
              <CIcon :icon="icons.cilXCircle" />
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CCardHeader>

    <CCardBody>

      <p>Name: {{ userData.name }}</p>

      <!-- <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
        PageMaker including versions of Lorem Ipsum.
      </p>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
        PageMaker including versions of Lorem Ipsum.
      </p> -->

    </CCardBody>

  </CCard>
</template>

<script>
import { cilPen, cilXCircle, cilList } from '@coreui/icons';
import api from "@/api/api-client";


export default {
  name: 'View',
  components: {},
  data() {
    return {
      icons: { cilPen, cilXCircle, cilList },
      userData: {},
      url:''
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
      api.get(`/users/find/${this.url}`).then((res) => {
        if (res) {
          console.log(res, "its response");
          this.userData = res.data;
        }
      });
    },
  }

}

</script>