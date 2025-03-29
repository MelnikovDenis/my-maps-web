import api from "./api";

export default class MyMapApi {
    static async loginOrRegister(login, password) {
        const response = await api
            .post("/auth/login-or-register", {
                name: login,
                password: password
            });

        return response;
    }

    static async createPost(post) {
        const response = await api
            .post("/posts", post);

        return response;
    }

    static async getPosts() {
        const response = await api.get("/posts");

        return response;
    }

    static async deletePost(postId) {
        const response = await api.delete(`/posts?postId=${postId}`);

        return response;
    }
}