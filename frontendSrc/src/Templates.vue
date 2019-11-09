<template>
  <div class="wrapper">
      <nav id="sidebar" class="card">

        <div class="sidebar-header">
            <span class="h3">
            <a @click.prevent="$emit('logout')" href="#">[X]</a>
            VestaCpTpl
            </span>            
        </div>
        
        <div class="list-group">
          <a v-for="tpl in templates" :key="tpl.filename" @click.prevent="curTemplateId = tpl.filename" :class="{active:curTemplateId==tpl.filename,'font-weight-bold':tpl.filename==''}" href="#" class="list-group-item list-group-item-action">
            {{tpl.filename?tpl.filename:'New Template'}}
          </a>
        </div>

      </nav>
      <div id="content">
        
        <template-editor v-if="curTemplate" @reload="reload" :template="curTemplate" />
        
      </div>
  </div>
</template>
<script>
import api from './api'
import TemplateEditor from './TemplateEditor'

export default {
  name: 'Templates',
  components: {
    TemplateEditor
  },
  data() {
    return {
      curTemplateId: '',
      templates: []
    } 
  },
  mounted() {
    this.load()    
  },
  computed: {
    curTemplate() {
      return this.templates.find(tpl=>(tpl.filename == this.curTemplateId))
    }
  },
  methods: {
    reload(newTemplate) {
      this.curTemplateId = newTemplate
      this.load()
    },
    async load() {
      let result = await api.serverHttp('/api/list',{
        token: api.token
      })
      result.templates.unshift({filename:'',http:'',https:''})
      this.templates = result.templates
    },
  }
}
</script>
<style>
.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
    max-height: 100vh;
    overflow: hidden;
}

.wrapper {
    display: flex;
    align-items: stretch;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    padding: 5px;
    overflow: auto;
}
#sidebar.active {
    margin-left: -250px;
}
.sidebar-header {
  margin: 6px 0 10px
}

#content {
  flex-grow: 1;
  height: 100vh;
}

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