const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const queryString = require("query-string");
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCount = headers["x-total-count"];
  if (req.method === "GET" && totalCount) {
    const queryParams = queryString.parse(req._parsedUrl.query);
    const result = {
      data: res.locals.data,
      pagination: {
        count: Number.parseInt(totalCount),
        limit: Number.parseInt(queryParams._limit) || 1,
        page: Number.parseInt(queryParams._page) || 10,
      },
    };
    return res.json(result);
  }

  res.jsonp(res.locals.data);
};

// Use default router
server.use("/companies", router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
