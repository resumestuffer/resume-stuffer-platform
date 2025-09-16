const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkNewCerts() {
  try {
    console.log('Checking for newly added technology certifications...');

    const newCerts = await prisma.certification.findMany({
      where: {
        OR: [
          { slug: 'google-cybersecurity-student' },
          { slug: 'python-pcep-student' },
          { slug: 'python-pcap-student' },
          { slug: 'harvard-cs50-student' },
          { slug: 'aws-cloud-practitioner-student' },
          { slug: 'azure-fundamentals-student' },
          { slug: 'meta-frontend-developer-student' },
          { slug: 'google-it-automation-student' }
        ]
      },
      select: {
        slug: true,
        title: true,
        isHighSchoolReady: true,
        isActive: true
      }
    });

    console.log(`Found ${newCerts.length} new certifications:`);
    newCerts.forEach(cert => {
      console.log(`- ${cert.title} (${cert.slug})`);
      console.log(`  High School Ready: ${cert.isHighSchoolReady}`);
      console.log(`  Active: ${cert.isActive}`);
    });

    // Also check total count of high school ready certs
    const totalHighSchoolCerts = await prisma.certification.count({
      where: {
        isHighSchoolReady: true,
        isActive: true
      }
    });

    console.log(`\nTotal high school ready certifications: ${totalHighSchoolCerts}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkNewCerts();