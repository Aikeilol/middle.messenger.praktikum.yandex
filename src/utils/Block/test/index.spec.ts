import { expect } from "chai";
import { test } from 'mocha';
import { Block } from "..";

describe("Block", () => {
  let block: Block;

  beforeEach(() => {
    block = new Block("div", {
      props: {
        pepega: 'pepega'
      }
    });
  });

  test("should use Render correctly", () => {

    expect(block.render()).to.be.a('string')
  });

  test("should use GetContent correctly", () => {
    expect(block.getContent().tagName).to.eq('DIV')
  });

  test("should Initial Props correctly", () => {
    expect(block.props.props?.pepega).to.eq('pepega')
  });

  test("should setProps correctly", () => {
    block.setProps({ pepega: 'ne pepega' })
    expect(block.props.props?.pepega).to.eq('ne pepega')
  });

});
