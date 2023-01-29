let productModal = ""; // 也可以換成let productModal={}
let delProductModal = "";
const app = {
  data() {
    return {
      apiPath: "zxcv123",
      products: [],
      tempProduct: {
        imagesUrl: [],
      },

      //   確認是新增或是編輯所使用的
      isNew: false,
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`https://vue3-course-api.hexschool.io/v2/api/user/check`)
        .then(() => {
          this.getData();
        })
        .catch(() => {
          window.location = "index.html";
        });
    },
    getData() {
      axios
        .get(
          `https://vue3-course-api.hexschool.io/v2/api/${this.apiPath}/admin/products/all`
        )
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    openModal(status, product) {
      if (status === "createNew") {
        // 打開新增modal
        productModal.show();
        this.isNew = true;

        // 如果是新增產品會帶入初始資料
        this.tempProduct = {
          imagesUrl: [],
        };
      } else if (status === "edit") {
        // 打開編輯modal
        productModal.show();
        this.isNew = false;

        // 如果是編輯產品會帶入當前要編輯的資料
        this.tempProduct = { ...product };
      } else if (status === "delete") {
        // 打開刪除modal
        delProductModal.show();
        this.tempProduct = { ...product }; // 取id使用
      }
    },
    updateProduct() {
      let method = "post";
      let url = `https://vue3-course-api.hexschool.io/v2/api/${this.apiPath}/admin/product`;
      if (!this.isNew) {
        url = `https://vue3-course-api.hexschool.io/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        method = "put";
      }
      axios[method](url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          this.getData();

          //   關閉modal
          productModal.hide();
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    deleteProduct() {
      axios
        .delete(
          `https://vue3-course-api.hexschool.io/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
        )
        .then((response) => {
          alert(response.data.message);
          this.getData();
          delProductModal.hide();
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
  },
  mounted() {
    // 取出 token
    const cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // 每次都會帶入
    axios.defaults.headers.common["Authorization"] = cookieValue;
    this.checkAdmin();

    // 將bootstrap新增、編輯的modal實體化
    productModal = new bootstrap.Modal(document.querySelector("#productModal"));

    // 將bootstrap刪除的modal實體化
    delProductModal = new bootstrap.Modal(
      document.querySelector("#delProductModal")
    );
  },
};
Vue.createApp(app).mount("#app");
