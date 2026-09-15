import Link from "next/link";

const highlights = [
  {
    title: "Live bus tracking",
    text: "See arrivals as they happen, not after you have already waited.",
  },
  {
    title: "Instant e-tickets",
    text: "Book, pay, and board with a QR ticket that is always on your phone.",
  },
  {
    title: "Clearer journeys",
    text: "AR wayfinding and route alerts keep every trip simple and on time.",
  },
];

export default function AuthVisual({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative hidden min-h-screen overflow-hidden bg-navy-950 lg:flex lg:w-[48%] xl:w-[46%]">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-70"
        style={{ backgroundImage: "url('/illustrations/hero-bus-3d.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/78 to-navy-950/45" />
      <div className="relative z-10 flex w-full flex-col justify-between px-10 py-10 xl:px-14">
        <Link href="/" className="inline-flex items-center gap-3 text-white">
          <img src="/logo.png" alt="TransLinka" className="h-9 w-9 object-contain" />
          <span className="text-xl font-bold tracking-tight">TransLinka</span>
        </Link>

        <div className="max-w-lg py-8 text-white">
          <p className="text-label mb-3 text-navy-200">{eyebrow}</p>
          <h1 className="text-3xl font-bold leading-tight text-white xl:text-4xl">{title}</h1>
          <p className="mt-4 max-w-[46ch] text-body-lg text-navy-100/85">{subtitle}</p>
          <div className="mt-8 space-y-4">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy-300" />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-navy-100/75">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
