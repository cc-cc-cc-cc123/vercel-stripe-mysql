import { AtSign, Search, Eye } from "lucide-react";
import Link from "next/link";

export function StepsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center max-w-5xl mx-auto">
          <StepItem
            icon={<AtSign className="w-8 h-8 text-purple-600" />}
            title="Step 1:"
            description="Enter the Instagram username you're curious about"
          />
          <Arrow />
          <StepItem
            icon={<Search className="w-8 h-8 text-purple-600" />}
            title="Step 2:"
            description="We quickly show you their recent followers and who they’ve followed."
          />
          <Arrow />
          <StepItem
            icon={<Eye className="w-8 h-8 text-purple-600" />}
            title="Step 3:"
            description={
              <>
                {`See who they've recently followed or been followed by — completely free!`}
                <Link
                  href="#"
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Try it now!
                </Link>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, title, description }: any) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden md:flex justify-center items-center">
      <svg
        className="w-12 h-12 text-purple-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </div>
  );
}
