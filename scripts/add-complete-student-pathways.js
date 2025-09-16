const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addCompleteStudentPathways() {
  try {
    console.log('Adding complete student certification pathways...')

    // Get existing categories and providers
    const categories = await prisma.category.findMany()
    const providers = await prisma.provider.findMany()

    // Helper functions
    async function findOrCreateCategory(name, slug, description, color, icon) {
      let category = categories.find(c => c.slug === slug)
      if (!category) {
        category = await prisma.category.create({
          data: { name, slug, description, color, icon }
        })
        console.log(`Created new category: ${name}`)
        categories.push(category)
      }
      return category
    }

    async function findOrCreateProvider(name, slug, website) {
      let provider = providers.find(p => p.slug === slug)
      if (!provider) {
        provider = await prisma.provider.create({
          data: { name, slug, website }
        })
        console.log(`Created new provider: ${name}`)
        providers.push(provider)
      }
      return provider
    }

    // Get or create categories
    const highSchoolCategory = await findOrCreateCategory(
      'High School & Student',
      'high-school-student',
      'Certifications specifically designed for high school students and recent graduates',
      '#8B5CF6',
      '🎓'
    )

    const safetyCategory = await findOrCreateCategory(
      'Safety & Compliance',
      'safety-compliance',
      'Safety certifications required for various industries',
      '#EF4444',
      '🦺'
    )

    const tradeCategory = await findOrCreateCategory(
      'Skilled Trades',
      'skilled-trades',
      'Certifications for skilled trade professions and apprenticeships',
      '#059669',
      '🔧'
    )

    // Get or create providers
    const oshaProvider = await findOrCreateProvider('OSHA', 'osha', 'https://www.osha.gov')
    const comptiaProvider = providers.find(p => p.slug === 'comptia') || await findOrCreateProvider('CompTIA', 'comptia', 'https://www.comptia.org')
    const collegeBoardProvider = await findOrCreateProvider('College Board', 'college-board', 'https://www.collegeboard.org')
    const microsoftProvider = providers.find(p => p.slug === 'microsoft') || await findOrCreateProvider('Microsoft', 'microsoft', 'https://learn.microsoft.com')
    const awsWeldingProvider = await findOrCreateProvider('American Welding Society', 'aws-welding', 'https://www.aws.org')
    const googleProvider = providers.find(p => p.slug === 'google') || await findOrCreateProvider('Google', 'google', 'https://www.google.com')
    const frenchProvider = await findOrCreateProvider('France Education International', 'france-education-intl', 'https://www.france-education-international.fr')
    const cervantesProvider = await findOrCreateProvider('Instituto Cervantes', 'instituto-cervantes', 'https://www.cervantes.es')
    const hskProvider = await findOrCreateProvider('Hanban/Chinese Testing International', 'hanban-cti', 'https://www.chinesetest.cn')

    const completeCertifications = [
      // ===== COMPTIA PATHWAY (Complete IT Foundation) =====
      {
        title: 'CompTIA ITF+ (IT Fundamentals)',
        slug: 'comptia-itf-plus-fundamentals',
        description: 'Entry-level certification introducing basic IT concepts. Perfect starting point for high school students with no prior IT experience.',
        shortDescription: 'Introduction to IT fundamentals for beginners',
        price: 13800, // $138
        salaryIncrease: 5000, 
        studyTimeHours: 40,
        studyTimeWeeks: 6,
        experienceLevel: 'Beginner',
        demandLevel: 'High',
        targetAudience: ['High school students', 'Complete beginners', 'Career explorers'],
        industryFocus: ['Information Technology', 'Any tech-related field'],
        keySkills: ['Computer Hardware Basics', 'Software Fundamentals', 'Network Concepts', 'IT Security Basics'],
        prerequisiteCerts: [],
        nextCerts: ['comptia-a-plus-high-school'],
        careerOutcomes: ['Entry-level IT Support', 'Help Desk Associate', 'Computer Technician'],
        enrollUrl: 'https://www.comptia.org/certifications/it-fundamentals',
        categoryId: highSchoolCategory.id,
        providerId: comptiaProvider.id,
        minimumAge: 14,
        typicalAge: 'High School',
        pathwayType: ['Trade School', 'Professional'],
        isHighSchoolReady: true,
        collegeCredit: false,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },
      {
        title: 'CompTIA Network+ Certification',
        slug: 'comptia-network-plus-student',
        description: 'Intermediate networking certification focusing on network infrastructure, troubleshooting, and security. Builds on A+ foundation knowledge.',
        shortDescription: 'Comprehensive networking certification for students',
        price: 35800, // $358
        salaryIncrease: 18000,
        studyTimeHours: 90,
        studyTimeWeeks: 14,
        experienceLevel: 'Intermediate',
        demandLevel: 'Very High',
        targetAudience: ['IT students', 'A+ certified students', 'Network-focused careers'],
        industryFocus: ['Networking', 'IT Infrastructure', 'Cybersecurity'],
        keySkills: ['Network Architecture', 'Network Troubleshooting', 'Network Security', 'Wireless Technologies'],
        prerequisiteCerts: ['comptia-a-plus-high-school'],
        nextCerts: ['comptia-security-plus-student'],
        careerOutcomes: ['Network Technician', 'Network Administrator', 'IT Support Specialist'],
        enrollUrl: 'https://www.comptia.org/certifications/network',
        categoryId: highSchoolCategory.id,
        providerId: comptiaProvider.id,
        minimumAge: 16,
        typicalAge: 'High School',
        pathwayType: ['Trade School', 'Professional'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: true
      },
      {
        title: 'CompTIA Security+ Certification',
        slug: 'comptia-security-plus-student',
        description: 'Cybersecurity certification covering network security, threats, and risk management. Builds on A+ and Network+ knowledge for comprehensive security foundation.',
        shortDescription: 'Essential cybersecurity certification for students',
        price: 35800, // $358
        salaryIncrease: 22000,
        studyTimeHours: 100,
        studyTimeWeeks: 16,
        experienceLevel: 'Intermediate',
        demandLevel: 'Very High',
        targetAudience: ['Cybersecurity students', 'Network+ certified students', 'Security-focused careers'],
        industryFocus: ['Cybersecurity', 'Information Security', 'Network Security'],
        keySkills: ['Security Concepts', 'Risk Management', 'Cryptography', 'Security Architecture'],
        prerequisiteCerts: ['comptia-network-plus-student'],
        nextCerts: [],
        careerOutcomes: ['Security Analyst', 'Security Specialist', 'IT Security Officer'],
        enrollUrl: 'https://www.comptia.org/certifications/security',
        categoryId: highSchoolCategory.id,
        providerId: comptiaProvider.id,
        minimumAge: 16,
        typicalAge: 'High School',
        pathwayType: ['Trade School', 'Professional'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: true
      },

      // ===== SAFETY PATHWAY (Complete OSHA) =====
      {
        title: 'OSHA 30-Hour Safety Training',
        slug: 'osha-30-hour-safety-training',
        description: 'Advanced safety training for supervisors and workers with safety responsibilities. Builds on OSHA 10 foundation with leadership and regulatory knowledge.',
        shortDescription: 'Advanced workplace safety training for student leaders',
        price: 15000, // $150
        salaryIncrease: 8000,
        studyTimeHours: 30,
        studyTimeWeeks: 4,
        experienceLevel: 'Intermediate',
        demandLevel: 'High',
        targetAudience: ['OSHA 10 certified students', 'Future supervisors', 'Safety-focused careers'],
        industryFocus: ['Construction', 'Manufacturing', 'Industrial Safety', 'Supervision'],
        keySkills: ['Advanced Safety Management', 'Regulatory Compliance', 'Hazard Analysis', 'Safety Leadership'],
        prerequisiteCerts: ['osha-10-hour-safety-training'],
        nextCerts: [],
        careerOutcomes: ['Safety Supervisor', 'Construction Foreman', 'Safety Coordinator'],
        enrollUrl: 'https://www.osha.gov/training/outreach',
        categoryId: safetyCategory.id,
        providerId: oshaProvider.id,
        minimumAge: 18,
        typicalAge: 'High School',
        pathwayType: ['Trade School', 'Apprenticeship'],
        isHighSchoolReady: true,
        collegeCredit: false,
        apprenticeshipPrep: true,
        hasGuide: false,
        isFeatured: false
      },

      // ===== WELDING PATHWAY (Complete AWS) =====
      {
        title: 'AWS Entry Level Welder Certification',
        slug: 'aws-entry-level-welder',
        description: 'Entry-level welding certification testing basic welding skills and safety. Foundation for advanced AWS certifications and trade careers.',
        shortDescription: 'Entry-level professional welding certification',
        price: 20000, // $200
        salaryIncrease: 12000,
        studyTimeHours: 80,
        studyTimeWeeks: 10,
        experienceLevel: 'Entry Level',
        demandLevel: 'Very High',
        targetAudience: ['High school students', 'Trade school students', 'Apprenticeship candidates'],
        industryFocus: ['Welding', 'Construction', 'Manufacturing', 'Fabrication'],
        keySkills: ['Arc Welding', 'Welding Safety', 'Blueprint Reading', 'Metal Preparation'],
        prerequisiteCerts: [],
        nextCerts: ['aws-certified-welder'],
        careerOutcomes: ['Entry-level Welder', 'Welding Helper', 'Fabrication Assistant'],
        enrollUrl: 'https://www.aws.org/certification-and-education',
        categoryId: tradeCategory.id,
        providerId: awsWeldingProvider.id,
        minimumAge: 16,
        typicalAge: 'High School',
        pathwayType: ['Trade School', 'Apprenticeship'],
        isHighSchoolReady: true,
        collegeCredit: false,
        apprenticeshipPrep: true,
        hasGuide: false,
        isFeatured: true
      },
      {
        title: 'AWS Certified Welder (CW)',
        slug: 'aws-certified-welder',
        description: 'Professional welding certification for specific processes and positions. Industry-recognized credential for skilled welders.',
        shortDescription: 'Professional welding certification for skilled positions',
        price: 35000, // $350
        salaryIncrease: 18000,
        studyTimeHours: 120,
        studyTimeWeeks: 16,
        experienceLevel: 'Intermediate',
        demandLevel: 'Very High',
        targetAudience: ['Entry-level certified welders', 'Trade school graduates', 'Skilled apprentices'],
        industryFocus: ['Professional Welding', 'Structural Steel', 'Pipeline', 'Fabrication'],
        keySkills: ['Advanced Welding Techniques', 'Quality Control', 'Welding Codes', 'Material Specifications'],
        prerequisiteCerts: ['aws-entry-level-welder'],
        nextCerts: [],
        careerOutcomes: ['Certified Welder', 'Structural Welder', 'Pipeline Welder'],
        enrollUrl: 'https://www.aws.org/certification-and-education/professional-certification/certified-welder-program',
        categoryId: tradeCategory.id,
        providerId: awsWeldingProvider.id,
        minimumAge: 18,
        typicalAge: 'High School',
        pathwayType: ['Trade School', 'Apprenticeship', 'Professional'],
        isHighSchoolReady: true,
        collegeCredit: false,
        apprenticeshipPrep: true,
        hasGuide: false,
        isFeatured: true
      },

      // ===== AP CORE PATHWAY =====
      {
        title: 'AP Seminar',
        slug: 'ap-seminar',
        description: 'First year of AP Capstone program focusing on research, collaboration, and communication skills. Foundation for AP Research and college success.',
        shortDescription: 'Research and critical thinking skills for college prep',
        price: 9900, // $99
        salaryIncrease: 0,
        studyTimeHours: 150,
        studyTimeWeeks: 36,
        experienceLevel: 'Intermediate',
        demandLevel: 'Medium',
        targetAudience: ['College-bound students', 'Academic achievers', 'Future researchers'],
        industryFocus: ['Academic Research', 'Higher Education', 'Critical Thinking'],
        keySkills: ['Research Skills', 'Critical Thinking', 'Collaboration', 'Communication'],
        prerequisiteCerts: [],
        nextCerts: ['ap-research'],
        careerOutcomes: ['College Student', 'Researcher', 'Academic Professional'],
        enrollUrl: 'https://apstudents.collegeboard.org/courses/ap-seminar',
        categoryId: highSchoolCategory.id,
        providerId: collegeBoardProvider.id,
        minimumAge: 15,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },
      {
        title: 'AP Research',
        slug: 'ap-research',
        description: 'Second year of AP Capstone program involving independent research project. Completes AP Capstone Diploma requirements with AP Seminar.',
        shortDescription: 'Independent research project for AP Capstone Diploma',
        price: 9900, // $99
        salaryIncrease: 0,
        studyTimeHours: 180,
        studyTimeWeeks: 36,
        experienceLevel: 'Advanced',
        demandLevel: 'Medium',
        targetAudience: ['AP Seminar graduates', 'Research-focused students', 'College-bound students'],
        industryFocus: ['Academic Research', 'Higher Education', 'Independent Study'],
        keySkills: ['Independent Research', 'Academic Writing', 'Data Analysis', 'Project Management'],
        prerequisiteCerts: ['ap-seminar'],
        nextCerts: [],
        careerOutcomes: ['College Student', 'Graduate Researcher', 'Academic Professional'],
        enrollUrl: 'https://apstudents.collegeboard.org/courses/ap-research',
        categoryId: highSchoolCategory.id,
        providerId: collegeBoardProvider.id,
        minimumAge: 16,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },

      // ===== LANGUAGE PATHWAYS =====
      {
        title: 'DELF French A2 (Elementary)',
        slug: 'delf-french-a2-student',
        description: 'Elementary French language certification demonstrating basic communication skills. Foundation for B1 and B2 levels.',
        shortDescription: 'Elementary French language certification',
        price: 12000, // $120
        salaryIncrease: 3000,
        studyTimeHours: 120,
        studyTimeWeeks: 16,
        experienceLevel: 'Beginner',
        demandLevel: 'Medium',
        targetAudience: ['French language students', 'International program candidates', 'College-bound students'],
        industryFocus: ['Education', 'International Business', 'Tourism'],
        keySkills: ['Basic French Communication', 'Elementary Grammar', 'Simple Conversation', 'Basic Writing'],
        prerequisiteCerts: [],
        nextCerts: ['delf-french-b1-student'],
        careerOutcomes: ['French Language Student', 'International Program Candidate'],
        enrollUrl: 'https://www.france-education-international.fr/delf-dalf',
        categoryId: highSchoolCategory.id,
        providerId: frenchProvider.id,
        minimumAge: 12,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: false,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },
      {
        title: 'DELF French B1 (Intermediate)',
        slug: 'delf-french-b1-student',
        description: 'Intermediate French certification for independent language use. Qualifies for French nationality and many university programs.',
        shortDescription: 'Intermediate French language certification',
        price: 15000, // $150
        salaryIncrease: 5000,
        studyTimeHours: 160,
        studyTimeWeeks: 20,
        experienceLevel: 'Intermediate',
        demandLevel: 'Medium',
        targetAudience: ['DELF A2 graduates', 'Advanced French students', 'University candidates'],
        industryFocus: ['International Business', 'Education', 'Tourism', 'Translation'],
        keySkills: ['Intermediate French Communication', 'Complex Grammar', 'Extended Conversation', 'Formal Writing'],
        prerequisiteCerts: ['delf-french-a2-student'],
        nextCerts: ['delf-french-b2-student'],
        careerOutcomes: ['International Business Professional', 'French Teacher', 'Tourism Professional'],
        enrollUrl: 'https://www.france-education-international.fr/delf-dalf',
        categoryId: highSchoolCategory.id,
        providerId: frenchProvider.id,
        minimumAge: 14,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },
      {
        title: 'DELF French B2 (Upper-Intermediate)',
        slug: 'delf-french-b2-student',
        description: 'Upper-intermediate French certification for university admission in French-speaking countries. Advanced communication and academic skills.',
        shortDescription: 'University-level French language certification',
        price: 18000, // $180
        salaryIncrease: 8000,
        studyTimeHours: 200,
        studyTimeWeeks: 24,
        experienceLevel: 'Advanced',
        demandLevel: 'Medium',
        targetAudience: ['DELF B1 graduates', 'University-bound students', 'Professional language users'],
        industryFocus: ['Higher Education', 'International Business', 'Professional Services'],
        keySkills: ['Advanced French Communication', 'Academic French', 'Professional Writing', 'Cultural Competency'],
        prerequisiteCerts: ['delf-french-b1-student'],
        nextCerts: [],
        careerOutcomes: ['University Student', 'International Professional', 'Translator', 'French Teacher'],
        enrollUrl: 'https://www.france-education-international.fr/delf-dalf',
        categoryId: highSchoolCategory.id,
        providerId: frenchProvider.id,
        minimumAge: 15,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },

      // ===== GOOGLE PATHWAY =====
      {
        title: 'Google Analytics Individual Qualification (GAIQ)',
        slug: 'google-analytics-gaiq-student',
        description: 'Free Google Analytics certification demonstrating digital marketing and data analysis skills. Perfect introduction to digital marketing careers.',
        shortDescription: 'Digital marketing and analytics certification',
        price: 0, // Free
        salaryIncrease: 5000,
        studyTimeHours: 25,
        studyTimeWeeks: 4,
        experienceLevel: 'Beginner',
        demandLevel: 'High',
        targetAudience: ['High school students', 'Marketing students', 'Business students'],
        industryFocus: ['Digital Marketing', 'E-commerce', 'Web Analytics', 'Business Intelligence'],
        keySkills: ['Google Analytics', 'Data Analysis', 'Digital Marketing', 'Web Metrics'],
        prerequisiteCerts: [],
        nextCerts: [],
        careerOutcomes: ['Digital Marketing Assistant', 'Marketing Analyst', 'E-commerce Specialist'],
        enrollUrl: 'https://skillshop.exceedlms.com/student/path/2949-google-analytics-individual-qualification-iq',
        categoryId: highSchoolCategory.id,
        providerId: googleProvider.id,
        minimumAge: 14,
        typicalAge: 'High School',
        pathwayType: ['College Prep', 'Professional'],
        isHighSchoolReady: true,
        collegeCredit: false,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: true
      },

      // ===== ADDITIONAL KEY CERTIFICATIONS =====
      {
        title: 'DELE Spanish A2 (Elementary)',
        slug: 'dele-spanish-a2-student',
        description: 'Elementary Spanish language certification from Instituto Cervantes. Foundation for advanced Spanish language study and careers.',
        shortDescription: 'Elementary Spanish language certification',
        price: 14000, // $140
        salaryIncrease: 4000,
        studyTimeHours: 100,
        studyTimeWeeks: 14,
        experienceLevel: 'Beginner',
        demandLevel: 'High',
        targetAudience: ['Spanish language students', 'Latin American program candidates', 'Bilingual career seekers'],
        industryFocus: ['Education', 'Healthcare', 'Business', 'Social Services'],
        keySkills: ['Basic Spanish Communication', 'Elementary Grammar', 'Cultural Awareness', 'Basic Writing'],
        prerequisiteCerts: [],
        nextCerts: ['dele-spanish-b1-student'],
        careerOutcomes: ['Bilingual Customer Service', 'Spanish Tutor', 'Translation Assistant'],
        enrollUrl: 'https://www.dele.org',
        categoryId: highSchoolCategory.id,
        providerId: cervantesProvider.id,
        minimumAge: 12,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },
      {
        title: 'DELE Spanish B1 (Intermediate)',
        slug: 'dele-spanish-b1-student',
        description: 'Intermediate Spanish certification demonstrating independent language use. Valuable for university admissions and bilingual careers.',
        shortDescription: 'Intermediate Spanish language certification',
        price: 17000, // $170
        salaryIncrease: 7000,
        studyTimeHours: 140,
        studyTimeWeeks: 18,
        experienceLevel: 'Intermediate',
        demandLevel: 'High',
        targetAudience: ['DELE A2 graduates', 'Advanced Spanish students', 'Bilingual professionals'],
        industryFocus: ['Healthcare', 'Education', 'Business', 'Government'],
        keySkills: ['Intermediate Spanish Communication', 'Professional Spanish', 'Cultural Competency', 'Business Spanish'],
        prerequisiteCerts: ['dele-spanish-a2-student'],
        nextCerts: [],
        careerOutcomes: ['Bilingual Professional', 'Spanish Teacher', 'Healthcare Interpreter'],
        enrollUrl: 'https://www.dele.org',
        categoryId: highSchoolCategory.id,
        providerId: cervantesProvider.id,
        minimumAge: 14,
        typicalAge: 'High School',
        pathwayType: ['College Prep', 'Professional'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },
      {
        title: 'HSK Level 3 (Intermediate Chinese)',
        slug: 'hsk-level-3-chinese-student',
        description: 'Intermediate Chinese language certification for 600+ vocabulary words. Foundation for advanced Chinese study and China-related careers.',
        shortDescription: 'Intermediate Chinese language certification',
        price: 16000, // $160
        salaryIncrease: 6000,
        studyTimeHours: 120,
        studyTimeWeeks: 16,
        experienceLevel: 'Intermediate',
        demandLevel: 'Medium',
        targetAudience: ['Chinese language students', 'Asia-focused students', 'International business students'],
        industryFocus: ['International Business', 'Manufacturing', 'Technology', 'Education'],
        keySkills: ['Intermediate Chinese Communication', 'Mandarin Speaking', 'Chinese Characters', 'Cultural Understanding'],
        prerequisiteCerts: [],
        nextCerts: ['hsk-level-4-chinese-student'],
        careerOutcomes: ['International Business Trainee', 'Chinese Tutor', 'Cultural Liaison'],
        enrollUrl: 'https://www.chinesetest.cn',
        categoryId: highSchoolCategory.id,
        providerId: hskProvider.id,
        minimumAge: 14,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: false,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },
      {
        title: 'HSK Level 4 (Upper-Intermediate Chinese)',
        slug: 'hsk-level-4-chinese-student',
        description: 'Upper-intermediate Chinese certification for university admission in China. Advanced communication skills for professional use.',
        shortDescription: 'University-level Chinese language certification',
        price: 18000, // $180
        salaryIncrease: 10000,
        studyTimeHours: 160,
        studyTimeWeeks: 20,
        experienceLevel: 'Advanced',
        demandLevel: 'Medium',
        targetAudience: ['HSK 3 graduates', 'China university candidates', 'Professional language users'],
        industryFocus: ['International Business', 'Higher Education', 'Technology', 'Government'],
        keySkills: ['Advanced Chinese Communication', 'Business Chinese', 'Academic Chinese', 'Professional Writing'],
        prerequisiteCerts: ['hsk-level-3-chinese-student'],
        nextCerts: [],
        careerOutcomes: ['University Student in China', 'International Business Professional', 'Chinese Translator'],
        enrollUrl: 'https://www.chinesetest.cn',
        categoryId: highSchoolCategory.id,
        providerId: hskProvider.id,
        minimumAge: 15,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      }
    ]

    // Add each certification with pathway validation
    let addedCount = 0
    let skippedCount = 0
    
    for (const cert of completeCertifications) {
      try {
        const existingCert = await prisma.certification.findUnique({
          where: { slug: cert.slug }
        })

        if (existingCert) {
          console.log(`⚠️  Certification ${cert.title} already exists, skipping...`)
          skippedCount++
          continue
        }

        await prisma.certification.create({
          data: cert
        })
        console.log(`✅ Added: ${cert.title}`)
        addedCount++
      } catch (error) {
        console.error(`❌ Error adding ${cert.title}:`, error.message)
      }
    }

    console.log(`\n🎉 Student pathway certifications completed!`)
    console.log(`✅ Successfully added: ${addedCount} certifications`)
    console.log(`⚠️  Skipped existing: ${skippedCount} certifications`)
    
    console.log('\n📊 Pathway Summary:')
    console.log('1. CompTIA IT Pathway: ITF+ → A+ → Network+ → Security+')
    console.log('2. OSHA Safety Pathway: OSHA 10 → OSHA 30')
    console.log('3. AWS Welding Pathway: Entry Level → Certified Welder')
    console.log('4. AP Capstone Pathway: AP Seminar → AP Research')
    console.log('5. French Language Pathway: DELF A2 → B1 → B2')
    console.log('6. Spanish Language Pathway: DELE A2 → B1')
    console.log('7. Chinese Language Pathway: HSK Level 3 → Level 4')
    console.log('8. Google Analytics (standalone)')
    console.log('9. AP Computer Science A (standalone)')
    console.log('10. Microsoft Office Specialist (standalone)')

    console.log('\n🚀 Next steps:')
    console.log('1. Visit Prisma Studio to see all pathway connections')
    console.log('2. Test prerequisite/next cert relationships')
    console.log('3. Create the /students landing page with pathway visualization')

  } catch (error) {
    console.error('Error adding student pathway certifications:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addCompleteStudentPathways()