import { describe, it, expect, beforeEach } from 'vitest';
import { getProductRepository } from '@app/productService';
import { POST as createHandler, GET as listHandler } from '../src/pages/api/products.json';
import { GET as getHandler, PATCH as patchHandler, DELETE as deleteHandler } from '../src/pages/api/products/[id].json';
import type { APIContext } from 'astro';

// Create a complete mock of the Astro API context
function createMockContext(params = {}, body: any = null, method = 'GET'): APIContext {
  const request = new Request(`http://localhost/api/products${Object.keys(params).length ? '/[id]' : ''}.json`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined
  });

  return {
    params,
    props: {},
    request,
    cookies: {
      get: (name: string) => {
        if (name === 'auth_token') return { value: 'authenticated' };
        return undefined;
      },
      has: (name: string): name is 'auth_token' => name === 'auth_token',
      set: () => {},
      delete: () => {}
    },
    redirect: (path: string) => new Response(null, {
      status: 302,
      headers: { Location: path }
    }),
    site: new URL('http://localhost:4321'),
    generator: 'Test',
    url: new URL(`http://localhost:4321/api/products${Object.keys(params).length ? '/[id]' : ''}.json`),
    clientAddress: '127.0.0.1',
    locals: {}
  } as any;
}

describe('product API integration', () => {
  beforeEach(async () => { await getProductRepository().clear(); });

  it('creates and lists products', async () => {
    const res = await createHandler(createMockContext({}, { 
      name: 'Test Product', 
      price: 29.99, 
      currency: 'USD', 
      stock: 10 
    }, 'POST'));
    
    expect(res.status).toBe(201);
    
    const createdProduct = await res.json();
    expect(createdProduct.id).toBeDefined();
    expect(createdProduct.name).toBe('Test Product');
    
    const listRes = await listHandler(createMockContext());
    const items = await listRes.json();
    expect(items.length).toBe(1);
    expect(items[0].id).toBe(createdProduct.id);
  });

  it('handles complete product lifecycle', async () => {
    // Create
    const createdRes = await createHandler(createMockContext({}, { 
      name: 'Lifecycle Test', 
      price: 49.99, 
      currency: 'EUR', 
      stock: 5 
    }, 'POST'));
    
    expect(createdRes.status).toBe(201);
    const created = await createdRes.json();
    expect(created.id).toBeDefined();
    
    // Get
    const getRes = await getHandler(createMockContext({ id: created.id }));
    expect(getRes.status).toBe(200);
    const product = await getRes.json();
    expect(product.id).toBe(created.id);
    
    // Update
    const patchRes = await patchHandler(createMockContext(
      { id: created.id }, 
      { price: 39.99, stock: 10 }, 
      'PATCH'
    ));
    
    expect(patchRes.status).toBe(200);
    const updated = await patchRes.json();
    expect(updated.price).toBe(39.99);
    expect(updated.stock).toBe(10);
    
    // Delete
    const delRes = await deleteHandler(createMockContext({ id: created.id }, null, 'DELETE'));
    expect(delRes.status).toBe(204);
    
    // Verify deletion
    const getDeletedRes = await getHandler(createMockContext({ id: created.id }));
    expect(getDeletedRes.status).toBe(404);
  });

  it('validates required fields', async () => {
    const res = await createHandler(createMockContext({}, { 
      // Missing name and currency
      price: 19.99, 
      stock: 0 
    }, 'POST'));
    
    expect(res.status).toBe(400);
    const error = await res.json();
    expect(error.error).toBe('ValidationError');
    expect(error.issues).toBeDefined();
    
    // Verify no product was created
    const listRes = await listHandler(createMockContext());
    const items = await listRes.json();
    expect(items.length).toBe(0);
  });

  it('validates update data', async () => {
    // First create a valid product
    const createdRes = await createHandler(createMockContext({}, { 
      name: 'Validation Test', 
      price: 15.99, 
      currency: 'USD', 
      stock: 3 
    }, 'POST'));
    
    const created = await createdRes.json();
    
    // Try to update with invalid data (negative price)
    const patchRes = await patchHandler(createMockContext(
      { id: created.id }, 
      { price: -5 }, 
      'PATCH'
    ));
    
    expect(patchRes.status).toBe(400);
    const error = await patchRes.json();
    expect(error.error).toBe('ValidationError');
  });

  it('handles not found errors', async () => {
    // Get non-existent product
    const getRes = await getHandler(createMockContext({ id: 'non-existent-id' }));
    expect(getRes.status).toBe(404);
    
    // Update non-existent product
    const patchRes = await patchHandler(createMockContext(
      { id: 'non-existent-id' }, 
      { name: 'Updated Name' }, 
      'PATCH'
    ));
    
    expect(patchRes.status).toBe(404);
    
    // Delete non-existent product
    const delRes = await deleteHandler(createMockContext({ id: 'non-existent-id' }, null, 'DELETE'));
    expect(delRes.status).toBe(404);
  });
});
