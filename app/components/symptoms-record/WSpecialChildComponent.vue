<template>
  <div>
    <div
      v-if="
        part.kind === constants.SPECIAL &&
        part.part_type_component_name ===
          constants.CHECKBOX_GROUP_COMPONENT_NAME
      "
      class="parts__special-component__checkbox-group"
    >
      <small v-if="error" :style="{ color: `red` }">
        {{ errorMessages ? errorMessages : 'Error messages' }}
      </small>

      <div class="parts__special-component__checkbox-group__content">
        <div v-for="(c, childIndex) in part.child_nodes" :key="`${childIndex}`">
          <div v-if="c.label !== null">
            <w-checkbox-icon
              :id="c.id"
              :value="c.part_value"
              :label="c.label"
              @checkboxIconClicked="checkboxIconClicked()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import WCheckboxIcon from '@/components/stories/WCheckboxIcon'
import { CONSTANTS } from '@/utils/constants'
import { validations } from '@/utils/validations'

export default {
  name: 'WSpecialChildComponent',
  components: {
    WCheckboxIcon,
  },
  props: {
    part: {
      type: Object,
      default: undefined,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      constants: CONSTANTS,
      validate: validations,
    }
  },
  computed: {
    ...mapGetters({
      getAllComponentListValue:
        'component-value-store/getAllComponentListValue',
    }),
  },
  mounted() {
    if (this.part && this.part.validations) {
      this.updateValidationState(this.part, 'error/updateErrorsForComponent')
    }
  },
  methods: {
    checkboxIconClicked() {
      this.updateValidationState(
        this.part,
        'error/updateErrorStateForComponentById'
      )
    },
    updateValidationState(part, commit) {
      const validations = part.validations
      let errorObject = {}
      let childComponentIds = []
      let checkedComponent = []

      if (validations && validations.length > 0) {
        try {
          validations.forEach((obj) => {
            switch (obj.label) {
              case this.constants.MAX_COUNT:
                if (
                  part.part_type_component_name ===
                  this.constants.CHECKBOX_GROUP_COMPONENT_NAME
                ) {
                  childComponentIds = part.child_nodes.map((c) => c.id)
                  checkedComponent = this.getAllComponentListValue.filter(
                    (c) =>
                      c.part_value === '1' &&
                      childComponentIds.includes(c.part_id)
                  )

                  errorObject = this.validate.validateSpecialComponentCount(
                    obj,
                    checkedComponent.length
                  )

                  this.$store.dispatch(commit, {
                    id: part.id,
                    error_type: this.constants.MAX_COUNT,
                    error_message: errorObject.errorMessage,
                    error_status: errorObject.error,
                  })
                }
                break

              case this.constants.VALIDATION_COUNT_OVER_ONE:
                if (
                  part.part_type_component_name ===
                  this.constants.CHECKBOX_GROUP_COMPONENT_NAME
                ) {
                  childComponentIds = part.child_nodes.map((c) => c.id)
                  checkedComponent = this.getAllComponentListValue.filter(
                    (c) =>
                      c.part_value === '1' &&
                      childComponentIds.includes(c.part_id)
                  )

                  errorObject =
                    this.validate.validateSpecialComponentCountOverOne(
                      obj,
                      checkedComponent.length
                    )
                  this.$store.dispatch(commit, {
                    id: part.id,
                    error_type: this.constants.VALIDATION_COUNT_OVER_ONE,
                    error_message: errorObject.errorMessage,
                    error_status: errorObject.error,
                  })
                }
                break
            }
          })
        } catch (e) {
          console.warn('Validation Adding state error', e)
        }
      }
    },
  },
}
</script>
