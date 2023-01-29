const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`https://vue3-course-api.hexschool.io/v2/admin/signin`, this.user)
        .then((response) => {
          // 解構寫法，從response.data裡面取出token、expired
          const { token, expired } = response.data;

          // 將token、expired存進cookie
          document.cookie = `myToken=${token}; myexpired=${new Date(
            expired
          )}; `;

          // 登入成功後轉址到產品頁面
          window.location = "product.html";

          alert(response.data.message);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};
Vue.createApp(app).mount("#app");
