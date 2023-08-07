<template>
  <div>
    <w-special-current-diseases-component
      v-if="
        validate.matchesIdWithString(
          part.id,
          constants.CURRENT_DISEASE_RADIO_STRING
        ) && part.kind === constants.SPECIAL
      "
      :part="part"
      :uc-group-part="ucGroupPart"
      :cd-group-part="cdGroupPart"
      :is-checkbox-select-required="getIfCheckboxSelectRequired()"
      :checkbox-error-message="checkboxErrorMessage"
      :is-treatment-mode-prop="isTreatmentMode"
      @unCheckAllDisease="unCheckAllDisease"
    />

    <w-special-next-hospital-radio-component
      v-else-if="
        validate.matchesIdWithString(
          part.id,
          constants.GO_TO_ANOTHER_HOSPITAL_GROUP
        ) && part.kind === constants.SPECIAL
      "
      :part="part"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import WSpecialCurrentDiseasesComponent from '@/components/profile-edit/WSpecialCurrentDiseasesComponent'
import WSpecialNextHospitalRadioComponent from '@/components/profile-edit/WSpecialNextHospitalRadioComponent'
import { CONSTANTS } from '@/utils/constants'
import { validations } from '@/utils/validations'

export default {
  name: 'WSpecialComponent',
  components: {
    WSpecialCurrentDiseasesComponent,
    WSpecialNextHospitalRadioComponent,
  },
  props: {
    part: {
      type: Object,
      default: undefined,
    },
    ucGroupPart: {
      type: Object,
      default: undefined,
    },
    cdGroupPart: {
      type: Object,
      default: undefined,
    },
    isTreatmentModeProp: {
      type: Number,
      default: undefined,
    },
    error: {
      type: Boolean,
      default: false,
    },
    isCheckboxSelectRequired: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      constants: CONSTANTS,
      checkboxErrorMessage: undefined,
      validate: validations,
      isTreatmentMode: this.isTreatmentModeProp,
    }
  },
  computed: {
    ...mapGetters({
      getErrorMessageById: 'error/getErrorMessageById',
      getErrorForComponentById: 'error/getErrorForComponentById',
    }),
  },
  methods: {
    unCheckAllDisease() {
      this.$emit('unCheckAllDisease')
    },
    getIfCheckboxSelectRequired() {
      let required = false
      if (this.cdGroupPart && this.cdGroupPart.validations) {
        const validations = this.cdGroupPart.validations
        const found = validations.filter(
          (v) =>
            v.label === this.constants.REQUIRED ||
            v.label === this.constants.COUNT_OVER_ONE
        )

        if (found.length > 0) {
          this.checkboxErrorMessage = found[0].message
          required = true
        }
      }
      if (this.ucGroupPart && this.ucGroupPart.validations) {
        const validations = this.ucGroupPart.validations
        const found = validations.filter(
          (v) =>
            v.label === this.constants.REQUIRED ||
            v.label === this.constants.COUNT_OVER_ONE
        )

        if (found.length > 0) {
          this.checkboxErrorMessage = found[0].message
          required = true
        }
      }

      return required
    },
  },
}
</script>
