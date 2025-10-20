import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { FileText, AlertCircle, Shield, Clock, Phone, Mail } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Terms of Service
              </h1>
              <p className="text-gray-600">
                Last updated: October 20, 2025
              </p>
            </div>

            <div className="card p-8 space-y-8">
              {/* Introduction */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <FileText className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      1. Agreement to Terms
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      By accessing our website or using our cleaning services, you agree to be bound by 
                      these Terms of Service and all applicable laws and regulations. If you do not agree 
                      with any of these terms, you are prohibited from using our services.
                    </p>
                  </div>
                </div>
              </section>

              {/* Company Information */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  2. Company Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-gray-600">
                  <p><strong className="text-gray-900">Company Name:</strong> L&C Cleaning Services Ltd</p>
                  <p><strong className="text-gray-900">Company Number:</strong> 16561686</p>
                  <p><strong className="text-gray-900">Registered:</strong> England and Wales</p>
                  <p><strong className="text-gray-900">Incorporated:</strong> 5th July 2025</p>
                  <p><strong className="text-gray-900">Type:</strong> Private Limited Company</p>
                </div>
              </section>

              {/* Services */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  3. Our Services
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <p>
                    L&C Cleaning Services Ltd provides professional cleaning services including but not 
                    limited to:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Domestic/residential cleaning</li>
                    <li>Office/commercial cleaning</li>
                    <li>End of tenancy cleaning</li>
                    <li>Carpet and upholstery cleaning</li>
                    <li>Deep cleaning services</li>
                  </ul>
                  <p className="mt-3">
                    Services are subject to availability and may vary based on location and specific 
                    requirements.
                  </p>
                </div>
              </section>

              {/* Bookings & Payments */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      4. Bookings & Payments
                    </h2>
                    <div className="space-y-3 text-gray-600 leading-relaxed">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Booking Process</h3>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>All bookings are subject to availability and confirmation</li>
                          <li>We will contact you within 24 hours to confirm your booking</li>
                          <li>You must provide accurate information about the service location and requirements</li>
                          <li>Bookings should be made at least 24 hours in advance when possible</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Payment Terms</h3>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>Payment is due upon completion of service unless otherwise agreed</li>
                          <li>We accept PayPal and bank transfers</li>
                          <li>Prices quoted are estimates and may vary based on actual work required</li>
                          <li>All prices are in GBP (£) and include VAT where applicable</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cancellation Policy */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      5. Cancellation & Rescheduling
                    </h2>
                    <div className="space-y-3 text-gray-600 leading-relaxed">
                      <p><strong className="text-gray-900">By Customer:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Cancellations made 24+ hours before appointment: No charge</li>
                        <li>Cancellations made less than 24 hours before: 50% charge may apply</li>
                        <li>No-shows: Full service charge applies</li>
                        <li>Rescheduling is free if done 24+ hours in advance</li>
                      </ul>
                      <p className="mt-3"><strong className="text-gray-900">By Company:</strong></p>
                      <p>
                        We reserve the right to cancel or reschedule appointments due to unforeseen 
                        circumstances (weather, staff illness, etc.). You will be notified as soon as 
                        possible and offered an alternative date.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Customer Responsibilities */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  6. Customer Responsibilities
                </h2>
                <div className="space-y-2 text-gray-600 leading-relaxed">
                  <p>As a customer, you agree to:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Provide safe and reasonable access to the property</li>
                    <li>Inform us of any hazards, pets, or special considerations</li>
                    <li>Secure or remove valuable or fragile items</li>
                    <li>Ensure electricity and water are available</li>
                    <li>Provide accurate information about the property and cleaning requirements</li>
                    <li>Be present or provide access arrangements for the appointment</li>
                  </ul>
                </div>
              </section>

              {/* Liability & Insurance */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      7. Liability & Insurance
                    </h2>
                    <div className="space-y-3 text-gray-600 leading-relaxed">
                      <p>
                        We maintain appropriate insurance coverage for our cleaning operations. However:
                      </p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>We are not liable for damage to items not properly secured or disclosed</li>
                        <li>Claims must be reported within 24 hours of service completion</li>
                        <li>We are not responsible for pre-existing damage or wear and tear</li>
                        <li>Our liability is limited to the cost of the service provided</li>
                      </ul>
                      <p className="mt-3">
                        Any damage caused by our team during service will be investigated and addressed 
                        appropriately.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Satisfaction Guarantee */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  8. Satisfaction Guarantee
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We strive for 100% customer satisfaction. If you&apos;re not completely satisfied with 
                  our service, please contact us within 24 hours and we will arrange to rectify any 
                  issues at no additional cost.
                </p>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  9. Privacy & Data Protection
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We handle your personal information in accordance with UK GDPR and our Privacy Policy. 
                  By using our services, you consent to our collection and use of your information as 
                  described in our Privacy Policy.
                </p>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  10. Intellectual Property
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  All content on this website, including text, graphics, logos, and images, is the 
                  property of L&C Cleaning Services Ltd and protected by copyright and trademark laws. 
                  Unauthorized use is prohibited.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  11. Limitation of Liability
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, L&C Cleaning Services Ltd shall not be liable 
                  for any indirect, incidental, special, consequential, or punitive damages arising from 
                  your use of our services or website.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  12. Governing Law
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms of Service are governed by and construed in accordance with the laws of 
                  England and Wales. Any disputes arising from these terms will be subject to the 
                  exclusive jurisdiction of the courts of England and Wales.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  13. Changes to Terms
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting on this website. Your continued use of our services after 
                  changes constitutes acceptance of the modified terms.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <div className="flex items-start gap-3 mb-4">
                  <Mail className="text-teal-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      14. Contact Us
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      If you have any questions about these Terms of Service, please contact us:
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

              {/* Agreement */}
              <section className="bg-teal-50 border-l-4 border-teal-600 p-6 rounded">
                <p className="text-sm text-gray-700 leading-relaxed">
                  By using our website or services, you acknowledge that you have read, understood, and 
                  agree to be bound by these Terms of Service. If you do not agree to these terms, please 
                  do not use our services.
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
