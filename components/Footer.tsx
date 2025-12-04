import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur">
      <div className="w-full flex flex-col gap-3 px-4 py-8 text-center text-sm text-slate-400 sm:px-6 lg:px-10">
        <div className="font-semibold text-white">Manki.ai Jewels</div>
        <p className="text-xs text-slate-500">AI-powered custom jewellery design experience.</p>
        <div className="flex justify-center gap-4 text-xs text-slate-400">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms</Link>
          <Link href="#" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
