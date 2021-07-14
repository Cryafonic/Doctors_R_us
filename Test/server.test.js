let server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("request");

const expect = chai.expect;
chai.use(chaiHttp);

// testing status of get method.
describe("Server status", () => {
  it("status of server", function (completed) {
    request("http://localhost:8080/", (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      completed();
    });
  });
});

// test the root
it('checks if content matches', function(done) {
    request('http://localhost:8080/api/' , function(error, response, body) {
        console.log(body)
        expect(body).to.include('Doctors R us');
        done();
    });
});

// if the about page exist
it('About page route does not exist', function(completed) {
    request({
        method: "post",
        url: "http://localhost:8080/api/about",
      } , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        completed();
    });
});