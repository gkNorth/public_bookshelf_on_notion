<template>
  <div class="container mt-3 mb-5">
    
    <div class="mb-4 w-75 m-auto"
         v-for="item in $store.getters.getPageDetail($route.params.pageId)"
         :key="item.id">
      <div class="position-relative text-center mb-3">
        <span v-if="item.imgUrl">
          <img style="height:300px; width:274px; object-fit:contain;"
                :src="item.imgUrl"
                alt="">
        </span>
        <span v-else>
          <img style="height:300px; width:274px; object-fit:contain;"
                src="../../assets/image/noimage.png"
                alt="">
        </span>
        <span class="border text-secondary position-absolute px-1 top-0 end-0 small d-inline-block"
              v-if="item.tags">
          {{item.tags}}
        </span>
      </div>
      <h1 class="h4 fw-bold d-inline-block mb-3">
        {{item.title}}
      </h1>
      <div class="mb-3"><a class="d-block text-truncate" :href="stateUrl">{{stateUrl}}</a></div>
      <div class="col" v-if="item.purpose">
        <h2 class="h4 fw-bold mb-1">
          Purpose
        </h2>
        <p class="mb-3" v-html="item.purpose.replace(/\n/g,'<br/>')"></p>
      </div>
      <div class="col" v-if="item.essence">
        <h2 class="h4 fw-bold mb-1">
          Essence
        </h2>
        <p class="mb-3" v-html="item.essence.replace(/\n/g,'<br/>')"></p>
      </div>
      <div class="col" v-if="item.actionPlan">
        <h2 class="h4 fw-bold mb-1">
          Action Plan
        </h2>
        <p class="mb-3" v-html="item.actionPlan.replace(/\n/g,'<br/>')"></p>
      </div>
      <div class="d-flex justify-content-between">
        <p class="small text-muted">{{shapeTime(item.createdAt)}}</p>
        <p class="small text-secondary" v-if="item.status">
          {{item.status}}
        </p>
      </div>
    </div>
    
    <!-- ボタン -->
    <button type="button" class="btn btn-outline-secondary me-3">
      <nuxt-link to="/">ホームへ</nuxt-link>
    </button>
    
    <button @click="switchEditModeAction" class="btn btn-outline-info">Edit Mode</button>
    
    <!-- 編集ブロック -->
    <div v-show="$store.state.isEdit" class="mt-5">
      <form class="input-group form-inline mb-3 d-block">
        <label class="h6 d-block" for="bookTitle">Title</label>
        <input id="bookTitle" type="text" :value="stateTitle" ref="inputTitle" class="form-control w-100">
        
        <label class="h6 d-block" for="bookUrl">URL</label>
        <input id="bookUrl" type="text" :value="stateUrl" ref="inputUrl" class="form-control w-100">
        
        <label class="h6 d-block" for="bookPurpose">Purpose</label>
        <textarea id="bookPurpose" type="text" :value="statePurpose" ref="inputPurpose" class="form-control w-100"></textarea>
        
        <label class="h6 d-block" for="bookEssence">Essence</label>
        <textarea id="bookEssence" type="text" :value="stateEssence" ref="inputEssence" class="form-control w-100"></textarea>
        
        <label class="h6 d-block" for="bookActionPlan">ActionPlan</label>
        <textarea id="bookActionPlan" type="text" :value="stateActionPlan" ref="inputActionPlan" class="form-control w-100"></textarea>
        
        <button @click="tmpParams" class="btn btn-primary mt-3">変更</button>
      </form>
    </div>
    
  </div>
</template>

<script>
import Mixin from '../../plugins/mixin'
import { mapActions } from 'vuex'
export default {
  mixins: [ Mixin ],
  data() {
    return {
      bookUrl: '',
      bookTitle: '',
      bookPurpose: '',
      bookEssence: '',
      bookActionPlan: '',
    }
  },
  mounted () {
    if (!this.$store.state.items.length) {
      this.getListFromApi()
    }
  },
  computed: {
    stateUrl: {
      get() {
        return this.$store.getters.getPageDetail(this.$route.params.pageId)[0]?.url
      },
      set(bookUrl, id) {
        this.updatePageParams({bookUrl,id})
      }
    },
    stateTitle: {
      get() {
        return this.$store.getters.getPageDetail(this.$route.params.pageId)[0]?.title
      },
      set(bookTitle, id) {
        this.updatePageParams({bookTitle,id})
      }
    },
    statePurpose: {
      get() {
        return this.$store.getters.getPageDetail(this.$route.params.pageId)[0]?.purpose
      },
      set(bookPurpose, id) {
        this.updatePageParams({bookPurpose,id})
      }
    },
    stateEssence: {
      get() {
        return this.$store.getters.getPageDetail(this.$route.params.pageId)[0]?.essence
      },
      set(bookEssence, id) {
        this.updatePageParams({bookEssence,id})
      }
    },
    stateActionPlan: {
      get() {
        return this.$store.getters.getPageDetail(this.$route.params.pageId)[0]?.actionPlan
      },
      set(bookActionPlan, id) {
        this.updatePageParams({bookActionPlan,id})
      }
    },
    isEditVal() {
      return this.isEdit
    }
  },
  methods: {
    ...mapActions({
      getListFromApi: 'getListFromApi',
      updatePageParams: 'updatePageParams',
      switchEditModeAction: 'switchEditModeAction',
    }),
    tmpParams() {
      this.bookUrl = this.$refs.inputUrl.value;
      this.bookTitle = this.$refs.inputTitle.value;
      this.bookPurpose = this.$refs.inputPurpose.value;
      this.bookEssence = this.$refs.inputEssence.value;
      this.bookActionPlan = this.$refs.inputActionPlan.value;
      this.updatePageParams({
        bookUrl:this.bookUrl,
        bookTitle:this.bookTitle,
        bookPurpose:this.bookPurpose,
        bookEssence:this.bookEssence,
        bookActionPlan:this.bookActionPlan,
        id:this.$route.params.pageId
      })
    },
  }
}
</script>