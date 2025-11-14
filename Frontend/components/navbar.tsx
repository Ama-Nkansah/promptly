import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between bg-white px-8 py-2">
      {/* Left Section: Logo + Brand Name */}
      <div className="flex items-center space-x-3">
        <Image
          src="/logo.png" 
          alt="Promptly Logo"
          width={50}
          height={40}
          className="object-contain border-2 border-gray-900 rounded-b-full"
        />
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
          Promptly
        </h1>
      </div>

      
      <div>
        <Link
          href="#feedback" 
          className="text-gray-900 hover:text-gray-700 text-l transition-colors duration-200"
        >
          Feedback
        </Link>
      </div>
    </nav>
  );
}
