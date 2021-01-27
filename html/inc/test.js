
import { VueTypedJs } from 'vue-typed-js';
import { gsap, Draggable, TweenLite } from "gsap/all";
import LayerPopupMixin from '@/mixins/LayerPopupMixin';
// 6월수정 START : 튜토리얼 추가
import GSfreshIntergratedTutorials from '@/components/common/TutorialIntegratedUI';
// 6월수정 END : 튜토리얼 추가
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'; // 수정 2020.02.06 : 팝업시 딤드 스크립트 수정
export default {
  name: "IntergratedUI",
  props: ['popup', 'channelPosition', 'mallActive'],
  data() {
    return {
      popupActive: false,
      // 몰의 최대 메뉴 개수(12개로 fix : 변경 시 integratedUI css도 수정되어야 함)
      mallMaxNum: 12, // 9월 오픈 후 수정 : 몰 최대 메뉴 갯수 12개로 수정
      // 몰의 중심점 기준 각 메뉴의 rotate value(360도에 최대 10개 기준)
      mallRotateValue: 30, // 9월 오픈 후 수정 : 몰 최대 메뉴 갯수 12개로 수정으로 인한 각도 수정
      // 화면에서 보여지는 몰의 아이템 갯수
      mallRotateView: 3,
      // mall active index 값
      // mallActive: 5,
      // 브랜드의 최대 메뉴 개수(18개로 fix : 변경 시 integratedUI css도 수정되어야 함)
      brandMaxNum: 18,
      // 브랜드의 중심점 기준 각 메뉴의 rotate value(360도에 최대 18개 기준)
      brandRotateValue: 20,
      // 화면에서 보여지는 브랜드의 아이템 갯수
      brandRotateView: 5,
      tutorialShow: false,
    };
  },
  components: {
    VueTypedJs,
    // 6월수정 START : 튜토리얼 추가
    GSfreshIntergratedTutorials,
    // 6월수정 END : 튜토리얼 추가
  },
  mixins: [LayerPopupMixin],
  computed: {
    mallActiveClass(index) {
      return (index) => {
        return index === this.mallActive ? 'active' : '';
      };
    },
  },
  methods: {
    channelOnOff() {
      this.$emit('channelOff');
    },
    popupAction() {
      this.$emit('popupEvent', 'intergratedUI');
      this.modalActiveEvent('intergratedUI');
    },
    // 9월수정 START : 마켓포 소개 추가
    popupInnerAction() {
      this.$emit('popupInnerEvent');
    },
    // 9월수정 START : 마켓포 소개 추가
    popupOtherLeave(el) {
      if (this.popupActive) {
        Draggable.get(this.$refs.circleMall).kill();
        this.popupActive = false;
        el.style.opacity = '0';
        el.style.bottom = '-372px';
      }
    },
    popupOtherEnter(el) {
      el.style.opacity = '0';
      el.style.bottom = '-372px';
    },
    popupOtherAfterEnter(el) {
      el.style.opacity = '1';
      el.style.bottom = '0';
      this.popupActive = true;
      gsap.registerPlugin(Draggable);
      let mallRotateResult = (this.mallActive - this.mallRotateView + 1.6) * this.mallRotateValue; // 모션 완료의 rotate값 1.6은 Active 요소를 중간에 위치시키기 위한 앞 부분의 공간 확보(앞 1.6개 정도의 로고가 보여짐)
      // 9월 오픈 후 수정 : 수치 조절 0.5 -> 0.8
      const minRotation = this.mallRotateValue * (this.$refs.circleMall.childNodes.length - this.mallRotateView - 0.8); // - 0.5는 끝의 여유 공간 확보를 위한 수치
      let hiddenLogo = this.mallActive - this.mallRotateView; // Mall이 10개 미만인 경우 통합UI 등장 모션에서 가려져야 할 index number (5번째 Mall이 active 일때 hiddenLogo의 값은 2이며, index값이 0~2인 Mall Logo는 모션에서 보이지 않아야 함.)
      if (this.$refs.circleMall.childNodes.length < this.mallMaxNum) { // 현재 Mall이 한번에 표현 가능한 최대 개수인 10개 미만
        // 등장 모션 후의 최종 rotate값 설정 및 가려져야 할 hiddenLogo 설정
        if (mallRotateResult <= 0) {
          mallRotateResult = 0;
        } else if (minRotation <= mallRotateResult) {
          mallRotateResult = minRotation;
          if (this.mallActive !== this.$refs.circleMall.childNodes.length - 1) hiddenLogo = this.mallActive - this.mallRotateView + 1;
        } else {
          hiddenLogo = this.mallActive - this.mallRotateView + 1;
        };
      }
      const mallRotateDefault = -(mallRotateResult) + (90 + this.mallRotateValue); // 모션 적용을 위한 최초 rotate값
      const delay = 0.3; // 모션 delay 값 300ms
      const delayPlus = 0.1; // 모션 시차효과용 delay 100ms(delay에 + 하여 사용)
      const duration = 1; // 모션 시간
      const mallDuration = 0.3; // Brand와의 시차를 위한 Mall 모션 시간(duration에 - 하여 사용)
      // Mall rotate 모션
      TweenLite.fromTo(this.$refs.circleMall, { rotation: mallRotateDefault }, { ease: 'back.out(1.1)', rotation: -mallRotateResult, duration: duration - mallDuration, delay, onComplete: this.draggableMall() });
      // START - Mall rotate에 따른 Logo의 rotate값과 opacity 모션 적용
      const mallLength = this.$refs.circleMall.childNodes.length;
      const mallNodes = this.$refs.circleMall.childNodes;
      let mallNodesOpacity = Object.values(mallNodes);
      // 현재 Mall이 한번에 표현 가능한 최대 개수인 10개 이상일 경우 Mall의 opacity 모션 순차 적용을 위한 배열 편집
      if (mallLength >= this.mallMaxNum) {
        let mallNodesFront;
        let mallNodesBack;
        if (this.mallActive < this.mallRotateView - 1) { // 기본 Mall 배열중 앞부분이 active일 경우
          mallNodesFront = mallNodesOpacity.slice(0, mallLength - this.mallRotateView + this.mallActive + 1);
          mallNodesBack = mallNodesOpacity.slice(mallLength - this.mallRotateView + this.mallActive + 1);
          mallNodesOpacity = mallNodesBack.concat(mallNodesFront);
        } else { // 기본 Mall 배열중 뒷부분이 active일 경우
          mallNodesFront = mallNodesOpacity.slice(0, this.mallActive - 2);
          mallNodesBack = mallNodesOpacity.slice(this.mallActive - 2);
          mallNodesOpacity = mallNodesBack.concat(mallNodesFront);
        }
      }
      let delayStep = 0; // 모션 순차적용을 위한 변수
      // Mall Logo의 rotate 모션
      mallNodes.forEach((value, index) => {
        /* 6월수정 START : 튜토리얼 활성화 관련 콜백함수 추가 */
        TweenLite.fromTo(value.children[0], { rotation: -(mallRotateDefault) - this.mallRotateValue * index }, { ease: 'back.out(1.1)', rotation: -(this.mallRotateValue * index) + mallRotateResult, duration: duration - mallDuration, delay, onComplete: index === 8 ? this.tutorialShowAction(true) : null });
        /* 6월수정 END : 튜토리얼 활성화 관련 콜백함수 추가 */
      });
      // Mall Logo의 opacity 모션
      mallNodesOpacity.map((value, index) => {
        let delayTime = (delayPlus * index) + delay;
        if (mallLength < this.mallMaxNum) { // 현재 Mall이 한번에 표현 가능한 최대 개수인 10개 미만
          if (index < hiddenLogo) { // 나중에 등장해야 할 로고의 opacity delay 설정
            delayTime = (delayPlus * index) + (delay + duration);
          } else { // opacity 모션 적용을 위한 delay 설정
            delayTime = (delayPlus * delayStep) + delay;
            delayStep = delayStep + 1;
          }
        } else { // opacity 모션 적용을 위한 delay 설정
          delayTime = (delayPlus * delayStep) + delay;
          delayStep = delayStep + 1;
        }
        // opacity 모션 적용
        TweenLite.fromTo(value.children[0], { opacity: 0 }, { ease: 'back.out(1.1)', opacity: 1, duration: duration + mallDuration, delay: delayTime });
      });
      // END - Mall rotate에 따른 Logo의 rotate값과 opacity 모션 적용

      // Brand rotate 모션
      TweenLite.fromTo(this.$refs.circleBrand, { rotation: 90 + this.brandRotateValue }, { ease: 'back.out(1.1)', rotation: 0, duration, delay: delay + delayPlus, onComplete: this.draggableBrand() });
      // Brand Logo의 rotate, opacity 모션
      this.$refs.circleBrand.childNodes.forEach((value, index) => {
        TweenLite.fromTo(value.children[0], { rotation: -( 90 + this.brandRotateValue) }, { ease: 'back.out(1.1)', rotation: -(this.brandRotateValue * index), duration, delay: delay + delayPlus });
        TweenLite.fromTo(value.children[0], { opacity: 0 }, { ease: 'back.out(1.1)', opacity: 1, duration, delay: (delayPlus * index) + delay + delayPlus });
      });
    },
    // mall draggable init
    draggableMall() {
      Draggable.create(this.$refs.circleMall, {
        type: 'rotation',
        onDrag: (el) => {
          this.draggableRotate(this.$refs.circleMall, this.mallRotateValue, 0);
         if (this.$refs.circleMall.querySelector('.active')) this.$refs.circleMall.querySelector('.active').className = '';
        }
      });
      // Mall 한번에 표현 가능한 최대 개수인 10개 미만일때 최소, 최대 rotate값 설정.
      if (this.$refs.circleMall.childNodes.length < this.mallMaxNum) {
        // 9월 오픈 후 수정 : 수치 조절 0.5 -> 0.8
        const minRotation = -(this.mallRotateValue * (this.$refs.circleMall.childNodes.length - this.mallRotateView - 0.8)); // - 0.8는 끝의 여유 공간 확보를 위한 수치
        Draggable.get(this.$refs.circleMall).applyBounds({
          minRotation,
          maxRotation: 0
        });
      }
    },
    // brand draggable init
    draggableBrand() {
      Draggable.create(this.$refs.circleBrand, {
        type: 'rotation',
        onDrag: (el) => {
          this.draggableRotate(this.$refs.circleBrand, this.brandRotateValue, 0);
          if (this.$refs.circleBrand.querySelector('.active')) this.$refs.circleBrand.querySelector('.active').className = '';
        }
      });
      // Brand 한번에 표현 가능한 최대 개수인 18개 미만일때 최소, 최대 rotate값 설정.
      if (this.$refs.circleBrand.childNodes.length < this.brandMaxNum) {
        const minRotation = -(this.brandRotateValue * (this.$refs.circleBrand.childNodes.length - this.brandRotateView - 0.5)); // - 0.5는 끝의 여유 공간 확보를 위한 수치
        Draggable.get(this.$refs.circleBrand).applyBounds({
          minRotation,
          maxRotation: 0
        });
      }
    },
    // drag로 rotate된 자식들의 로고를 올바른 방향으로 회전
    draggableRotate(target, rotateValue) {
      const roatateTarget = target.childNodes;
      const rotation = Draggable.get(target).rotation;
      roatateTarget.forEach((value, index) => {
        const rotateResult = (-rotateValue * index) - rotation;
        value.children[0].style.transform = `rotate(${rotateResult}deg)`;
      });
    },
     /* 6월수정 START : 튜토리얼 활성화 관련 메서드 추가 */
    tutorialEnter(el) {
      el.style.opacity = '0';
    },
    tutorialAfterEnter(el) {
      el.style.opacity = '1';
    },
    tutorialLeave(el) {
      el.style.opacity = '0';
    },
    tutorialShowAction(value) {
      this.tutorialShow = value;
    },
    /* 6월수정 END : 튜토리얼 활성화 관련 메서드 추가 */
  },
  updated() {
    if (!this.popupActive) this.modalActiveEvent('intergratedUI');
    if (this.popupActive) disableBodyScroll(this);
    else clearAllBodyScrollLocks(this);
  },
  mounted() {
  }
};
