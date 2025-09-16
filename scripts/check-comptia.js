const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCompTIA() {
  try {
    const comptiaeCerts = await prisma.certification.findMany({
      where: {
        title: {
          contains: 'CompTIA',
          mode: 'insensitive'
        }
      },
      select: {
        slug: true,
        title: true,
        isHighSchoolReady: true
      }
    });

    console.log('Found CompTIA certifications:');
    comptiaeCerts.forEach(cert => {
      console.log(`- ${cert.title} (${cert.slug}) - High School Ready: ${cert.isHighSchoolReady}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCompTIA();