// mixins/authCheck.js
export const authCheck = {
    created() {
        this.checkAuth();
    },
    methods: {
        checkAuth() {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                this.$router.push({ name: 'Login' });
            }
        }
    }
}