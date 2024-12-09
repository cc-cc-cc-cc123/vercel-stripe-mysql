import { Header } from "../components/header";
import { Footer } from "../components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Privacy Policy
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <p className="font-semibold">Effective Date: 2024/11/30</p>
          <h2 className="text-xl font-semibold">Introduction</h2>
          <p>{`Welcome to recentlyfolowed.com ("Site"). By accessing or using our services, you agree to the following terms. Please read them carefully. This Agreement constitutes a legally binding contract between you and us.`}</p>
          <h2 className="text-xl font-semibold">License to Use the Site</h2>
          <p>
            You are granted limited, personal access to the Site for lawful use
            only. You may not use automated tools such as bots, scrapers, or web
            crawlers to access, copy, or distribute any part of the Site.
            Unauthorized use may violate copyright and other applicable laws.
          </p>
          <h2 className="text-xl font-semibold">Data Collection & Usage</h2>
          <ul className="pl-4">
            <li className="list-disc mb-2">
              Personal Information: We collect your email and username when you
              create an account.
            </li>
            <li className="list-disc mb-2">
              Automated Data: We collect browser type, device information, usage
              data, and IP address to improve your experience.
            </li>
            <li className="list-disc mb-2">
              Cookies: We use cookies and related technologies to monitor
              activity and enhance your experience.
            </li>
          </ul>
          <h2 className="text-xl font-semibold">Service Limitations</h2>
          <ul className="pl-4">
            <li className="list-disc mb-2">
              We do not track private Instagram accounts.
            </li>
            <li className="list-disc mb-2">
              If an account becomes private after tracking starts, only the
              public data will be available.
            </li>
            <li className="list-disc mb-2">
              Service interruptions may occur for maintenance or other reasons
              beyond our control. These interruptions do not entitle you to a
              refund.
            </li>
          </ul>
          <h2 className="text-xl font-semibold">Refund Policy</h2>
          <p>No refunds. </p>
          <h2 className="text-xl font-semibold">{`Children's Privacy`}</h2>
          <p>
            We do not knowingly collect information from children under 13. If
            you are under 13, please do not use the Site or submit any personal
            information.
          </p>
          <h2 className="text-xl font-semibold">Disclaimers</h2>
          <p>{`The Site and its services are provided "as is." We do not guarantee error-free operation or specific results from using the Site. Your use of the Site is at your own risk.`}</p>
          <h2 className="text-xl font-semibold">Arbitration</h2>
          <p>{`Any disputes will be resolved through arbitration, not as part of a class action. If informal resolution fails within 30 days, the dispute will proceed to binding arbitration.`}</p>
          {/* 22 */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
