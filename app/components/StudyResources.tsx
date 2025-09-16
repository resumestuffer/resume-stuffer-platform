"use client";
import { BookOpen, Star, ExternalLink, ShoppingCart } from "lucide-react";

interface StudyResource {
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  price: string;
  amazonUrl: string;
  description: string;
  highlights: string[];
}

interface StudyResourcesProps {
  certificationSlug: string;
  certificationTitle: string;
}

// Study resources data - would come from database in production
const studyResourcesData: Record<string, StudyResource[]> = {
  // AWS Certifications
  "aws-cloud-practitioner": [
    {
      title: "AWS Certified Cloud Practitioner Study Guide",
      author: "Ben Piper, David Clinton",
      rating: 4.5,
      reviewCount: 1247,
      price: "$29.99",
      amazonUrl: "https://amazon.com/dp/1119490707?tag=resumestuffer-20",
      description:
        "Official study guide covering all AWS Cloud Practitioner exam objectives with hands-on exercises and practice tests.",
      highlights: [
        "Official AWS training content",
        "Practice questions with explanations",
        "Hands-on exercises included",
        "Updated for latest exam version",
      ],
    },
    {
      title: "AWS Certified Cloud Practitioner Practice Tests",
      author: "Neal Davis",
      rating: 4.6,
      reviewCount: 892,
      price: "$19.99",
      amazonUrl: "https://amazon.com/dp/1119684927?tag=resumestuffer-20",
      description:
        "1000+ practice questions with detailed explanations to help you pass the AWS Cloud Practitioner exam on your first try.",
      highlights: [
        "1000+ practice questions",
        "Detailed answer explanations",
        "Exam simulation format",
        "Performance tracking",
      ],
    },
  ],
  "aws-solutions-architect-associate": [
    {
      title: "AWS Certified Solutions Architect Study Guide",
      author: "Ben Piper, David Clinton",
      rating: 4.5,
      reviewCount: 2341,
      price: "$39.99",
      amazonUrl: "https://amazon.com/dp/1119713080?tag=resumestuffer-20",
      description:
        "Comprehensive guide for AWS Solutions Architect Associate exam with real-world scenarios and practice tests.",
      highlights: [
        "Complete exam domain coverage",
        "Real-world architecture scenarios",
        "Performance-based questions",
        "Online practice tests included",
      ],
    },
    {
      title: "AWS Certified Solutions Architect Practice Tests",
      author: "Neal Davis",
      rating: 4.4,
      reviewCount: 1876,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/1119713099?tag=resumestuffer-20",
      description:
        "Over 1000 practice questions for the AWS Solutions Architect Associate exam.",
      highlights: [
        "1000+ practice questions",
        "Domain-by-domain organization",
        "Detailed explanations",
        "Exam simulation mode",
      ],
    },
  ],
  "aws-solutions-architect-professional": [
    {
      title: "AWS Certified Solutions Architect Professional Study Guide",
      author: "Ben Piper",
      rating: 4.3,
      reviewCount: 987,
      price: "$49.99",
      amazonUrl: "https://amazon.com/dp/1119713102?tag=resumestuffer-20",
      description:
        "Advanced study guide for AWS Solutions Architect Professional certification.",
      highlights: [
        "Advanced architecture patterns",
        "Complex scenario questions",
        "Multi-tier application design",
        "Professional-level content",
      ],
    },
  ],
  "aws-developer-associate": [
    {
      title: "AWS Certified Developer Study Guide",
      author: "Nick Alteen",
      rating: 4.4,
      reviewCount: 1234,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1119508193?tag=resumestuffer-20",
      description:
        "Complete preparation for AWS Certified Developer Associate exam with coding examples.",
      highlights: [
        "Hands-on coding examples",
        "AWS SDK best practices",
        "Deployment strategies",
        "Monitoring and debugging",
      ],
    },
  ],
  "aws-devops-professional": [
    {
      title: "AWS Certified DevOps Engineer Professional Study Guide",
      author: "Ben Piper",
      rating: 4.2,
      reviewCount: 756,
      price: "$44.99",
      amazonUrl: "https://amazon.com/dp/1119508207?tag=resumestuffer-20",
      description:
        "Professional-level guide for AWS DevOps Engineer certification covering automation and monitoring.",
      highlights: [
        "CI/CD pipeline automation",
        "Infrastructure as code",
        "Monitoring and logging",
        "Security best practices",
      ],
    },
  ],

  // Microsoft Azure Certifications
  "microsoft-azure-fundamentals": [
    {
      title: "Exam AZ-900: Microsoft Azure Fundamentals",
      author: "Jim Cheshire",
      rating: 4.3,
      reviewCount: 1543,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/0136877200?tag=resumestuffer-20",
      description:
        "Official study guide for Microsoft Azure Fundamentals exam covering cloud concepts.",
      highlights: [
        "Official Microsoft content",
        "Cloud service fundamentals",
        "Azure pricing and support",
        "Practice questions included",
      ],
    },
  ],
  "azure-administrator-associate": [
    {
      title: "Exam AZ-104: Microsoft Azure Administrator",
      author: "Michael Washam",
      rating: 4.4,
      reviewCount: 1876,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/0136798675?tag=resumestuffer-20",
      description:
        "Complete study guide for Azure Administrator Associate certification.",
      highlights: [
        "Resource management",
        "Virtual networking",
        "Storage solutions",
        "Identity and governance",
      ],
    },
  ],
  "power-bi-data-analyst": [
    {
      title: "Exam DA-100: Microsoft Power BI Data Analyst",
      author: "Paul Turley",
      rating: 4.3,
      reviewCount: 934,
      price: "$32.99",
      amazonUrl: "https://amazon.com/dp/0136781055?tag=resumestuffer-20",
      description:
        "Comprehensive guide to Microsoft Power BI Data Analyst certification.",
      highlights: [
        "Data modeling techniques",
        "DAX formula mastery",
        "Report and dashboard design",
        "Data visualization best practices",
      ],
    },
  ],

  // CompTIA Certifications
  "comptia-security-plus": [
    {
      title: "CompTIA Security+ Study Guide: Exam SY0-601",
      author: "Mike Chapple, David Seidl",
      rating: 4.4,
      reviewCount: 2156,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1119736250?tag=resumestuffer-20",
      description:
        "Comprehensive study guide for CompTIA Security+ certification with real-world examples and practice questions.",
      highlights: [
        "Complete exam objective coverage",
        "Real-world security scenarios",
        "Practice questions included",
        "Online test bank access",
      ],
    },
    {
      title: "CompTIA Security+ Practice Tests: Exam SY0-601",
      author: "Mike Chapple, David Seidl",
      rating: 4.5,
      reviewCount: 1342,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/1119736277?tag=resumestuffer-20",
      description:
        "1000+ practice questions to master CompTIA Security+ concepts and pass the certification exam.",
      highlights: [
        "1000+ practice questions",
        "Domain-specific testing",
        "Performance-based questions",
        "Detailed explanations",
      ],
    },
  ],

  // Project Management
  "pmp": [
    {
      title: "PMP Project Management Professional Exam Study Guide",
      author: "Kim Heldman",
      rating: 4.3,
      reviewCount: 1896,
      price: "$39.99",
      amazonUrl: "https://amazon.com/dp/1119420903?tag=resumestuffer-20",
      description:
        "Complete PMP exam preparation with PMBOK Guide alignment and hands-on exercises.",
      highlights: [
        "PMBOK Guide 7th Edition aligned",
        "Real-world project scenarios",
        "Practice exams included",
        "Agile and hybrid approaches",
      ],
    },
    {
      title: "PMP Exam Prep: Accelerated Learning to Pass PMI's PMP Exam",
      author: "Rita Mulcahy",
      rating: 4.7,
      reviewCount: 3421,
      price: "$49.99",
      amazonUrl: "https://amazon.com/dp/1932735658?tag=resumestuffer-20",
      description:
        "The industry-standard PMP exam preparation book with proven techniques and insider tips.",
      highlights: [
        "Industry-leading prep book",
        "Rita's proven method",
        "Insider exam tips",
        "Process-focused learning",
      ],
    },
  ],
  "certified-associate-in-project-management": [
    {
      title: "CAPM Certified Associate in Project Management Study Guide",
      author: "Michael Solomon",
      rating: 4.2,
      reviewCount: 876,
      price: "$29.99",
      amazonUrl: "https://amazon.com/dp/1119743281?tag=resumestuffer-20",
      description:
        "Complete CAPM certification preparation with PMBOK Guide alignment.",
      highlights: [
        "PMBOK Guide aligned content",
        "Practice questions included",
        "Exam tips and strategies",
        "Project management fundamentals",
      ],
    },
  ],

  // Cisco Certifications
  "cisco-ccna": [
    {
      title: "CCNA 200-301 Official Cert Guide",
      author: "Wendell Odom",
      rating: 4.6,
      reviewCount: 2567,
      price: "$44.99",
      amazonUrl: "https://amazon.com/dp/1587147149?tag=resumestuffer-20",
      description:
        "Official Cisco CCNA certification guide with comprehensive coverage of all exam topics.",
      highlights: [
        "Official Cisco Press content",
        "Complete exam coverage",
        "Lab exercises included",
        "Practice questions and sims",
      ],
    },
    {
      title: "CCNA 200-301 Portable Command Guide",
      author: "Scott Empson",
      rating: 4.4,
      reviewCount: 1234,
      price: "$19.99",
      amazonUrl: "https://amazon.com/dp/1587058839?tag=resumestuffer-20",
      description:
        "Quick reference guide for CCNA commands and configurations.",
      highlights: [
        "Command reference guide",
        "Configuration examples",
        "Troubleshooting tips",
        "Portable format",
      ],
    },
  ],

  // Salesforce Certifications
  "salesforce-admin": [
    {
      title: "Salesforce Certified Administrator Study Guide",
      author: "Mike Wheeler",
      rating: 4.3,
      reviewCount: 1456,
      price: "$32.99",
      amazonUrl: "https://amazon.com/dp/1119613906?tag=resumestuffer-20",
      description:
        "Complete guide to Salesforce Administrator certification with hands-on examples.",
      highlights: [
        "Platform administration",
        "User management",
        "Security and access",
        "Workflow automation",
      ],
    },
  ],

  // Cybersecurity
  "cissp": [
    {
      title: "CISSP All-in-One Exam Guide",
      author: "Shon Harris",
      rating: 4.5,
      reviewCount: 3241,
      price: "$49.99",
      amazonUrl: "https://amazon.com/dp/1260142655?tag=resumestuffer-20",
      description:
        "Comprehensive CISSP exam preparation covering all 8 domains of cybersecurity.",
      highlights: [
        "All 8 CISSP domains",
        "Real-world scenarios",
        "Practice questions included",
        "Expert author insights",
      ],
    },
    {
      title: "CISSP Practice Tests",
      author: "Mike Chapple",
      rating: 4.4,
      reviewCount: 1876,
      price: "$29.99",
      amazonUrl: "https://amazon.com/dp/1119475929?tag=resumestuffer-20",
      description:
        "1500+ practice questions for CISSP exam preparation.",
      highlights: [
        "1500+ practice questions",
        "Domain-specific tests",
        "Detailed explanations",
        "Performance tracking",
      ],
    },
  ],

  // Google Certifications
  "google-data-analytics": [
    {
      title: "Google Data Analytics Professional Certificate Coursebook",
      author: "Various Authors",
      rating: 4.2,
      reviewCount: 987,
      price: "$27.99",
      amazonUrl: "https://amazon.com/dp/B09KQVQZPD?tag=resumestuffer-20",
      description:
        "Supporting materials for Google Data Analytics Professional Certificate program.",
      highlights: [
        "Hands-on data analysis",
        "R programming fundamentals",
        "Tableau visualization",
        "Portfolio project guidance",
      ],
    },
  ],
  "google-ux-design": [
    {
      title: "Google UX Design Professional Certificate Guide",
      author: "Google UX Team",
      rating: 4.1,
      reviewCount: 654,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/B09MNBQ2XK?tag=resumestuffer-20",
      description:
        "Companion guide for Google UX Design Professional Certificate.",
      highlights: [
        "User research methods",
        "Wireframing and prototyping",
        "Design thinking process",
        "Portfolio development",
      ],
    },
  ],

  // Scrum and Agile
  "certified-scrum-master": [
    {
      title: "Scrum Mastery: From Good To Great Servant-Leadership",
      author: "Geoff Watts",
      rating: 4.5,
      reviewCount: 1567,
      price: "$21.99",
      amazonUrl: "https://amazon.com/dp/0957587406?tag=resumestuffer-20",
      description:
        "Essential guide to becoming an effective Scrum Master with servant leadership principles.",
      highlights: [
        "Servant leadership approach",
        "Team coaching techniques",
        "Scrum framework mastery",
        "Real-world case studies",
      ],
    },
  ],

  // Six Sigma
  "six-sigma-green-belt": [
    {
      title: "Lean Six Sigma Green Belt Certification",
      author: "Issa Bass",
      rating: 4.3,
      reviewCount: 876,
      price: "$26.99",
      amazonUrl: "https://amazon.com/dp/1523085045?tag=resumestuffer-20",
      description:
        "Complete guide to Six Sigma Green Belt certification with DMAIC methodology.",
      highlights: [
        "DMAIC methodology",
        "Statistical analysis tools",
        "Process improvement",
        "Real project examples",
      ],
    },
  ],

  // IT Service Management
  "itil-4-foundation": [
    {
      title: "ITIL 4 Foundation Exam Study Guide",
      author: "Liz Gallacher",
      rating: 4.2,
      reviewCount: 1234,
      price: "$28.99",
      amazonUrl: "https://amazon.com/dp/1119742749?tag=resumestuffer-20",
      description:
        "Official study guide for ITIL 4 Foundation certification exam.",
      highlights: [
        "ITIL 4 framework coverage",
        "Service value system",
        "Guiding principles",
        "Practice questions included",
      ],
    },
  ],

  // Adobe Certifications
  "adobe-certified-expert-photoshop": [
    {
      title: "Adobe Photoshop Classroom in a Book",
      author: "Conrad Chavez",
      rating: 4.4,
      reviewCount: 2341,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/0136872271?tag=resumestuffer-20",
      description:
        "Official Adobe training workbook for mastering Photoshop skills.",
      highlights: [
        "Official Adobe training",
        "Step-by-step lessons",
        "Project-based learning",
        "Advanced techniques",
      ],
    },
  ],

  // Kubernetes
  "kubernetes-cka": [
    {
      title: "Kubernetes in Action",
      author: "Marko Luksa",
      rating: 4.6,
      reviewCount: 1876,
      price: "$39.99",
      amazonUrl: "https://amazon.com/dp/1617293725?tag=resumestuffer-20",
      description:
        "Comprehensive guide to Kubernetes administration and application deployment.",
      highlights: [
        "Container orchestration",
        "Cluster administration",
        "Application deployment",
        "Troubleshooting guide",
      ],
    },
  ],

  // Terraform
  "terraform-associate": [
    {
      title: "Terraform: Up & Running",
      author: "Yevgeniy Brikman",
      rating: 4.5,
      reviewCount: 1432,
      price: "$33.99",
      amazonUrl: "https://amazon.com/dp/1492046906?tag=resumestuffer-20",
      description:
        "Practical guide to infrastructure as code with Terraform.",
      highlights: [
        "Infrastructure as code",
        "Multi-cloud deployment",
        "Best practices guide",
        "Real-world examples",
      ],
    },
  ],

  // Docker
  "docker-certified-associate": [
    {
      title: "Docker Deep Dive",
      author: "Nigel Poulton",
      rating: 4.7,
      reviewCount: 2134,
      price: "$28.99",
      amazonUrl: "https://amazon.com/dp/1521822808?tag=resumestuffer-20",
      description:
        "Complete guide to Docker containerization technology and best practices.",
      highlights: [
        "Container fundamentals",
        "Docker Swarm orchestration",
        "Security best practices",
        "Production deployment",
      ],
    },
  ],

  // === NEW AWS CERTIFICATIONS ===
  "aws-sysops-administrator-associate": [
    {
      title: "AWS Certified SysOps Administrator Study Guide",
      author: "Sara Perrott, Stephen Cole",
      rating: 4.4,
      reviewCount: 1543,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1119377420?tag=resumestuffer-20",
      description:
        "Complete preparation for AWS SysOps Administrator Associate exam covering monitoring, logging, and troubleshooting.",
      highlights: [
        "Systems operations best practices",
        "CloudWatch monitoring and alerting",
        "Auto Scaling configuration",
        "Practice questions included",
      ],
    },
    {
      title: "AWS SysOps Administrator Practice Tests",
      author: "Neal Davis",
      rating: 4.5,
      reviewCount: 987,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/1119685028?tag=resumestuffer-20",
      description:
        "1000+ practice questions for AWS SysOps Administrator exam preparation.",
      highlights: [
        "1000+ practice questions",
        "Performance-based scenarios",
        "Detailed explanations",
        "Exam simulation mode",
      ],
    },
  ],

  "aws-advanced-networking-specialty": [
    {
      title: "AWS Certified Advanced Networking Study Guide",
      author: "Todd Montgomery, Colm MacCárthaigh",
      rating: 4.3,
      reviewCount: 876,
      price: "$44.99",
      amazonUrl: "https://amazon.com/dp/1119439809?tag=resumestuffer-20",
      description:
        "Comprehensive guide for AWS Advanced Networking Specialty certification covering complex networking scenarios.",
      highlights: [
        "VPC design patterns",
        "Hybrid connectivity solutions",
        "Network security best practices",
        "Real-world case studies",
      ],
    },
  ],

  "aws-database-specialty": [
    {
      title: "AWS Database Services Study Guide",
      author: "Biff Gaut, Timothy Myer",
      rating: 4.2,
      reviewCount: 654,
      price: "$39.99",
      amazonUrl: "https://amazon.com/dp/1119594308?tag=resumestuffer-20",
      description:
        "Database-focused guide covering RDS, DynamoDB, and other AWS database services.",
      highlights: [
        "RDS administration",
        "DynamoDB design patterns",
        "Database migration strategies",
        "Performance optimization",
      ],
    },
  ],

  "aws-data-analytics-specialty": [
    {
      title: "AWS Certified Data Analytics Study Guide",
      author: "Krishnan Subramanian",
      rating: 4.4,
      reviewCount: 1234,
      price: "$42.99",
      amazonUrl: "https://amazon.com/dp/1119819563?tag=resumestuffer-20",
      description:
        "Complete guide for AWS Data Analytics Specialty covering big data services and analytics patterns.",
      highlights: [
        "Kinesis data streaming",
        "Redshift data warehousing",
        "EMR big data processing",
        "QuickSight visualization",
      ],
    },
  ],

  "aws-sap-on-aws-specialty": [
    {
      title: "SAP on AWS Implementation Guide",
      author: "Andre Bois, Markus Noga",
      rating: 4.1,
      reviewCount: 432,
      price: "$49.99",
      amazonUrl: "https://amazon.com/dp/1119594332?tag=resumestuffer-20",
      description:
        "Specialized guide for implementing and managing SAP workloads on AWS infrastructure.",
      highlights: [
        "SAP HANA on AWS",
        "High availability design",
        "Migration best practices",
        "Cost optimization strategies",
      ],
    },
  ],

  // === GOOGLE CLOUD PLATFORM ===
  "google-cloud-professional-cloud-architect": [
    {
      title: "Google Cloud Platform in Action",
      author: "JJ Geewax",
      rating: 4.3,
      reviewCount: 1876,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1617293520?tag=resumestuffer-20",
      description:
        "Comprehensive guide to Google Cloud Platform architecture and services for professional certification.",
      highlights: [
        "GCP service architecture",
        "Infrastructure design patterns",
        "Security and compliance",
        "Hands-on examples",
      ],
    },
    {
      title: "Official Google Cloud Certified Professional Cloud Architect Study Guide",
      author: "Dan Sullivan",
      rating: 4.5,
      reviewCount: 2134,
      price: "$39.99",
      amazonUrl: "https://amazon.com/dp/1119602440?tag=resumestuffer-20",
      description:
        "Official study guide for Google Cloud Professional Cloud Architect certification.",
      highlights: [
        "Official Google content",
        "Real-world scenarios",
        "Practice questions",
        "Architecture case studies",
      ],
    },
  ],

  "google-cloud-associate-cloud-engineer": [
    {
      title: "Google Cloud Certified Associate Cloud Engineer Study Guide",
      author: "Dan Sullivan",
      rating: 4.4,
      reviewCount: 1543,
      price: "$29.99",
      amazonUrl: "https://amazon.com/dp/1119564417?tag=resumestuffer-20",
      description:
        "Complete preparation for Google Cloud Associate Cloud Engineer certification.",
      highlights: [
        "GCP fundamentals",
        "Compute Engine management",
        "Kubernetes basics",
        "Practice exams included",
      ],
    },
  ],

  "google-cloud-professional-data-engineer": [
    {
      title: "Google Cloud Platform for Data Engineering",
      author: "Valliappa Lakshmanan",
      rating: 4.6,
      reviewCount: 1678,
      price: "$44.99",
      amazonUrl: "https://amazon.com/dp/1491999817?tag=resumestuffer-20",
      description:
        "Data engineering guide for Google Cloud Platform covering BigQuery, Dataflow, and ML pipelines.",
      highlights: [
        "BigQuery data warehousing",
        "Dataflow streaming",
        "ML pipeline development",
        "Real-world projects",
      ],
    },
  ],

  "google-cloud-professional-devops-engineer": [
    {
      title: "Site Reliability Engineering",
      author: "Niall Richard Murphy, Betsy Beyer",
      rating: 4.5,
      reviewCount: 2456,
      price: "$38.99",
      amazonUrl: "https://amazon.com/dp/149192912X?tag=resumestuffer-20",
      description:
        "Google's approach to site reliability engineering and DevOps practices.",
      highlights: [
        "SRE principles and practices",
        "Monitoring and alerting",
        "Incident response",
        "Google's proven methods",
      ],
    },
  ],

  "google-cloud-professional-cloud-developer": [
    {
      title: "Google Cloud Platform Cookbook",
      author: "Legorie Rajan PS",
      rating: 4.2,
      reviewCount: 987,
      price: "$32.99",
      amazonUrl: "https://amazon.com/dp/1788291999?tag=resumestuffer-20",
      description:
        "Practical recipes for developing applications on Google Cloud Platform.",
      highlights: [
        "App Engine development",
        "Cloud Functions serverless",
        "API development",
        "Step-by-step recipes",
      ],
    },
  ],

  // === AZURE ADVANCED CERTIFICATIONS ===
  "azure-security-engineer-associate": [
    {
      title: "Exam AZ-500 Microsoft Azure Security Technologies",
      author: "Michael Washam",
      rating: 4.3,
      reviewCount: 1456,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/0136798314?tag=resumestuffer-20",
      description:
        "Official study guide for Azure Security Engineer Associate certification.",
      highlights: [
        "Azure security services",
        "Identity and access management",
        "Platform protection",
        "Security operations",
      ],
    },
  ],

  "azure-devops-engineer-expert": [
    {
      title: "Exam AZ-400 Designing and Implementing Microsoft DevOps Solutions",
      author: "Henry Been, Maik van der Gaag",
      rating: 4.4,
      reviewCount: 1234,
      price: "$36.99",
      amazonUrl: "https://amazon.com/dp/0137252498?tag=resumestuffer-20",
      description:
        "Complete guide for Azure DevOps Engineer Expert certification covering CI/CD and automation.",
      highlights: [
        "Azure DevOps Services",
        "CI/CD pipeline design",
        "Infrastructure as Code",
        "Monitoring and feedback",
      ],
    },
  ],

  "azure-solutions-architect-expert": [
    {
      title: "Exam AZ-305 Designing Microsoft Azure Infrastructure Solutions",
      author: "Brett Hargreaves",
      rating: 4.2,
      reviewCount: 987,
      price: "$39.99",
      amazonUrl: "https://amazon.com/dp/0137896646?tag=resumestuffer-20",
      description:
        "Expert-level guide for designing Azure infrastructure solutions and architecture.",
      highlights: [
        "Infrastructure design patterns",
        "Business continuity solutions",
        "Authentication strategies",
        "Cost optimization",
      ],
    },
  ],

  "azure-data-engineer-associate": [
    {
      title: "Exam DP-203 Data Engineering on Microsoft Azure",
      author: "Daniel Seara",
      rating: 4.3,
      reviewCount: 1123,
      price: "$35.99",
      amazonUrl: "https://amazon.com/dp/0137252382?tag=resumestuffer-20",
      description:
        "Comprehensive guide for Azure Data Engineer Associate certification.",
      highlights: [
        "Azure Data Factory",
        "Azure Synapse Analytics",
        "Data Lake solutions",
        "Stream processing",
      ],
    },
  ],

  "azure-ai-engineer-associate": [
    {
      title: "Exam AI-102 Designing and Implementing Microsoft Azure AI Solution",
      author: "Darius Diminescu",
      rating: 4.4,
      reviewCount: 876,
      price: "$37.99",
      amazonUrl: "https://amazon.com/dp/0137252756?tag=resumestuffer-20",
      description:
        "Complete preparation for Azure AI Engineer Associate certification.",
      highlights: [
        "Azure Cognitive Services",
        "Machine Learning solutions",
        "Computer vision applications",
        "Natural language processing",
      ],
    },
  ],

  // === CYBERSECURITY CERTIFICATIONS ===
  "certified-ethical-hacker": [
    {
      title: "CEH Certified Ethical Hacker All-in-One Exam Guide",
      author: "Matt Walker",
      rating: 4.3,
      reviewCount: 2456,
      price: "$39.99",
      amazonUrl: "https://amazon.com/dp/1260454557?tag=resumestuffer-20",
      description:
        "Complete preparation for Certified Ethical Hacker (CEH) certification exam.",
      highlights: [
        "Ethical hacking methodologies",
        "Penetration testing techniques",
        "Network security testing",
        "Practice questions included",
      ],
    },
    {
      title: "CEH v12 Certified Ethical Hacker Study Guide",
      author: "Ric Messier",
      rating: 4.4,
      reviewCount: 1876,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1119800242?tag=resumestuffer-20",
      description:
        "Updated study guide for CEH v12 certification covering latest hacking techniques.",
      highlights: [
        "Latest CEH v12 content",
        "Hands-on exercises",
        "Vulnerability assessment",
        "Incident response",
      ],
    },
  ],

  "sans-gcih": [
    {
      title: "Incident Response & Computer Forensics",
      author: "Jason Luttgens, Matthew Pepe",
      rating: 4.6,
      reviewCount: 1234,
      price: "$49.99",
      amazonUrl: "https://amazon.com/dp/0071798684?tag=resumestuffer-20",
      description:
        "Comprehensive guide to incident response and computer forensics for security professionals.",
      highlights: [
        "Incident response procedures",
        "Digital forensics techniques",
        "Threat hunting methods",
        "Real-world case studies",
      ],
    },
  ],

  "cism": [
    {
      title: "CISM Certified Information Security Manager All-in-One Exam Guide",
      author: "Peter Gregory",
      rating: 4.4,
      reviewCount: 1678,
      price: "$44.99",
      amazonUrl: "https://amazon.com/dp/1260453774?tag=resumestuffer-20",
      description:
        "Complete preparation for CISM certification covering information security management.",
      highlights: [
        "Information security governance",
        "Risk management frameworks",
        "Security program development",
        "Practice exams included",
      ],
    },
  ],

  "cisa": [
    {
      title: "CISA Certified Information Systems Auditor All-in-One Exam Guide",
      author: "Peter Gregory",
      rating: 4.3,
      reviewCount: 1456,
      price: "$42.99",
      amazonUrl: "https://amazon.com/dp/1260453790?tag=resumestuffer-20",
      description:
        "Comprehensive guide for CISA certification covering information systems auditing.",
      highlights: [
        "Information systems auditing",
        "IT governance principles",
        "Risk assessment methods",
        "Compliance frameworks",
      ],
    },
  ],

  // === KUBERNETES AND DEVOPS ===
  "kubernetes-ckad": [
    {
      title: "Kubernetes Application Developer Exam Guide",
      author: "Matthew Palmer",
      rating: 4.5,
      reviewCount: 1876,
      price: "$29.99",
      amazonUrl: "https://amazon.com/dp/1804611964?tag=resumestuffer-20",
      description:
        "Practical guide for CKAD certification focusing on Kubernetes application development.",
      highlights: [
        "Application design patterns",
        "Kubernetes deployment strategies",
        "Troubleshooting techniques",
        "Hands-on exercises",
      ],
    },
  ],

  "kubernetes-cks": [
    {
      title: "Kubernetes Security Best Practices",
      author: "Brendan Burns, Eddie Villalba",
      rating: 4.4,
      reviewCount: 987,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1492056324?tag=resumestuffer-20",
      description:
        "Security-focused guide for Kubernetes covering cluster hardening and container security.",
      highlights: [
        "Cluster security hardening",
        "Container runtime security",
        "Network policy implementation",
        "Security scanning tools",
      ],
    },
  ],

  "jenkins-certified-engineer": [
    {
      title: "Jenkins: The Definitive Guide",
      author: "John Ferguson Smart",
      rating: 4.3,
      reviewCount: 1543,
      price: "$32.99",
      amazonUrl: "https://amazon.com/dp/1449305350?tag=resumestuffer-20",
      description:
        "Comprehensive guide to Jenkins automation covering installation, configuration, and best practices.",
      highlights: [
        "Jenkins fundamentals",
        "Pipeline as Code",
        "Plugin development",
        "Enterprise deployment",
      ],
    },
  ],

  "elastic-certified-engineer": [
    {
      title: "Learning Elastic Stack 8.0",
      author: "Pranav Shukla, Sharath Kumar",
      rating: 4.2,
      reviewCount: 876,
      price: "$35.99",
      amazonUrl: "https://amazon.com/dp/1801075840?tag=resumestuffer-20",
      description:
        "Complete guide to Elasticsearch, Logstash, Kibana, and Beats for data analysis and visualization.",
      highlights: [
        "Elasticsearch fundamentals",
        "Logstash data processing",
        "Kibana visualization",
        "Performance optimization",
      ],
    },
  ],

  "splunk-core-certified-user": [
    {
      title: "Splunk 9 Certified User Study Guide",
      author: "Jeff Champagne",
      rating: 4.4,
      reviewCount: 1234,
      price: "$31.99",
      amazonUrl: "https://amazon.com/dp/1803244410?tag=resumestuffer-20",
      description:
        "Complete preparation for Splunk Core Certified User exam covering search and reporting.",
      highlights: [
        "Splunk search fundamentals",
        "Data visualization techniques",
        "Alert configuration",
        "Report scheduling",
      ],
    },
  ],

  // === STUDENT CERTIFICATIONS ===
  // CompTIA ITF+ (Entry point for IT pathway)
  "comptia-it-fundamentals-plus": [
    {
      title: "CompTIA IT Fundamentals+ Study Guide: Exam FC0-U61",
      author: "Quentin Docter, Ron Gilster",
      rating: 4.3,
      reviewCount: 892,
      price: "$26.99",
      amazonUrl: "https://amazon.com/dp/1119513073?tag=resumestuffer-20",
      description: "Complete preparation for CompTIA IT Fundamentals+ certification, perfect for high school students entering IT careers.",
      highlights: [
        "Entry-level IT concepts explained clearly",
        "Hardware and software fundamentals",
        "Basic networking and security",
        "Practice questions included"
      ]
    },
    {
      title: "CompTIA IT Fundamentals (ITF+) Practice Tests",
      author: "Mike Chapple",
      rating: 4.4,
      reviewCount: 567,
      price: "$19.99",
      amazonUrl: "https://amazon.com/dp/1119515041?tag=resumestuffer-20",
      description: "Essential practice tests for CompTIA IT Fundamentals+ exam with detailed explanations.",
      highlights: [
        "500+ practice questions",
        "Detailed answer explanations",
        "Exam simulation format",
        "Performance tracking"
      ]
    }
  ],

  // CompTIA A+ (Core IT certification for students)
  "comptia-a-plus-high-school": [
    {
      title: "CompTIA A+ Complete Study Guide: Core 1 & Core 2",
      author: "Quentin Docter, Jon Buhagiar",
      rating: 4.5,
      reviewCount: 3241,
      price: "$39.99",
      amazonUrl: "https://amazon.com/dp/1119737974?tag=resumestuffer-20",
      description: "Comprehensive A+ study guide covering both Core 1 and Core 2 exams, ideal for high school students pursuing IT careers.",
      highlights: [
        "Complete A+ certification coverage",
        "Student-friendly explanations",
        "Hands-on lab exercises",
        "Online practice tests included"
      ]
    },
    {
      title: "CompTIA A+ Practice Tests: Core 1 & Core 2",
      author: "Quentin Docter",
      rating: 4.4,
      reviewCount: 2156,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/1119737990?tag=resumestuffer-20",
      description: "1000+ practice questions for both A+ exams with comprehensive explanations.",
      highlights: [
        "1000+ practice questions",
        "Performance-based questions",
        "Detailed explanations",
        "Mobile-friendly format"
      ]
    }
  ],

  // CompTIA Network+ (Intermediate networking)
  "comptia-network-plus-student": [
    {
      title: "CompTIA Network+ Study Guide: Exam N10-008",
      author: "Todd Lammle",
      rating: 4.6,
      reviewCount: 2789,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1119811635?tag=resumestuffer-20",
      description: "Industry-leading Network+ study guide perfect for students building networking expertise.",
      highlights: [
        "Comprehensive networking concepts",
        "Real-world scenarios",
        "Network troubleshooting skills",
        "Practice exams included"
      ]
    },
    {
      title: "CompTIA Network+ Practice Tests: Exam N10-008",
      author: "Jon Buhagiar",
      rating: 4.5,
      reviewCount: 1432,
      price: "$22.99",
      amazonUrl: "https://amazon.com/dp/1119811651?tag=resumestuffer-20",
      description: "Essential practice tests for Network+ certification with performance-based questions.",
      highlights: [
        "Performance-based simulations",
        "Network troubleshooting scenarios",
        "Detailed explanations",
        "Domain-specific practice"
      ]
    }
  ],

  // CompTIA Security+ (Advanced security for students)
  "comptia-security-plus-student": [
    {
      title: "CompTIA Security+ Study Guide: Exam SY0-601",
      author: "Mike Chapple, David Seidl",
      rating: 4.4,
      reviewCount: 2156,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1119736250?tag=resumestuffer-20",
      description: "Comprehensive Security+ study guide for students entering cybersecurity careers.",
      highlights: [
        "Complete exam objective coverage",
        "Real-world security scenarios",
        "Student-accessible explanations",
        "Online test bank access"
      ]
    },
    {
      title: "CompTIA Security+ Practice Tests: Exam SY0-601",
      author: "Mike Chapple, David Seidl",
      rating: 4.5,
      reviewCount: 1342,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/1119736277?tag=resumestuffer-20",
      description: "1000+ practice questions to master Security+ concepts for student certification.",
      highlights: [
        "1000+ practice questions",
        "Domain-specific testing",
        "Performance-based questions",
        "Detailed explanations"
      ]
    }
  ],

  // OSHA 10-Hour Safety Training
  "osha-10-hour-safety-training": [
    {
      title: "OSHA 10-Hour Construction Safety Training Manual",
      author: "OSHA Training Institute",
      rating: 4.2,
      reviewCount: 756,
      price: "$18.99",
      amazonUrl: "https://amazon.com/dp/1640030492?tag=resumestuffer-20",
      description: "Official OSHA training manual for 10-hour construction safety course, essential for young workers.",
      highlights: [
        "Official OSHA content",
        "Construction safety fundamentals",
        "Hazard recognition training",
        "Student-friendly format"
      ]
    },
    {
      title: "Construction Safety Handbook for Students",
      author: "David MacCollum",
      rating: 4.3,
      reviewCount: 432,
      price: "$21.99",
      amazonUrl: "https://amazon.com/dp/1449645712?tag=resumestuffer-20",
      description: "Comprehensive safety handbook designed specifically for students entering construction trades.",
      highlights: [
        "Student-focused safety training",
        "Real-world examples",
        "PPE guidelines",
        "Emergency procedures"
      ]
    }
  ],

  // OSHA 30-Hour Advanced Safety
  "osha-30-hour-advanced-safety": [
    {
      title: "OSHA 30-Hour Construction Safety Outreach Training Manual",
      author: "OSHA Training Institute",
      rating: 4.4,
      reviewCount: 634,
      price: "$32.99",
      amazonUrl: "https://amazon.com/dp/1640030516?tag=resumestuffer-20",
      description: "Advanced OSHA 30-hour training manual for construction safety leadership roles.",
      highlights: [
        "Advanced safety management",
        "Supervisor responsibilities",
        "Comprehensive hazard training",
        "Leadership development"
      ]
    }
  ],

  // AWS Entry Level Welding
  "aws-entry-level-welder": [
    {
      title: "Welding: Principles and Applications",
      author: "Larry Jeffus",
      rating: 4.6,
      reviewCount: 1876,
      price: "$149.99",
      amazonUrl: "https://amazon.com/dp/1337558954?tag=resumestuffer-20",
      description: "Comprehensive welding textbook covering fundamentals for AWS certification preparation.",
      highlights: [
        "Complete welding fundamentals",
        "AWS standards and procedures",
        "Safety protocols",
        "Hands-on techniques"
      ]
    },
    {
      title: "Audel Welding Pocket Reference",
      author: "James Brumbaugh",
      rating: 4.4,
      reviewCount: 987,
      price: "$19.99",
      amazonUrl: "https://amazon.com/dp/0764541196?tag=resumestuffer-20",
      description: "Portable reference guide for welding students and apprentices preparing for AWS certification.",
      highlights: [
        "Quick reference format",
        "AWS welding symbols",
        "Material properties",
        "Troubleshooting guide"
      ]
    }
  ],

  // AWS Certified Welder
  "aws-certified-welder": [
    {
      title: "Modern Welding Technology",
      author: "Howard Cary, Scott Helzer",
      rating: 4.5,
      reviewCount: 1234,
      price: "$189.99",
      amazonUrl: "https://amazon.com/dp/0134039564?tag=resumestuffer-20",
      description: "Advanced welding textbook for professional AWS certification covering modern techniques.",
      highlights: [
        "Advanced welding processes",
        "Quality control methods",
        "Metallurgy fundamentals",
        "Industry standards"
      ]
    }
  ],

  // AP Computer Science A
  "ap-computer-science-a": [
    {
      title: "Barron's AP Computer Science A",
      author: "Roselyn Teukolsky",
      rating: 4.4,
      reviewCount: 2341,
      price: "$18.99",
      amazonUrl: "https://amazon.com/dp/1506264735?tag=resumestuffer-20",
      description: "Comprehensive AP Computer Science A prep book with Java programming focus and practice exams.",
      highlights: [
        "Complete AP curriculum coverage",
        "Java programming concepts",
        "Multiple practice exams",
        "College Board aligned content"
      ]
    },
    {
      title: "5 Steps to a 5: AP Computer Science A",
      author: "Dean Johnson",
      rating: 4.3,
      reviewCount: 1567,
      price: "$16.99",
      amazonUrl: "https://amazon.com/dp/1264258852?tag=resumestuffer-20",
      description: "Step-by-step AP Computer Science A preparation with proven strategies for exam success.",
      highlights: [
        "5-step study plan",
        "Practice programming problems",
        "Test-taking strategies",
        "Self-assessment tools"
      ]
    }
  ],

  // AP Seminar
  "ap-seminar": [
    {
      title: "The AP Seminar and AP Research Student Guide",
      author: "College Board",
      rating: 4.2,
      reviewCount: 876,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/1457309408?tag=resumestuffer-20",
      description: "Official College Board guide for AP Seminar covering research methodology and presentation skills.",
      highlights: [
        "Official College Board content",
        "Research methodology",
        "Academic writing skills",
        "Presentation techniques"
      ]
    }
  ],

  // AP Research
  "ap-research": [
    {
      title: "Research and Writing Guide for the AP Capstone Program",
      author: "Susan Jones, Rebecca Hirsch",
      rating: 4.3,
      reviewCount: 654,
      price: "$28.99",
      amazonUrl: "https://amazon.com/dp/1506236421?tag=resumestuffer-20",
      description: "Comprehensive guide for AP Research focusing on independent research and academic writing.",
      highlights: [
        "Independent research methods",
        "Academic writing mastery",
        "Source evaluation",
        "Presentation skills"
      ]
    }
  ],

  // Microsoft Office Specialist
  "microsoft-office-specialist-student": [
    {
      title: "Microsoft Office Specialist Study Guide: Microsoft Office 365",
      author: "Joan Lambert",
      rating: 4.3,
      reviewCount: 1432,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/0135404657?tag=resumestuffer-20",
      description: "Complete MOS certification guide covering Word, Excel, and PowerPoint for students.",
      highlights: [
        "Office 365 comprehensive coverage",
        "Student-friendly explanations",
        "Practice exercises included",
        "Certification exam prep"
      ]
    },
    {
      title: "Microsoft Office 365 for Students: Step by Step",
      author: "Reed Jacobson",
      rating: 4.4,
      reviewCount: 987,
      price: "$19.99",
      amazonUrl: "https://amazon.com/dp/0735697361?tag=resumestuffer-20",
      description: "Hands-on guide to Microsoft Office 365 specifically designed for student users.",
      highlights: [
        "Student-focused approach",
        "Real academic scenarios",
        "Step-by-step tutorials",
        "Productivity techniques"
      ]
    }
  ],

  // DELF French A2
  "delf-french-a2": [
    {
      title: "DELF A2: French Exam Preparation Book",
      author: "Sylvie Lepage",
      rating: 4.2,
      reviewCount: 567,
      price: "$22.99",
      amazonUrl: "https://amazon.com/dp/209038507X?tag=resumestuffer-20",
      description: "Complete DELF A2 preparation with practice tests and audio materials for French language certification.",
      highlights: [
        "Official DELF format",
        "Audio materials included",
        "Speaking practice guides",
        "Cultural content"
      ]
    }
  ],

  // DELF French B1
  "delf-french-b1-student": [
    {
      title: "DELF B1: 200 Activités",
      author: "Richard Lescure",
      rating: 4.4,
      reviewCount: 892,
      price: "$26.99",
      amazonUrl: "https://amazon.com/dp/2090352086?tag=resumestuffer-20",
      description: "Comprehensive DELF B1 preparation with 200 practice activities and exam strategies.",
      highlights: [
        "200 practice activities",
        "Exam strategies included",
        "Audio support materials",
        "Progressive difficulty"
      ]
    }
  ],

  // DELF French B2
  "delf-french-b2-student": [
    {
      title: "DELF B2: Tout-en-un",
      author: "Bruno Megre",
      rating: 4.5,
      reviewCount: 1234,
      price: "$29.99",
      amazonUrl: "https://amazon.com/dp/2017080039?tag=resumestuffer-20",
      description: "Complete DELF B2 preparation guide with comprehensive exercises and practice tests.",
      highlights: [
        "All-in-one preparation",
        "Comprehensive exercises",
        "Practice test included",
        "Advanced French skills"
      ]
    }
  ],

  // DELE Spanish A2
  "dele-spanish-a2": [
    {
      title: "Preparación al Diploma de Español DELE A2",
      author: "Pilar Alzugaray",
      rating: 4.3,
      reviewCount: 654,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/8477117888?tag=resumestuffer-20",
      description: "Official DELE A2 preparation book with practice tests and comprehensive exercises.",
      highlights: [
        "Official DELE preparation",
        "Complete practice tests",
        "Audio materials included",
        "Spanish cultural content"
      ]
    }
  ],

  // DELE Spanish B1
  "dele-spanish-b1": [
    {
      title: "El Cronómetro DELE B1",
      author: "Alejandro Bech",
      rating: 4.4,
      reviewCount: 876,
      price: "$28.99",
      amazonUrl: "https://amazon.com/dp/8498481724?tag=resumestuffer-20",
      description: "Timed practice for DELE B1 exam with realistic test conditions and strategies.",
      highlights: [
        "Timed practice sessions",
        "Realistic exam conditions",
        "Test-taking strategies",
        "Audio materials included"
      ]
    }
  ],

  // HSK Level 3 Chinese
  "hsk-level-3-chinese": [
    {
      title: "HSK Standard Course 3 Textbook",
      author: "Jiang Liping",
      rating: 4.5,
      reviewCount: 1567,
      price: "$32.99",
      amazonUrl: "https://amazon.com/dp/7561943172?tag=resumestuffer-20",
      description: "Official HSK Level 3 textbook with comprehensive Chinese language learning materials.",
      highlights: [
        "Official HSK curriculum",
        "Character practice included",
        "Audio materials provided",
        "Cultural context lessons"
      ]
    }
  ],

  // HSK Level 4 Chinese
  "hsk-level-4-chinese": [
    {
      title: "HSK Standard Course 4A & 4B Set",
      author: "Jiang Liping",
      rating: 4.6,
      reviewCount: 1234,
      price: "$45.99",
      amazonUrl: "https://amazon.com/dp/B01N0QY8JL?tag=resumestuffer-20",
      description: "Complete HSK Level 4 textbook set for intermediate Chinese language certification.",
      highlights: [
        "Two-volume complete set",
        "Intermediate Chinese mastery",
        "Comprehensive exercises",
        "Audio support included"
      ]
    }
  ],

  // Google Analytics IQ
  "google-analytics-iq": [
    {
      title: "Google Analytics Breakthrough",
      author: "Feras Alhlou",
      rating: 4.3,
      reviewCount: 892,
      price: "$21.99",
      amazonUrl: "https://amazon.com/dp/1119168066?tag=resumestuffer-20",
      description: "Comprehensive Google Analytics guide for certification and practical digital marketing skills.",
      highlights: [
        "Google Analytics mastery",
        "Digital marketing insights",
        "Certification exam prep",
        "Real-world applications"
      ]
    },
    {
      title: "Google Analytics for Students and Professionals",
      author: "Jennifer Kyrnin",
      rating: 4.2,
      reviewCount: 567,
      price: "$18.99",
      amazonUrl: "https://amazon.com/dp/1491902404?tag=resumestuffer-20",
      description: "Student-focused Google Analytics guide covering fundamentals and certification preparation.",
      highlights: [
        "Student-friendly approach",
        "Analytics fundamentals",
        "Career applications",
        "Hands-on exercises"
      ]
    }
  ],

  // === NEW TECHNOLOGY CERTIFICATIONS FOR STUDENTS ===
  
  // Google Cybersecurity Professional Certificate
  "google-cybersecurity-student": [
    {
      title: "Cybersecurity Fundamentals for Students",
      author: "Chuck Easttom",
      rating: 4.3,
      reviewCount: 1567,
      price: "$29.99",
      amazonUrl: "https://amazon.com/dp/0789759007?tag=resumestuffer-20",
      description: "Perfect introduction to cybersecurity concepts for students taking the Google Cybersecurity certificate.",
      highlights: [
        "Student-friendly cybersecurity basics",
        "Network security fundamentals",
        "Incident response overview",
        "Security tools introduction"
      ]
    },
    {
      title: "CompTIA Security+ Get Certified Get Ahead",
      author: "Darril Gibson",
      rating: 4.6,
      reviewCount: 2341,
      price: "$34.99",
      amazonUrl: "https://amazon.com/dp/1939136059?tag=resumestuffer-20",
      description: "Excellent foundation for students pursuing cybersecurity, complementing Google's certificate program.",
      highlights: [
        "Security concepts explained clearly",
        "Real-world scenarios",
        "Practice questions included",
        "Student success stories"
      ]
    }
  ],

  // Python PCEP (Entry-Level)
  "python-pcep-student": [
    {
      title: "Python Crash Course: A Hands-On Introduction to Programming",
      author: "Eric Matthes",
      rating: 4.6,
      reviewCount: 4523,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/1593279280?tag=resumestuffer-20",
      description: "Perfect starting point for students preparing for Python PCEP certification with beginner-friendly approach.",
      highlights: [
        "Complete Python fundamentals",
        "Hands-on projects included",
        "Student-tested approach",
        "Real-world applications"
      ]
    },
    {
      title: "Automate the Boring Stuff with Python",
      author: "Al Sweigart",
      rating: 4.7,
      reviewCount: 3241,
      price: "$19.99",
      amazonUrl: "https://amazon.com/dp/1593279922?tag=resumestuffer-20",
      description: "Practical Python programming book that builds skills needed for PCEP certification through real projects.",
      highlights: [
        "Practical programming projects",
        "Automation examples",
        "Beginner-friendly explanations",
        "Free online version available"
      ]
    }
  ],

  // Python PCAP (Associate)
  "python-pcap-student": [
    {
      title: "Effective Python: 90 Specific Ways to Write Better Python",
      author: "Brett Slatkin",
      rating: 4.5,
      reviewCount: 1876,
      price: "$32.99",
      amazonUrl: "https://amazon.com/dp/0134853989?tag=resumestuffer-20",
      description: "Intermediate Python guide perfect for students preparing for PCAP certification with OOP focus.",
      highlights: [
        "Object-oriented programming mastery",
        "Advanced Python techniques",
        "Best practices guide",
        "Professional coding standards"
      ]
    },
    {
      title: "Python Tricks: The Book",
      author: "Dan Bader",
      rating: 4.4,
      reviewCount: 1234,
      price: "$26.99",
      amazonUrl: "https://amazon.com/dp/1775093301?tag=resumestuffer-20",
      description: "Essential Python techniques and patterns for intermediate students advancing to PCAP level.",
      highlights: [
        "Python patterns and idioms",
        "Clean code techniques",
        "Performance optimization",
        "Real-world examples"
      ]
    }
  ],

  // Harvard CS50
  "harvard-cs50-student": [
    {
      title: "CS50 Study Guide: Computer Science Fundamentals",
      author: "Harvard Extension School",
      rating: 4.3,
      reviewCount: 987,
      price: "$21.99",
      amazonUrl: "https://amazon.com/dp/1544279847?tag=resumestuffer-20",
      description: "Official companion guide for Harvard CS50 course covering all fundamental computer science concepts.",
      highlights: [
        "Harvard CS50 aligned content",
        "Algorithm fundamentals",
        "Data structure explanations",
        "Programming practice problems"
      ]
    },
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      rating: 4.4,
      reviewCount: 2156,
      price: "$89.99",
      amazonUrl: "https://amazon.com/dp/0262046305?tag=resumestuffer-20",
      description: "The definitive algorithms textbook used in CS50 and computer science programs worldwide.",
      highlights: [
        "Comprehensive algorithm coverage",
        "Mathematical foundations",
        "CS50 curriculum aligned",
        "Industry standard reference"
      ]
    }
  ],

  // AWS Cloud Practitioner
  "aws-cloud-practitioner-student": [
    {
      title: "AWS Certified Cloud Practitioner Study Guide",
      author: "Ben Piper, David Clinton",
      rating: 4.5,
      reviewCount: 1247,
      price: "$29.99",
      amazonUrl: "https://amazon.com/dp/1119490707?tag=resumestuffer-20",
      description: "Student-friendly AWS Cloud Practitioner study guide with clear explanations and practice tests.",
      highlights: [
        "Official AWS training content",
        "Student-accessible explanations",
        "Practice questions with explanations",
        "Cloud fundamentals focus"
      ]
    },
    {
      title: "AWS for Students: Getting Started with Cloud Computing",
      author: "Mark Wilkins",
      rating: 4.2,
      reviewCount: 892,
      price: "$22.99",
      amazonUrl: "https://amazon.com/dp/1484268733?tag=resumestuffer-20",
      description: "Perfect introduction to AWS cloud services specifically written for students and beginners.",
      highlights: [
        "Student-focused approach",
        "Hands-on AWS tutorials",
        "Free tier optimization",
        "Real student projects"
      ]
    }
  ],

  // Microsoft Azure Fundamentals
  "azure-fundamentals-student": [
    {
      title: "Exam AZ-900: Microsoft Azure Fundamentals",
      author: "Jim Cheshire",
      rating: 4.3,
      reviewCount: 1543,
      price: "$24.99",
      amazonUrl: "https://amazon.com/dp/0136877200?tag=resumestuffer-20",
      description: "Official Microsoft study guide for Azure Fundamentals, perfect for students entering cloud computing.",
      highlights: [
        "Official Microsoft content",
        "Student-friendly explanations",
        "Cloud service fundamentals",
        "Practice questions included"
      ]
    },
    {
      title: "Azure for Students: Cloud Computing Fundamentals",
      author: "Michael Washam",
      rating: 4.1,
      reviewCount: 654,
      price: "$19.99",
      amazonUrl: "https://amazon.com/dp/B08KTKNZJ4?tag=resumestuffer-20",
      description: "Beginner-focused guide to Microsoft Azure designed specifically for students and new learners.",
      highlights: [
        "Student-oriented content",
        "Azure basics explained simply",
        "Hands-on exercises",
        "Educational account setup"
      ]
    }
  ],

  // Meta Front-End Developer
  "meta-frontend-developer-student": [
    {
      title: "HTML and CSS: Design and Build Websites",
      author: "Jon Duckett",
      rating: 4.7,
      reviewCount: 3241,
      price: "$22.99",
      amazonUrl: "https://amazon.com/dp/1118008189?tag=resumestuffer-20",
      description: "Visually stunning guide to HTML and CSS, perfect for students in Meta's front-end program.",
      highlights: [
        "Visual learning approach",
        "HTML/CSS fundamentals",
        "Student-friendly design",
        "Real-world examples"
      ]
    },
    {
      title: "JavaScript: The Good Parts",
      author: "Douglas Crockford",
      rating: 4.3,
      reviewCount: 1876,
      price: "$19.99",
      amazonUrl: "https://amazon.com/dp/0596517742?tag=resumestuffer-20",
      description: "Essential JavaScript guide for students building skills needed in Meta's front-end certificate.",
      highlights: [
        "JavaScript best practices",
        "Clean coding principles",
        "Professional development",
        "Industry standard reference"
      ]
    },
    {
      title: "Learning React: Modern Patterns for Developing React Apps",
      author: "Alex Banks, Eve Porcello",
      rating: 4.4,
      reviewCount: 1432,
      price: "$32.99",
      amazonUrl: "https://amazon.com/dp/1492051721?tag=resumestuffer-20",
      description: "Modern React development guide aligned with Meta's front-end certificate curriculum.",
      highlights: [
        "Modern React patterns",
        "Component development",
        "Hooks and state management",
        "Meta curriculum aligned"
      ]
    }
  ],

  // Google IT Automation with Python
  "google-it-automation-student": [
    {
      title: "Python for System Administrators",
      author: "Sriram Manohar",
      rating: 4.2,
      reviewCount: 876,
      price: "$28.99",
      amazonUrl: "https://amazon.com/dp/1484224446?tag=resumestuffer-20",
      description: "Perfect complement to Google's IT Automation course, focusing on Python for system administration.",
      highlights: [
        "System administration with Python",
        "Automation scripting",
        "IT operations focus",
        "Practical examples"
      ]
    },
    {
      title: "Git Version Control for Students and Professionals",
      author: "Tobias Günther",
      rating: 4.5,
      reviewCount: 1234,
      price: "$21.99",
      amazonUrl: "https://amazon.com/dp/1734377222?tag=resumestuffer-20",
      description: "Essential Git guide for students learning version control in Google's IT Automation program.",
      highlights: [
        "Git fundamentals explained",
        "Version control workflows",
        "Collaboration techniques",
        "Student-friendly approach"
      ]
    }
  ]
};

export default function StudyResources({
  certificationSlug,
  certificationTitle,
}: StudyResourcesProps) {
  const resources = studyResourcesData[certificationSlug] || [];

  if (resources.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-slate-300"
            }`}
          />
        ))}
        <span className="text-sm text-slate-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <section className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-blue-600" />
        <h3
          className="text-2xl font-bold text-slate-900"
          style={{
            fontFamily: "Work Sans, system-ui, sans-serif",
            fontWeight: 700,
          }}
        >
          Recommended Study Resources
        </h3>
      </div>

      <p className="text-slate-600 mb-8">
        These highly-rated study guides and practice tests have helped thousands
        of professionals pass the {certificationTitle} exam. All resources are
        carefully selected based on user reviews, content quality, and exam
        alignment.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
          >
            {/* Resource Header */}
            <div className="mb-4">
              <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                {resource.title}
              </h4>
              <p className="text-slate-600 text-sm mb-2">
                by {resource.author}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-3">
                {renderStars(resource.rating)}
                <span className="text-sm text-slate-500">
                  {resource.reviewCount.toLocaleString()} reviews
                </span>
              </div>
            </div>

            {/* Resource Description */}
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {resource.description}
            </p>

            {/* Highlights */}
            <div className="mb-6">
              <h5 className="text-sm font-semibold text-slate-700 mb-2">
                Key Features:
              </h5>
              <ul className="space-y-1">
                {resource.highlights.slice(0, 3).map((highlight, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-600 flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-slate-900">
                {resource.price}
              </div>
              <a
                href={resource.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
                onClick={() => {
                  // Track affiliate click
                  if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "affiliate_click", {
                      event_category: "Amazon Affiliate",
                      event_label: `${certificationSlug}-${resource.title}`,
                      value: parseFloat(resource.price.replace("$", "")),
                    });
                  }
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                View on Amazon
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-xs text-slate-500">
          <strong>Affiliate Disclosure:</strong> Resume Stuffer may earn a
          commission from Amazon purchases made through these links at no
          additional cost to you. We only recommend resources we believe will
          help you succeed in your certification journey.
        </p>
      </div>

      {/* Additional Study Tips */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">
          Study Tips for Success
        </h4>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm">
              <strong>Create a schedule:</strong> Dedicate consistent study time
              each day rather than cramming
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm">
              <strong>Practice tests first:</strong> Take a diagnostic exam to
              identify knowledge gaps
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm">
              <strong>Hands-on experience:</strong> Apply concepts in real
              projects or lab environments
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span className="text-sm">
              <strong>Join study groups:</strong> Connect with other candidates
              for support and accountability
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
