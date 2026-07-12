import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms &amp; Conditions - GameBlasts</title>
        <meta name="description" content="Read the GameBlasts Terms and Conditions. By using our free online games platform, you agree to these terms of service." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://gameblasts.com/terms-and-conditions" />
      </Head>

      <Navbar />

      <main className="legal-page">
        <div className="legal-hero legal-hero--terms">
          <div className="legal-hero-icon">📋</div>
          <h1>Terms &amp; Conditions</h1>
          <p>Last updated: July 2025</p>
        </div>

        <div className="legal-container">
          <div className="legal-toc">
            <h3>Table of Contents</h3>
            <ol>
              <li><a href="#acceptance">Acceptance of Terms</a></li>
              <li><a href="#service-desc">Description of Service</a></li>
              <li><a href="#use-rules">Acceptable Use</a></li>
              <li><a href="#ip">Intellectual Property</a></li>
              <li><a href="#third-party-games">Third-Party Games</a></li>
              <li><a href="#advertising-terms">Advertising</a></li>
              <li><a href="#disclaimer">Disclaimer of Warranties</a></li>
              <li><a href="#liability">Limitation of Liability</a></li>
              <li><a href="#indemnification">Indemnification</a></li>
              <li><a href="#termination">Termination</a></li>
              <li><a href="#governing-law">Governing Law</a></li>
              <li><a href="#changes-terms">Changes to Terms</a></li>
              <li><a href="#contact-terms">Contact</a></li>
            </ol>
          </div>

          <div className="legal-content">

            <div className="callout callout-warning">
              <span className="callout-icon">⚠️</span>
              <p>Please read these Terms &amp; Conditions carefully before using GameBlasts. By accessing or using our website, you agree to be bound by these terms. If you do not agree, please do not use the service.</p>
            </div>

            <section id="acceptance" className="legal-section">
              <h2><span className="section-num">01</span>Acceptance of Terms</h2>
              <p>By accessing and using GameBlasts ("the Site", "we", "us", or "our"), you accept and agree to be bound by these Terms &amp; Conditions and our <Link href="/privacy-policy">Privacy Policy</Link>. These terms apply to all visitors, users, and others who access the service.</p>
              <p>If you are using GameBlasts on behalf of an organisation, you represent and warrant that you have the authority to bind that organisation to these terms.</p>
            </section>

            <section id="service-desc" className="legal-section">
              <h2><span className="section-num">02</span>Description of Service</h2>
              <p>GameBlasts is a free online gaming portal that aggregates and provides access to browser-based games. Our service includes:</p>
              <ul className="legal-list">
                <li>A curated library of free-to-play browser games</li>
                <li>Game search and category browsing functionality</li>
                <li>Game information, thumbnails, and descriptions</li>
              </ul>
              <p>We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.</p>
            </section>

            <section id="use-rules" className="legal-section">
              <h2><span className="section-num">03</span>Acceptable Use</h2>
              <p>You agree to use GameBlasts only for lawful purposes. You must <strong>not</strong>:</p>
              <ul className="legal-list">
                <li>Use the site in any way that violates applicable local, national, or international laws or regulations</li>
                <li>Attempt to gain unauthorised access to any part of the site or its related systems</li>
                <li>Transmit any unsolicited or unauthorised advertising or promotional material (spam)</li>
                <li>Use automated tools (bots, scrapers, crawlers) to access the site without our prior written permission</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the service</li>
                <li>Introduce viruses, trojans, worms, or other malicious or technologically harmful material</li>
                <li>Copy, reproduce, or redistribute any content from the site without explicit authorisation</li>
              </ul>
              <div className="callout callout-danger">
                <span className="callout-icon">🚫</span>
                <p>Violation of these rules may result in immediate termination of your access to GameBlasts and may be reported to relevant law enforcement authorities.</p>
              </div>
            </section>

            <section id="ip" className="legal-section">
              <h2><span className="section-num">04</span>Intellectual Property</h2>
              <p>The GameBlasts brand, logo, design, and original content (excluding embedded third-party games) are the intellectual property of GameBlasts and are protected by applicable copyright and trademark laws.</p>
              <p>You are granted a limited, non-exclusive, non-transferable licence to access and use the site for personal, non-commercial purposes. This licence does not include:</p>
              <ul className="legal-list">
                <li>Resale or commercial use of the site or its content</li>
                <li>Collection and use of any game listings or descriptions</li>
                <li>Derivative use of site content</li>
                <li>Downloading or copying account information for another party's benefit</li>
              </ul>
            </section>

            <section id="third-party-games" className="legal-section">
              <h2><span className="section-num">05</span>Third-Party Games</h2>
              <p>Games available on GameBlasts are developed by and remain the intellectual property of their respective third-party developers and publishers. GameBlasts does not claim ownership of any game content.</p>
              <p>By playing games on our platform, you also agree to comply with the terms of service and end-user licence agreements of the individual game providers. GameBlasts is not responsible for the content, functionality, or policies of third-party games.</p>
            </section>

            <section id="advertising-terms" className="legal-section">
              <h2><span className="section-num">06</span>Advertising</h2>
              <p>GameBlasts is supported by advertising. By using our service, you acknowledge that:</p>
              <ul className="legal-list">
                <li>Advertisements may be displayed on the site</li>
                <li>Ad content is provided by third-party networks and is not endorsed by GameBlasts</li>
                <li>We are not responsible for the accuracy, legality, or appropriateness of any advertised products or services</li>
              </ul>
              <p>If you use an ad blocker, some features or content may not display correctly. We ask that you consider supporting the site by whitelisting GameBlasts in your ad blocker.</p>
            </section>

            <section id="disclaimer" className="legal-section">
              <h2><span className="section-num">07</span>Disclaimer of Warranties</h2>
              <p>The site is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without any warranties of any kind, either express or implied, including but not limited to:</p>
              <ul className="legal-list">
                <li>Implied warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the service will be uninterrupted, error-free, or secure</li>
                <li>Warranties regarding the accuracy or reliability of any information on the site</li>
              </ul>
              <p>Your use of the service is at your sole risk.</p>
            </section>

            <section id="liability" className="legal-section">
              <h2><span className="section-num">08</span>Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, GameBlasts and its operators, affiliates, licensors, service providers, employees, or agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
              <ul className="legal-list">
                <li>Loss of profits, data, use, or goodwill</li>
                <li>Service interruptions, computer damage, or system failures</li>
                <li>Any damages arising from your use of or inability to use the service</li>
              </ul>
              <p>Our total liability shall not exceed the amount you paid us in the preceding 12 months (which, for a free service, would be zero).</p>
            </section>

            <section id="indemnification" className="legal-section">
              <h2><span className="section-num">09</span>Indemnification</h2>
              <p>You agree to defend, indemnify, and hold harmless GameBlasts and its operators from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms &amp; Conditions or your use of the service.</p>
            </section>

            <section id="termination" className="legal-section">
              <h2><span className="section-num">10</span>Termination</h2>
              <p>We reserve the right to terminate or suspend your access to GameBlasts immediately, without prior notice or liability, for any reason, including if you breach these Terms &amp; Conditions.</p>
              <p>Upon termination, your right to use the service will cease immediately. All provisions of these terms that by their nature should survive termination shall survive.</p>
            </section>

            <section id="governing-law" className="legal-section">
              <h2><span className="section-num">11</span>Governing Law</h2>
              <p>These Terms &amp; Conditions shall be governed by and construed in accordance with applicable laws. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts.</p>
            </section>

            <section id="changes-terms" className="legal-section">
              <h2><span className="section-num">12</span>Changes to Terms</h2>
              <p>We reserve the right to modify these Terms &amp; Conditions at any time. When we make changes, we will update the "Last updated" date at the top of this page. Your continued use of the service after any changes constitutes your acceptance of the new terms.</p>
              <p>We encourage you to review these terms periodically to stay informed about your rights and obligations.</p>
            </section>

            <section id="contact-terms" className="legal-section">
              <h2><span className="section-num">13</span>Contact</h2>
              <p>If you have any questions about these Terms &amp; Conditions, please contact us:</p>
              <div className="contact-card">
                <div className="contact-card-icon">✉️</div>
                <div>
                  <strong>GameBlasts Support</strong>
                  <p>Website: <Link href="/">gameblasts.com</Link></p>
                </div>
              </div>
              <p style={{ marginTop: '16px' }}>Also see our <Link href="/privacy-policy" style={{ color: 'var(--accent)' }}>Privacy Policy</Link> for information on how we handle your data.</p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
