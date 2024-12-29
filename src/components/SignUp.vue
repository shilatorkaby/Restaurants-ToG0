<template>
  <div class="register">
    <!-- Logo -->
    <img class="logo" src="../assets/app-logo.png" alt="App Logo" />
    <h1 class="title">Create New Account.</h1>

    <!-- Notification -->
    <div v-if="successMessage" class="notification success">
      {{ successMessage }}
    </div>

    <!-- Registration Form -->
    <form @submit.prevent="signUp">
      <input
        type="text"
        v-model="name"
        placeholder="Enter your full name"
        class="fade-placeholder"
      />
      <input
        type="text"
        v-model="number"
        placeholder="Enter your phone number"
        class="fade-placeholder"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Enter your password"
        class="fade-placeholder"
      />

      <!-- Sign Up Button -->
      <button type="submit" class="register-btn">Sign Up</button>
    </form>

    <!-- Divider -->
    <div class="divider">or</div>

    <!-- Login Button for Unregistered Users -->
    <button class="login-btn" @click="redirectToLogin">Log In</button>

    <!-- Text for Registered Users -->
    <p class="registered-text">
      Already registered?
      <span @click="redirectToLogin" class="login-link">Please Log In</span>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      number: "",
      password: "",
      successMessage: "", // Store success messages
    };
  },
  methods: {
    async signUp() {
      if (!this.validateForm()) return;

      try {
        const alreadyLoggedIn = await this.isLoggedIn();

        if (alreadyLoggedIn) {
          alert("You already signed up! Please log in.");
          return;
        }

        const response = await axios.post("http://localhost:3000/users", {
          name: this.name,
          number: this.number,
          password: this.password,
        });

        if (response.status === 201) {
          this.successMessage = "🎉 Sign Up Successful! Redirecting...";
          localStorage.setItem("user-info", JSON.stringify(response.data));
          localStorage.setItem("userId", response.data.id);

          // Redirect after a short delay
          setTimeout(() => {
            this.$router.push({ name: "HomePage" });
          }, 2000);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again later.");
      }
    },
    redirectToLogin() {
      this.$router.push({ name: "LogIn" });
    },
    async isLoggedIn() {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?name=${this.name}&password=${this.password}`
        );
        return response.status === 200 && response.data.length > 0;
      } catch (error) {
        console.error("Error checking login:", error);
        return false;
      }
    },
    validateForm() {
      if (!this.name.trim()) {
        alert("Name is required.");
        return false;
      }

      if (!this.number.trim() || !/^\d+$/.test(this.number)) {
        alert("Phone number must contain only digits.");
        return false;
      }

      if (this.number.length < 10 || this.number.length > 15) {
        alert("Phone number must be between 10 and 15 digits.");
        return false;
      }

      if (!this.password.trim() || this.password.length < 6) {
        alert("Password must be at least 6 characters long.");
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
.register {
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
    font-size: 30px;
    font-weight: bold;
    color: #b95555;
    margin-bottom: 1.5rem;
}

/* Divider */
.divider {
  text-align: center;
  margin: 1rem 0;
  color: #aaa;
  position: relative;
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: "";
  display: inline-block;
  width: 40%;
  height: 1px;
  background: #ddd;
  vertical-align: middle;
}

.divider::before {
  margin-right: 0.5rem;
}

.divider::after {
  margin-left: 0.5rem;
}

/* Text for Registered Users */
.registered-text {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.login-link {

  color: salmon;
  cursor: pointer;
  text-decoration: none;
}

/* Notification Styles */
.notification {
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  text-align: center;
  font-size: 1rem;
}

.notification.success {
  background-color: #e0f7e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
}
</style>
