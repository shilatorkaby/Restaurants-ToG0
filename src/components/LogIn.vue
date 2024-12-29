<template>
  <div class="login">
    <!-- Logo -->
    <img class="logo" src="../assets/app-logo.png" alt="App Logo" />
    <h1 class="title">Login Now</h1>
    <div class="divider">Please enter the details below to continue.</div>

    <!-- Notification -->
    <div v-if="errorMessage" class="notification error">
      {{ errorMessage }}
    </div>

    <!-- Login Form -->
    <form @submit.prevent="LogIn">
      <input type="text" v-model="name" placeholder="Enter your full name" class="fade-placeholder" />
      <input type="password" v-model="password" placeholder="Enter your password" class="fade-placeholder" />

      <!-- Log In Button -->
      <button type="submit" class="login-btn">Log In</button>
    </form>

    <!-- Divider
    <div class="divider">or</div> -->

    <!-- Sign-Up Button
    <button class="register-btn" @click="redirectToSignUp">Sign Up</button>
 -->
    <!-- Text for Unregistered Users -->
    <p class="registered-text">
      Not registered yet?
      <span @click="redirectToSignUp" class="signup-link">Sign Up</span>
    </p>
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
      errorMessage: "", // Store error messages
    };
  },
  methods: {
    async LogIn() {
      if (!this.validateForm()) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/users?name=${this.name}&password=${this.password}`
        );

        if (response.status === 200 && response.data.length > 0) {
          // Successful login
          localStorage.setItem("user-info", JSON.stringify(response.data));
          localStorage.setItem("userId", response.data[0].id);

          this.errorMessage = "🎉 Login Successful! Redirecting...";
          setTimeout(() => {
            this.$router.push({
              name: "HomePage",
              params: { userId: response.data[0].id },
            });
          }, 2000);
        } else {
          this.errorMessage = "Invalid credentials. Please try again.";
        }
      } catch (error) {
        console.error("Login error:", error);
        this.errorMessage = "An error occurred. Please try again later.";
      }
    },
    redirectToSignUp() {
      this.$router.push({ name: "SignUp" });
    },
    validateForm() {
      if (!this.name.trim()) {
        this.errorMessage = "Name is required.";
        return false;
      }

      if (!this.password.trim()) {
        this.errorMessage = "Password is required.";
        return false;
      }

      return true;
    },
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "HomePage" });
    }
  },
};
</script>

<style scoped>
/* Centered Container */
.login {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}

/* Logo Styling */
.logo {
  width: 300px;
  margin-bottom: -23px;
}

/* Title Styling */
.title {
  margin-top: 40px;
    font-size: 2rem;
    font-weight: bold;
    color: #b95555;
    margin-bottom: 1.5rem;
}

/* Divider */
.divider {
  text-align: center;
  margin: 1rem 0;
  margin-top: -12px;
  margin-bottom: 40px;
  color: #aaa;
  position: relative;
  font-size: 0.9rem;
}

/* Notification Styles */
.notification {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  text-align: center;
  font-size: 1rem;
}

.notification.error {
  background-color: #fbe9e9;
  color: #d32f2f;
  border: 1px solid #d32f2f;
}

/* Text for Registered Users */
.registered-text {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.signup-link {
  color: salmon;
  cursor: pointer;
  text-decoration: none;
}

/* Buttons */
.login-btn,
.register-btn {
  width: 100%;
  padding: 0.8rem;
  margin-top: 20px;
  background: salmon;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover,
.register-btn:hover {
  background: rgb(121, 61, 54);
  color: rgb(243, 199, 194);
}

/* Inputs */
input {
  width: 100%;
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

input:focus {
  border-color: salmon;
  outline: none;
}
</style>
