<template>
      <CCardBody>
          <div>
            <CModal alignment="center"  :visible="visibleVerticallyCenteredDemo" @close="
              () => {
                visibleVerticallyCenteredDemo = false
              }
            ">
              <CModalHeader dismiss @close="
                () => {
                  visibleVerticallyCenteredDemo = false
                }
              ">
                <CModalTitle>Delete user</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure you want to delete this user?
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
</template>

<script>

export default {
  name: 'Delete',
  components: {},
  data() {

    return {
      visibleVerticallyCenteredDemo: false,

    }
  },

  methods: {
    deleteRecord(){
    // this.$emit('incrementCountEvent')
    console.log("clicked one");
    },
    incrementCountEvent(){
      console.log('clicked');
    },
  },
}
</script>
<!--
<script >
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import IconCancel from '../icons/IconCancel.vue';
export default {
  name: 'Delete',
  components: { Dialog, DialogPanel, TransitionChild, TransitionRoot, IconCancel },

  props: {
    show: { type: Boolean, default: false },
    text: { type: String },
  },

  data() {
  },

  methods: {
    cancel() {
      this.$emit('cancel')
    },

    deleteFunction() {
      this.$emit('delete')
    }

  }

}

</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative text-gray-900 antialiased z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-dark-800/40"></div>
      </TransitionChild>
      <div @click="cancel()" class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full justify-center md:p-4 text-center items-end md:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-8 md:translate-y-0 md:scale-110"
            enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-8 md:translate-y-0 md:scale-110">
            <DialogPanel class="w-full md:max-w-4xl md:px-12">
              <div
                class="flex flex-col relative rounded-t-3xl md:rounded-xl px-5 md:px-14 py-9 md:pt-14 md:pb-9 bg-white">
                <button @click="cancel()" type="button"
                  class="block md:hidden w-8 h-1 bg-black/20 rounded-2xl absolute left-1/2 -translate-x-1/2 top-2"></button>
                <button @click="cancel()" type="button"
                  class="absolute hidden md:block p-1 top-4 right-4 focus:outline-none">
                  <img src="@/assets/icons/close-modal.svg" alt="close" />
                </button>
                <p class="text-2xl block leading-1.2 mb-12">
                  {{ text }}
                </p>
                <div class="flex justify-center gap-x-5 md:gap-x-7 w-full md:w-auto">
                  <button @click="cancel()" type="button"
                    class="w-full md:w-32 border-2 border-danger-800 transition-colors duration-200 hover:border-danger-900 text-danger-800 hover:text-danger-900 flex items-center justify-center gap-x-1 font-bold text-lg md:text-xl h-12 px-7 md:px-8 rounded-full active:scale-95">
                    <IconCancel class="flex-shrink-0" />Cancel
                  </button>
                  <button type="button" @click="deleteFunction()"
                    class="w-full md:w-40 bg-danger-800 transition-colors duration-200 hover:bg-danger-900 text-white flex items-center justify-center gap-x-2 font-bold text-lg md:text-xl h-12 px-7 md:px-8 rounded-full active:scale-95">
                    Delete
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template> -->