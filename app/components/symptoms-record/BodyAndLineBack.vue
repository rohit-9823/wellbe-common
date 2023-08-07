<template>
  <div class="wrap">
    <div class="back">
      <svg viewBox="0 0 338 424">
        <rect width="338" height="424" style="fill: none" />
        <path
          id="パス_16004"
          data-name="パス 16004"
          d="M169.38,8.5c12.47,0,19,11.94,19,22.74,0,8.65-6.8,22-7.82,23.13,0,0,.42,8.73.83,11.22a39.83,39.83,0,0,0,16.19,7.89c9.56,2.08,19.11,4.57,20.36,15s7.9,26.59,10.8,35.32,12,21.19,15.79,30.74,11.63,31.17,13.29,33.25,4.16,2.08,9.14,4.57,16.21,8.31,16.21,8.31.83,2.91-3.74,2.08a14.08,14.08,0,0,1-7.06-3.33s-2.08.42-1.24,3.75,7.9,17.44,8.31,18.69-1.83,2.86-2.91,1.13l-6.76-12.78s-.41-.08,0,.91,6.26,13,6.6,13.69a1.68,1.68,0,1,1-2.94,1.62l0,0s-5.93-11.71-6.35-12.45-.9-.49-.33.41,5.69,11.46,6,12.12c.74,1.49-1.32,3.46-3.14.9,0,0-6.35-11.79-6.6-12.45s-.66,0-.25.58,5.69,10.64,6.43,11.87-1.32,2.81-2.89.58-10.72-17.24-12.2-19.38-2.47-6.93-3.05-10.56-5.94-9.73-7.91-11.71-39.11-64.17-40.35-66c0,0-6.16,36.35-6.16,38s13,32.2,11.77,52.77-6.23,67.73-7.48,76.45,2.91,28.67,1.25,46.54-3.32,55.68-4.16,63.16,7.48,17,5.82,20.36S196.78,420,191,419.6s-8.31,2.07-8.73-.83a175.69,175.69,0,0,1,0-20.78c.42-3.74,1.25-15.37.83-21.19s-4.57-37.4-5-49.45,1.25-33.24,0-40.31-5-62.74-8.31-65.66H169c-3.33,2.92-7.07,58.59-8.31,65.66s.41,28.25,0,40.31-4.57,43.63-5,49.45.41,17.45.83,21.19a175.69,175.69,0,0,1,0,20.78c-.42,2.91-2.91.42-8.73.83s-11.22,1.25-12.88-2.08,6.65-12.88,5.82-20.36-2.49-45.29-4.15-63.16,2.49-37.81,1.25-46.54-6.23-55.88-7.48-76.45,11.77-51.11,11.77-52.77-6.17-38-6.17-38c-1.24,1.87-38.37,64.05-40.35,66S88.27,194.33,87.7,198s-1.57,8.41-3.06,10.56S74,225.67,72.44,227.9s-3.63.66-2.89-.58,6-11.29,6.44-11.87,0-1.24-.25-.58-6.6,12.45-6.6,12.45c-1.81,2.56-3.87.58-3.14-.9.34-.66,5.44-11.21,6-12.12s.08-1.15-.33-.41-6.35,12.45-6.35,12.45a1.68,1.68,0,1,1-3-1.52l0,0c.33-.71,6.18-12.7,6.59-13.69s0-.91,0-.91L62.2,223c-1.07,1.73-3.32.12-2.91-1.13s7.48-15.37,8.31-18.69-1.24-3.75-1.24-3.75a14.2,14.2,0,0,1-7.06,3.33c-4.57.83-3.74-2.08-3.74-2.08s11.22-5.82,16.21-8.31,7.48-2.49,9.14-4.57,9.55-23.69,13.29-33.25,12.88-22,15.79-30.74,9.56-24.93,10.8-35.32,10.8-12.89,20.36-15a34.39,34.39,0,0,0,15.48-7.89c.42-2.49.83-11.22.83-11.22-1-1.18-7.12-14.48-7.12-23.13,0-10.8,6.56-22.74,19-22.74Z"
          style="fill: none; stroke: #222"
        />
      </svg>
      <div class="buttonWrap">
        <div></div>
        <div
          :style="{
            visibility: makeComponentVisible(constants.PAIN_PARTS_BACK_HEAD),
          }"
        >
          <div class="buttonColumn">
            <div
              class="button top"
              :class="hasValue(constants.PAIN_PARTS_BACK_HEAD) ? 'on' : ''"
              @click="openIndicatorFor(constants.PAIN_PARTS_BACK_HEAD)"
            >
              {{ getComponentLabelAndValue(constants.PAIN_PARTS_BACK_HEAD) }}
            </div>
          </div>
          <div class="line deg0 topRight"></div>
          <div></div>
        </div>
        <div
          :style="{
            visibility: makeComponentVisible(constants.PAIN_PARTS_BACK_BACK),
          }"
        >
          <div></div>
          <div class="line bottomLeft">
            <svg>
              <line x1="100%" y1="0" x2="0" y2="100%"></line>
            </svg>
          </div>
          <div class="buttonColumn">
            <div
              class="button top"
              :class="hasValue(constants.PAIN_PARTS_BACK_BACK) ? 'on' : ''"
              @click="openIndicatorFor(constants.PAIN_PARTS_BACK_BACK)"
            >
              {{ getComponentLabelAndValue(constants.PAIN_PARTS_BACK_BACK) }}
            </div>
          </div>
        </div>
        <div></div>
        <div
          :style="{
            visibility: makeComponentVisible(
              constants.PAIN_PARTS_BACK_LEFT_ARM
            ),
          }"
        >
          <div class="buttonColumn">
            <div
              class="button top"
              :class="hasValue(constants.PAIN_PARTS_BACK_LEFT_ARM) ? 'on' : ''"
              @click="openIndicatorFor(constants.PAIN_PARTS_BACK_LEFT_ARM)"
            >
              {{
                getComponentLabelAndValue(constants.PAIN_PARTS_BACK_LEFT_ARM)
              }}
            </div>
          </div>
          <div class="line deg0 topRight"></div>
          <div></div>
        </div>
        <div
          :style="{
            visibility: makeComponentVisible(
              constants.PAIN_PARTS_BACK_RIGHT_ARM
            ),
          }"
        >
          <div></div>
          <div class="line deg0 topLeft"></div>

          <div class="buttonColumn">
            <div
              class="button top"
              :class="hasValue(constants.PAIN_PARTS_BACK_RIGHT_ARM) ? 'on' : ''"
              @click="openIndicatorFor(constants.PAIN_PARTS_BACK_RIGHT_ARM)"
            >
              {{
                getComponentLabelAndValue(constants.PAIN_PARTS_BACK_RIGHT_ARM)
              }}
            </div>
          </div>
        </div>
        <div
          class="alignEnd"
          :style="{
            visibility: makeComponentVisible(constants.PAIN_PARTS_BACK_WAIST),
          }"
        >
          <div class="buttonColumn">
            <div
              class="button bottom"
              :class="hasValue(constants.PAIN_PARTS_BACK_WAIST) ? 'on' : ''"
              @click="openIndicatorFor(constants.PAIN_PARTS_BACK_WAIST)"
            >
              {{ getComponentLabelAndValue(constants.PAIN_PARTS_BACK_WAIST) }}
            </div>
          </div>

          <div class="line topRight">
            <svg>
              <line x1="100%" y1="0" x2="0" y2="100%"></line>
            </svg>
          </div>
          <div></div>
        </div>
        <div></div>
        <div
          :style="{
            visibility: makeComponentVisible(
              constants.PAIN_PARTS_BACK_RIGHT_LEG
            ),
          }"
        >
          <div></div>
          <div class="line deg0 topLeft"></div>
          <div class="buttonColumn">
            <div
              class="button top"
              :class="hasValue(constants.PAIN_PARTS_BACK_RIGHT_LEG) ? 'on' : ''"
              @click="openIndicatorFor(constants.PAIN_PARTS_BACK_RIGHT_LEG)"
            >
              {{
                getComponentLabelAndValue(constants.PAIN_PARTS_BACK_RIGHT_LEG)
              }}
            </div>
          </div>
        </div>

        <div
          :style="{
            visibility: makeComponentVisible(
              constants.PAIN_PARTS_BACK_LEFT_LEG
            ),
          }"
        >
          <div class="buttonColumn">
            <div
              class="button top"
              :class="hasValue(constants.PAIN_PARTS_BACK_LEFT_LEG) ? 'on' : ''"
              @click="openIndicatorFor(constants.PAIN_PARTS_BACK_LEFT_LEG)"
            >
              {{
                getComponentLabelAndValue(constants.PAIN_PARTS_BACK_LEFT_LEG)
              }}
            </div>
          </div>
          <div class="line deg0 topRight"></div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
    <div
      :style="{
        visibility: makeComponentVisible(constants.PAIN_PARTS_BACK_WHOLE_BODY),
      }"
    >
      <div class="buttonColumn text-center">
        <div class="clear-all" @click="clearAll">一括<br />クリア</div>
        <div
          class="button all"
          :class="hasValue(constants.PAIN_PARTS_BACK_WHOLE_BODY) ? 'on' : ''"
          @click="openIndicatorFor(constants.PAIN_PARTS_BACK_WHOLE_BODY)"
        >
          {{ getComponentLabelAndValue(constants.PAIN_PARTS_BACK_WHOLE_BODY) }}
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CONSTANTS } from '@/utils/constants'

export default {
  name: 'BodyAndLineBack',
  props: {
    componentList: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      constants: CONSTANTS,
    }
  },
  computed: {
    ...mapGetters({
      getValueById: 'theme/getPartValueById',
    }),
  },
  mounted() {},
  methods: {
    clearAll() {
      this.$store.dispatch('theme/clearAllPartsComponentValue')
    },
    hasValue(constantId) {
      const found = this.getComponentByConstant(constantId)
      const value = found[0] ? this.getValueById(found[0].id) : ''

      if (value) return true

      return false
    },
    getComponentByConstant(constantId) {
      return this.componentList.filter((c) => c.id.includes(constantId))
    },
    getComponentLabel(constantId) {
      const found = this.getComponentByConstant(constantId)
      return found[0]?.label
    },
    getComponentId(constantId) {
      const found = this.getComponentByConstant(constantId)
      return found[0]?.id
    },
    makeComponentVisible(constantId) {
      if (this.getComponentByConstant(constantId).length === 0) return 'hidden'
    },
    openIndicatorFor(component) {
      const detail = this.componentList.filter((value) =>
        value.id.includes(component)
      )
      const id = this.getComponentId(component)
      if (id) this.$emit('openIndicatorDialog', id, detail)
    },
    getComponentLabelAndValue(constantId) {
      const found = this.getComponentByConstant(constantId)
      const value = found[0] ? this.getValueById(found[0].id) : ''
      if (value) return found[0]?.label + ': ' + value

      return found[0]?.label
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  margin: auto;

  .text-center {
    text-align: center;
  }

  svg {
    width: 100%;
  }

  .back {
    position: relative;
  }

  .button {
    border: 1px solid #656bb1;
    border-radius: 50px;
    font-size: 18px;
    padding: 15px 8px;
    display: inline-block;
    font-weight: 600;
    color: #656bb1;
    box-shadow: 0 2px 2px #0e102829;
    white-space: nowrap;
    background-color: #fff;
    min-width: 88px;
    text-align: center;

    &.on {
      background-color: #8388c0;
      border-color: #656bb1;
      color: #fff;
    }

    &.top {
      transform: translateY(-50%);
    }

    &.bottom {
      transform: translateY(50%);
    }

    &.all {
    }
  }

  .line {
    position: relative;

    svg {
      width: 100%;
      height: 100%;

      line {
        stroke: #444;
        stroke-width: 2px;
      }
    }

    &.deg0 {
      border-top: 2px solid #444;
    }

    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background: #444;
      border-radius: 50%;
    }

    &.topRight::after {
      top: -6px;
      right: -6px;
    }

    &.topLeft::after {
      top: -6px;
      left: -6px;
    }

    &.bottomLeft::after {
      bottom: -6px;
      left: -6px;
    }
  }

  .buttonWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    & > div {
      position: relative;
      display: flex;

      &.alignEnd {
        align-items: end;
      }

      .buttonColumn {
        position: relative;
      }

      &:nth-child(1) {
        height: 5%;
      }

      &:nth-child(2) {
        height: 5%;

        & > div:nth-child(2) {
          flex: 1;
        }

        & > div:nth-child(3) {
          width: 51%;
        }
      }

      &:nth-child(3) {
        & > div:nth-child(1) {
          width: 52%;
        }

        & > div:nth-child(2) {
          flex: 1;
        }

        height: 12%;
      }

      &:nth-child(4) {
        height: 4%;
      }

      &:nth-child(5) {
        height: 8%;

        & > div:nth-child(2) {
          flex: 1;
        }

        & > div:nth-child(3) {
          width: 62%;
        }
      }

      &:nth-child(6) {
        & > div:nth-child(1) {
          width: 68%;
        }

        & > div:nth-child(2) {
          flex: 1;
        }

        height: 6%;
      }

      &:nth-child(7) {
        height: 24%;

        & > div:nth-child(2) {
          flex: 1;
          height: 100%;
        }

        & > div:nth-child(3) {
          width: 51%;
        }
      }

      &:nth-child(8) {
        z-index: -1;
        height: 10%;
      }

      &:nth-child(9) {
        height: 10%;

        & > div:nth-child(1) {
          width: 57%;
        }

        & > div:nth-child(2) {
          flex: 1;
        }
      }

      &:nth-child(10) {
        height: 14%;

        & > div:nth-child(2) {
          flex: 1;
        }

        & > div:nth-child(3) {
          width: 57%;
        }
      }

      &:nth-child(11) {
        height: 2%;
      }
    }
  }

  .clear-all {
    position: absolute;
    border: 1px solid #676363;
    border-radius: 8px;
    padding: 9px 5px;
    line-height: 1.2;
  }
}
</style>
