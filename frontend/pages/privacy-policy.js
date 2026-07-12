import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - GameBlasts</title>
        <meta name="description" content="Read the GameBlasts Privacy Policy to understand how we collect, use, and protect your information when you play our free online games." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://gameblasts.com/privacy-policy" />
      </Head>

      <Navbar />

      <main className="legal-page">
        <div className="legal-hero">
          <div className="legal-hero-icon">🔒</div>
          <h1>Privacy Policy</h1>
          <p>Last updated: July 2025</p>
        </div>

        <div className="legal-container">
          <div className="legal-toc">
            <h3>Table of Contents</h3>
            <ol>
              <li><a href="#info-collect">Information We Collect</a></li>
              <li><a href="#how-use">How We Use Your Information</a></li>
              <li><a href="#cookies">Cookies &amp; Tracking</a></li>
              <li><a href="#third-party">Third-Party Services</a></li>
              <li><a href="#advertising">Advertising</a></li>
              <li><a href="#data-security">Data Security</a></li>
              <li><a href="#children">Children's Privacy</a></li>
              <li><a href="#your-rights">Your Rights</a></li>
              <li><a href="#changes">Changes to This Policy</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ol>
          </div>

          <div className="legal-content">

            <section id="info-collect" className="legal-section">
              <h2><span className="section-num">01</span>Information We Collect</h2>
              <p>We are committed to your privacy. GameBlasts collects only the minimal information necessary to deliver a smooth gaming experience:</p>
              <div className="info-cards">
                <div className="info-card">
                  <div className="info-card-icon">📊</div>
                  <h4>Usage Data</h4>
                  <p>Pages visited, time spent, game selections, and browser type — collected anonymously via analytics.</p>
                </div>
                <div className="info-card">
                  <div className="info-card-icon">🌐</div>
                  <h4>Technical Data</h4>
                  <p>IP address, device type, operating system, and browser version for site optimisation purposes.</p>
                </div>
                <div className="info-card">
                  <div className="info-card-icon">🍪</div>
                  <h4>Cookies</h4>
                  <p>Small text files placed on your device to remember your preferences and enhance your experience.</p>
                </div>
              </div>
              <p>We do <strong>not</strong> require account registration, and we do <strong>not</strong> collect your name, email, or any personally identifiable information unless you voluntarily contact us.</p>
            </section>

            <section id="how-use" className="legal-section">
              <h2><span className="section-num">02</span>How We Use Your Information</h2>
              <p>The data we collect is used exclusively to:</p>
              <ul className="legal-list">
                <li>Operate, maintain, and improve the GameBlasts platform</li>
                <li>Analyse site traffic and user behaviour patterns (in aggregate, non-personally identifiable form)</li>
                <li>Diagnose technical issues and ensure service reliability</li>
                <li>Serve contextually relevant advertisements to keep the platform free for everyone</li>
                <li>Comply with applicable legal obligations</li>
              </ul>
              <p>We will never sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
            </section>

            <section id="cookies" className="legal-section">
              <h2><span className="section-num">03</span>Cookies &amp; Tracking</h2>
              <p>GameBlasts uses the following types of cookies:</p>
              <div className="cookie-table-wrap">
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="badge badge-green">Essential</span></td>
                      <td>Required for site functionality (navigation, preferences)</td>
                      <td>Session</td>
                    </tr>
                    <tr>
                      <td><span className="badge badge-blue">Analytics</span></td>
                      <td>Aggregate visitor statistics (via Vercel Analytics)</td>
                      <td>1 year</td>
                    </tr>
                    <tr>
                      <td><span className="badge badge-orange">Advertising</span></td>
                      <td>Deliver and measure ad campaigns via our ad partners</td>
                      <td>Up to 2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>You may disable non-essential cookies through your browser settings; however, some features of the site may not function correctly as a result.</p>
            </section>

            <section id="third-party" className="legal-section">
              <h2><span className="section-num">04</span>Third-Party Services</h2>
              <p>Our platform integrates with the following third-party services, each governed by their own privacy policies:</p>
              <ul className="legal-list">
                <li><strong>Vercel Analytics</strong> — anonymous usage analytics</li>
                <li><strong>Game Providers</strong> — embedded games are served from third-party providers; your interactions within those games are subject to the respective provider's privacy policy</li>
                <li><strong>Ad Networks</strong> — we work with advertising partners to display relevant ads; these partners may place their own cookies</li>
              </ul>
              <p>We encourage you to review the privacy policies of these third parties for more information.</p>
            </section>

            <section id="advertising" className="legal-section">
              <h2><span className="section-num">05</span>Advertising</h2>
              <p>GameBlasts is free to use and is supported by advertising revenue. Our ad partners may use cookies and similar tracking technologies to show you personalised advertisements based on your online activity.</p>
              <p>You can opt out of personalised advertising by visiting:</p>
              <ul className="legal-list">
                <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance (DAA)</a></li>
                <li><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">Your Online Choices (EU)</a></li>
              </ul>
            </section>

            <section id="data-security" className="legal-section">
              <h2><span className="section-num">06</span>Data Security</h2>
              <p>We take reasonable precautions to protect the data we collect. Our site is served exclusively over HTTPS, and access to any stored data is strictly limited to authorised personnel.</p>
              <div className="callout callout-info">
                <span className="callout-icon">ℹ️</span>
                <p>No method of internet transmission is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.</p>
              </div>
            </section>

            <section id="children" className="legal-section">
              <h2><span className="section-num">07</span>Children's Privacy</h2>
              <p>GameBlasts is intended for general audiences. We do not knowingly collect personal information from children under the age of 13. If you believe a child has provided us with personal information, please contact us immediately and we will delete it promptly.</p>
            </section>

            <section id="your-rights" className="legal-section">
              <h2><span className="section-num">08</span>Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="legal-list">
                <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
                <li><strong>Rectification</strong> — request correction of inaccurate data</li>
                <li><strong>Erasure</strong> — request deletion of your personal data ("right to be forgotten")</li>
                <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
                <li><strong>Object</strong> — opt out of certain data processing activities</li>
              </ul>
              <p>To exercise any of these rights, please contact us using the details below.</p>
            </section>

            <section id="changes" className="legal-section">
              <h2><span className="section-num">09</span>Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make material changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.</p>
            </section>

            <section id="contact" className="legal-section">
              <h2><span className="section-num">10</span>Contact Us</h2>
              <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:</p>
              <div className="contact-card">
                <div className="contact-card-icon">✉️</div>
                <div>
                  <strong>GameBlasts Support</strong>
                  <p>Website: <Link href="/">gameblasts.com</Link></p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
