export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for using our animal adoption platform",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-primary text-3xl font-bold mb-8 text-center">
        Terms & Conditions
      </h1>

      {/* 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p className="text-gray-700">
          By using this application, you agree to comply with these Terms &
          Conditions. If you do not agree, you must not use the platform.
        </p>
      </section>

      {/* 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          2. Purpose of the Platform
        </h2>
        <p className="text-gray-700 mb-3">This platform exists only to:</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Facilitate free animal adoption</li>
          <li>Connect adopters with owners or rescuers</li>
        </ul>
        <p className="text-gray-700 mt-3">
          The platform does not sell, buy, trade, or breed animals.
        </p>
      </section>

      {/* 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Prohibited Activities</h2>
        <p className="text-gray-700 mb-3">
          Users are strictly prohibited from:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Selling or buying animals</li>
          <li>Posting animals for breeding</li>
          <li>Uploading stock or fake images</li>
          <li>Listing exotic, endangered, or illegal species</li>
          <li>Abusing animals or users</li>
          <li>Providing false information</li>
        </ul>
        <p className="text-gray-700 mt-3 font-medium">
          Violation will result in immediate suspension or permanent ban.
        </p>
      </section>

      {/* 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. User Responsibility</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            Users are responsible for the accuracy of information they provide
          </li>
          <li>Adoption decisions are solely between users</li>
          <li>
            The platform is not responsible for post-adoption care or disputes
          </li>
        </ul>
      </section>

      {/* 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Image Policy</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Only real images captured through the app camera are allowed</li>
          <li>Images with edited or missing metadata may be removed</li>
          <li>Fake or misleading images will result in account termination</li>
        </ul>
      </section>

      {/* 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          6. Reporting & Enforcement
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Users can report suspicious listings</li>
          <li>Admin decisions are final</li>
          <li>Repeat offenders will be banned permanently</li>
        </ul>
      </section>

      {/* 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Legal Compliance</h2>
        <p className="text-gray-700">
          Users must comply with local animal welfare laws, including the
          Prevention of Cruelty to Animals Act (India) and any applicable
          regional regulations.
        </p>
      </section>

      {/* 8 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          8. Limitation of Liability
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>The platform acts only as a connecting service</li>
          <li>Is not responsible for adoption outcomes</li>
          <li>Is not liable for misuse by users</li>
        </ul>
      </section>

      {/* 9 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">9. Account Termination</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Suspend or delete accounts without notice</li>
          <li>Remove content violating policies</li>
        </ul>
      </section>

      {/* 10 */}
      <section>
        <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
        <p className="text-gray-700">
          These Terms may be updated at any time. Continued use of the app
          implies acceptance of the updated terms.
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-12 text-center">
        Last Updated: February 2026
      </p>
    </div>
  );
}
