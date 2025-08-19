'use client'
import { TrendingUp, Calculator } from 'lucide-react'

// Calculate earning potential function
function calculateEarningPotential() {
  const roleLevel = (document.getElementById('current-role') as HTMLSelectElement)?.value
  const targetCert = (document.getElementById('target-cert') as HTMLSelectElement)?.value
  const salaryRange = (document.getElementById('current-salary') as HTMLSelectElement)?.value

  // Check if all fields are filled
  if (!roleLevel || !targetCert || !salaryRange) {
    alert('Please fill in all fields to calculate your potential.')
    return
  }

  // Sample calculation logic (you can make this more sophisticated)
  const baseSalary = parseInt(salaryRange)
  const certificationBoosts = {
    'aws-cloud-practitioner': { increase: 8000, timeline: '2-3 months' },
    'aws-solutions-architect': { increase: 15000, timeline: '4-6 months' },
    'aws-developer': { increase: 12000, timeline: '3-4 months' },
    'microsoft-azure': { increase: 10000, timeline: '3-4 months' },
    'google-analytics': { increase: 6000, timeline: '1-2 months' },
    'google-ads': { increase: 7000, timeline: '2-3 months' },
    'hubspot-marketing': { increase: 5000, timeline: '1-2 months' },
    'google-data-analytics': { increase: 9000, timeline: '3-6 months' },
    'tableau-analyst': { increase: 8000, timeline: '2-4 months' },
    'google-ux': { increase: 10000, timeline: '6-9 months' },
    'adobe-certified': { increase: 7000, timeline: '3-5 months' },
    'pmp': { increase: 13000, timeline: '6-8 months' },
    'salesforce-admin': { increase: 11000, timeline: '3-5 months' }
  }

  const roleLevelMultiplier = {
    'entry': 1.0,
    'mid': 1.2,
    'senior': 1.4,
    'expert': 1.1
  }

  const certData = certificationBoosts[targetCert as keyof typeof certificationBoosts] || { increase: 8000, timeline: '3-6 months' }
  const multiplier = roleLevelMultiplier[roleLevel as keyof typeof roleLevelMultiplier] || 1.0
  
  const salaryIncrease = Math.round(certData.increase * multiplier)
  const percentageIncrease = Math.round((salaryIncrease / baseSalary) * 100 * 10) / 10

  // Update the results
  const salaryResult = document.getElementById('salary-increase-result')
  const percentageResult = document.getElementById('percentage-increase-result')
  const timelineResult = document.getElementById('timeline-result')
  const messageDiv = document.getElementById('calculator-message')

  if (salaryResult) {
    salaryResult.textContent = `+$${salaryIncrease.toLocaleString()}/year`
    salaryResult.className = 'text-2xl font-bold text-green-600'
  }

  if (percentageResult) {
    percentageResult.textContent = `${percentageIncrease}%`
    percentageResult.className = 'text-2xl font-bold text-blue-600'
  }

  if (timelineResult) {
    timelineResult.textContent = certData.timeline
    timelineResult.className = 'text-2xl font-bold text-slate-900'
  }

  if (messageDiv) {
    messageDiv.innerHTML = `
      <p class="text-sm text-green-800">
        💡 Based on your selections, this certification could significantly boost your earning potential and advance your career!
      </p>
    `
    messageDiv.className = 'mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'
  }
}

export default function EarningCalculator() {
  return (
    <section id="earning-calculator" className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Work Sans, system-ui, sans-serif', fontWeight: 700 }}>
            See Your Earning Potential
          </h2>
          <p className="text-xl text-slate-600">
            Discover how quickly a certification can boost your income and advance your career.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Your Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-role" className="block text-sm font-medium text-slate-700 mb-2">
                    Current Role Level
                  </label>
                  <select
                    id="current-role"
                    className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em'
                    }}
                  >
                    <option value="" className="text-slate-500">Select your level</option>
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="expert">Expert Level</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="target-cert" className="block text-sm font-medium text-slate-700 mb-2">
                    Target Certification
                  </label>
                  <select
                    id="target-cert"
                    className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em'
                    }}
                  >
                    <option value="" className="text-slate-500">Choose a certification</option>
                    <optgroup label="💻 Technology">
                      <option value="aws-cloud-practitioner">AWS Cloud Practitioner</option>
                      <option value="aws-solutions-architect">AWS Solutions Architect Professional</option>
                      <option value="aws-developer">AWS Developer Associate</option>
                      <option value="microsoft-azure">Microsoft Azure Fundamentals</option>
                    </optgroup>
                    <optgroup label="📱 Digital Marketing">
                      <option value="google-analytics">Google Analytics 4</option>
                      <option value="google-ads">Google Ads Search Certification</option>
                      <option value="hubspot-marketing">HubSpot Content Marketing</option>
                    </optgroup>
                    <optgroup label="📊 Data & Analytics">
                      <option value="google-data-analytics">Google Data Analytics Professional</option>
                      <option value="tableau-analyst">Tableau Data Analyst</option>
                    </optgroup>
                    <optgroup label="🎨 Design & Creative">
                      <option value="google-ux">Google UX Design Professional</option>
                      <option value="adobe-certified">Adobe Certified Expert</option>
                    </optgroup>
                    <optgroup label="💼 Business & Productivity">
                      <option value="pmp">Project Management Professional (PMP)</option>
                      <option value="salesforce-admin">Salesforce Administrator</option>
                    </optgroup>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="current-salary" className="block text-sm font-medium text-slate-700 mb-2">
                    Current Annual Salary
                  </label>
                  <select
                    id="current-salary"
                    className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em'
                    }}
                  >
                    <option value="" className="text-slate-500">Select salary range</option>
                    <option value="30000">$30,000 - $40,000</option>
                    <option value="40000">$40,000 - $50,000</option>
                    <option value="50000">$50,000 - $60,000</option>
                    <option value="60000">$60,000 - $70,000</option>
                    <option value="70000">$70,000 - $80,000</option>
                    <option value="80000">$80,000 - $90,000</option>
                    <option value="90000">$90,000 - $100,000</option>
                    <option value="100000">$100,000+</option>
                  </select>
                </div>
                
                <button 
                  type="button"
                  onClick={calculateEarningPotential}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Calculate Potential
                </button>
              </div>
            </div>

            {/* Results */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Your Potential
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600">Potential Salary Increase</p>
                  <p id="salary-increase-result" className="text-2xl font-bold text-slate-300">--</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600">Percentage Increase</p>
                  <p id="percentage-increase-result" className="text-2xl font-bold text-slate-300">--</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-600">Typical Timeline</p>
                  <p id="timeline-result" className="text-2xl font-bold text-slate-300">--</p>
                </div>
              </div>
              
              <div id="calculator-message" className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="text-sm text-slate-600">
                  💡 Select your details above to see your personalized earning potential and career advancement timeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}