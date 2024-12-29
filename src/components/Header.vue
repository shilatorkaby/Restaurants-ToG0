<template>
    <header class="header">
        <nav class="nav-container">
            <div class="nav-left">
                <router-link to="/" class="nav-link home-link">
                    <img class="logo-icon" src="../assets/home-icon.png" alt="App Icon" />
                    <span class="logo-text">Restaurant Manager</span>
                </router-link>
            </div>
            
            <div class="nav-right">
                <router-link to="/add" class="nav-link">Add Restaurant</router-link>
                <button @click="directLogout" class="nav-link logout-btn">
                    <span class="logout-icon">↪</span> Log out
                </button>
            </div>
        </nav>
    </header>
</template>


<script>
export default {
    name: "Header",
    methods: {
        directLogout() {
            localStorage.removeItem('userId');
        localStorage.removeItem('user-info');
        this.$router.push({ name: 'LogIn' });
        },
    }
};
</script>

<style scoped>
.header {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-container {
    max-width: 90%;
    margin: 0 auto;
    padding: 0 20px;
    height: 64px; /* Ensure enough height for the header */
    display: flex;
    justify-content: space-between;
    align-items: center; /* Align items vertically within the header */
}

.nav-left {
    display: flex;
    align-items: center; /* Vertically align items */
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.nav-link {
    color: #384f4b;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s ease;
    font-size: 15px;
    display: flex; /* Flex container for alignment */
    align-items: center; /* Vertically align content */
}

.home-link {
    font-size: 18px;
    font-weight: 600;
    padding-left: 0;
}

.logo-icon {
    width: 24px; /* Adjust width for a suitable size */
    height: 24px; /* Adjust height for a suitable size */
    margin-right: 8px; /* Add spacing between the icon and the text */
    object-fit: contain; /* Ensure the image maintains aspect ratio */
}

.logo-text {
    font-size: 18px;
}

.nav-link:hover {
    background-color: #f5f5f5;
    color: #05251f;
}

.logout-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 6px;
}

.logout-icon {
    font-size: 16px;
}

/* Active link styling */
.router-link-active {
    color: #05251f;
    background-color: #f5f5f5;
}

/* Responsive design */
@media (max-width: 768px) {
    .nav-container {
        padding: 0 16px;
        height: 56px;
    }

    .nav-right {
        gap: 12px;
    }

    .nav-link {
        padding: 6px 12px;
        font-size: 14px;
    }

    .home-link {
        font-size: 16px;
    }

    .logo-icon {
        width: 20px; /* Adjust size for smaller screens */
        height: 20px;
        margin-right: 20px;
    }

    .logo-text {
        font-size: 16px;
    }
}
</style>
