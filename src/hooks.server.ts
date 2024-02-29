import {
  type Handle,
  redirect,
} from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => { 
  event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);

  return await resolve(event);
}
