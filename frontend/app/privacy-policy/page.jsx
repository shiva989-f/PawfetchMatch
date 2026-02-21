export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for our animal adoption platform",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-primary text-3xl font-bold mb-8 text-center">
        Privacy Policy
      </h1>

      {/* 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Name and contact details provided during registration</li>
          <li>Profile information and adoption listings</li>
          <li>Images uploaded through the app</li>
        </ul>
      </section>

      {/* 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>To create and manage user accounts</li>
          <li>To connect adopters with pet owners or rescuers</li>
          <li>To improve platform functionality and security</li>
          <li>To respond to user inquiries or reports</li>
        </ul>
      </section>

      {/* 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Image & Content Data</h2>
        <p className="text-gray-700">
          Images uploaded must be authentic not edited or manipulated. Fake or
          misleading content may be removed.
        </p>
      </section>

      {/* 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Data Sharing</h2>
        <p className="text-gray-700">
          We do not sell, trade, or rent personal information. Information is
          shared only between users for adoption purposes or when required by
          law.
        </p>
      </section>

      {/* 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
        <p className="text-gray-700">
          We implement reasonable security measures to protect user data.
          However, no online platform can guarantee complete security.
        </p>
      </section>

      {/* 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. User Rights</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>You may update or delete your account information</li>
          <li>You may request account deletion at any time</li>
        </ul>
      </section>

      {/* 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Legal Compliance</h2>
        <p className="text-gray-700">
          We comply with applicable Indian data protection and animal welfare
          laws.
        </p>
      </section>

      {/* 8 */}
      <section>
        <h2 className="text-xl font-semibold mb-3">
          8. Changes to This Policy
        </h2>
        <p className="text-gray-700">
          This Privacy Policy may be updated periodically. Continued use of the
          platform indicates acceptance of the revised policy.
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-12 text-center">
        Last Updated: February 2026
      </p>
    </div>
  );
}
