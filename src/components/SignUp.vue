<template>
  <div class="register">
    <!-- Logo -->
    <img class="logo" src="../assets/app-logo.jpg" />
    <h1 class="title">Create an Account</h1>

    <!-- Registration Form -->
    <input type="text" v-model="name" placeholder="Enter your full name" class="fade-placeholder" />
    <input type="text" v-model="number" placeholder="Enter your phone number" class="fade-placeholder" />
    <input type="password" v-model="password" placeholder="Enter your password" class="fade-placeholder" />

    <!-- Sign Up Button -->
    <button class="register-btn" @click="signUp">Sign Up</button>

    <!-- Divider -->
    <div class="divider">or</div>

    <!-- Login Button for Unregistered Users -->
    <button class="login-btn" @click="redirectToLogin">Log In</button>

    <!-- Text for Registered Users -->
    <p class="registered-text">
      Already registered? <span @click="redirectToLogin" class="login-link">Please Log In</span>
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
    };
  },
  methods: {
    async signUp() {
      if (this.name && this.number && this.password) {
        try {
          // Call isLogedIn() to check if the user already exists

          const alreadyLoggedIn = await this.isLogedIn();

          if (!alreadyLoggedIn) {
            const response = await axios.post("http://localhost:3000/users", {
              name: this.name,
              number: this.number,
              password: this.password,
            });
            if (response.status === 201) {
              alert("Sign Up Success");
              localStorage.setItem("user-info", JSON.stringify(response.data));
              localStorage.setItem('userId', response.data.id);
              this.$router.push({ name: "HomePage" });
            }
          } else {
            alert("You already signed up! please log in");

          }
        } catch (error) {
          console.error("Error during signup:", error);
          alert("An error occurred. Please try again later.");
        }
      } else {
        alert("Please fill out all fields!");
      }
    },
    redirectToLogin() {
      this.$router.push({ name: "LogIn" });
    }, async isLogedIn() {
      try {
        const response = await axios.get(
          `http://localhost:3000/users?name=${this.name}&password=${this.password}`
        );
        return response.status === 200 && response.data.length > 0; // Ensure user exists
      } catch (error) {
        console.error("Error checking login:", error);
        return false;
      }
    },
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "HomePage" });
    }
  }
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
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
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
  text-decoration: underline;
}
</style>