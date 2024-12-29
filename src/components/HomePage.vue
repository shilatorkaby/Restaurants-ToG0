<template>
    <div class="container">
        <Header />
        <div class="content">
            <div class="welcome-section">
                <h1>Hi {{ userName }},</h1>
                <h2>Here's your favorite restaurants:</h2>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Restaurant Name</th>
                            <th>Address</th>
                            <th class="comments-header">Comments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in restaurants" :key="item.id">
                            <td>
                                <div class="type-icon" :title="item.type">
                                    <img v-if="item.type === 'dairy'" src="../assets/dairy-icon.png" alt="Dairy"
                                        class="icon-dairy" />
                                    <img v-if="item.type === 'meat'" src="../assets/meat-icon.png" alt="Meat"
                                        class="icon-meat" />
                                    <img v-if="item.type === 'parve'" src="../assets/parve-icon.png" alt="Parve"
                                        class="icon-parve" />
                                </div>
                            </td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.address }}</td>
                            <td class="comments-column">
                                <textarea class="comments-input" v-model="item.comments"
                                    placeholder="Add your comments..." @blur="updateComments(item)"></textarea>
                            </td>
                            <td>
                                <div class="action-buttons">
                                    <router-link :to="'/update/' + item.id" class="update-btn">
                                        Edit
                                    </router-link>
                                    <button @click="deleteRestaurant(item.id)" class="delete-btn">
                                        Remove
                                    </button>
                                    <router-link :to="'/share/' + item.id" class="share-btn">
                                        <img class="share-icon" src="../assets/share-icon.png" alt="Share Icon" />
                                        Share
                                    </router-link>

                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';

/**
 * HomePage component displays a list of favorite restaurants for the user.
 * It allows users to delete restaurants and add comments.
 */
export default {
    name: 'HomePage',
    data() {
        return {
            userId: '',
            userName: '',
            restaurants: [],
        };
    },
    components: {
        Header,
    },
    methods: {
        /**
         * Deletes a restaurant from the favorites.
         * @param {number} restaurantId - The ID of the restaurant to delete.
         */
        async deleteRestaurant(restaurantId) {
            try {
                const favoritesResponse = await axios.get(`http://localhost:3000/favorites?restaurantId=${restaurantId}`);
                if (favoritesResponse.data.length > 0) {
                    const favoriteId = favoritesResponse.data[0].id;

                    const deleteResponse = await axios.delete(`http://localhost:3000/favorites/${favoriteId}`);
                    if (deleteResponse.status === 200) {
                        this.loadData();
                    }
                } else {
                    console.error(`No favorite found for restaurantId: ${restaurantId}`);
                }
            } catch (error) {
                console.error('Failed to delete favorite:', error);
            }
        },
        /**
         * Updates comments for a restaurant.
         * @param {Object} item - The restaurant item to update.
         */
        async updateComments(item) {
            try {
                await axios.patch(`http://localhost:3000/restaurants/${item.id}`, {
                    comments: item.comments,
                });
            } catch (error) {
                console.error('Failed to update comments:', error);
            }
        },
        /**
         * Loads user data and favorite restaurants.
         */
        async loadData() {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    this.userId = userId;

                    const userResponse = await axios.get(`http://localhost:3000/users?id=${userId}`);
                    const userData = userResponse.data[0];
                    if (userData) {
                        this.userName = userData.name.split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');
                        localStorage.setItem('userId', userId);
                    } else throw new Error('User not found');

                    const favoritesResponse = await axios.get(`http://localhost:3000/favorites?userId=${userId}`);
                    const restaurantIds = favoritesResponse.data.map((fav) => fav.restaurantId);

                    const restaurantRequests = restaurantIds.map((id) => axios.get(`http://localhost:3000/restaurants/${id}`));
                    const restaurantResponses = await Promise.all(restaurantRequests);
                    this.restaurants = restaurantResponses.map((res) => res.data);
                } else {
                    this.$router.push({ name: 'SignUp' });
                }
            } catch (error) {
                console.error('An error occurred while loading data:', error);
            }
        },
    },
    async mounted() {
        await this.loadData();
    },
};
</script>

<style>
body {
    margin: 0;
    background-color: #f5f7fa;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.container {
    min-height: 100vh;
}

.content {
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
}

.welcome-section {
    margin-bottom: 30px;
}

.welcome-section h1 {
    color: #2d3748;
    font-size: 24px;
    margin-bottom: 8px;
}

.welcome-section h2 {
    color: #4a5568;
    font-size: 20px;
    font-weight: 500;
    margin-top: 0;
}

.table-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    border: none;
    table-layout: fixed;
}

th,
td {
    padding: 12px 16px;
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: middle;
}

th {
    background-color: #f8fafc;
    color: #4a5568;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

td {
    color: #2d3748;
    font-size: 14px;
}

tr:hover {
    background-color: #f8fafc;
}

.action-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.update-btn,
.delete-btn,
.share-btn {
    background-color: #905959;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-flex;
    /* Use flex for better alignment */
    align-items: center;
    /* Center icon and text vertically */
    justify-content: center;
    /* Center content horizontally */
    gap: 6px;
    /* Add spacing between icon and text */
    width: 100px;
    /* Ensure consistent button width */
    box-sizing: border-box;
}

.update-btn:hover,
.delete-btn:hover,
.share-btn,
.share-btn,
a.update-btn:hover,
delete-btn:hover,
share-btn:hover {
    background-color: #5e3c3c;
    color: white;
}

th:nth-child(1),
td:nth-child(1) {
    width: 5%;
}

th:nth-child(2),
td:nth-child(2),
th:nth-child(3),
td:nth-child(3),
th:nth-child(4),
td:nth-child(4) {
    width: 20%;
}

tr:last-child td {
    border-bottom: none;
}

@media (max-width: 768px) {
    .content {
        padding: 16px;
    }

    th,
    td {
        padding: 12px;
    }

    .action-buttons {
        flex-direction: column;
        gap: 4px;
    }

    .update-btn,
    .delete-btn {
        text-align: center;
    }
}

.type-icon img {
    width: 35px;
    height: 35px;
    margin: 0 5px;
    display: inline-block;
}


.share-btn {
    background-color: #905959;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-flex;
    /* Ensure flex layout */
    align-items: center;
    /* Center content vertically */
    justify-content: center;
    /* Center content horizontally */
    gap: 0px;
    /* Spacing between icon and text */
    width: 100px;
    /* Ensure consistent button size */
    height: 30px;
    /* Match the height of other buttons */
    box-sizing: border-box;
}

.share-btn:hover {
    background-color: #5e3c3c;
    color: white;
}

.share-icon {
    width: 40px;
    /* Set a fixed width for the icon */
    height:40px;
    /* Set a fixed height for the icon */
    object-fit: contain;
    /* Maintain the aspect ratio of the image */
    flex-shrink: 0;
    /* Prevent the icon from resizing */
}


.comments-header {
    background-color: #edf2f7;
    font-weight: bold;
    color: #2c5282;
}

.comments-column {
    background-color: #f7fafc;
    text-align: left;
    padding: 8px;
}

.comments-input {
    width: 100%;
    min-height: 40px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    resize: vertical;
    background-color: #ffffff;
}

.comments-input:focus {
    outline: none;
    border-color: #63b3ed;
    box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.4);
}
</style>
