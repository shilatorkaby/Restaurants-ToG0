<template>
<router-view/>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.register button, .login-form button, .add button  {
  width: 100%;
  padding: 0.8rem;
  background: salmon;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-btn:hover, .login-btn:hover, .add button:hover {
  background: rgb(121, 61, 54);
  color: rgb(243, 199, 194);

}

.login-form, .register, .add {
  width: 100%;
  max-width: 400px; /* Limits to 400px */
  margin: 0 auto; /* Centers the container */
  padding: 0 1rem; /* Adds padding for smaller screens */
}


.input-field:focus, .login-btn:focus, .add button:focus {
  border-color: salmon;
  outline: none;
}

.login-form input, .register input, .add input {
  width: 100% !important;
  max-width: 100% !important;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.fade-placeholder::placeholder {
  color: #aaa;
  transition: color 0.3s ease;
}

.fade-placeholder:focus::placeholder {
  color: transparent;
}


</style>
