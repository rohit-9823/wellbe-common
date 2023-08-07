<template>
  <div>
    <div :id="id" class="w-step" :class="classInner" :style="defaultStyle">
      <small v-if="hintMessages" :style="{ color: hintMessagesColor }">{{
        hintMessages
      }}</small>

      <div class="w-step__section-hint">
        <div
          v-for="items in gridWeek.datas"
          v-show="guidePosition !== null && guidePosition !== '0'"
          :key="items.label"
        >
          <span v-if="items.properties.display_type === 1" class="sub-icon">
            <span>
              <img :src="items.properties.display_character" alt="img" />
            </span>
            <label>{{ items.label }}あり</label>
          </span>

          <span
            v-if="items.properties.display_type === 2"
            class="sub-icon"
            style="position: relative; top: 10px; left: 5px"
          >
            <span>
              {{ items.properties.display_character }}
            </span>
            <label>{{ items.label }}あり</label>
          </span>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="(item, index) in headers" :key="index">
              <div>{{ item.date }}</div>
              <div :style="{ color: setDateColor(item) }">
                {{ item.weekDay }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="
              stomachAcheInner.length > 0 ||
              checkAvailability(constants.STOMACH_ACHE)
            "
            :style="customizeStyle"
          >
            <td>腹痛</td>
            <td
              v-for="(item, index) in stomachAcheInner"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.STOMACH_ACHE)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.STOMACH_ACHE
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              breakfastInner.length > 0 ||
              checkAvailability(constants.BREAKFAST)
            "
            :style="customizeStyle"
          >
            <td>朝食</td>
            <td
              v-for="(item, index) in breakfastInner"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.BREAKFAST)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.BREAKFAST
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="lunchInner.length > 0 || checkAvailability(constants.LUNCH)"
            :style="customizeStyle"
          >
            <td>昼食</td>
            <td
              v-for="(item, index) in lunchInner"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(item, getGridWeekInObj(constants.LUNCH))
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(constants.LUNCH)"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="dinnerInner.length > 0 || checkAvailability(constants.DINNER)"
            :style="customizeStyle"
          >
            <td>夕食</td>
            <td
              v-for="(item, index) in dinnerInner"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(item, getGridWeekInObj(constants.DINNER))
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(constants.DINNER)"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              takingMedicineInner.length > 0 ||
              checkAvailability(constants.TAKING_MEDICINE)
            "
            :style="customizeStyle"
          >
            <td>服薬</td>
            <td
              v-for="(item, index) in takingMedicineInner"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.TAKING_MEDICINE)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.TAKING_MEDICINE
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="partHead.length > 0 || checkAvailability(constants.HEAD)"
            :style="customizeStyle"
          >
            <td>{{ constants.HEAD }}</td>
            <td
              v-for="(item, index) in partHead"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(item, getGridWeekInObj(constants.HEAD))
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(constants.HEAD)"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <tr
            v-if="backHead.length > 0 || checkAvailability(constants.BACK_HEAD)"
            :style="customizeStyle"
          >
            <td>{{ constants.BACK_HEAD }}</td>
            <td
              v-for="(item, index) in backHead"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.BACK_HEAD)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.BACK_HEAD
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              frontHead.length > 0 || checkAvailability(constants.FRONT_HEAD)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.FRONT_HEAD }}</td>
            <td
              v-for="(item, index) in frontHead"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.FRONT_HEAD)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.FRONT_HEAD
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>

          <tr
            v-if="partBack.length > 0 || checkAvailability(constants.PART_BACK)"
            :style="customizeStyle"
          >
            <td>{{ constants.PART_BACK }}</td>
            <td
              v-for="(item, index) in partBack"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.PART_BACK)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.PART_BACK
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              partLeftHand.length > 0 || checkAvailability(constants.LEFT_HAND)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.LEFT_HAND }}</td>
            <td
              v-for="(item, index) in partLeftHand"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.LEFT_HAND)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.LEFT_HAND
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              partRightHand.length > 0 ||
              checkAvailability(constants.RIGHT_HAND)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.RIGHT_HAND }}</td>
            <td
              v-for="(item, index) in partRightHand"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.RIGHT_HAND)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.RIGHT_HAND
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              partLeftLeg.length > 0 || checkAvailability(constants.LEFT_LEG)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.LEFT_LEG }}</td>
            <td
              v-for="(item, index) in partLeftLeg"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(item, getGridWeekInObj(constants.LEFT_LEG))
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.LEFT_LEG
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              irregularPulseWave.length > 0 ||
              checkAvailability(constants.IRREGULAR_PULSE_WAVE)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.IRREGULAR_PULSE_WAVE }}</td>
            <td
              v-for="(item, index) in irregularPulseWave"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.IRREGULAR_PULSE_WAVE)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.IRREGULAR_PULSE_WAVE
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              partRightLeg.length > 0 || checkAvailability(constants.RIGHT_LEG)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.RIGHT_LEG }}</td>
            <td
              v-for="(item, index) in partRightLeg"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.RIGHT_LEG)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.RIGHT_LEG
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="partWaist.length > 0 || checkAvailability(constants.WAIST)"
            :style="customizeStyle"
          >
            <td>{{ constants.WAIST }}</td>
            <td
              v-for="(item, index) in partWaist"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(item, getGridWeekInObj(constants.WAIST))
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(constants.WAIST)"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              partAbdomen.length > 0 || checkAvailability(constants.ABDOMEN)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.ABDOMEN }}</td>
            <td
              v-for="(item, index) in partAbdomen"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(item, getGridWeekInObj(constants.ABDOMEN))
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(constants.ABDOMEN)"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="partChest.length > 0 || checkAvailability(constants.CHEST)"
            :style="customizeStyle"
          >
            <td>{{ constants.CHEST }}</td>
            <td
              v-for="(item, index) in partChest"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(item, getGridWeekInObj(constants.CHEST))
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(constants.CHEST)"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="partPain.length > 0 || checkAvailability(constants.PAIN)"
            :style="customizeStyle"
          >
            <td>{{ constants.PAIN }}</td>
            <td
              v-for="(item, index) in partPain"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(item, getGridWeekInObj(constants.PAIN))
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(constants.PAIN)"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>

                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              partWholeBody.length > 0 ||
              checkAvailability(constants.WHOLE_BODY)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.WHOLE_BODY }}</td>
            <td
              v-for="(item, index) in partWholeBody"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.WHOLE_BODY)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(
                    constants.WHOLE_BODY
                  )"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="memo.length > 0 || checkAvailability(constants.MEMO)"
            :style="customizeStyle"
          >
            <td>{{ constants.MEMO }}</td>
            <td
              v-for="(item, index) in memo"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(item, getGridWeekInObj(constants.MEMO))
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="(items, indexs) in getGridWeekInObj(constants.MEMO)"
                  :key="indexs"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img
                      :src="items.properties.display_character"
                      @click="click(index, item, 'memo', $event)"
                    />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr
            v-if="
              partAntiDiarrheal.length > 0 ||
              checkAvailability(constants.ANTI_DIARRHEAL)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.ANTI_DIARRHEAL }}</td>
            <td
              v-for="(item, index) in partAntiDiarrheal"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.ANTI_DIARRHEAL)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <!--                <div-->
                <!--                  v-for="(items, indexs) in getGridWeekInObj(-->
                <!--                    constants.ANTI_DIARRHEAL-->
                <!--                  )"-->
                <!--                  :key="indexs"-->
                <!--                >-->
                <!--                  <div-->
                <!--                    v-if="items.properties.display_type === 2"-->
                <!--                    style="cursor: pointer"-->
                <!--                  >-->
                <!--                    {{ items.properties.display_character }}-->
                <!--                  </div>-->
                <!--                  <div-->
                <!--                    v-else-if="items.properties.display_type === 1"-->
                <!--                    style="cursor: pointer"-->
                <!--                  >-->
                <!--                    <img :src="items.properties.display_character" />-->
                <!--                  </div>-->
                <!--                  <div-->
                <!--                    v-else-if="items.properties.display_type === 3"-->
                <!--                    :style="getCustomStyle(items)"-->
                <!--                  >-->
                <!--                    {{ item }}-->
                <!--                  </div>-->
                <!--                </div>-->
              </div>
            </td>
          </tr>
          <tr
            v-if="
              partBloodyStool.length > 0 ||
              checkAvailability(constants.BLOODY_STOOL)
            "
            :style="customizeStyle"
          >
            <td>{{ constants.BLOODY_STOOL }}</td>
            <td
              v-for="(item, index) in partBloodyStool"
              :key="`${item}+${index}`"
              :style="
                setClassBasedOnValue(
                  item,
                  getGridWeekInObj(constants.BLOODY_STOOL)
                )
              "
            >
              <div v-if="item" style="cursor: pointer">
                <div
                  v-for="items in getGridWeekInObj(constants.BLOODY_STOOL)"
                  :key="items.label"
                >
                  <div
                    v-if="items.properties.display_type === 2"
                    style="cursor: pointer"
                  >
                    {{ items.properties.display_character }}
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 1"
                    style="cursor: pointer"
                  >
                    <img :src="items.properties.display_character" />
                  </div>
                  <div
                    v-else-if="items.properties.display_type === 3"
                    :style="getCustomStyle(items, item)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <div class="w-step__section-hint">
        <div
          v-for="items in gridWeek.datas"
          v-show="guidePosition === '2'"
          :key="items.label"
        >
          <span v-if="items.properties.display_type === 1" class="sub-icon">
            <span>
              <img :src="items.properties.display_character" alt="img" />
            </span>
            <label>{{ items.label }}あり</label>
          </span>

          <span
            v-if="items.properties.display_type === 2"
            class="sub-icon"
            style="position: relative; top: 10px; left: 5px"
          >
            <span>
              {{ items.properties.display_character }}
            </span>
            <label>{{ items.label }}あり</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { CONSTANTS } from '@/utils/constants'
import { createCalendarHeaderDate } from '@/utils/const'

export default {
  name: 'WRecordingCalendar',
  props: {
    id: {
      type: String,
      default: undefined,
    },
    classInner: {
      type: String,
      default: undefined,
    },
    startDate: {
      type: [String, Number, Date],
      default: undefined,
    },
    hintMessages: {
      type: String,
      default: undefined,
    },
    hintMessagesColor: {
      type: String,
      default: 'black',
    },
    stomachAche: {
      type: Array,
      default: () => [],
    },
    breakfast: {
      type: Array,
      default: () => [],
    },
    lunch: {
      type: Array,
      default: () => [],
    },
    dinner: {
      type: Array,
      default: () => [],
    },
    takingMedicine: {
      type: Array,
      default: () => [],
    },
    partHead: {
      type: Array,
      default: () => [],
    },
    backHead: {
      type: Array,
      default: () => [],
    },
    frontHead: {
      type: Array,
      default: () => [],
    },
    partLeftHand: {
      type: Array,
      default: () => [],
    },
    partRightHand: {
      type: Array,
      default: () => [],
    },
    partPain: {
      type: Array,
      default: () => [],
    },
    partLeftLeg: {
      type: Array,
      default: () => [],
    },
    partRightLeg: {
      type: Array,
      default: () => [],
    },
    partChest: {
      type: Array,
      default: () => [],
    },
    partAbdomen: {
      type: Array,
      default: () => [],
    },
    partWaist: {
      type: Array,
      default: () => [],
    },
    partBack: {
      type: Array,
      default: () => [],
    },
    irregularPulseWave: {
      type: Array,
      default: () => [],
    },
    partWholeBody: {
      type: Array,
      default: () => [],
    },
    partStomachAche: {
      type: Array,
      default: () => [],
    },
    gridWeek: {
      type: Object,
      default: undefined,
    },
    memo: {
      type: Array,
      default: () => [],
    },
    guidePosition: {
      type: String,
      default: undefined,
    },
    partAntiDiarrheal: {
      type: Array,
      default: () => [],
    },
    partBloodyStool: {
      type: Array,
      default: () => [],
    },

    holidays: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: undefined,
    },
    evenLineColor: {
      type: String,
      default: '#f3f3f6',
    },
    oddLineColor: {
      type: String,
      default: '#f0f8ff',
    },
    defaultStyle: {
      type: Object,
      default: undefined,
    },
    daysTotal: {
      type: Number,
      default: 7,
    },
  },
  data: () => ({
    constants: CONSTANTS,
  }),
  computed: {
    customizeStyle() {
      return {
        '--evenLineColor': this.evenLineColor,
        '--oddLineColor': this.oddLineColor,
      }
    },
    headers() {
      return createCalendarHeaderDate(this.startDate, this.daysTotal)
    },
    stomachAcheInner() {
      return this.stomachAche.length === 0 ? [] : this.stomachAche
    },
    breakfastInner() {
      return this.breakfast.length === 0 ? [] : this.breakfast
    },
    lunchInner() {
      return this.lunch.length === 0 ? [] : this.lunch
    },
    dinnerInner() {
      return this.dinner.length === 0 ? [] : this.dinner
    },
    takingMedicineInner() {
      return this.takingMedicine.length === 0 ? [] : this.takingMedicine
    },
  },
  methods: {
    checkAvailability(value) {
      const foundValue = this.gridWeek.datas.find(
        (datas) => datas.label === value
      )
      return !!foundValue
    },
    getCustomStyle(gridItem, item) {
      return {
        backgroundColor: gridItem.properties.grid_grade_bg_color[item],
        fontColor: gridItem.properties.grid_grade_font_color[item],
      }
    },
    getGridWeekInObj(value) {
      return this.gridWeek.datas.filter((datas) => datas.label === value)
    },
    setClassBasedOnValue(val, data) {
      if (data !== undefined) {
        if (data[0].properties.display_type === 3) {
          return {
            backgroundColor: data[0].properties.grid_grade_bg_color[val],
            color: data[0].properties.grid_grade_font_color[val],
          }
        }
      }
      let className = ''
      switch (Number(val)) {
        case 0:
          className = 'val-0'
          break
        case 1:
          className = 'val-1'
          break
        case 2:
          className = 'val-2'
          break
        case 3:
          className = 'val-3'
          break
        case 4:
          className = 'val-4'
          break
        case 5:
          className = 'val-5'
          break
        case 6:
          className = 'val-6'
          break
        case 7:
          className = 'val-7'
          break
        // default:
        //   className = 'val-default'
        //   break
      }

      return className
    },
    click(index, data, row) {
      const { year, month, date } = this.headers[index]
      const item = {
        date: `${year}-${month}-${date}`,
        data,
        row,
      }
      const jDays = ['日', '月', '火', '水', '木', '金', '土']
      const alertDate = moment(item.date).format(
        'YYYY年MM月DD日 (' + jDays[moment(item.date).day()] + ')'
      )

      alert(
        JSON.stringify({
          title: alertDate,
          message: item.data,
          button_name: '閉じる',
        })
      )
    },
    setDateColor(dateItem) {
      const dayColor = {
        土: '#1C21FC',
        日: '#FB0212',
        holiday: '#FB0212',
      }
      let color = ''

      const date = moment(`${dateItem.year}-${dateItem.month}-${dateItem.date}`)
      if (this.holidays.some((holiday) => moment(holiday.date).isSame(date))) {
        color = dayColor.holiday
      }

      if (dateItem.weekDay in dayColor) color = dayColor[dateItem.weekDay]
      return color
    },
  },
}
</script>

<style lang="scss" scoped>
.sub-icon {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8em;
  text-align: center;
}
.w-step {
  &__section-hint {
    display: flex;
    justify-content: left;
    text-align: center;
    column-gap: 10px;
    row-gap: 10px;
    flex-wrap: wrap;
    width: 100%;

    &__span {
      display: flex;
      align-items: center;
      gap: 5px;
      max-width: 20%;
      font-size: 0.8em;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    font-size: 0.8em;
  }

  img {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer / Edge */
    user-select: none;
  }

  td {
    padding: 5px;
    white-space: nowrap;
  }

  td:not(:first-child) {
    min-width: 40px;
  }

  td:first-child {
    font-weight: bolder;
    text-align: left;
  }

  td.val-0 {
    color: #000000 !important;
  }

  td.val-1 {
    background-color: #f6b9b9;
    color: #000000 !important;
  }

  td.val-2 {
    background-color: #e58395;
    color: #000000 !important;
  }

  td.val-3 {
    background-color: #e56464;
    color: #000000 !important;
  }

  td.val-4 {
    background-color: #e34a59;
    color: #000000 !important;
  }

  td.val-5 {
    background-color: #e73a3a;
    color: #ffffffff !important;
  }

  td.val-6 {
    background-color: #e01b24;
    color: #ffffffff !important;
  }

  td.val-7 {
    background-color: #dc071e;
    color: #ffffffff !important;
  }

  td.val-default {
    background-color: #dc071e;
    color: #ffffffff !important;
  }

  tr:nth-child(even) {
    background-color: var(--evenLineColor);
  }

  tr:nth-child(odd) {
    background-color: var(--oddLineColor);
  }

  tr:first-child {
    //border-bottom: 1px solid #d9dade;
  }

  tr:last-child {
    border-bottom: 1px solid #d9dade;
  }

  tr:nth-child(even):not(:first-child) td:not(:last-child) {
    border-right: 1px solid #ffffff;
  }

  tr:nth-child(odd):not(:first-child) td:not(:last-child) {
    border-right: 1px solid #d9dade;
  }

  tbody tr:first-child td:not(:last-child) {
    border-right: 1px solid #d9dade;
  }

  @media screen and (max-width: 600px) {
    .w-step {
      &__section-hint {
        padding: 10px;

        &__span {
          max-width: 50%;
        }
      }
    }
  }
}
</style>
