const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function expandTechPathway() {
  try {
    console.log('🚀 Expanding technology pathway with diverse certifications...');

    // Get existing categories and providers, or create them
    const googleProvider = await prisma.provider.upsert({
      where: { slug: 'google' },
      update: {},
      create: {
        name: 'Google',
        slug: 'google',
        website: 'https://grow.google/certificates/',
        description: 'Google Career Certificates'
      }
    });

    const pythonInstituteProvider = await prisma.provider.upsert({
      where: { slug: 'python-institute' },
      update: {},
      create: {
        name: 'Python Institute',
        slug: 'python-institute',
        website: 'https://pythoninstitute.org/',
        description: 'Official Python certification programs'
      }
    });

    const awsProvider = await prisma.provider.upsert({
      where: { slug: 'aws' },
      update: {},
      create: {
        name: 'Amazon Web Services',
        slug: 'aws',
        website: 'https://aws.amazon.com/certification/',
        description: 'AWS Cloud Computing Certifications'
      }
    });

    const microsoftProvider = await prisma.provider.upsert({
      where: { slug: 'microsoft' },
      update: {},
      create: {
        name: 'Microsoft',
        slug: 'microsoft',
        website: 'https://learn.microsoft.com/en-us/certifications/',
        description: 'Microsoft Technology Certifications'
      }
    });

    const metaProvider = await prisma.provider.upsert({
      where: { slug: 'meta' },
      update: {},
      create: {
        name: 'Meta',
        slug: 'meta',
        website: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
        description: 'Meta Professional Certificates'
      }
    });

    const harvardProvider = await prisma.provider.upsert({
      where: { slug: 'harvard-university' },
      update: {},
      create: {
        name: 'Harvard University',
        slug: 'harvard-university',
        website: 'https://www.edx.org/school/harvardx',
        description: 'Harvard Online Courses'
      }
    });

    // Get technology category
    const technologyCategory = await prisma.category.findUnique({
      where: { slug: 'technology' }
    });

    if (!technologyCategory) {
      throw new Error('Technology category not found');
    }

    // 1. CYBERSECURITY CERTIFICATIONS
    console.log('📡 Adding cybersecurity certifications...');

    const googleCybersecurity = await prisma.certification.upsert({
      where: { slug: 'google-cybersecurity-student' },
      update: {},
      create: {
        title: 'Google Cybersecurity Professional Certificate',
        slug: 'google-cybersecurity-student',
        shortDescription: 'Comprehensive cybersecurity training covering security fundamentals, network security, incident response, and security tools.',
        description: 'This certificate program provides hands-on training in cybersecurity fundamentals, preparing students for entry-level cybersecurity analyst roles. Covers security frameworks, network security, Linux command line, SQL, SIEM tools, and incident response.',
        price: 0, // Free with Coursera Financial Aid
        studyTimeHours: 180,
        difficultyLevel: 1, // 1=Beginner, 2=Intermediate, 3=Advanced
        salaryIncrease: 15000,
        isHighSchoolReady: true,
        enrollUrl: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
        hasGuide: false,
        providerId: googleProvider.id,
        categoryId: technologyCategory.id,
        examCode: 'Google-Cyber',
        examFormat: 'Portfolio-based assessment with hands-on projects',
        examDuration: 0, // Portfolio-based, no single exam
        passingScore: 'Complete all courses and projects',
        passRate: 85,
        validityYears: 0, // Certificate doesn't expire
        minimumAge: 16,
        nextCerts: ['comptia-security-plus-student']
      }
    });

    // 2. PROGRAMMING CERTIFICATIONS
    console.log('💻 Adding programming certifications...');

    const pythonPCEP = await prisma.certification.upsert({
      where: { slug: 'python-pcep-student' },
      update: {},
      create: {
        title: 'Python PCEP (Entry-Level Python Programmer)',
        slug: 'python-pcep-student',
        shortDescription: 'Official entry-level Python certification covering programming fundamentals, data types, control structures, and functions.',
        description: 'The PCEP certification validates fundamental Python programming skills including basic syntax, data types, control flow, functions, and error handling. Perfect for students beginning their programming journey.',
        price: 5900, // $59
        studyTimeHours: 80,
        difficultyLevel: 1, // 1=Beginner, 2=Intermediate, 3=Advanced
        salaryIncrease: 12000,
        isHighSchoolReady: true,
        enrollUrl: 'https://pythoninstitute.org/pcep',
        hasGuide: false,
        providerId: pythonInstituteProvider.id,
        categoryId: technologyCategory.id,
        examCode: 'PCEP-30-02',
        examFormat: 'Single-choice and multiple-choice questions, drag & drop, gap fill',
        examDuration: 45,
        passingScore: '70%',
        passRate: 75,
        validityYears: 0, // Permanent certification
        minimumAge: 14,
        nextCerts: ['python-pcap-student']
      }
    });

    const pythonPCAP = await prisma.certification.upsert({
      where: { slug: 'python-pcap-student' },
      update: {},
      create: {
        title: 'Python PCAP (Associate Python Programmer)',
        slug: 'python-pcap-student',
        shortDescription: 'Intermediate Python certification covering OOP, modules, packages, exception handling, and file operations.',
        description: 'The PCAP certification validates intermediate Python skills including object-oriented programming, modules and packages, exception handling, file processing, and working with selected Python Standard Library modules.',
        price: 9500, // $95
        studyTimeHours: 120,
        difficultyLevel: 2, // 1=Beginner, 2=Intermediate, 3=Advanced
        salaryIncrease: 18000,
        isHighSchoolReady: true,
        enrollUrl: 'https://pythoninstitute.org/pcap',
        hasGuide: false,
        providerId: pythonInstituteProvider.id,
        categoryId: technologyCategory.id,
        examCode: 'PCAP-31-03',
        examFormat: 'Single-choice and multiple-choice questions, drag & drop, gap fill, code insertion',
        examDuration: 65,
        passingScore: '70%',
        passRate: 65,
        validityYears: 0, // Permanent certification
        minimumAge: 16,
        prerequisiteCerts: ['python-pcep-student']
      }
    });

    const harvardCS50 = await prisma.certification.upsert({
      where: { slug: 'harvard-cs50-student' },
      update: {},
      create: {
        title: 'Harvard CS50: Introduction to Computer Science',
        slug: 'harvard-cs50-student',
        shortDescription: 'Harvard\'s famous introduction to computer science covering programming fundamentals, algorithms, and web development.',
        description: 'CS50 is Harvard University\'s introduction to computer science and programming. Students learn C, Python, SQL, JavaScript, CSS, and HTML. Topics include algorithms, data structures, memory management, software engineering, and web development.',
        price: 0, // Free to audit, $99 for verified certificate
        studyTimeHours: 100,
        difficultyLevel: 1, // 1=Beginner, 2=Intermediate, 3=Advanced
        salaryIncrease: 10000,
        isHighSchoolReady: true,
        enrollUrl: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
        hasGuide: false,
        providerId: harvardProvider.id,
        categoryId: technologyCategory.id,
        examCode: 'CS50x',
        examFormat: 'Problem sets, labs, and final project',
        examDuration: 0, // Course-based assessment
        passingScore: 'Complete all assignments satisfactorily',
        passRate: 70,
        validityYears: 0, // Certificate doesn't expire
        minimumAge: 14
      }
    });

    // 3. CLOUD COMPUTING CERTIFICATIONS
    console.log('☁️ Adding cloud computing certifications...');

    const awsCloudPractitioner = await prisma.certification.upsert({
      where: { slug: 'aws-cloud-practitioner-student' },
      update: {},
      create: {
        title: 'AWS Certified Cloud Practitioner',
        slug: 'aws-cloud-practitioner-student',
        shortDescription: 'Entry-level AWS certification covering cloud concepts, core services, security, and pricing models.',
        description: 'The AWS Cloud Practitioner certification validates foundational cloud knowledge and understanding of AWS services, security, architecture, pricing, and support. Ideal for students entering cloud computing careers.',
        price: 10000, // $100
        studyTimeHours: 60,
        difficultyLevel: 1, // 1=Beginner, 2=Intermediate, 3=Advanced
        salaryIncrease: 14000,
        isHighSchoolReady: true,
        enrollUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
        hasGuide: false,
        providerId: awsProvider.id,
        categoryId: technologyCategory.id,
        examCode: 'CLF-C02',
        examFormat: 'Multiple choice and multiple response questions',
        examDuration: 90,
        passingScore: '700/1000 (70%)',
        passRate: 85,
        validityYears: 3,
        minimumAge: 16
      }
    });

    const azureFundamentals = await prisma.certification.upsert({
      where: { slug: 'azure-fundamentals-student' },
      update: {},
      create: {
        title: 'Microsoft Azure Fundamentals (AZ-900)',
        slug: 'azure-fundamentals-student',
        shortDescription: 'Entry-level Microsoft Azure certification covering cloud concepts, core services, and Azure pricing.',
        description: 'Azure Fundamentals certification validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure. Covers cloud concepts, Azure services, workloads, security, and governance.',
        price: 9900, // $99
        studyTimeHours: 50,
        difficultyLevel: 1, // 1=Beginner, 2=Intermediate, 3=Advanced
        salaryIncrease: 13000,
        isHighSchoolReady: true,
        enrollUrl: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/',
        hasGuide: false,
        providerId: microsoftProvider.id,
        categoryId: technologyCategory.id,
        examCode: 'AZ-900',
        examFormat: 'Multiple-choice questions, case studies, and drag-and-drop activities',
        examDuration: 85,
        passingScore: '700/1000 (70%)',
        passRate: 80,
        validityYears: 0, // Fundamentals don't expire
        minimumAge: 16
      }
    });

    // 4. WEB DEVELOPMENT CERTIFICATIONS
    console.log('🌐 Adding web development certifications...');

    const metaFrontEnd = await prisma.certification.upsert({
      where: { slug: 'meta-frontend-developer-student' },
      update: {},
      create: {
        title: 'Meta Front-End Developer Professional Certificate',
        slug: 'meta-frontend-developer-student',
        shortDescription: 'Comprehensive front-end development training covering HTML, CSS, JavaScript, React, and UX/UI design principles.',
        description: 'This professional certificate program teaches students to create responsive websites and user interfaces. Covers HTML, CSS, JavaScript, React, version control with Git, UX/UI design principles, and portfolio development.',
        price: 0, // Free with Coursera Financial Aid
        studyTimeHours: 200,
        difficultyLevel: 1, // 1=Beginner, 2=Intermediate, 3=Advanced
        salaryIncrease: 20000,
        isHighSchoolReady: true,
        enrollUrl: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
        hasGuide: false,
        providerId: metaProvider.id,
        categoryId: technologyCategory.id,
        examCode: 'Meta-FE',
        examFormat: 'Portfolio-based assessment with hands-on projects',
        examDuration: 0, // Portfolio-based
        passingScore: 'Complete all courses and capstone project',
        passRate: 75,
        validityYears: 0, // Certificate doesn't expire
        minimumAge: 16
      }
    });

    // 5. IT AUTOMATION
    const googleITAutomation = await prisma.certification.upsert({
      where: { slug: 'google-it-automation-student' },
      update: {},
      create: {
        title: 'Google IT Automation with Python Professional Certificate',
        slug: 'google-it-automation-student',
        shortDescription: 'Learn Python programming and automation skills for IT tasks including system administration and configuration management.',
        description: 'This certificate teaches Python programming for IT automation, including troubleshooting, configuration management, version control with Git, and cloud automation. Builds on foundational IT knowledge.',
        price: 0, // Free with Coursera Financial Aid
        studyTimeHours: 150,
        difficultyLevel: 2, // 1=Beginner, 2=Intermediate, 3=Advanced
        salaryIncrease: 16000,
        isHighSchoolReady: true,
        enrollUrl: 'https://www.coursera.org/professional-certificates/google-it-automation',
        hasGuide: false,
        providerId: googleProvider.id,
        categoryId: technologyCategory.id,
        examCode: 'Google-IT-Auto',
        examFormat: 'Portfolio-based assessment with practical projects',
        examDuration: 0, // Portfolio-based
        passingScore: 'Complete all courses and projects',
        passRate: 80,
        validityYears: 0, // Certificate doesn't expire
        minimumAge: 16,
        prerequisiteCerts: ['comptia-a-plus-high-school']
      }
    });

    // Update existing CompTIA certifications to connect with new pathways
    console.log('🔗 Updating existing certification pathways...');

    // Update CompTIA ITF+ to connect to multiple paths
    await prisma.certification.update({
      where: { slug: 'comptia-itf-plus-fundamentals' },
      data: {
        nextCerts: ['comptia-a-plus-high-school', 'python-pcep-student', 'harvard-cs50-student']
      }
    });

    // Update CompTIA A+ to connect to cloud and automation paths
    await prisma.certification.update({
      where: { slug: 'comptia-a-plus-high-school' },
      data: {
        nextCerts: ['comptia-network-plus-student', 'aws-cloud-practitioner-student', 'google-it-automation-student']
      }
    });

    // Update CompTIA Security+ to connect to cybersecurity path
    await prisma.certification.update({
      where: { slug: 'comptia-security-plus-student' },
      data: {
        prerequisiteCerts: ['comptia-network-plus-student', 'google-cybersecurity-student']
      }
    });

    // Update PCEP to connect to PCAP
    await prisma.certification.update({
      where: { slug: 'python-pcep-student' },
      data: {
        nextCerts: ['python-pcap-student']
      }
    });

    console.log('✅ Technology pathway expansion completed!');
    console.log('🎯 Added certification paths for:');
    console.log('   - Cybersecurity (Google Cybersecurity)');
    console.log('   - Programming (Python PCEP/PCAP, Harvard CS50)');
    console.log('   - Cloud Computing (AWS Cloud Practitioner, Azure Fundamentals)');
    console.log('   - Web Development (Meta Front-End Developer)');
    console.log('   - IT Automation (Google IT Automation with Python)');
    console.log('🔗 Updated pathway connections for comprehensive career progression');

  } catch (error) {
    console.error('❌ Error expanding technology pathway:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

expandTechPathway();