const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addStudentCertifications() {
  try {
    console.log('Adding student-focused certifications...')

    // First, let's get existing category and provider IDs
    const categories = await prisma.category.findMany()
    const providers = await prisma.provider.findMany()

    console.log('Available categories:', categories.map(c => c.name))
    console.log('Available providers:', providers.map(p => p.name))

    // Helper function to find or create category
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

    // Helper function to find or create provider
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

    // Get or create High School category
    const highSchoolCategory = await findOrCreateCategory(
      'High School & Student',
      'high-school-student',
      'Certifications specifically designed for high school students and recent graduates',
      '#8B5CF6',
      '🎓'
    )

    // Get or create Safety category
    const safetyCategory = await findOrCreateCategory(
      'Safety & Compliance',
      'safety-compliance',
      'Safety certifications required for various industries',
      '#EF4444',
      '🦺'
    )

    // Create providers
    const oshaProvider = await findOrCreateProvider('OSHA', 'osha', 'https://www.osha.gov')
    const comptiaProvider = providers.find(p => p.slug === 'comptia') || await findOrCreateProvider('CompTIA', 'comptia', 'https://www.comptia.org')
    const collegeBoardProvider = await findOrCreateProvider('College Board', 'college-board', 'https://www.collegeboard.org')
    const microsoftProvider = providers.find(p => p.slug === 'microsoft') || await findOrCreateProvider('Microsoft', 'microsoft', 'https://learn.microsoft.com')

    const studentCertifications = [
      {
        title: 'OSHA 10-Hour Safety Training',
        slug: 'osha-10-hour-safety-training',
        description: 'Essential safety training for entry-level workers in construction and general industry. Required by many states and employers for workers under 21.',
        shortDescription: 'Fundamental workplace safety training for young workers',
        price: 8000, // $80
        salaryIncrease: 5000, // $5,000 increase in earning potential
        studyTimeHours: 10,
        studyTimeWeeks: 1,
        experienceLevel: 'Entry Level',
        demandLevel: 'Very High',
        targetAudience: ['High school students', 'Entry-level workers', 'Trade school students'],
        industryFocus: ['Construction', 'Manufacturing', 'Warehousing', 'General Industry'],
        keySkills: ['Workplace Safety', 'Hazard Recognition', 'Safety Regulations', 'Personal Protective Equipment'],
        careerOutcomes: ['Construction Worker', 'Warehouse Associate', 'Manufacturing Technician', 'Trade Apprentice'],
        enrollUrl: 'https://www.osha.gov/training/outreach',
        categoryId: safetyCategory.id,
        providerId: oshaProvider.id,
        // Student pathway fields
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
        title: 'CompTIA A+ Certification',
        slug: 'comptia-a-plus-high-school',
        description: 'Industry-standard entry-level IT certification covering hardware, software, networking, and troubleshooting. Perfect for high school students interested in technology careers.',
        shortDescription: 'Essential entry-level IT certification for students',
        price: 35800, // $358 (two exams)
        salaryIncrease: 15000, // $15,000 salary boost
        studyTimeHours: 80,
        studyTimeWeeks: 12,
        experienceLevel: 'Entry Level',
        demandLevel: 'Very High',
        targetAudience: ['High school students', 'Career changers', 'Entry-level IT workers'],
        industryFocus: ['Information Technology', 'Computer Support', 'Technical Services'],
        keySkills: ['Hardware Troubleshooting', 'Operating Systems', 'Networking Basics', 'Mobile Devices', 'Security Fundamentals'],
        careerOutcomes: ['IT Support Technician', 'Help Desk Analyst', 'Computer Repair Technician', 'Technical Support Specialist'],
        enrollUrl: 'https://www.comptia.org/certifications/a',
        categoryId: highSchoolCategory.id,
        providerId: comptiaProvider.id,
        // Student pathway fields
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
        title: 'AP Computer Science A',
        slug: 'ap-computer-science-a',
        description: 'College-level computer science course focusing on Java programming, object-oriented design, and problem-solving. Provides strong foundation for computer science majors.',
        shortDescription: 'College-level programming course with potential college credit',
        price: 9900, // $99 exam fee
        salaryIncrease: 0, // No immediate salary impact
        studyTimeHours: 150,
        studyTimeWeeks: 36,
        experienceLevel: 'Intermediate',
        demandLevel: 'High',
        targetAudience: ['High school students', 'College-bound students', 'Future CS majors'],
        industryFocus: ['Software Development', 'Computer Science', 'Technology'],
        keySkills: ['Java Programming', 'Object-Oriented Programming', 'Algorithm Design', 'Data Structures', 'Problem Solving'],
        careerOutcomes: ['Software Developer', 'Computer Programmer', 'Software Engineer', 'Computer Science Student'],
        enrollUrl: 'https://apstudents.collegeboard.org/courses/ap-computer-science-a',
        categoryId: highSchoolCategory.id,
        providerId: collegeBoardProvider.id,
        // Student pathway fields
        minimumAge: 14,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: true
      },
      {
        title: 'Microsoft Office Specialist (MOS)',
        slug: 'microsoft-office-specialist-student',
        description: 'Industry-recognized certification demonstrating proficiency in Microsoft Office applications. Essential for any career requiring computer skills.',
        shortDescription: 'Fundamental computer skills certification for students',
        price: 10000, // $100
        salaryIncrease: 3000, // $3,000 boost
        studyTimeHours: 40,
        studyTimeWeeks: 6,
        experienceLevel: 'Beginner',
        demandLevel: 'High',
        targetAudience: ['High school students', 'College students', 'Entry-level workers'],
        industryFocus: ['Business Administration', 'Office Work', 'Any Office Environment'],
        keySkills: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Data Analysis', 'Document Creation'],
        careerOutcomes: ['Administrative Assistant', 'Office Clerk', 'Data Entry Specialist', 'Business Support'],
        enrollUrl: 'https://learn.microsoft.com/en-us/certifications/mos-certification',
        categoryId: highSchoolCategory.id,
        providerId: microsoftProvider.id,
        // Student pathway fields
        minimumAge: 14,
        typicalAge: 'High School',
        pathwayType: ['College Prep', 'Professional'],
        isHighSchoolReady: true,
        collegeCredit: false,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      },
      {
        title: 'DELF French Language Certification (B1/B2)',
        slug: 'delf-french-b1-b2-student',
        description: 'Official French language proficiency certification recognized worldwide. B2 level provides access to French universities and demonstrates advanced language skills.',
        shortDescription: 'International French language certification for students',
        price: 15000, // $150
        salaryIncrease: 8000, // $8,000 language premium
        studyTimeHours: 200,
        studyTimeWeeks: 24,
        experienceLevel: 'Intermediate',
        demandLevel: 'Medium',
        targetAudience: ['High school students', 'College-bound students', 'International program candidates'],
        industryFocus: ['International Business', 'Tourism', 'Education', 'Translation'],
        keySkills: ['French Speaking', 'French Writing', 'French Listening', 'French Reading', 'Cultural Competency'],
        careerOutcomes: ['International Business Professional', 'Translator', 'Teacher', 'Tourism Professional'],
        enrollUrl: 'https://www.france-education-international.fr/delf-dalf',
        categoryId: highSchoolCategory.id,
        providerId: await findOrCreateProvider('France Education International', 'france-education-intl', 'https://www.france-education-international.fr'),
        // Student pathway fields
        minimumAge: 12,
        typicalAge: 'High School',
        pathwayType: ['College Prep'],
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: false,
        hasGuide: false,
        isFeatured: false
      }
    ]

    // Add each certification
    for (const cert of studentCertifications) {
      try {
        const existingCert = await prisma.certification.findUnique({
          where: { slug: cert.slug }
        })

        if (existingCert) {
          console.log(`Certification ${cert.title} already exists, skipping...`)
          continue
        }

        await prisma.certification.create({
          data: cert
        })
        console.log(`✅ Added: ${cert.title}`)
      } catch (error) {
        console.error(`❌ Error adding ${cert.title}:`, error.message)
      }
    }

    console.log('\n🎉 Student certifications added successfully!')
    console.log('\nNext steps:')
    console.log('1. Check Prisma Studio to see the new certifications')
    console.log('2. Test filtering by isHighSchoolReady = true')
    console.log('3. Create the /students landing page')

  } catch (error) {
    console.error('Error adding student certifications:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addStudentCertifications()