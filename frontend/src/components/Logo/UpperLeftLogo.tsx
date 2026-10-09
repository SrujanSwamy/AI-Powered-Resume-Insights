"use client";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

const UpperLeftLogo = () => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <header className="absolute z-30 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          <div className="mr-4 shrink-0" onClick={handleLogoClick}>
            <Logo />
          </div>
        </div>
      </div>
    </header>
  );
};

export default UpperLeftLogo;
