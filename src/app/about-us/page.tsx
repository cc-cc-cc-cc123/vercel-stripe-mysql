import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Shield, Users } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          About RecentlyfoLowed
        </h1>
        <Card className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm pt-6">
          <CardContent className="p-6 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              RecentlyfoLowed is your go-to platform for gaining insights into
              Instagram follower activity. We understand the importance of
              social connections in the digital age and aim to provide a tool
              that helps you navigate these relationships more effectively.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <FeatureCard
                icon={<Instagram className="w-10 h-10 text-purple-600" />}
                title="Instagram Insights"
                description="Get valuable information about recent followers and following activity on Instagram profiles."
              />
              <FeatureCard
                icon={<Shield className="w-10 h-10 text-purple-600" />}
                title="Privacy First"
                description="We prioritize your privacy and security. All searches are anonymous and we don't store any personal data."
              />
              <FeatureCard
                icon={<Users className="w-10 h-10 text-purple-600" />}
                title="User-Friendly"
                description="Our intuitive interface makes it easy for anyone to use, regardless of technical expertise."
              />
            </div>
            <h2 className="text-2xl font-semibold mt-8 mb-4 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At RecentlyfoLowed, our mission is to empower users with knowledge
              about their social media connections. We believe in transparency
              and aim to provide a tool that helps you understand your digital
              relationships better, all while maintaining the highest standards
              of privacy and security.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Accurate and up-to-date information</li>
              <li>User-friendly interface</li>
              <li>Strict privacy and security measures</li>
              <li>Regular updates and improvements</li>
              <li>Dedicated customer support</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
      {icon}
      <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
