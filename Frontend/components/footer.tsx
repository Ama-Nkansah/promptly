export const metadata = {
   title: "footer",
}

export default function Footer() {
  return (
    <footer className="w-full py-3 text-center text-sm text-gray-400 border-t border-gray-800 bg-gray-900">
      <p>
        © {new Date().getFullYear()} <span className="text-white font-semibold">Promptly</span>. All rights reserved.
      </p>
    </footer>
  );
}
