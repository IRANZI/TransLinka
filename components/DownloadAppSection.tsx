export default function DownloadAppSection() {
  return (
    <section className="bg-navy-50 py-14 sm:py-16 lg:py-20">
      <div className="page-wrap">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <div className="mb-5 inline-flex items-center rounded-full border border-navy-200 bg-white px-4 py-1.5 text-sm font-medium text-navy-800">
            Download the mobile app
          </div>
          <h2 className="text-section text-navy-900">Get TransLinka on your phone</h2>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-navy-600">
            Keep tickets, live tracking, and boarding details in your pocket.
            Available for iOS and Android.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8">
            <h3 className="text-subhead text-navy-900">Download for iOS</h3>
            <p className="mt-3 max-w-[42ch] text-body text-navy-600">
              The full TransLinka experience on iPhone and iPad, with widgets and
              Apple Watch support.
            </p>
            <button className="mt-6 inline-flex items-center rounded-xl bg-navy-950 px-5 py-3.5 text-white transition hover:bg-navy-900">
              <svg className="mr-3 h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.665 13.973c-.025-2.568 2.099-3.797 2.192-3.857-1.197-1.748-3.06-1.99-3.715-2.017-1.58-.16-3.085.927-3.887.927-.8 0-2.027-.904-3.34-.88-1.719.025-3.312 1.002-4.195 2.547-1.797 3.115-.459 7.719 1.29 10.246.857 1.23 1.872 2.607 3.21 2.557 1.297-.051 1.785-.828 3.354-.828 1.568 0 1.995.828 3.36.803 1.393-.025 2.266-1.23 3.117-2.463.613-.893.867-1.367 1.357-2.395-3.567-1.367-3.43-4.012-3.404-4.104zm-3.23-7.98c.713-.863 1.197-2.07 1.064-3.293-1.029.041-2.27.684-3.01 1.547-.662.76-1.24 1.973-1.021 3.133 1.137.088 2.254-.578 2.967-1.387z" />
              </svg>
              <span className="text-left">
                <span className="block text-xs text-navy-200">Download on the</span>
                <span className="block text-lg font-bold">App Store</span>
              </span>
            </button>
            <ul className="mt-6 space-y-2 text-navy-600">
              {["Native iOS widgets", "Siri shortcuts", "Apple Watch support"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8">
            <h3 className="text-subhead text-navy-900">Download for Android</h3>
            <p className="mt-3 max-w-[42ch] text-body text-navy-600">
              Advanced AR navigation and Google Assistant integration for a
              smoother commute.
            </p>
            <button className="mt-6 inline-flex items-center rounded-xl bg-navy-950 px-5 py-3.5 text-white transition hover:bg-navy-900">
              <svg className="mr-3 h-8 w-8 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5m13.81-5.38L6.05 21.34 14.54 12.85l2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18L17.89 14.5 15.39 12l2.5-2.5 2.27 1.31M6.05 2.66 16.81 8.88 14.54 11.15 6.05 2.66Z" />
              </svg>
              <span className="text-left">
                <span className="block text-xs text-navy-200">Get it on</span>
                <span className="block text-lg font-bold">Google Play</span>
              </span>
            </button>
            <ul className="mt-6 space-y-2 text-navy-600">
              {["Advanced AR navigation", "Google Assistant", "Material Design 3"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
