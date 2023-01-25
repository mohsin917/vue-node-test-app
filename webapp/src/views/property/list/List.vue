<template>
  <CCard class="mb-4">
    <!-- Header -->
    <CCardHeader>
      <CRow>
        <CCol :xs="6" class="mt-2">
          <div><strong>Property</strong> <small>List</small></div>
        </CCol>
        <CCol :xs="6" class="d-flex justify-content-end">
          <div>
            <CButton color="primary" variant="outline" @click="$router.push({ path: `/properties/create` })">
              <CIcon :icon="icons.cilPlus" />
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CCardHeader>
    <!-- Body -->
    <CCardBody>
      <CTable hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Address</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col" style="width: 200px"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="record in records">
            <CTableDataCell>{{ record.address }}</CTableDataCell>
            <CTableDataCell>{{ record.description }}</CTableDataCell>
            <CTableDataCell class="text-end">
              <a class="link me-2" @click="$router.push({ path: `/properties/view/${record.id}` })">
                <CIcon :icon="icons.cilZoomIn" />
              </a>
              <a class="link me-2" @click="$router.push({ path: `/properties/update/${record.id}` })">
                <CIcon :icon="icons.cilPen" />
              </a>
              <a class="link" @click="
                () => {
                  visibleVerticallyCenteredDemo = true
                  deleteId = record.id
                }
              ">
                <CIcon style="color: red" :icon="icons.cilXCircle" />
              </a>
            </CTableDataCell>


          </CTableRow>

        </CTableBody>
        <!-- confirmation modal -->
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
                <CModalTitle>Delete Property</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure you want to delete this property?
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" @click="
                  () => {
                    visibleVerticallyCenteredDemo = false
                  }
                ">
                  Close
                </CButton>
                <CButton color="danger" @click="deleteRecord(deleteId)">Delete</CButton>
              </CModalFooter>
            </CModal>
          </div>
        </CCardBody>
      </CTable>
    </CCardBody>
  </CCard>

</template>

<script>
import { cilPlus, cilPen, cilXCircle, cilZoomIn } from '@coreui/icons'
import api from '@/api/api-client'

export default {
  name: 'Properties',
  components: {},
  data() {
    return {
      icons: { cilPlus, cilPen, cilXCircle, cilZoomIn },
      records: [],
      visibleVerticallyCenteredDemo: false,
      deleteId: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * Get all properties
     */
    getList() {
      api.post('/property/', this.form).then((res) => {
        if (res) {
          this.records = res.data;
        }
      })
    },

    /**
     * Delete record
     * @param {number} id
     */
    deleteRecord(id) {
      api.delete(`/property/delete/${id}`).then((res) => {
        if (res) {
          this.visibleVerticallyCenteredDemo = false;
          this.getList()
        }
      }).catch((err) => {
        console.log(err, "its error");
      })

    },
  },
}
</script>
