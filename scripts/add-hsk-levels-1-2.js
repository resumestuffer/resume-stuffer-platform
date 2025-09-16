const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addHSKLevels1and2() {
  try {
    console.log('Adding HSK Levels 1 and 2...');

    // Get existing provider and category
    const provider = await prisma.provider.findUnique({
      where: { slug: 'hanban-cti' }
    });

    const category = await prisma.category.findUnique({
      where: { slug: 'high-school-student' }
    });

    if (!provider || !category) {
      throw new Error('Provider or category not found');
    }

    // Add HSK Level 1
    const hskLevel1 = await prisma.certification.upsert({
      where: { slug: 'hsk-level-1-chinese-student' },
      update: {},
      create: {
        title: 'HSK Level 1 (Elementary Chinese)',
        slug: 'hsk-level-1-chinese-student',
        description: 'Beginner Chinese language certification for 150+ vocabulary words. Perfect foundation for Chinese language learning.',
        shortDescription: 'Beginner Chinese language certification',
        price: 12000, // $120
        salaryIncrease: 2000,
        studyTimeHours: 60,
        studyTimeWeeks: 8,
        experienceLevel: 'Beginner',
        demandLevel: 'Medium',
        hasGuide: true,
        isFeatured: false,
        isActive: true,
        isHighSchoolReady: true,
        minimumAge: 14,
        enrollUrl: 'https://www.chinesetest.cn',
        keySkills: ['Basic Chinese Communication', 'Pinyin', 'Basic Characters', 'Simple Conversation'],
        targetAudience: ['Beginner Chinese students', 'High school language learners', 'Complete beginners'],
        industryFocus: ['Education', 'International Business', 'Cultural Exchange'],
        pathwayType: ['Language Learning', 'College Prep'],
        nextCerts: ['hsk-level-2-chinese-student'],
        categoryId: category.id,
        providerId: provider.id,
      },
    });

    // Add HSK Level 2
    const hskLevel2 = await prisma.certification.upsert({
      where: { slug: 'hsk-level-2-chinese-student' },
      update: {},
      create: {
        title: 'HSK Level 2 (Elementary Chinese)',
        slug: 'hsk-level-2-chinese-student',
        description: 'Elementary Chinese language certification for 300+ vocabulary words. Builds on HSK Level 1 foundation.',
        shortDescription: 'Elementary Chinese language certification',
        price: 14000, // $140
        salaryIncrease: 3000,
        studyTimeHours: 80,
        studyTimeWeeks: 12,
        experienceLevel: 'Beginner',
        demandLevel: 'Medium',
        hasGuide: true,
        isFeatured: false,
        isActive: true,
        isHighSchoolReady: true,
        minimumAge: 14,
        enrollUrl: 'https://www.chinesetest.cn',
        keySkills: ['Elementary Chinese Communication', 'Character Recognition', 'Basic Grammar', 'Simple Reading'],
        targetAudience: ['HSK 1 graduates', 'Elementary Chinese students', 'High school students'],
        industryFocus: ['Education', 'International Business', 'Cultural Exchange'],
        pathwayType: ['Language Learning', 'College Prep'],
        prerequisiteCerts: ['hsk-level-1-chinese-student'],
        nextCerts: ['hsk-level-3-chinese-student'],
        categoryId: category.id,
        providerId: provider.id,
      },
    });

    console.log('✅ Added HSK Level 1:', hskLevel1.title);
    console.log('✅ Added HSK Level 2:', hskLevel2.title);
    console.log('✅ Complete HSK pathway: Level 1 → Level 2 → Level 3 → Level 4');

  } catch (error) {
    console.error('Error adding HSK levels:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addHSKLevels1and2();