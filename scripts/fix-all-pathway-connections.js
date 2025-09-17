const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixAllPathwayConnections() {
  try {
    console.log('🔧 FIXING ALL PATHWAY CONNECTIONS');
    console.log('==================================\n');

    // Define clear, linear learning pathways
    const definedPathways = [
      // CompTIA IT Pathway
      {
        name: 'CompTIA IT Fundamentals to Security+',
        certs: [
          'comptia-itf-plus-fundamentals',
          'comptia-a-plus-high-school',
          'comptia-network-plus-student',
          'comptia-security-plus-student'
        ]
      },

      // AWS Cloud Architect Pathway
      {
        name: 'AWS Cloud Architect',
        certs: [
          'aws-cloud-practitioner',
          'aws-solutions-architect-associate',
          'aws-solutions-architect-professional'
        ]
      },

      // AWS SysOps Pathway
      {
        name: 'AWS SysOps Engineer',
        certs: [
          'aws-cloud-practitioner',
          'aws-sysops-administrator-associate',
          'aws-devops-professional'
        ]
      },

      // Google Cloud Pathway
      {
        name: 'Google Cloud Engineer to Architect',
        certs: [
          'google-cloud-associate-cloud-engineer',
          'google-cloud-professional-cloud-architect'
        ]
      },

      // Azure Pathway
      {
        name: 'Azure Administrator to Solutions Architect',
        certs: [
          'microsoft-azure-fundamentals',
          'azure-administrator-associate',
          'azure-solutions-architect-expert'
        ]
      },

      // Python Programming Pathway
      {
        name: 'Python Programming Progression',
        certs: [
          'python-pcep-student',
          'python-pcap-student'
        ]
      },

      // Kubernetes Pathway
      {
        name: 'Kubernetes Specialization',
        certs: [
          'kubernetes-cka',
          'kubernetes-cks'
        ]
      },

      // Welding Pathway
      {
        name: 'AWS Welding Certification',
        certs: [
          'aws-entry-level-welder',
          'aws-certified-welder'
        ]
      },

      // OSHA Safety Pathway
      {
        name: 'OSHA Safety Training',
        certs: [
          'osha-10-hour-safety-training',
          'osha-30-hour-safety-training'
        ]
      },

      // AP Capstone Pathway
      {
        name: 'AP Capstone Program',
        certs: [
          'ap-seminar',
          'ap-research'
        ]
      },

      // Chinese Language Pathway (HSK)
      {
        name: 'HSK Chinese Language Mastery',
        certs: [
          'hsk-level-1-chinese-student',
          'hsk-level-2-chinese-student',
          'hsk-level-3-chinese-student',
          'hsk-level-4-chinese-student',
          'hsk-level-5-chinese-student',
          'hsk-level-6-chinese-student'
        ]
      },

      // French Language Pathway (DELF)
      {
        name: 'DELF French Language Proficiency',
        certs: [
          'delf-french-a1-student',
          'delf-french-a2-student',
          'delf-french-b1-student',
          'delf-french-b2-student'
        ]
      },

      // Spanish Language Pathway (DELE)
      {
        name: 'DELE Spanish Language Proficiency',
        certs: [
          'dele-spanish-a1-student',
          'dele-spanish-a2-student',
          'dele-spanish-b1-student',
          'dele-spanish-b2-student'
        ]
      }
    ];

    // Cross-connections (complementary certifications, not main pathways)
    const crossConnections = [
      {
        cert: 'comptia-itf-plus-fundamentals',
        complementary: ['python-pcep-student', 'harvard-cs50-student']
      },
      {
        cert: 'comptia-a-plus-high-school',
        complementary: ['aws-cloud-practitioner-student', 'google-it-automation-student']
      },
      {
        cert: 'google-cybersecurity-student',
        complementary: ['comptia-security-plus-student']
      },
      {
        cert: 'aws-sysops-administrator-associate',
        complementary: ['aws-solutions-architect-associate', 'aws-developer-associate']
      },
      {
        cert: 'kubernetes-ckad',
        complementary: ['kubernetes-cka']
      }
    ];

    console.log('🧹 Step 1: Clearing all existing pathway connections...\n');

    // Clear all existing connections first
    await prisma.certification.updateMany({
      data: {
        prerequisiteCerts: [],
        nextCerts: [],
        complementaryCerts: []
      }
    });

    console.log('✅ All existing connections cleared\n');

    console.log('🔗 Step 2: Establishing clean linear pathways...\n');

    // Build each pathway with proper bidirectional connections
    for (const pathway of definedPathways) {
      console.log(`Building pathway: ${pathway.name}`);

      for (let i = 0; i < pathway.certs.length; i++) {
        const currentSlug = pathway.certs[i];
        const prevSlug = i > 0 ? pathway.certs[i - 1] : null;
        const nextSlug = i < pathway.certs.length - 1 ? pathway.certs[i + 1] : null;

        const updates = {};

        if (prevSlug) {
          updates.prerequisiteCerts = [prevSlug];
        }

        if (nextSlug) {
          updates.nextCerts = [nextSlug];
        }

        try {
          await prisma.certification.update({
            where: { slug: currentSlug },
            data: updates
          });

          const cert = await prisma.certification.findUnique({
            where: { slug: currentSlug },
            select: { title: true }
          });

          console.log(`  ✅ ${cert?.title || currentSlug}`);
          if (prevSlug) console.log(`     ← Prerequisites: ${prevSlug}`);
          if (nextSlug) console.log(`     → Next: ${nextSlug}`);

        } catch (error) {
          console.log(`  ❌ Failed to update ${currentSlug}: ${error.message}`);
        }
      }
      console.log('');
    }

    console.log('🔄 Step 3: Adding complementary connections...\n');

    // Add complementary connections (separate from main pathways)
    for (const connection of crossConnections) {
      try {
        await prisma.certification.update({
          where: { slug: connection.cert },
          data: {
            complementaryCerts: connection.complementary
          }
        });

        const cert = await prisma.certification.findUnique({
          where: { slug: connection.cert },
          select: { title: true }
        });

        console.log(`✅ ${cert?.title || connection.cert}`);
        console.log(`   Complementary: ${connection.complementary.join(', ')}`);

      } catch (error) {
        console.log(`❌ Failed to add complementary for ${connection.cert}: ${error.message}`);
      }
    }

    console.log('\n🔍 Step 4: Final verification...\n');

    // Verify all connections are bidirectional
    const allCerts = await prisma.certification.findMany({
      select: {
        slug: true,
        title: true,
        prerequisiteCerts: true,
        nextCerts: true,
        complementaryCerts: true
      }
    });

    let issues = 0;
    for (const cert of allCerts) {
      // Check prerequisite connections
      if (cert.prerequisiteCerts) {
        for (const prereqSlug of cert.prerequisiteCerts) {
          const prereqCert = allCerts.find(c => c.slug === prereqSlug);
          if (prereqCert && (!prereqCert.nextCerts || !prereqCert.nextCerts.includes(cert.slug))) {
            console.log(`⚠️  ${cert.title} lists ${prereqSlug} as prerequisite, but ${prereqSlug} doesn't point back`);
            issues++;
          }
        }
      }

      // Check next cert connections
      if (cert.nextCerts) {
        for (const nextSlug of cert.nextCerts) {
          const nextCert = allCerts.find(c => c.slug === nextSlug);
          if (nextCert && (!nextCert.prerequisiteCerts || !nextCert.prerequisiteCerts.includes(cert.slug))) {
            console.log(`⚠️  ${cert.title} lists ${nextSlug} as next cert, but ${nextSlug} doesn't list it as prerequisite`);
            issues++;
          }
        }
      }
    }

    if (issues === 0) {
      console.log('✅ All pathway connections are properly bidirectional!');
    } else {
      console.log(`❌ Found ${issues} bidirectional connection issues`);
    }

    console.log('\n📊 PATHWAY SUMMARY');
    console.log('==================');
    console.log(`Total pathways established: ${definedPathways.length}`);
    console.log(`Cross-connections added: ${crossConnections.length}`);
    console.log(`Total certifications: ${allCerts.length}`);

    // Show pathway counts
    definedPathways.forEach(pathway => {
      console.log(`${pathway.name}: ${pathway.certs.length} certifications`);
    });

    console.log('\n🎉 ALL PATHWAY CONNECTIONS FIXED!');

  } catch (error) {
    console.error('❌ Error fixing pathway connections:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixAllPathwayConnections();