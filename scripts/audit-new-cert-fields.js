const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function auditNewCertFields() {
  try {
    console.log('🔍 Auditing new technology certifications for missing fields...');

    const newTechCerts = await prisma.certification.findMany({
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
        description: true,
        hasGuide: true,
        metaTitle: true,
        metaDescription: true,
        keywords: true
      }
    });

    console.log(`\n📊 Found ${newTechCerts.length} new technology certifications:`);
    
    const issues = [];
    
    newTechCerts.forEach(cert => {
      console.log(`\n🔸 ${cert.title} (${cert.slug}):`);
      console.log(`  - Description: ${cert.description ? 'EXISTS' : '❌ MISSING'}`);
      console.log(`  - hasGuide: ${cert.hasGuide}`);
      console.log(`  - metaTitle: ${cert.metaTitle ? 'EXISTS' : '❌ MISSING'}`);
      console.log(`  - metaDescription: ${cert.metaDescription ? 'EXISTS' : '❌ MISSING'}`);
      console.log(`  - keywords: ${cert.keywords && cert.keywords.length > 0 ? `${cert.keywords.length} keywords` : '❌ MISSING'}`);
      
      const certIssues = [];
      if (!cert.description) certIssues.push('description');
      if (!cert.metaTitle) certIssues.push('metaTitle');
      if (!cert.metaDescription) certIssues.push('metaDescription');
      if (!cert.keywords || cert.keywords.length === 0) certIssues.push('keywords');
      
      if (certIssues.length > 0) {
        issues.push({
          slug: cert.slug,
          title: cert.title,
          issues: certIssues
        });
      }
    });

    console.log(`\n📋 SUMMARY:`);
    console.log(`  - Total certifications: ${newTechCerts.length}`);
    console.log(`  - Certifications with issues: ${issues.length}`);
    
    if (issues.length > 0) {
      console.log(`\n❌ ISSUES FOUND:`);
      issues.forEach(cert => {
        console.log(`  - ${cert.title}: ${cert.issues.join(', ')}`);
      });
    } else {
      console.log(`\n✅ All new certifications have complete metadata!`);
    }

  } catch (error) {
    console.error('❌ Error auditing certification fields:', error);
  } finally {
    await prisma.$disconnect();
  }
}

auditNewCertFields();