require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function setup() {
  const sql = `
  create table if not exists certificates (
    id          uuid primary key default gen_random_uuid(),
    certificate_id  text not null,
    name        text not null,
    fathers_name text,
    course      text,
    semester    text,
    roll_no     text,
    college     text,
    academic_year text,
    company_name text,
    start_date  date,
    end_date    date,
    issue_date  date default current_date,
    grade       text,
    instructor  text,
    description text,
    created_at  timestamptz default now()
  );
  alter table certificates enable row level security;
  drop policy if exists "public read" on certificates;
  create policy "public read" on certificates for select using (true);
  drop policy if exists "service insert" on certificates;
  create policy "service insert" on certificates for insert with check (true);
  drop policy if exists "service update" on certificates;
  create policy "service update" on certificates for update using (true);
  drop policy if exists "service delete" on certificates;
  create policy "service delete" on certificates for delete using (true);
  `;
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
  console.log("Error:", error);
}
setup();
