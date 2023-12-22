/* eslint-disable */
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM("<body id=content></body>", { url: 'https://localhost:3000' })

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.history = jsdom.window.history;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
