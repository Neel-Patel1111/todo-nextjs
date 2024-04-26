import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <Link href="/">
        <div className="h-20 bg-red-300 gap-3 pl-5 flex items-center ">
          <Image
            src={"assets/images/accountability.svg"}
            width={40}
            height={40}
            alt="#"
          />
          <p className="font-bold text-3xl">ToDo List</p>
        </div>
      </Link>
    </>
  );
}
