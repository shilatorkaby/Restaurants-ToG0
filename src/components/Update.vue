<template>
    <Header />
    <div class="page-container">
        <div class="update-section">
            <button class="back-button" @click="goBack">
                <span class="back-icon">←</span>
            </button>
            <h1 class="update-title">Update Restaurant Details</h1>
            <form class="update-form" @submit.prevent="updateRestaurant">
                <div class="form-group">
                    <label for="name">Restaurant Name</label>
                    <input id="name" type="text" name="name" placeholder="Enter restaurant name"
                        v-model="restaurant.name" required />
                </div>
                <div class="form-group">
                    <label for="address">Restaurant Address</label>
                    <input id="address" type="text" name="address" placeholder="Enter restaurant address"
                        v-model="restaurant.address" required />
                </div>
                <button type="submit" class="update-button">
                    Update Restaurant
                </button>
            </form>
        </div>
    </div>
</template>


<script>
import Header from './Header.vue';
import axios from 'axios';

export default {
    name: 'Update',
    components: {
        Header
    },
    data() {
        return {
            userId:'',
            restaurant: {
                name: '',
                address: '',
            },
            isLoading: false,
            error: null
        }
    },
    methods: {
        async updateRestaurant() {
            try {
                this.isLoading = true;
                this.error = null;

                const response = await axios.put(
                    `http://localhost:3000/restaurants/${this.$route.params.id}`,
                    this.restaurant
                );

                if (response.status === 200) {
                    localStorage.setItem("user-info", JSON.stringify(response.data));
                    this.$router.push({
                        name: "HomePage",
                        query: { update: 'success' }
                    });
                }
            } catch (error) {
                this.error = error.response?.data?.message ||
                    'Error updating restaurant. Please try again.';
                console.error('Update error:', error);
            } finally {
                this.isLoading = false;
            }
        },

        goBack() {
            this.$router.push({ name: 'HomePage' });
        }
    },

    async mounted() {
        try {
            const storedUserId = localStorage.getItem('userId');
            if (!storedUserId) {
                this.$router.push({ name: 'SignUp' });
                return;
            }

            const response = await axios.get(
                `http://localhost:3000/restaurants/${this.$route.params.id}`
            );
            this.userId = storedUserId;
            this.restaurant = response.data;

        } catch (error) {
            this.error = 'Error loading restaurant details.';
            console.error('Loading error:', error);
        }
    }
}
</script>

<style>
.page-container {
    margin-top: 64px;
    min-height: calc(100vh - 64px);
    background-color: #f8f9fa;
    padding: 2rem 1rem;
}

.update-section {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.update-title {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 600;
}

.back-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background-color: #f8f9fa;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.back-button:hover {
    background-color: #e9ecef;
    transform: translateX(-2px);
}

.back-icon {
    font-size: 1.2rem;
    color: #495057;
}

.update-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #495057;
}

.form-group input {
    padding: 0.75rem 1rem;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #4dabf7;
    box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.1);
}

.form-group input::placeholder {
    color: #adb5bd;
}

.update-button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #228be6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.update-button:hover {
    background-color: #1c7ed6;
}

.update-button:active {
    transform: translateY(1px);
}

@media (max-width: 768px) {
    .update-section {
        max-width: 100%;
        margin: 0 1rem;
        padding: 1.5rem;
    }

    .update-title {
        font-size: 1.25rem;
    }
}
</style>