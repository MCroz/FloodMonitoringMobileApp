<template>
            <q-uploader
                :url="$store.getters.serverUrl + 'api/UploadImage.php'"
                accept=".jpg, image/*"
                style="width: 100%;height: 100%;"
                auto-upload
                hide-upload-btn
                @uploaded="onUploaded"
                @failed="onFailed"
                @removed="onFileRemoved"
                @uploading="onUploading"
                field-name="flood-db-file"
            >

            <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                <!-- <q-btn v-if="scope.uploadedFiles.length > 0" icon="far fa-trash-alt" @click="scope.removeUploadedFiles" round dense flat >
                    <q-tooltip>Remove Uploaded Files</q-tooltip>
                </q-btn> -->
                <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                <div class="col">
                    <div class="q-uploader__title">Upload Image</div>
                    <!-- <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div> -->
                </div>
                <q-btn v-if="scope.canAddFiles && scope.uploadedFiles.length === 0" type="a" icon="add_box" round dense flat>
                    <q-uploader-add-trigger />
                    <q-tooltip>Pick Files</q-tooltip>
                </q-btn>
                </div>
            </template>


      <template v-slot:list="scope">
        <q-list separator>

          <q-item v-for="file in scope.files" :key="file.name">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label v-if="scope.isUploading" caption>
                Status: {{ file.__status }}
              </q-item-label>
              <q-item-label v-if="!scope.isUploading" caption>
                Status: {{ JSON.parse(file.xhr.responseText).ResponseMessage }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                v-if="!scope.isUploading"
                @click="scope.removeFile(file)"
              />

              <!-- <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="far fa-eye"
                @click="onClickPreview(file.__img.src)"
              /> -->
            </q-item-section>
          </q-item>

        </q-list>
      </template>



            </q-uploader>
</template>

<script>
export default {
    watch: {
      isUploading(val) {
        this.$emit('isUploading',val);
      }
    },

    props: {

    },

    data() {
        return {
          isUploading: false
        }
    },

    methods: {
        
        onClickPreview(imgSrc) {
            this.$emit('clickPreview', imgSrc)
        },

        onUploaded(info) {
            this.isUploading = false
            var response = JSON.parse(info.xhr.responseText);
            var emittedValue = ""
            if (response.ResponseStatus == "Success") {
                emittedValue = response.Data
            } else {
                emittedValue = ""
            }
            this.$emit('onFinishUpload', emittedValue)
        },

        onFailed() {
            this.$emit('onFinishUpload', "")
            this.isUploading = false
        },

        onFileRemoved(file) {
            this.$emit('onFileRemoved', file)
        },

        onUploading() {
          this.isUploading = true
        }
    }
}
</script>

<style>

</style>
