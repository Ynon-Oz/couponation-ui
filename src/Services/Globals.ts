class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    coupons: "http://localhost:8080/coupon/",
    companies: "http://localhost:8080/company/",
    users: "http://localhost:8080/user",
    customers: "http://localhost:8080/customer/",
    purchases: "http://localhost:8080/purchase/",
    register: "http://localhost:8080/register/",
    login: "http://localhost:8080/user/login/",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    coupons: "http://localhost:8080/coupon/",
    companies: "http://localhost:8080/company/",
    users: "http://localhost:8080/user/",
    customers: "http://localhost:8080/customer/",
    purchases: "http://localhost:8080/purchase/",
    register: "http://localhost:8080/register/",
    login: "http://localhost:8080/user/login/",

  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
