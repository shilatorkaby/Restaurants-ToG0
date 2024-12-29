<template>
    <Header />
    <div class="page-container">
        <div class="share-section">

            <button class="back-button" @click="goBack">
                <span class="back-icon">←</span>
            </button>

            <h1 class="share-title">Share {{ restaurantName }} restaurant with</h1>

            <form class="share-form" @submit.prevent="shareRestaurant">

                <div class="form-group">
                    <label for="">Enter user name</label>
                    <input id="userName" type="text" name="userName" placeholder="Enter user name"
                        v-model="sharedUserName" required class="fade-placeholder" />
                </div>

                <button type="submit" class="share-button" :disabled="isLoading">
                    {{ isLoading ? 'sharing...' : 'share Restaurant' }}
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
    name: 'Share',
    components: {
        Header
    },
    data() {
        return {
            restaurantName: '',
            restaurantId: '',
            sharedUserName: '',
            isLoading: false,
            error: '',
        };
    },
    methods: {
        async shareRestaurant() {
            try {
                this.isLoading = true;
                this.error = null;

                // sharing restaurant to the "restaurants" table
                const sharesUserResponse = await axios.get(`http://localhost:3000/users?name=${this.sharedUserName}`);

                if (sharesUserResponse.statusText == 'OK') {
                    const sharedUser = sharesUserResponse.data[0];


                    // Check if the restaurant is already in the user's favorites list
                    const favoriteCheckResponse = await axios.get("http://localhost:3000/favorites", {
                        params: {
                            userId: sharedUser.id,
                            restaurantId: this.restaurantId,
                        },
                    });

                    if (favoriteCheckResponse.status === 200 && favoriteCheckResponse.data.length > 0) {
                        // If the restaurant is already in the favorites list
                        this.error = "This restaurant is already in the user's favorites list.";
                        return;
                    }


                    // Add the restaurant to the user's favorites list
                    const favoriteResponse = await axios.post("http://localhost:3000/favorites", {
                        userId: sharedUser.id,
                        restaurantId: this.restaurantId,
                    });


                    if (favoriteResponse.status == 201) {
                        //  Navigate to the home page with a success query parameter
                        this.$router.push({
                            name: "HomePage",
                            params: { userId: this.userId },
                            query: { shared: 'success' }
                        });
                    }
                } else throw new Error("User not found");

            } catch (error) {

                this.error = error.response?.data?.message ||
                    'Error sharing restaurant. Please try again.';
                console.error('share error:', error);

            } finally {
                this.isLoading = false;
            }
        },
        async loadData() {
            try {

                const restaurantId = this.$route.params.id;
                if (!restaurantId) throw new Error("Restaurant ID not found");

                this.restaurantId = restaurantId;

                // Use `await` to properly wait for the response
                const response = await axios.get("http://localhost:3000/restaurants?id=" + this.restaurantId);

                if (response.status === 200 && response.data.length > 0) {
                    // Assuming the response data is an array of restaurants
                    this.restaurantName = response.data[0].name;
                } else {
                    throw new Error("Restaurant not found");
                }
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Error loading restaurant data. Please try again.";
                console.error("Load error:", error);
            }

        },

        goBack() {
            this.$router.push({
                name: 'HomePage',
                params: { userId: this.userId }
            });
        }
    },

    async mounted() {
        await this.loadData()
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

.share-section {
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

.share-title {
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

.share-form {
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

.share-button {
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

.share-button:hover {
    background-color: #37b24d;
}

.share-button:active {
    transform: translateY(1px);
}

.share-button:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .share-section {
        max-width: 100%;
        margin: 0 1rem;
        padding: 1.5rem;
    }

    .share-title {
        font-size: 1.25rem;
    }
}

.type-selection {
    display: flex;
    flex-wrap: wrap;
    /* Allows wrapping for responsiveness */
    gap: 0.5rem;
    /* Reduces the spacing between elements */
    justify-content: center;
    /* Centers the items horizontally */
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
    min-width: 80px;
    /* Ensures consistent size */
}

.type-option input:checked+.type-label {
    background-color: #4dabf7;
    color: white;
    border-color: #4dabf7;
    font-weight: 600;
}

.type-option:hover .type-label {
    background-color: #e9ecef;
}
</style>