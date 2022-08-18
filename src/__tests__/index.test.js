import { app } from "../app.js"
import supertest from "supertest"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const request = supertest(app)

describe("Testing the testing environment", () => {
  it("should check that true is true", () => {
    expect(true).toBe(true)
  })
})

describe("Testing the app endpoints", () => {
  beforeAll((done) => {
    console.log("This gets run before all tests in this suite")

    mongoose.connect(process.env.MONGO_URL_TEST).then(() => {
      console.log("Connected to the test database")
      done()
    })
  })

  it("should check that the GET /test endpoint returns a success message", async () => {
    const response = await request.get("/test")

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Test successful")
  })

  const validProduct = {
    name: "Test Product",
    price: 200,
  }

  let _id
  it("should check that the POST /products endpoint creates a new product", async () => {
    const response = await request.post("/products").send(validProduct)

    expect(response.status).toBe(201)
    expect(response.body._id).toBeDefined()
    expect(response.body.name).toBeDefined()
    expect(response.body.price).toBeDefined()

    _id = response.body._id
  })
  it("should check that the GET /products endpoint returns a list of products", async () => {
    const response = await request.get("/products")

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it("should check that the GET /products/:id endpoint returns a single product", async () => {
    const response = await request.get("/products/" + _id)

    expect(response.status).toBe(200)
    expect(response.body._id).toBe(_id)
    expect(response.body.name).toBe(validProduct.name)
    expect(response.body.price).toBe(validProduct.price)
  })
  it("should check that the GET /products/:id endpoint returns a 404 without a valid ID", async () => {
    const response = await request.get("/products/123456123456123456123456")

    expect(response.status).toBe(404)
  })

  const validUpdate = {
    name: "Test Product Updated",
  }

  it("should check that a valid PUT /product/:id update request gets executed correctly", async () => {
    const response = await request.put("/products/" + _id).send(validUpdate)

    expect(response.status).toBe(200)
    expect(response.body.name).toBe(validUpdate.name)
    expect(typeof response.body.name).toBe("string")
  })
  it("should check that the PUT /product/:id update request returns a 404 without a valid id", async () => {
    const response = await request
      .put("/products/123456123456123456123456")
      .send(validUpdate)

    expect(response.status).toBe(404)
  })

  it("should check that the DELETE /products/:id endpoint returns a 404 without a valid ID", async () => {
    const response = await request.delete("/products/123456123456123456123456")
    expect(response.status).toBe(404)
  })
  it("should check that the DELETE /products/:id endpoint deletes a product", async () => {
    const response = await request.delete("/products/" + _id)

    expect(response.status).toBe(204)
    const deletedProduct = await request.get("/products/" + _id)
    expect(deletedProduct.status).toBe(404)
  })

  afterAll((done) => {
    console.log("This gets run after all tests in this suite")
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(() => {
        console.log("Closed the database connection")
        done()
      })
    })

    // mongoose.connection
    //   .dropDatabase()
    //   .then(() => mongoose.connection.close())
    //   .then(() => done())
  })

  // it("should test that the GET /products endpoint returns a list of products", async () => {})
})
