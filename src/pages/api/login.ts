import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const data = await request.formData();
  const username = data.get('username');
  const password = data.get('password');

  // Simple check (replace with real auth logic)
  if (username === 'admin' && password === 'admin') {
    cookies.set('auth_token', 'authenticated', { path: '/', httpOnly: true });
    return redirect('/products');
  }

  return new Response('Invalid credentials', { status: 401 });
};
