const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function researchStudyMaterials() {
  try {
    console.log('📚 Researching study materials for new technology certifications...');
    
    // First, let's check what study materials structure looks like for existing certs
    const existingCertWithMaterials = await prisma.certification.findFirst({
      where: {
        AND: [
          { isActive: true },
          { hasGuide: true }
        ]
      },
      select: {
        slug: true,
        title: true,
        studyMaterials: true
      }
    });

    console.log('\n🔍 Example of existing study materials structure:');
    console.log(`Certificate: ${existingCertWithMaterials?.title}`);
    console.log('Study Materials:', JSON.stringify(existingCertWithMaterials?.studyMaterials, null, 2));

    console.log('\n📋 Study Material Opportunities by Certification:');
    
    const studyMaterialOpportunities = [
      {
        slug: 'google-cybersecurity-student',
        title: 'Google Cybersecurity Professional Certificate',
        opportunities: [
          '📖 Coursera Plus subscription (affiliate link)',
          '📚 CompTIA Security+ study guides (for advanced students)',
          '💻 Cybersecurity practice labs and simulators',
          '📝 Additional cybersecurity books and resources',
          '🎯 Practice exam platforms'
        ],
        affiliateOpportunities: [
          'Coursera Plus annual subscription',
          'Amazon books on cybersecurity',
          'Udemy cybersecurity courses',
          'CompTIA study materials'
        ]
      },
      {
        slug: 'python-pcep-student',
        title: 'Python PCEP (Entry-Level)',
        opportunities: [
          '📖 Python Institute official materials',
          '📚 Python programming books for beginners',
          '💻 Online Python IDEs and tools',
          '🎯 Python practice platforms',
          '📝 PCEP-specific practice exams'
        ],
        affiliateOpportunities: [
          'Amazon Python books',
          'Udemy Python courses',
          'Python Institute materials',
          'PyCharm IDE subscriptions'
        ]
      },
      {
        slug: 'python-pcap-student', 
        title: 'Python PCAP (Associate)',
        opportunities: [
          '📖 Advanced Python programming books',
          '📚 Object-oriented programming resources',
          '💻 Python development tools',
          '🎯 Advanced Python practice platforms',
          '📝 PCAP practice exams'
        ],
        affiliateOpportunities: [
          'Amazon advanced Python books',
          'Udemy intermediate Python courses',
          'Python Institute official materials',
          'JetBrains PyCharm Professional'
        ]
      },
      {
        slug: 'harvard-cs50-student',
        title: 'Harvard CS50',
        opportunities: [
          '📖 CS50 official textbooks and materials',
          '📚 Computer science fundamentals books',
          '💻 Development environments and tools',
          '🎯 Algorithm and data structure resources',
          '📝 Programming practice platforms'
        ],
        affiliateOpportunities: [
          'Amazon CS textbooks',
          'GitHub Codespaces subscriptions',
          'Visual Studio Code extensions',
          'edX verified certificate upgrades'
        ]
      },
      {
        slug: 'aws-cloud-practitioner-student',
        title: 'AWS Cloud Practitioner',
        opportunities: [
          '📖 AWS official study guides',
          '📚 Cloud computing books',
          '💻 AWS practice labs and sandboxes',
          '🎯 AWS practice exams',
          '📝 Cloud fundamentals courses'
        ],
        affiliateOpportunities: [
          'Amazon AWS books and study guides',
          'Udemy AWS courses',
          'A Cloud Guru subscriptions',
          'Linux Academy materials'
        ]
      },
      {
        slug: 'azure-fundamentals-student',
        title: 'Microsoft Azure Fundamentals',
        opportunities: [
          '📖 Microsoft official learning paths',
          '📚 Azure fundamentals books',
          '💻 Azure free tier and labs',
          '🎯 AZ-900 practice exams',
          '📝 Microsoft Learn modules'
        ],
        affiliateOpportunities: [
          'Amazon Azure books',
          'Udemy Azure courses',
          'Pluralsight subscriptions',
          'Microsoft certification vouchers'
        ]
      },
      {
        slug: 'meta-frontend-developer-student',
        title: 'Meta Front-End Developer',
        opportunities: [
          '📖 React and JavaScript books',
          '📚 Web development resources',
          '💻 Code editors and development tools',
          '🎯 Frontend practice platforms',
          '📝 HTML/CSS/JavaScript tutorials'
        ],
        affiliateOpportunities: [
          'Amazon web development books',
          'Udemy React and JavaScript courses',
          'Coursera Plus subscription',
          'Visual Studio Code extensions'
        ]
      },
      {
        slug: 'google-it-automation-student',
        title: 'Google IT Automation with Python',
        opportunities: [
          '📖 Python automation books',
          '📚 System administration resources',
          '💻 Automation tools and platforms',
          '🎯 Git and version control materials',
          '📝 DevOps fundamentals'
        ],
        affiliateOpportunities: [
          'Amazon Python automation books',
          'Udemy automation courses',
          'GitHub Pro subscriptions',
          'Coursera Plus for Google certificates'
        ]
      }
    ];

    studyMaterialOpportunities.forEach(cert => {
      console.log(`\n🎯 ${cert.title}:`);
      console.log('  Study Material Ideas:');
      cert.opportunities.forEach(opp => console.log(`    ${opp}`));
      console.log('  Affiliate Opportunities:');
      cert.affiliateOpportunities.forEach(aff => console.log(`    💰 ${aff}`));
    });

    console.log('\n💡 RECOMMENDATIONS:');
    console.log('1. Amazon affiliate links for books and study guides');
    console.log('2. Udemy affiliate links for courses');
    console.log('3. Coursera Plus affiliate links (covers Google certs)');
    console.log('4. Platform-specific affiliate programs (GitHub, JetBrains, etc.)');
    console.log('5. Practice exam platforms with affiliate programs');
    
    console.log('\n🚀 NEXT STEPS:');
    console.log('1. Set up Amazon Associates account if not already done');
    console.log('2. Apply for Udemy affiliate program');
    console.log('3. Research Coursera affiliate opportunities');
    console.log('4. Create study material data structure to add to database');

  } catch (error) {
    console.error('❌ Error researching study materials:', error);
  } finally {
    await prisma.$disconnect();
  }
}

researchStudyMaterials();