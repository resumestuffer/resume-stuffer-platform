const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createAllComplementaryRelationships() {
  try {
    console.log('🚀 CREATING COMPREHENSIVE COMPLEMENTARY RELATIONSHIPS (FIXED SLUGS)');
    console.log('====================================================================\n');

    // First, clear all existing complementary certs to start fresh
    console.log('🧹 Clearing all existing complementary certifications...');
    await prisma.certification.updateMany({
      data: {
        complementaryCerts: []
      }
    });
    console.log('✅ Cleared all existing complementary certifications\n');

    // Define comprehensive complementary relationship clusters with CORRECT SLUGS
    const complementaryCluster = [
      // =============================================================================
      // 1. DATA SCIENCE & ANALYTICS CLUSTER (15 certifications)
      // =============================================================================
      {
        name: 'Data Science & Analytics Cluster',
        certifications: [
          'aws-data-analytics-specialty',
          'aws-database-specialty',
          'azure-data-engineer-associate',
          'databricks-certified-associate-developer',
          'google-analytics-4',
          'google-analytics-gaiq-student',
          'google-cloud-professional-data-engineer',
          'google-data-analytics',
          'ibm-data-science',
          'azure-data-scientist',
          'power-bi-data-analyst',
          'oracle-database-sql-certified-associate',
          'sas-certified-base-programmer',
          'snowflake-certified-data-engineer',
          'tableau-desktop-specialist'
        ]
      },

      // =============================================================================
      // 2. SECURITY CLUSTER (9 certifications)
      // =============================================================================
      {
        name: 'Security Cluster',
        certifications: [
          'aws-security-specialty',
          'azure-security-engineer-associate',
          'certified-ethical-hacker',
          'cism',
          'cisa',
          'cissp',
          'kubernetes-cks',
          'comptia-security-plus',
          'sans-gcih-certified-incident-handler'
        ]
      },

      // =============================================================================
      // 3. PROJECT MANAGEMENT CLUSTER (5 certifications)
      // =============================================================================
      {
        name: 'Project Management Cluster',
        certifications: [
          'certified-associate-in-project-management',
          'certified-scrum-master',
          'pmi-agile-certified-practitioner',
          'prince2-foundation',
          'pmp'
        ]
      },

      // =============================================================================
      // 4. MARKETING & DIGITAL ADVERTISING CLUSTER (15 certifications)
      // =============================================================================
      {
        name: 'Marketing & Digital Advertising Cluster',
        certifications: [
          'amazon-advertising-certified',
          'google-ads-display',
          'google-ads-search',
          'google-ads-video',
          'google-analytics-4',
          'google-analytics-gaiq-student',
          'google-digital-marketing',
          'hootsuite-social-media-marketing',
          'hubspot-content-marketing',
          'linkedin-marketing-solutions',
          'mailchimp-email-marketing',
          'facebook-certified-marketing-science-professional',
          'semrush-seo-toolkit-course',
          'x-ads-academy',
          'x-business-marketing'
        ]
      },

      // =============================================================================
      // 5. UX/DESIGN CLUSTER (8 certifications)
      // =============================================================================
      {
        name: 'UX/Design Cluster',
        certifications: [
          'adobe-certified-expert-illustrator',
          'adobe-certified-expert-photoshop',
          'canva-design-school-certificate',
          'figma-professional-certificate',
          'google-ux-design',
          'interaction-design-foundation-ux-certificate',
          'sketch-certified-user',
          'autodesk-certified-user'
        ]
      },

      // =============================================================================
      // 6. AWS CLOUD SPECIALTIES CLUSTER
      // =============================================================================
      {
        name: 'AWS Cloud Specialties Cluster',
        certifications: [
          'aws-advanced-networking-specialty',
          'aws-data-analytics-specialty',
          'aws-database-specialty',
          'aws-machine-learning-specialty',
          'aws-sap-on-aws-specialty',
          'aws-security-specialty'
        ]
      },

      // =============================================================================
      // 7. AZURE SPECIALTIES CLUSTER
      // =============================================================================
      {
        name: 'Azure Specialties Cluster',
        certifications: [
          'microsoft-azure-fundamentals',
          'azure-ai-engineer-associate',
          'azure-data-engineer-associate',
          'azure-devops-engineer-expert',
          'azure-security-engineer-associate',
          'azure-data-scientist'
        ]
      },

      // =============================================================================
      // 8. GOOGLE CLOUD SPECIALTIES CLUSTER
      // =============================================================================
      {
        name: 'Google Cloud Specialties Cluster',
        certifications: [
          'google-cloud-associate-cloud-engineer',
          'google-cloud-professional-cloud-architect',
          'google-cloud-professional-cloud-developer',
          'google-cloud-professional-data-engineer',
          'google-cloud-professional-devops-engineer'
        ]
      },

      // =============================================================================
      // 9. KUBERNETES & CONTAINER ORCHESTRATION CLUSTER
      // =============================================================================
      {
        name: 'Kubernetes & Container Orchestration Cluster',
        certifications: [
          'kubernetes-cka',
          'kubernetes-ckad',
          'kubernetes-cks',
          'docker-certified-associate'
        ]
      },

      // =============================================================================
      // 10. DEVOPS & AUTOMATION CLUSTER
      // =============================================================================
      {
        name: 'DevOps & Automation Cluster',
        certifications: [
          'azure-devops-engineer-expert',
          'docker-certified-associate',
          'elastic-certified-engineer',
          'google-cloud-professional-devops-engineer',
          'hashicorp-terraform-associate',
          'jenkins-certified-engineer',
          'kubernetes-cka'
        ]
      },

      // =============================================================================
      // 11. DATABASE CLUSTER
      // =============================================================================
      {
        name: 'Database Cluster',
        certifications: [
          'aws-database-specialty',
          'azure-data-engineer-associate',
          'google-cloud-professional-data-engineer',
          'mongodb-certified-developer',
          'oracle-database-sql-certified-associate',
          'snowflake-certified-data-engineer'
        ]
      },

      // =============================================================================
      // 12. BUSINESS ANALYSIS & PROCESS IMPROVEMENT CLUSTER
      // =============================================================================
      {
        name: 'Business Analysis & Process Improvement Cluster',
        certifications: [
          'certified-business-analysis-professional',
          'change-management-certification',
          'lean-six-sigma-yellow-belt',
          'six-sigma-green-belt',
          'qlik-sense-business-analyst'
        ]
      },

      // =============================================================================
      // 13. SALESFORCE ECOSYSTEM CLUSTER
      // =============================================================================
      {
        name: 'Salesforce Ecosystem Cluster',
        certifications: [
          'salesforce-administrator',
          'salesforce-platform-app-builder',
          'salesforce-platform-developer-i'
        ]
      },

      // =============================================================================
      // 14. NETWORK & INFRASTRUCTURE CLUSTER
      // =============================================================================
      {
        name: 'Network & Infrastructure Cluster',
        certifications: [
          'aws-advanced-networking-specialty',
          'cisco-ccna',
          'red-hat-certified-system-administrator',
          'vmware-certified-professional',
          'itil-4-foundation'
        ]
      },

      // =============================================================================
      // 15. ADVANCED LANGUAGE LEARNING CLUSTER (Higher HSK/DELF/DELE levels)
      // =============================================================================
      {
        name: 'Advanced Language Learning Cluster',
        certifications: [
          'hsk-level-3-chinese-student',
          'hsk-level-4-chinese-student',
          'hsk-level-5-chinese-student',
          'hsk-level-6-chinese-student',
          'delf-french-b1-student',
          'delf-french-b2-student',
          'dele-spanish-b1-student',
          'dele-spanish-b2-student'
        ]
      },

      // =============================================================================
      // 16. MICROSOFT PRODUCTIVITY CLUSTER
      // =============================================================================
      {
        name: 'Microsoft Productivity Cluster',
        certifications: [
          'microsoft-office-specialist',
          'power-bi-data-analyst'
        ]
      },

      // =============================================================================
      // 17. X (TWITTER) PLATFORM CLUSTER
      // =============================================================================
      {
        name: 'X (Twitter) Platform Cluster',
        certifications: [
          'x-ads-academy',
          'x-api-developer',
          'x-business-marketing',
          'x-creator-economy'
        ]
      },

      // =============================================================================
      // 18. LOG MANAGEMENT & MONITORING CLUSTER
      // =============================================================================
      {
        name: 'Log Management & Monitoring Cluster',
        certifications: [
          'elastic-certified-engineer',
          'splunk-core-certified-user'
        ]
      },

      // =============================================================================
      // 19. WELDING CLUSTER
      // =============================================================================
      {
        name: 'Welding Cluster',
        certifications: [
          'aws-entry-level-welder',
          'aws-certified-welder'
        ]
      },

      // =============================================================================
      // 20. META/FACEBOOK PLATFORM CLUSTER
      // =============================================================================
      {
        name: 'Meta/Facebook Platform Cluster',
        certifications: [
          'facebook-certified-marketing-science-professional',
          'meta-frontend-developer-student'
        ]
      },

      // =============================================================================
      // 21. STUDENT TECH CLUSTER (Cross-promote student versions)
      // =============================================================================
      {
        name: 'Student Tech Cluster',
        certifications: [
          'google-cybersecurity-student',
          'google-data-analytics',
          'google-digital-marketing',
          'google-it-automation-student',
          'google-ux-design',
          'ibm-data-science',
          'meta-frontend-developer-student'
        ]
      }
    ];

    console.log('🔗 Setting up comprehensive complementary relationships...\n');

    let totalRelationshipsCreated = 0;
    let successfulCertifications = 0;
    let failedCertifications = 0;

    for (const cluster of complementaryCluster) {
      console.log(`📁 Processing: ${cluster.name} (${cluster.certifications.length} certifications)`);

      // For each certification in the cluster
      for (const certSlug of cluster.certifications) {
        // Get all other certifications in the same cluster as complementary
        const complementaryCerts = cluster.certifications.filter(slug => slug !== certSlug);

        try {
          const cert = await prisma.certification.findUnique({
            where: { slug: certSlug },
            select: { title: true }
          });

          if (cert) {
            await prisma.certification.update({
              where: { slug: certSlug },
              data: {
                complementaryCerts: complementaryCerts
              }
            });
            console.log(`   ✅ ${cert.title} → ${complementaryCerts.length} complementary certs`);
            totalRelationshipsCreated += complementaryCerts.length;
            successfulCertifications++;
          } else {
            console.log(`   ❌ ${certSlug} not found`);
            failedCertifications++;
          }
        } catch (error) {
          console.log(`   ❌ Error updating ${certSlug}: ${error.message}`);
          failedCertifications++;
        }
      }
      console.log();
    }

    // Cross-cluster relationships for logical overlaps
    console.log('🔀 Setting up strategic cross-cluster relationships...\n');

    const crossClusterRelationships = [
      // Data Analytics can complement Marketing Analytics
      {
        from: ['google-data-analytics', 'ibm-data-science'],
        to: ['google-analytics-4', 'google-digital-marketing']
      },
      // Security can complement Cloud Security
      {
        from: ['cissp', 'certified-ethical-hacker'],
        to: ['aws-security-specialty', 'azure-security-engineer-associate']
      },
      // UX/Design can complement Accessibility
      {
        from: ['google-ux-design', 'figma-professional-certificate'],
        to: ['iaap-certified-professional-in-accessibility-core-competencies-cpacc']
      },
      // Financial analysis can complement data science
      {
        from: ['chartered-financial-analyst'],
        to: ['google-data-analytics', 'power-bi-data-analyst', 'tableau-desktop-specialist']
      }
    ];

    for (const relationship of crossClusterRelationships) {
      for (const fromCert of relationship.from) {
        try {
          const cert = await prisma.certification.findUnique({
            where: { slug: fromCert },
            select: { title: true, complementaryCerts: true }
          });

          if (cert) {
            // Add the new complementary certs to existing ones
            const updatedComplements = [...new Set([...cert.complementaryCerts, ...relationship.to])];

            await prisma.certification.update({
              where: { slug: fromCert },
              data: {
                complementaryCerts: updatedComplements
              }
            });
            console.log(`   🔀 ${cert.title} → Added ${relationship.to.length} cross-cluster complements`);
          }
        } catch (error) {
          console.log(`   ❌ Error in cross-cluster relationship for ${fromCert}: ${error.message}`);
        }
      }
    }

    // Final verification
    console.log('\n🔍 Verifying all complementary relationships...\n');

    const allCertsWithComplements = await prisma.certification.findMany({
      where: {
        complementaryCerts: { isEmpty: false }
      },
      select: {
        slug: true,
        title: true,
        complementaryCerts: true
      }
    });

    const totalCerts = await prisma.certification.count();
    const certsWithComplements = allCertsWithComplements.length;
    const coveragePercentage = Math.round((certsWithComplements / totalCerts) * 100);

    console.log('📊 FINAL STATISTICS:');
    console.log(`Total certifications in database: ${totalCerts}`);
    console.log(`Certifications with complementary relationships: ${certsWithComplements}`);
    console.log(`Coverage: ${coveragePercentage}%`);
    console.log(`Total complementary relationship connections: ${totalRelationshipsCreated}`);
    console.log(`Successful certifications: ${successfulCertifications}`);
    console.log(`Failed certifications: ${failedCertifications}`);

    console.log('\n🎯 BEFORE vs AFTER:');
    console.log('❌ BEFORE: 27/128 certifications (21%) had complementary relationships');
    console.log(`✅ AFTER: ${certsWithComplements}/${totalCerts} certifications (${coveragePercentage}%) have complementary relationships`);
    console.log(`🚀 IMPROVEMENT: ${coveragePercentage - 21}% increase in cross-promotion coverage!`);

    if (coveragePercentage >= 75) {
      console.log('\n🎉 EXCELLENT! We achieved 75%+ coverage of complementary relationships!');
    } else if (coveragePercentage >= 50) {
      console.log('\n✅ GOOD! We achieved 50%+ coverage of complementary relationships!');
    } else {
      console.log('\n⚠️  More work needed to reach 50%+ coverage');
    }

  } catch (error) {
    console.error('❌ Error creating complementary relationships:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAllComplementaryRelationships();