import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Shield, Lock, Eye, Mail, Phone } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray-600">
                Last updated: October 20, 2025
              </p>
            </div>

            <div className="card p-8 space-y-8">
              {/* Introduction */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      1. Introduction
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      L&C Cleaning Services Ltd (Company Number 16561686) (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) 
                      is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                      use, disclose, and safeguard your information when you visit our website or use our 
                      cleaning services.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information We Collect */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <Eye className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      2. Information We Collect
                    </h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                        <p>When you book our services or contact us, we may collect:</p>
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                          <li>Name and contact information (email, phone number)</li>
                          <li>Service address and location details</li>
                          <li>Payment information (processed securely through third parties)</li>
                          <li>Service preferences and special instructions</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                        <p>We may automatically collect certain information when you visit our website:</p>
                        <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                          <li>Browser type and version</li>
                          <li>IP address and device information</li>
                          <li>Pages visited and time spent on our website</li>
                          <li>Referring website addresses</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  3. How We Use Your Information
                </h2>
                <div className="space-y-2 text-gray-600 leading-relaxed">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Provide and deliver our cleaning services</li>
                    <li>Process your bookings and payments</li>
                    <li>Communicate with you about services, bookings, and updates</li>
                    <li>Respond to your inquiries and customer service requests</li>
                    <li>Improve our website and services</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              {/* Data Protection */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <Lock className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      4. Data Protection & Security
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      We implement appropriate technical and organizational security measures to protect 
                      your personal information against unauthorized access, alteration, disclosure, or 
                      destruction. However, no method of transmission over the Internet or electronic 
                      storage is 100% secure, and we cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Sharing */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  5. Information Sharing
                </h2>
                <div className="space-y-2 text-gray-600 leading-relaxed">
                  <p>We may share your information with:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (payment processors, communication platforms)</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our company</li>
                  </ul>
                  <p className="mt-3">
                    We do not sell your personal information to third parties.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  6. Your Rights (UK GDPR)
                </h2>
                <div className="space-y-2 text-gray-600 leading-relaxed">
                  <p>Under UK data protection law, you have the right to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to processing of your information</li>
                    <li>Request restriction of processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  7. Cookies
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies and similar tracking technologies to improve your browsing experience, 
                  analyze website traffic, and understand where our visitors are coming from. You can 
                  control cookies through your browser settings.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  8. Data Retention
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the 
                  purposes outlined in this Privacy Policy, comply with legal obligations, resolve 
                  disputes, and enforce our agreements.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  9. Children&apos;s Privacy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly 
                  collect personal information from children.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  10. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              {/* Contact Us */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <Mail className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      11. Contact Us
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      If you have any questions about this Privacy Policy or wish to exercise your rights, 
                      please contact us:
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-gray-900">L&C Cleaning Services Ltd</p>
                      <p className="text-gray-600">Company Number: 16561686</p>
                      <p className="text-gray-600">Registered in England and Wales</p>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} className="text-teal-600" />
                        <a href="https://wa.me/447413069737" className="hover:text-teal-600">
                          WhatsApp: +44 7413 069737
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} className="text-teal-600" />
                        <span>Via our contact form or WhatsApp</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Company Information */}
              <section className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>L&C Cleaning Services Ltd</strong> is a private limited company registered in 
                  England and Wales. Company Number: 16561686. Incorporated on 5th July 2025.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
