
import { supabase } from '../src/sdk/supabase';

// Mock global fetch
const mockFetch = async (url: string, options: any) => {
  console.log(`\n[MockFetch] Request to: ${url}`);
  console.log(`[MockFetch] Method: ${options.method}`);
  console.log(`[MockFetch] Body: ${options.body}`);

  const body = JSON.parse(options.body);
  
  // Simulate successful responses based on operation
  if (body.operation === 'insert' && body.table === 'favorites') {
    return {
      ok: true,
      json: async () => ({ data: [{ id: 'fav-123', ...body.values[0] }], error: null })
    };
  }
  
  if (body.operation === 'select' && body.table === 'favorites') {
    return {
      ok: true,
      json: async () => ({ data: [{ id: 'fav-123', photo_id: 'photo-1', user_id: 'user-1' }], error: null })
    };
  }

  if (body.operation === 'delete' && body.table === 'favorites') {
    return {
      ok: true,
      json: async () => ({ data: null, error: null })
    };
  }

  return {
    ok: false,
    status: 400,
    text: async () => JSON.stringify({ error: 'Unknown operation' })
  };
};

// @ts-expect-error - Mocking global fetch for testing
global.fetch = mockFetch;

// Mock environment variables
process.env.VITE_PROJECT_ID = 'test-project';
process.env.VITE_ANYX_SERVER_URL = 'https://api.anyx.io';

async function runVerification() {
  console.log('🚀 Starting Favorites Backend Verification...');

  try {
    // 1. Test Insert
    console.log('\n1️⃣ Testing Insert Favorite...');
    const { data: insertData, error: insertError } = await supabase
      .from('favorites')
      .insert({ user_id: 'user-1', photo_id: 'photo-1' })
      .select()
      .execute();

    if (insertError) throw new Error(`Insert failed: ${insertError}`);
    console.log('✅ Insert successful:', insertData);

    // 2. Test Select
    console.log('\n2️⃣ Testing Select Favorites...');
    const { data: selectData, error: selectError } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', 'user-1')
      .execute();

    if (selectError) throw new Error(`Select failed: ${selectError}`);
    console.log('✅ Select successful:', selectData);

    // 3. Test Delete
    console.log('\n3️⃣ Testing Delete Favorite...');
    const { error: deleteError } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', 'user-1')
      .eq('photo_id', 'photo-1')
      .execute();

    if (deleteError) throw new Error(`Delete failed: ${deleteError}`);
    console.log('✅ Delete successful');

    console.log('\n🎉 All backend verifications passed!');
  } catch (error) {
    console.error('\n❌ Verification failed:', error);
    process.exit(1);
  }
}

runVerification();

