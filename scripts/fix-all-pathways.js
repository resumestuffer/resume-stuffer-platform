const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixAllPathways() {
  try {
    console.log('Fixing all certification pathway issues...');

    // Get necessary providers and categories
    const franceProvider = await prisma.provider.findUnique({
      where: { slug: 'france-education-intl' }
    });

    const cervantesProvider = await prisma.provider.findUnique({
      where: { slug: 'instituto-cervantes' }
    });

    const category = await prisma.category.findUnique({
      where: { slug: 'high-school-student' }
    });

    if (!franceProvider || !cervantesProvider || !category) {
      throw new Error('Required providers or category not found');
    }

    // 1. Add missing DELF French A1 level
    console.log('Adding DELF French A1...');
    const delfA1 = await prisma.certification.upsert({
      where: { slug: 'delf-french-a1-student' },
      update: {},
      create: {
        title: 'DELF French A1 (Beginner)',
        slug: 'delf-french-a1-student',
        description: 'Beginner French language certification. Basic knowledge of French for simple interactions and familiar topics.',
        shortDescription: 'Beginner French language certification',
        price: 10000, // $100
        salaryIncrease: 1500,
        studyTimeHours: 60,
        studyTimeWeeks: 8,
        experienceLevel: 'Beginner',
        demandLevel: 'Medium',
        hasGuide: true,
        isFeatured: false,
        isActive: true,
        isHighSchoolReady: true,
        minimumAge: 14,
        enrollUrl: 'https://www.france-education-international.fr/en/diplome/delf-tout-public',
        keySkills: ['Basic French Communication', 'Simple Vocabulary', 'Basic Grammar', 'Everyday Phrases'],
        targetAudience: ['Complete French beginners', 'High school language learners', 'Travel preparation'],
        industryFocus: ['Education', 'Tourism', 'International Business', 'Cultural Exchange'],
        pathwayType: ['Language Learning', 'College Prep'],
        nextCerts: ['delf-french-a2-student'],
        categoryId: category.id,
        providerId: franceProvider.id,
      },
    });

    // 2. Add missing DELE Spanish A1 level  
    console.log('Adding DELE Spanish A1...');
    const deleA1 = await prisma.certification.upsert({
      where: { slug: 'dele-spanish-a1-student' },
      update: {},
      create: {
        title: 'DELE Spanish A1 (Beginner)',
        slug: 'dele-spanish-a1-student',
        description: 'Beginner Spanish language certification. Basic knowledge of Spanish for simple interactions and familiar topics.',
        shortDescription: 'Beginner Spanish language certification',
        price: 10000, // $100
        salaryIncrease: 1500,
        studyTimeHours: 60,
        studyTimeWeeks: 8,
        experienceLevel: 'Beginner',
        demandLevel: 'Medium',
        hasGuide: true,
        isFeatured: false,
        isActive: true,
        isHighSchoolReady: true,
        minimumAge: 14,
        enrollUrl: 'https://www.dele.org/',
        keySkills: ['Basic Spanish Communication', 'Simple Vocabulary', 'Basic Grammar', 'Everyday Phrases'],
        targetAudience: ['Complete Spanish beginners', 'High school language learners', 'Travel preparation'],
        industryFocus: ['Education', 'Tourism', 'International Business', 'Cultural Exchange'],
        pathwayType: ['Language Learning', 'College Prep'],
        nextCerts: ['dele-spanish-a2-student'],
        categoryId: category.id,
        providerId: cervantesProvider.id,
      },
    });

    // 3. Add missing DELE Spanish B2 level
    console.log('Adding DELE Spanish B2...');
    const deleB2 = await prisma.certification.upsert({
      where: { slug: 'dele-spanish-b2-student' },
      update: {},
      create: {
        title: 'DELE Spanish B2 (Upper-Intermediate)',
        slug: 'dele-spanish-b2-student',
        description: 'Upper-intermediate Spanish certification. Can engage in detailed discussions, understand nuanced cultural references, and handle professional contexts.',
        shortDescription: 'Upper-intermediate Spanish certification',
        price: 18000, // $180
        salaryIncrease: 4000,
        studyTimeHours: 150,
        studyTimeWeeks: 20,
        experienceLevel: 'Advanced',
        demandLevel: 'High',
        hasGuide: true,
        isFeatured: false,
        isActive: true,
        isHighSchoolReady: true,
        minimumAge: 16,
        enrollUrl: 'https://www.dele.org/',
        keySkills: ['Advanced Spanish Communication', 'Professional Spanish', 'Cultural Understanding', 'Academic Writing'],
        targetAudience: ['DELE B1 graduates', 'Advanced Spanish students', 'University-bound students'],
        industryFocus: ['Education', 'International Business', 'Translation', 'Tourism'],
        pathwayType: ['Language Learning', 'College Prep', 'Professional Development'],
        prerequisiteCerts: ['dele-spanish-b1-student'],
        categoryId: category.id,
        providerId: cervantesProvider.id,
      },
    });

    // 4. Fix CompTIA A+ to show ITF+ as prerequisite
    console.log('Fixing CompTIA A+ prerequisites...');
    await prisma.certification.update({
      where: { slug: 'comptia-a-plus-high-school' },
      data: {
        prerequisiteCerts: ['comptia-itf-plus-fundamentals'],
        nextCerts: ['comptia-network-plus-student']
      }
    });

    // 5. Fix OSHA 10-Hour to show connection to 30-Hour
    console.log('Fixing OSHA 10-Hour next certification...');
    await prisma.certification.update({
      where: { slug: 'osha-10-hour-safety-training' },
      data: {
        nextCerts: ['osha-30-hour-safety-training']
      }
    });

    // 6. Update DELF French A2 to show A1 as prerequisite
    console.log('Updating DELF French A2 prerequisites...');
    await prisma.certification.update({
      where: { slug: 'delf-french-a2-student' },
      data: {
        prerequisiteCerts: ['delf-french-a1-student']
      }
    });

    // 7. Update DELE Spanish A2 to show A1 as prerequisite
    console.log('Updating DELE Spanish A2 prerequisites...');
    await prisma.certification.update({
      where: { slug: 'dele-spanish-a2-student' },
      data: {
        prerequisiteCerts: ['dele-spanish-a1-student']
      }
    });

    // 8. Update DELE Spanish B1 to connect to B2
    console.log('Updating DELE Spanish B1 next certification...');
    await prisma.certification.update({
      where: { slug: 'dele-spanish-b1-student' },
      data: {
        nextCerts: ['dele-spanish-b2-student']
      }
    });

    console.log('✅ Added DELF French A1:', delfA1.title);
    console.log('✅ Added DELE Spanish A1:', deleA1.title);
    console.log('✅ Added DELE Spanish B2:', deleB2.title);
    console.log('✅ Fixed CompTIA pathway: ITF+ → A+ → Network+ → Security+');
    console.log('✅ Fixed OSHA pathway: 10-Hour → 30-Hour');
    console.log('✅ Fixed French pathway: A1 → A2 → B1 → B2');
    console.log('✅ Fixed Spanish pathway: A1 → A2 → B1 → B2');
    console.log('');
    console.log('All certification pathways are now complete! 🎉');

  } catch (error) {
    console.error('Error fixing pathways:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAllPathways();