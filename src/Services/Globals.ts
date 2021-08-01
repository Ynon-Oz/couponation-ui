class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    coupons: "http://localhost:8080/coupons/",
    companies: "http://localhost:8080/company/",
    users: "http://localhost:8080/users",
    customers: "http://localhost:8080/customers/",
    purchases: "http://localhost:8080/purchases/",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    coupons: "http://localhost:8080/coupons/",
    companies: "http://localhost:8080/company/",
    users: "http://localhost:8080/users/",
    customers: "http://localhost:8080/customers/",
    purchases: "http://localhost:8080/purchases/",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
