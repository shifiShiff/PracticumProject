
export type User = {
    email: string;
    password: string;
};

class UserStore {
    private user: User | null = null;
    private isLoggedIn: boolean = false;

    login(user: User) {
        this.user = user;
        this.isLoggedIn = true;
        // Additional logic for login
    }

    register(user: User) {
        this.user = user;
        this.isLoggedIn = true;
        // Additional logic for registration
    }

    logout() {
        this.user = null;
        this.isLoggedIn = false;
        // Additional logic for logout
    }

    getUser() {
        return this.user;
    }

    getIsLoggedIn() {
        return this.isLoggedIn;
    }
}

export default new UserStore();