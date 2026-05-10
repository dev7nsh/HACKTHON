require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function migrate() {
  const dbFile = path.join(__dirname, 'database.json');
  if (!fs.existsSync(dbFile)) {
    console.log("No database.json found to migrate.");
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  console.log(`Found ${data.length} records to migrate.`);
  
  for (const record of data) {
    const { data: inserted, error } = await supabase.from('certificates').insert({
      certificate_id: record.certificateId,
      name: record.name,
      fathers_name: record.fathersName,
      course: record.course,
      semester: record.semester,
      roll_no: record.rollNo,
      college: record.college,
      academic_year: record.academicYear,
      company_name: record.companyName,
      start_date: record.startDate,
      end_date: record.endDate,
      issue_date: record.issueDate,
      grade: record.grade,
      instructor: record.instructor,
      description: record.description
    }).select();
    
    if (error) {
      console.error(`Error migrating record ${record.certificateId}:`, error);
    } else {
      console.log(`Successfully migrated ${record.certificateId}`);
    }
  }
  console.log("Migration complete.");
}
migrate();
