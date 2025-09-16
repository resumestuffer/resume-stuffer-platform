const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function completeHSKPathway() {
  try {
    console.log('Completing HSK pathway with all 6 levels and fixing linkages...');

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

    // Add HSK Level 5
    const hskLevel5 = await prisma.certification.upsert({
      where: { slug: 'hsk-level-5-chinese-student' },
      update: {},
      create: {
        title: 'HSK Level 5 (Advanced Chinese)',
        slug: 'hsk-level-5-chinese-student',
        description: 'Advanced Chinese language certification for 2,500+ vocabulary words. Demonstrates ability to read newspapers, watch Chinese movies, and give speeches.',
        shortDescription: 'Advanced Chinese language certification',
        price: 18000, // $180
        salaryIncrease: 5000,
        studyTimeHours: 150,
        studyTimeWeeks: 20,
        experienceLevel: 'Advanced',
        demandLevel: 'Medium',
        hasGuide: true,
        isFeatured: false,
        isActive: true,
        isHighSchoolReady: true,
        minimumAge: 16,
        enrollUrl: 'https://www.chinesetest.cn',
        keySkills: ['Advanced Chinese Communication', 'Academic Chinese', 'Professional Presentation', 'Complex Text Comprehension'],
        targetAudience: ['HSK 4 graduates', 'Advanced Chinese students', 'University-bound students'],
        industryFocus: ['Education', 'International Business', 'Translation', 'Cultural Exchange'],
        pathwayType: ['Language Learning', 'College Prep', 'Professional Development'],
        prerequisiteCerts: ['hsk-level-4-chinese-student'],
        nextCerts: ['hsk-level-6-chinese-student'],
        categoryId: category.id,
        providerId: provider.id,
      },
    });

    // Add HSK Level 6
    const hskLevel6 = await prisma.certification.upsert({
      where: { slug: 'hsk-level-6-chinese-student' },
      update: {},
      create: {
        title: 'HSK Level 6 (Mastery Chinese)',
        slug: 'hsk-level-6-chinese-student',
        description: 'Master-level Chinese language certification for 5,000+ vocabulary words. Highest level demonstrating near-native fluency for academic and professional contexts.',
        shortDescription: 'Master-level Chinese language certification',
        price: 22000, // $220
        salaryIncrease: 8000,
        studyTimeHours: 200,
        studyTimeWeeks: 28,
        experienceLevel: 'Expert',
        demandLevel: 'High',
        hasGuide: true,
        isFeatured: true,
        isActive: true,
        isHighSchoolReady: true,
        minimumAge: 16,
        enrollUrl: 'https://www.chinesetest.cn',
        keySkills: ['Near-Native Fluency', 'Academic Writing', 'Professional Translation', 'Cultural Nuance Understanding'],
        targetAudience: ['HSK 5 graduates', 'Pre-university students', 'Future Mandarin teachers', 'International business professionals'],
        industryFocus: ['Education', 'International Business', 'Translation', 'Diplomacy', 'Academic Research'],
        pathwayType: ['Language Learning', 'College Prep', 'Professional Development'],
        prerequisiteCerts: ['hsk-level-5-chinese-student'],
        nextCerts: [],
        categoryId: category.id,
        providerId: provider.id,
      },
    });

    // Fix HSK Level 3 prerequisites (missing HSK Level 2)
    await prisma.certification.update({
      where: { slug: 'hsk-level-3-chinese-student' },
      data: {
        prerequisiteCerts: ['hsk-level-2-chinese-student'],
        nextCerts: ['hsk-level-4-chinese-student']
      }
    });

    // Fix HSK Level 4 next certifications (should lead to HSK Level 5)
    await prisma.certification.update({
      where: { slug: 'hsk-level-4-chinese-student' },
      data: {
        nextCerts: ['hsk-level-5-chinese-student']
      }
    });

    console.log('✅ Added HSK Level 5:', hskLevel5.title);
    console.log('✅ Added HSK Level 6:', hskLevel6.title);
    console.log('✅ Fixed HSK Level 3 prerequisites');
    console.log('✅ Fixed HSK Level 4 next certifications');
    console.log('✅ Complete HSK pathway: Level 1 → Level 2 → Level 3 → Level 4 → Level 5 → Level 6');

  } catch (error) {
    console.error('Error completing HSK pathway:', error);
  } finally {
    await prisma.$disconnect();
  }
}

completeHSKPathway();