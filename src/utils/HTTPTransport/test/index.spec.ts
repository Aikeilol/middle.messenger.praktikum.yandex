import { expect } from "chai";
import { HTTPTransport } from './../index';



describe("httpTransport", () => {
  it("should send GET correctly", () => {
    const httpTransport = new HTTPTransport()
    expect(httpTransport.get('/pepega')).to.be.a('promise');
  });
  it("should send POST correctly", () => {
    const httpTransport = new HTTPTransport()
    expect(httpTransport.post('/pepega')).to.be.a('promise');
  });
  it("should send DELETE correctly", () => {
    const httpTransport = new HTTPTransport()
    expect(httpTransport.delete('/pepega')).to.be.a('promise');
  });
  it("should send PUT correctly", () => {
    const httpTransport = new HTTPTransport()
    expect(httpTransport.put('/pepega')).to.be.a('promise');
  });
}); 
