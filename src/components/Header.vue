<template>
    <header class="header">
        <nav class="nav-container">
            <div class="nav-left">
                <router-link to="/" class="nav-link home-link">
                    <span class="logo">🍽️</span> Restaurant Manager
                </router-link>
            </div>
            
            <div class="nav-right">
                <!-- <router-link to="/" class="nav-link">Home</router-link> -->
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
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-left {
    display: flex;
    align-items: center;
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
}

.home-link {
    font-size: 18px;
    font-weight: 600;
    padding-left: 0;
}

.logo {
    font-size: 24px;
    margin-right: 8px;
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

    .logo {
        font-size: 20px;
    }
}
</style>