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
                            <th>ID</th>
                            <th>Restaurant Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in restaurants" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.address }}</td>
                            <td>
                                <div class="action-buttons">
                                    <router-link :to="'/update/' + item.id" class="update-btn">
                                        Edit
                                    </router-link>
                                    <button @click="deleteRestaurant(item.id)" class="delete-btn">
                                        Delete
                                    </button>
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


export default {
    name: 'HomePage',
    data() {
        return {
            userName: '',
            userId: '',
            restaurants: [],
        }
    },
    components: {
        Header
    }, methods: {
        async deleteRestaurant(id) {
            console.log("logg delete");

            console.log(id);

            let response = await axios.delete('http://localhost:3000/restaurants/' + id)
            console.log(response);

            if (response.status == 200) {
                this.loadData()
            }
        },
        // reload data after deletion
        async loadData() {
            try {
                let userId = localStorage.getItem('userId');
                let userInfo = localStorage.getItem('user-info');
                console.log("userId", userId);

                if (userId) {
                    let response = await axios.get("http://localhost:3000/users?id=" + userId)
                    console.log("homepge response users", response);

                    if (response.data.length > 0) {
                        this.userName = response.data[0].name.split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');
                    }

                    console.log("response.data.name", response.data[0].name);
                    console.log(userInfo);

                } else {
                    this.$router.push({ name: 'SignUp' })
                }

                let response = await axios.get("http://localhost:3000/restaurants")
                this.restaurants = response.data;

            } catch (error) {
                console.error("An error occurred while loading data:", error);
            }

        }
    },
    async mounted() {

        this.loadData()
    }
}
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
    max-width: 1200px;
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
    /* This helps control column widths */
}

th,
td {
    padding: 12px 16px;
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: middle;
    /* Add this to vertically center content */
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

/* Style both update and delete buttons consistently */
.update-btn,
.delete-btn {
    background-color: #384f4b;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-block;
    width: 80px;
    text-align: center;
    box-sizing: border-box;
    margin: 0;
}

/* Hover state for both buttons */
.update-btn:hover,
.delete-btn:hover,
a.update-btn:hover,
button.delete-btn:hover {
    background-color: #05251f;
    color: white;
}

/* Set specific widths for each column */
th:nth-child(1),
/* ID column */
td:nth-child(1) {
    width: 10%;
}

/*
2-Restaurant Name column
3-address column
4-action column */
th:nth-child(2),
td:nth-child(2),
th:nth-child(3),
td:nth-child(3),
th:nth-child(4),
td:nth-child(4) {
    width: 30%;
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
</style>