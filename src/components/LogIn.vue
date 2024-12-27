<template>
  <div class="login-container">
    <!-- Logo -->
    <img class="logo" src="../assets/app-logo.jpg" />
    <h1 class="title">Log In</h1>

    <!-- Login Form -->
    <div class="login-form">
      <input type="text" v-model="name" placeholder="Enter Name" class="fade-placeholder" />
      <input type="password" v-model="password" placeholder="Enter Password" class="fade-placeholder" />

      <button class="login-btn" @click="LogIn">Log In</button>

      <!-- Option to go to the Sign-Up page -->
      <p class="signup-prompt">
        Not registered yet?
        <span @click="redirectToSignUp" class="signup-link">Create an Account</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    async LogIn() {

      if (this.name && this.password) {

        try {
          // Check credentials against the server
          console.log(this.name, this.password);

          let response = await axios.get(`http://localhost:3000/users?name=${this.name}&password=${this.password}`
          )

          console.log("i've got response ", response.status);

          // If login is successful, store user info and redirect
          if (response.status == 200 && response.data.length > 0) {
            localStorage.setItem('user-info', JSON.stringify(response.data));
            localStorage.setItem('userId', response.data[0].id);

            alert("Login Successful!");

            this.$router.push({
              name: "HomePage",
              params: { userId: response.data.id }
            });
          } else {
            alert("Invalid credentials. Please try again.");
          }
        } catch (error) {
          console.error("Login error:", error);
          alert("An error occurred while logging in. Please try again later.");
        }
      } else {
        alert("Please fill out all fields!");
      }
    },
    redirectToSignUp() {
      this.$router.push({ name: "SignUp" });
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");

    if (user) {
      this.$router.push({ name: "HomePage" });
    }
  }


};
</script>

<style scoped>
/* Centered Container */
.login-container {
  width: 400px;
  padding: 0 20px 0px 10px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  box-sizing: content-box;
}



/* Logo Styling */
.logo {
  width: 150px;
  margin-bottom: 20px;
}

/* Title Styling */
.title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
}




/* Sign-Up Prompt */
.signup-prompt {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
}

.signup-link {
  color: salmon;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
  margin-left: 0.3rem;
}

.signup-link:hover {
  color: #f55d53;
}
</style>
