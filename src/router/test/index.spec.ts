import { Router } from './../Router/index';
import { expect } from "chai";
import { test } from 'mocha';
import { Block } from '../../utils/Block';

describe("Router", () => {
  test("should use Go correctly", () => {
    const router = new Router("#content")
    router
      .use("/", true, Block)
    router.go('/');
    expect(window.history.length).to.eq(3)
  });
  test("should change path correctly", () => {
    const router = new Router("#content")
    router
      .use("/", false, Block)
      .use('/pepega', false, Block)
    router.go('/pepega');
    expect(window.location.pathname).to.eq('/pepega')
  });
  test("should multi go correctly", () => {
    const router = new Router("#content")
    router
      .use("/pepo", false, Block)
      .use('/pepega', false, Block)
      .start()
    router.go('/pepo');
    router.go('/pepega');
    router.go('/pepo');
    expect(window.location.pathname).to.eq('/pepo')
  });
  test("should return this after .use correctly", () => {
    const router = new Router("#content")

    expect(router.use("/pepo", false, Block)).to.eq(router)
  });
});
