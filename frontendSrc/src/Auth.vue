<template>
    <div id="logreg-forms">
      <form @submit.prevent="$emit('auth',{login,password})" class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> VestaCP Template Editor</h1>

        <input v-model="login" type="text" class="form-control" placeholder="Login" required="" autofocus="">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required="">
        
        <button class="btn btn-success btn-block" type="submit">Sign in</button>
      </form>
    </div>
</template>
<script>
export default {
  name: 'Auth',
  data() {
    return {
      login: '',
      password: '',
    } 
  }
}

</script>
<style>
/* sign in FORM */
#logreg-forms{
    width:412px;
    margin:10vh auto;
    background-color:#f3f3f3;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
#logreg-forms form {
    width: 100%;
    max-width: 410px;
    padding: 15px;
    margin: auto;
}
#logreg-forms .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
#logreg-forms .form-control:focus { z-index: 2; }
#logreg-forms .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
#logreg-forms .form-signin input[type="password"] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

#logreg-forms button[type="submit"]{ margin-top:10px; }

/* Mobile */
@media screen and (max-width:500px){
    #logreg-forms{
        width:300px;
    }
}
</style>