const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addExamDetailsToNewCerts() {
  try {
    console.log('Adding missing exam details to newly added certifications...');

    // Update DELF French A1
    await prisma.certification.update({
      where: { slug: 'delf-french-a1-student' },
      data: {
        examCode: 'DELF-A1',
        examFormat: 'Reading (30min), Writing (30min), Listening (20min), Speaking (10min)',
        examDuration: 90, // 1h30 total
        passingScore: '50/100 overall, minimum 5/25 per section',
        passRate: 75,
        validityYears: null, // Valid for life
      }
    });

    // Update DELF French A2 (which already existed but may be missing details)
    await prisma.certification.update({
      where: { slug: 'delf-french-a2-student' },
      data: {
        examCode: 'DELF-A2',
        examFormat: 'Reading (30min), Writing (45min), Listening (25min), Speaking (15min)',
        examDuration: 115, // 1h55 total
        passingScore: '50/100 overall, minimum 5/25 per section',
        passRate: 72,
        validityYears: null, // Valid for life
      }
    });

    // Update DELF French B1 (which already existed but may be missing details)
    await prisma.certification.update({
      where: { slug: 'delf-french-b1-student' },
      data: {
        examCode: 'DELF-B1',
        examFormat: 'Reading (35min), Writing (45min), Listening (25min), Speaking (15min)',
        examDuration: 120, // 2h total
        passingScore: '50/100 overall, minimum 5/25 per section',
        passRate: 68,
        validityYears: null, // Valid for life
      }
    });

    // Update DELF French B2 (which already existed but may be missing details)
    await prisma.certification.update({
      where: { slug: 'delf-french-b2-student' },
      data: {
        examCode: 'DELF-B2',
        examFormat: 'Reading (60min), Writing (60min), Listening (30min), Speaking (20min)',
        examDuration: 170, // 2h50 total
        passingScore: '50/100 overall, minimum 5/25 per section',
        passRate: 65,
        validityYears: null, // Valid for life
      }
    });

    // Update DELE Spanish A1
    await prisma.certification.update({
      where: { slug: 'dele-spanish-a1-student' },
      data: {
        examCode: 'DELE-A1',
        examFormat: 'Reading (45min), Writing (25min), Listening (20min), Speaking (15min)',
        examDuration: 105, // 1h45 total
        passingScore: 'Pass all 4 sections (Reading, Writing, Listening, Speaking)',
        passRate: 61,
        validityYears: null, // Valid for life
      }
    });

    // Update DELE Spanish A2 (which already existed but may be missing details)
    await prisma.certification.update({
      where: { slug: 'dele-spanish-a2-student' },
      data: {
        examCode: 'DELE-A2',
        examFormat: 'Reading (60min), Writing (50min), Listening (35min), Speaking (15min)',
        examDuration: 160, // 2h40 total
        passingScore: 'Pass all 4 sections (Reading, Writing, Listening, Speaking)',
        passRate: 58,
        validityYears: null, // Valid for life
      }
    });

    // Update DELE Spanish B1 (which already existed but may be missing details)
    await prisma.certification.update({
      where: { slug: 'dele-spanish-b1-student' },
      data: {
        examCode: 'DELE-B1',
        examFormat: 'Reading (70min), Writing (60min), Listening (40min), Speaking (20min)',
        examDuration: 190, // 3h10 total
        passingScore: 'Pass all 4 sections (Reading, Writing, Listening, Speaking)',
        passRate: 55,
        validityYears: null, // Valid for life
      }
    });

    // Update DELE Spanish B2
    await prisma.certification.update({
      where: { slug: 'dele-spanish-b2-student' },
      data: {
        examCode: 'DELE-B2',
        examFormat: 'Reading (70min), Writing (80min), Listening (40min), Speaking (20min)',
        examDuration: 210, // 3h30 total
        passingScore: 'Pass all 4 sections (Reading, Writing, Listening, Speaking)',
        passRate: 52,
        validityYears: null, // Valid for life
      }
    });

    // Update HSK Level 1 (may be missing details)
    await prisma.certification.update({
      where: { slug: 'hsk-level-1-chinese-student' },
      data: {
        examCode: 'HSK-1',
        examFormat: 'Listening (20 questions), Reading (20 questions)',
        examDuration: 40,
        passingScore: '120/200 points (60%)',
        passRate: 85,
        validityYears: null, // Valid for life (2 years for university admission)
      }
    });

    // Update HSK Level 2 (may be missing details)
    await prisma.certification.update({
      where: { slug: 'hsk-level-2-chinese-student' },
      data: {
        examCode: 'HSK-2',
        examFormat: 'Listening (35 questions), Reading (25 questions)',
        examDuration: 55,
        passingScore: '120/200 points (60%)',
        passRate: 80,
        validityYears: null, // Valid for life
      }
    });

    // Update HSK Level 3 (may be missing details)
    await prisma.certification.update({
      where: { slug: 'hsk-level-3-chinese-student' },
      data: {
        examCode: 'HSK-3',
        examFormat: 'Listening (40 questions), Reading (30 questions), Writing (10 questions)',
        examDuration: 90,
        passingScore: '180/300 points (60%)',
        passRate: 75,
        validityYears: null, // Valid for life
      }
    });

    // Update HSK Level 4 (may be missing details)
    await prisma.certification.update({
      where: { slug: 'hsk-level-4-chinese-student' },
      data: {
        examCode: 'HSK-4',
        examFormat: 'Listening (45 questions), Reading (40 questions), Writing (15 questions)',
        examDuration: 105,
        passingScore: '180/300 points (60%)',
        passRate: 70,
        validityYears: null, // Valid for life
      }
    });

    // Update HSK Level 5
    await prisma.certification.update({
      where: { slug: 'hsk-level-5-chinese-student' },
      data: {
        examCode: 'HSK-5',
        examFormat: 'Listening (45 questions), Reading (45 questions), Writing (10 questions)',
        examDuration: 125,
        passingScore: '180/300 points (60%)',
        passRate: 65,
        validityYears: null, // Valid for life
      }
    });

    // Update HSK Level 6
    await prisma.certification.update({
      where: { slug: 'hsk-level-6-chinese-student' },
      data: {
        examCode: 'HSK-6',
        examFormat: 'Listening (50 questions), Reading (50 questions), Writing (1 essay)',
        examDuration: 140,
        passingScore: '180/300 points (60%)',
        passRate: 60,
        validityYears: null, // Valid for life
      }
    });

    console.log('✅ Updated DELF French A1 exam details');
    console.log('✅ Updated DELF French A2 exam details');
    console.log('✅ Updated DELF French B1 exam details');
    console.log('✅ Updated DELF French B2 exam details');
    console.log('✅ Updated DELE Spanish A1 exam details');
    console.log('✅ Updated DELE Spanish A2 exam details');
    console.log('✅ Updated DELE Spanish B1 exam details');
    console.log('✅ Updated DELE Spanish B2 exam details');
    console.log('✅ Updated HSK Level 1 exam details');
    console.log('✅ Updated HSK Level 2 exam details');
    console.log('✅ Updated HSK Level 3 exam details');
    console.log('✅ Updated HSK Level 4 exam details');
    console.log('✅ Updated HSK Level 5 exam details');
    console.log('✅ Updated HSK Level 6 exam details');
    console.log('');
    console.log('All certification exam details are now complete! 📋✅');

  } catch (error) {
    console.error('Error adding exam details:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addExamDetailsToNewCerts();