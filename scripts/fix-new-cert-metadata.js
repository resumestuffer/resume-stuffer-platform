const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixNewCertMetadata() {
  try {
    console.log('🔧 Fixing metadata and hasGuide fields for new technology certifications...');

    // Google Cybersecurity Professional Certificate
    await prisma.certification.update({
      where: { slug: 'google-cybersecurity-student' },
      data: {
        hasGuide: true,
        metaTitle: 'Google Cybersecurity Professional Certificate for Students | Resume Stuffer',
        metaDescription: 'Get Google Cybersecurity Professional Certificate as a high school student. Learn security fundamentals, network security, SIEM tools, and incident response. Free with financial aid.',
        keywords: ['google cybersecurity', 'cybersecurity certificate', 'student cybersecurity', 'security fundamentals', 'network security', 'SIEM tools', 'incident response', 'high school cybersecurity']
      }
    });

    // Python PCEP (Entry-Level)
    await prisma.certification.update({
      where: { slug: 'python-pcep-student' },
      data: {
        hasGuide: true,
        metaTitle: 'Python PCEP Certification for Students | Entry-Level Python Programming',
        metaDescription: 'Start your programming journey with Python PCEP certification for high school students. Learn Python fundamentals, data types, control structures, and functions. Entry-level programming certification.',
        keywords: ['python pcep', 'python certification', 'entry level python', 'student programming', 'python fundamentals', 'programming certification', 'high school programming', 'python institute']
      }
    });

    // Python PCAP (Associate)
    await prisma.certification.update({
      where: { slug: 'python-pcap-student' },
      data: {
        hasGuide: true,
        metaTitle: 'Python PCAP Certification for Students | Associate Python Programming',
        metaDescription: 'Advance your Python skills with PCAP certification for students. Learn OOP, modules, packages, exception handling, and file operations. Intermediate Python programming certification.',
        keywords: ['python pcap', 'python certification', 'associate python', 'python oop', 'python modules', 'intermediate python', 'student programming', 'python institute']
      }
    });

    // Harvard CS50
    await prisma.certification.update({
      where: { slug: 'harvard-cs50-student' },
      data: {
        hasGuide: true,
        metaTitle: 'Harvard CS50 Computer Science Course for Students | Resume Stuffer',
        metaDescription: 'Take Harvard CS50 Introduction to Computer Science for high school students. Learn programming fundamentals, algorithms, data structures, C, Python, SQL, JavaScript, CSS, and HTML.',
        keywords: ['harvard cs50', 'computer science course', 'harvard programming', 'cs50 student', 'programming fundamentals', 'algorithms', 'data structures', 'high school computer science']
      }
    });

    // AWS Cloud Practitioner
    await prisma.certification.update({
      where: { slug: 'aws-cloud-practitioner-student' },
      data: {
        hasGuide: true,
        metaTitle: 'AWS Cloud Practitioner Certification for Students | Cloud Computing Basics',
        metaDescription: 'Get AWS Certified Cloud Practitioner certification as a student. Learn cloud concepts, AWS services, security, architecture, and pricing. Entry-level cloud computing certification.',
        keywords: ['aws cloud practitioner', 'aws certification', 'cloud computing', 'student cloud certification', 'aws basics', 'cloud fundamentals', 'high school aws', 'cloud practitioner student']
      }
    });

    // Microsoft Azure Fundamentals
    await prisma.certification.update({
      where: { slug: 'azure-fundamentals-student' },
      data: {
        hasGuide: true,
        metaTitle: 'Microsoft Azure Fundamentals AZ-900 for Students | Cloud Certification',
        metaDescription: 'Earn Microsoft Azure Fundamentals (AZ-900) certification as a student. Learn cloud concepts, Azure services, workloads, security, and governance. Entry-level Azure certification.',
        keywords: ['azure fundamentals', 'az-900', 'microsoft azure', 'azure certification', 'student cloud certification', 'azure basics', 'cloud fundamentals', 'high school azure']
      }
    });

    // Meta Front-End Developer
    await prisma.certification.update({
      where: { slug: 'meta-frontend-developer-student' },
      data: {
        hasGuide: true,
        metaTitle: 'Meta Front-End Developer Certificate for Students | Web Development',
        metaDescription: 'Get Meta Front-End Developer Professional Certificate for high school students. Learn HTML, CSS, JavaScript, React, UX/UI design, and build a professional portfolio. Free with financial aid.',
        keywords: ['meta frontend developer', 'web development', 'student web development', 'html css javascript', 'react certification', 'frontend programming', 'ux ui design', 'high school web development']
      }
    });

    // Google IT Automation with Python
    await prisma.certification.update({
      where: { slug: 'google-it-automation-student' },
      data: {
        hasGuide: true,
        metaTitle: 'Google IT Automation with Python Certificate for Students | IT Automation',
        metaDescription: 'Learn IT automation with Google\'s Python certificate for students. Master Python programming, troubleshooting, configuration management, version control, and cloud automation.',
        keywords: ['google it automation', 'python automation', 'it automation student', 'python programming', 'system administration', 'configuration management', 'git version control', 'cloud automation']
      }
    });

    console.log('✅ Successfully updated all new technology certifications with:');
    console.log('   - hasGuide: true (enables individual pages)');
    console.log('   - metaTitle: SEO-optimized titles');
    console.log('   - metaDescription: Compelling descriptions for search results');
    console.log('   - keywords: Relevant search terms for each certification');
    
    console.log('\n🎯 Individual certification pages will now be accessible for all new tech certifications!');

  } catch (error) {
    console.error('❌ Error fixing certification metadata:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixNewCertMetadata();