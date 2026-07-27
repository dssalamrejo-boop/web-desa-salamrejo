import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper: fetch rows from a table
export async function fetchTable(table, options = {}) {
  let query = supabase.from(table).select(options.select || '*');
  
  if (options.order) {
    query = query.order(options.order.column, { ascending: options.order.ascending ?? true });
  }
  if (options.eq) {
    Object.entries(options.eq).forEach(([col, val]) => {
      query = query.eq(col, val);
    });
  }
  if (options.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  if (error) {
    console.error(`Error fetching ${table}:`, error);
    return [];
  }
  return data || [];
}

// Helper: fetch single setting value
export async function getSetting(key) {
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single();
  return data?.value || null;
}

// Helper: fetch all settings as object { key: value }
export async function getAllSettings() {
  const { data } = await supabase
    .from('site_settings')
    .select('key, value');
  
  if (!data) return {};
  return data.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
}

// Helper: upsert setting
export async function saveSetting(key, value, category = 'general') {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, category, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  return !error;
}

// Helper: insert row
export async function insertRow(table, data) {
  const { data: result, error } = await supabase.from(table).insert(data).select();
  if (error) {
    console.error(`Error inserting into ${table}:`, error);
    return null;
  }
  return result?.[0] || null;
}

// Helper: update row
export async function updateRow(table, id, data) {
  const { error } = await supabase.from(table).update(data).eq('id', id);
  if (error) {
    console.error(`Error updating ${table}:`, error);
    return false;
  }
  return true;
}

// Helper: delete row
export async function deleteRow(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    return false;
  }
  return true;
}

// Helper: upload file to Supabase Storage
export async function uploadFile(bucket, filePath, file) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true });
  if (error) {
    console.error('Upload error:', error);
    return null;
  }
  // Return public URL
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return urlData?.publicUrl || null;
}
