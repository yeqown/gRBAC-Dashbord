<!-- manage permissions -->
<template>
  <div>
    <a @click="hdlNewPerm">
      <Card class="perm-card-wrap perm-card-new">
        <Icon type="ios-plus-outline" :size="60" color="#00bcd4"/>
      </Card>
    </a>

    <Card v-for="perm in perms" class="perm-card-wrap" :key="perm.id">
      <div slot="title" class="card-title">
        <h3>{{perm.name}}</h3>
      </div>
      <Icon type="edit" color="#fff" slot="extra" @click="hdlEditPerm(perm)"/>
      <h3>权限描述：{{perm.descrip}}</h3>
    </Card>

    <Modal
      v-model="newPermMoalVisible"
      :title="modalTitle"
      @on-ok="newOrEditPerm"
    >
      <Form :model="permForm" :label-width="60">
        <FormItem label="唯一标识" prop="id" v-if="permForm.id">
          <span>{{permForm.id}}</span>
        </FormItem>
        <FormItem label="名字" prop="name">
          <Input v-model="permForm.name"/>
        </FormItem>
        <FormItem label="描述" prop="descrip">
          <Input v-model="permForm.descrip"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script type="text/javascript">
import {mapGetters, mapActions} from 'vuex'
import '@/styles/global.css'

const ModeNew = 1
const ModeEdit = 2

export default {
  name: 'Perm',
  data () {
    return {
      newPermMoalVisible: false,
      mode: ModeNew,
      modalTitle: '',
      permForm: {
        id: null,
        name: '',
        descrip: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      perms: 'originPerms'
    })
  },

  methods: {
    ...mapActions({
      allPerms: 'allPerms',
      createPerm: 'createPerm',
      updatePerm: 'updatePerm'
    }),

    hdlNewPerm () {
      this.newPermMoalVisible = true
      this.modalTitle = '新建权限'
      this.mode = ModeNew
      this.permForm = {
        id: null,
        name: '',
        descrip: ''
      }
    },

    newOrEditPerm () {
      // console.log('newOrEditPerm')
      let {name, descrip: desc, id} = this.permForm

      switch (this.mode) {
        default:
        case ModeNew:
          this.createPerm({name, desc})
          break
        case ModeEdit:
          this.updatePerm({name, desc, id})
          break
      }

      this.allPerms({limit: 10, skip: 0})
    },

    hdlEditPerm (perm) {
      this.newPermMoalVisible = true
      this.modalTitle = '编辑权限'
      this.mode = ModeEdit
      this.permForm = {
        id: perm.id,
        name: perm.name,
        descrip: perm.descrip
      }
    }
  },

  mounted () {
    this.allPerms({limit: 10, skip: 0})
    // console.log(this.perms)
  }
}
</script>

<style type="text/css">
  .ivu-card-head {
    background-color: #00bcd4;
    color: #fff;
  }
</style>

<style type="text/css" scoped>
  .perm-card-wrap {
    margin: 10px;
    min-height: 150px;
    width: 320px;
    float: left;
  }
  .perm-card-new {
    padding: 20px;
  }
</style>
