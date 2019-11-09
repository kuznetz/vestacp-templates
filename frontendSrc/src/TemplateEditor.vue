<template>
  <div class="editor">
    <input v-model="newFilename" class="form-control form-control-lg" type="text" placeholder="Template name" style="margin-bottom:5px">
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a :class="{active:curView=='http'}" @click.prevent="curView='http'" class="nav-link" href="#">http</a>
        </li>
        <li class="nav-item">
          <a :class="{active:curView=='https'}" @click.prevent="curView='https'" class="nav-link" href="#">https</a>
        </li>
      </ul>
    </div>
    <textarea v-if="curView=='http'" v-model="template.http" class="form-control"></textarea>
    <textarea v-if="curView=='https'" v-model="template.https" class="form-control"></textarea>
    <div style="text-align: center; margin-top:5px">
      <button @click="del" class="btn btn-danger btn-small">Delete</button>
      <button @click="save" class="btn btn-primary btn-small" style="margin-left: 5px">Save</button>
      <button @click="clone" class="btn btn-primary btn-small" style="margin-left: 5px">Clone</button>
    </div>
  </div>
</template>
<script>
import api from './api'

export default {
  name: 'TemplateEditor',
  components: {
  },
  props: {
    template:Object
  },
  data() {
    return {
      curView:'http',
      newFilename:''
    } 
  },
  computed: {
  },
  watch:{
    template(){
      this.refresh()
    }
  },
  mounted(){
    this.refresh()
  },  
  methods: {
    refresh() {
      this.newFilename = this.template.filename
    },
    async del() {
      if (!confirm('Delete '+this.template.filename+'?')) {
        return
      }
      await api.serverHttp('/api/delete',{
        token: api.token,
        filename: this.template.filename
      })
      this.$emit('reload','')
    },    
    async clone() {
      await api.serverHttp('/api/save',{
        token: api.token,
        oldFilename: '',
        newFilename: this.newFilename,
        http: this.template.http,
        https: this.template.https,
      })
      this.$emit('reload',this.newFilename)
    },
    async save() {
      await api.serverHttp('/api/save',{
        token: api.token,
        oldFilename: this.template.filename,
        newFilename: this.newFilename,
        http: this.template.http,
        https: this.template.https,
      })
      this.$emit('reload',this.newFilename)
    }
  }
}
</script>
<style>
.editor {
  padding: 5px;
  display: flex;
  flex-direction: column;
  space-between: 5px;
  height: 100vh;
  align-items: stretch;
}

.editor textarea {
  flex-grow: 1;
}
</style>