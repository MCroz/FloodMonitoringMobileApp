<template>
    <q-dialog ref="dialog" @hide="onDialogHide" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-negative text-white error-card">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>

        <q-card-section>
          {{message}}
        </q-card-section>

      </q-card>
    </q-dialog>



</template>

<script>
export default {
  props: ['title','message'],

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style>
.error-card {
    max-width: 300px;
    min-width: 250px;
}
</style>
