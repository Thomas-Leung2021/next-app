import { NextPageContext } from 'next';
import Router from 'next/router';

export async function myGet(url: string, ctx: NextPageContext) {
  // we are getting all the cookie from the client and the server sider rendering
  // is passing the cookie to the api backend through the fetch header
  // You can see cookie in Application > Cookies in the browser
  const cookie = ctx.req?.headers.cookie;

  const resp = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });

  // ctx.req means we don't have cookie in the browser
  // res.status is for client side, ctx.res is for server side
  if (resp.status === 401 && !ctx.req) {
    Router.replace('/Login');
    return {};
  }

  // Server side, wrong password
  if (resp.status === 401 && ctx.req) {
    // soft redirect
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000/Login',
    });
    ctx.res?.end(); // ensure we won't execute more code
    return;
  }

  const json = await resp.json();
  return json;
}
