<template>
    <Header />
    <div class="page-container">
        <div class="add-section">

            <button class="back-button" @click="goBack">
                <span class="back-icon">←</span>
            </button>

            <h1 class="add-title">Add New Restaurant</h1>

            <form class="add-form" @submit.prevent="addRestaurant">

                <div class="form-group">
                    <label for="name">Restaurant Name</label>
                    <input id="name" type="text" name="name" placeholder="Enter restaurant name"
                        v-model="restaurant.name" required class="fade-placeholder" />
                </div>

                <div class="form-group">
                    <label for="address">Restaurant Address</label>
                    <input id="address" type="text" name="address" placeholder="Enter restaurant address"
                        v-model="restaurant.address" required class="fade-placeholder" />
                </div>

                <div class="form-group">
    <label for="type">Restaurant Type</label>
    <div class="type-selection">
        <label class="type-option" v-for="option in types" :key="option">
            <input
                type="radio"
                name="type"
                :value="option.toLowerCase()"
                v-model="restaurant.type"
            />
            <span class="type-label">{{ option }}</span>
        </label>
    </div>
</div>
                <button type="submit" class="add-button" :disabled="isLoading">
                    {{ isLoading ? 'Adding...' : 'Add Restaurant' }}
                </button>


            </form>
            <p v-if="error" class="error-message">{{ error }}</p>

        </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';

export default {
    name: 'Add',
    components: {
        Header
    },
    data() {
        return {
            restaurant: {
                name: '',
                address: '',
                type: '',
            },
            types: ['Dairy', 'Meat', 'Parve'],
            isLoading: false,
            error: '',
        };
    },
    methods: {
        async addRestaurant() {
            try {
                this.isLoading = true;
                this.error = null;
                this.restaurant.type = this.restaurant.type.toLocaleLowerCase();

                // Adding restaurant to the "restaurants" table
                const restaurantResponse = await axios.post(
                    "http://localhost:3000/restaurants",
                    this.restaurant
                );

                if (restaurantResponse.status === 201) {
                    const newRestaurant = restaurantResponse.data;

                    // Adding restaurant to the "favorites" table
                    const favoriteResponse = await axios.post(
                        "http://localhost:3000/favorites",
                        {
                            userId: this.userId,
                            restaurantId: newRestaurant.id
                        }
                    );

                    if (favoriteResponse.status === 201) {
                        //  Navigate to the home page with a success query parameter
                        this.$router.push({
                            name: "HomePage",
                            params: { userId: this.userId },
                            query: { added: 'success' }
                        });
                    }
                }
            } catch (error) {

                this.error = error.response?.data?.message ||
                    'Error adding restaurant. Please try again.';
                console.error('Add error:', error);

            } finally {
                this.isLoading = false;
            }
        },

        goBack() {
            this.$router.push({
                name: 'HomePage',
                params: { userId: this.userId }
            });
        }
    },

    mounted() {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            this.$router.push({ name: 'SignUp' });
        }
        this.userId = storedUserId;
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

.add-section {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.error-message {
    color: red;
    margin-top: 10px;
}

.add-title {
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

.add-form {
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

.add-button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #40c057;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.add-button:hover {
    background-color: #37b24d;
}

.add-button:active {
    transform: translateY(1px);
}

.add-button:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .add-section {
        max-width: 100%;
        margin: 0 1rem;
        padding: 1.5rem;
    }

    .add-title {
        font-size: 1.25rem;
    }
}

.type-selection {
    display: flex;
    flex-wrap: wrap; /* Allows wrapping for responsiveness */
    gap: 0.5rem; /* Reduces the spacing between elements */
    justify-content: center; /* Centers the items horizontally */
}

.type-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.type-option input {
    display: none;
}

.type-option .type-label {
    padding: 0.5rem 1rem;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    background-color: #f8f9fa;
    font-size: 0.9rem;
    font-weight: 500;
    color: #495057;
    transition: all 0.3s ease;
    text-align: center;
    min-width: 80px; /* Ensures consistent size */
}

.type-option input:checked + .type-label {
    background-color: #4dabf7;
    color: white;
    border-color: #4dabf7;
    font-weight: 600;
}

.type-option:hover .type-label {
    background-color: #e9ecef;
}
</style>