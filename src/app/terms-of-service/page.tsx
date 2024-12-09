import { Header } from "../components/header";
import { Footer } from "../components/footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Terms of Service
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            {`By accessing or using RecentlyfoLowed's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.`}
          </p>

          <h2 className="text-xl font-semibold">2. Description of Service</h2>
          <p>
            {`RecentlyfoLowed provides a service that allows users to view recent followers or following of public Instagram accounts. We do not guarantee the accuracy, completeness, or timeliness of the information provided.`}
          </p>

          <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
          <p>
            You agree to use our services only for lawful purposes and in
            accordance with these Terms. You are responsible for maintaining the
            confidentiality of your account information and for all activities
            that occur under your account.
          </p>

          <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
          <p>
            The content, features, and functionality of our website are owned by
            RecentlyfoLowed and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property
            laws.
          </p>

          <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
          <p>
            RecentlyfoLowed shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your
            access to or use of, or inability to access or use, the services.
          </p>

          <h2 className="text-xl font-semibold">6. Modifications to Service</h2>
          <p>
            We reserve the right to modify or discontinue, temporarily or
            permanently, our services with or without notice. We shall not be
            liable to you or any third party for any modification, suspension,
            or discontinuance of the service.
          </p>

          <h2 className="text-xl font-semibold">7. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the jurisdiction where RecentlyfoLowed is established,
            without regard to its conflict of law provisions.
          </p>

          <h2 className="text-xl font-semibold">8. Changes to Terms</h2>
          <p>
            {`We reserve the right to update or change these Terms at any time. We
            will provide notice of any material changes by posting the new Terms
            on this page and updating the "Last updated" date.`}
          </p>

          <h2 className="text-xl font-semibold">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            support@recentlyfolowed.com
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
