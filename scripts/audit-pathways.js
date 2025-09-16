const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function auditAllPathways() {
  try {
    // Get all student-ready certifications grouped by provider/category
    const allCerts = await prisma.certification.findMany({
      where: { 
        isHighSchoolReady: true,
        isActive: true
      },
      select: {
        slug: true,
        title: true,
        prerequisiteCerts: true,
        nextCerts: true,
        provider: { select: { name: true, slug: true } },
        category: { select: { name: true, slug: true } }
      },
      orderBy: [
        { provider: { name: 'asc' } },
        { title: 'asc' }
      ]
    });
    
    console.log('=== CERTIFICATION PATHWAY AUDIT ===');
    console.log('Total student certifications:', allCerts.length);
    console.log('');
    
    // Group by provider for analysis
    const byProvider = {};
    allCerts.forEach(cert => {
      const provider = cert.provider.name;
      if (!byProvider[provider]) byProvider[provider] = [];
      byProvider[provider].push(cert);
    });
    
    Object.keys(byProvider).forEach(provider => {
      console.log('Provider:', provider);
      console.log('Count:', byProvider[provider].length);
      byProvider[provider].forEach(cert => {
        console.log('  -', cert.title);
        console.log('    Slug:', cert.slug);
        console.log('    Prerequisites:', cert.prerequisiteCerts?.length ? cert.prerequisiteCerts : 'None');
        console.log('    Next certs:', cert.nextCerts?.length ? cert.nextCerts : 'None');
      });
      console.log('');
    });
    
    // Look for potential pathway issues
    console.log('=== PATHWAY ANALYSIS ===');
    
    // Find certs with no prerequisites and no next certs (isolated)
    const isolated = allCerts.filter(cert => 
      (!cert.prerequisiteCerts || cert.prerequisiteCerts.length === 0) && 
      (!cert.nextCerts || cert.nextCerts.length === 0)
    );
    
    console.log('Isolated certifications (no pathways):');
    isolated.forEach(cert => {
      console.log('  -', cert.title, '(' + cert.provider.name + ')');
    });
    console.log('');
    
    // Find certs that reference non-existent prerequisites/next certs
    const allSlugs = new Set(allCerts.map(c => c.slug));
    const brokenLinks = [];
    
    allCerts.forEach(cert => {
      if (cert.prerequisiteCerts) {
        cert.prerequisiteCerts.forEach(prereq => {
          if (!allSlugs.has(prereq)) {
            brokenLinks.push({ cert: cert.title, type: 'prerequisite', missing: prereq });
          }
        });
      }
      if (cert.nextCerts) {
        cert.nextCerts.forEach(next => {
          if (!allSlugs.has(next)) {
            brokenLinks.push({ cert: cert.title, type: 'next', missing: next });
          }
        });
      }
    });
    
    if (brokenLinks.length > 0) {
      console.log('Broken pathway links:');
      brokenLinks.forEach(link => {
        console.log('  -', link.cert, 'references missing', link.type + ':', link.missing);
      });
    } else {
      console.log('No broken pathway links found ✅');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

auditAllPathways();