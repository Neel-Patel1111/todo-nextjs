"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SideBar() {
  const router = usePathname();
  // console.log("🚀 ~ SideBar ~ router:", router);

  const menus = [{
    title: "Inbox",
    url: "assets/images/inbox.svg",
    "link": "/"
  }, {
    title: "Important",
    url: "assets/images/pin.svg",
    "link": "/important"
  }, {
    title: "Planned",
    url: "assets/images/consulting.svg",
    "link": "/planned"
  }, {
    title: "Complated",
    url: "assets/images/checked.svg",
    "link": "/complated"
  }, {
    title: "Assign to me",
    url: "assets/images/selection.svg",
    "link": "/assign-to-me"
  }, {
    title: "Stuff to do",
    url: "assets/images/delete-file.svg",
    "link": "/stuff-to-do"
  }]

  return (
    <>
      <div className="p-4 flex flex-col gap-3">
        <div className="mb-1">
          <div className="flex gap-2 text-xl items-center">
            {/* <Image
            src={"assets/images/profile-user.svg"}
            width={20}
            height={20}
            alt="#"
          /> */}
            <p>User</p>

          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Image
              src="assets/images/add.svg"
              width={20}
              height={20}
              alt="#"
            />
            <p>Add Task</p>
          </div>
          {
            menus.map((menu) => {
              return (
                <Link href={menu.link}>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={menu.url}
                      width={20}
                      height={20}
                      alt="#"
                    />
                    <button
                      type="button"
                      className={` text-black hover:text-red-300  focus:outline-none  ${router === menu.link ? "text-red-300" : ""
                        } focus:text-red-300`}
                    >
                      {menu.title}
                    </button>
                  </div>
                </Link>
              )
            })
          }

          {/* <Link href="/inbox">
            <div className="flex gap-2 items-center">
              <Image
                src={"assets/images/inbox.svg"}
                width={20}
                height={20}
                alt="#"
              />
              <button
                type="button"
                className={` text-black hover:text-red-300  focus:outline-none  ${router === "/inbox" ? "text-red-300" : ""
                  } focus:text-red-300`}
              >
                Inbox
              </button>
            </div>
          </Link>
          <Link href="/important">
            <div className="flex gap-2 items-center">
              <Image
                src={"assets/images/pin.svg"}
                width={20}
                height={20}
                alt="#"
              />
              <button
                type="button"
                className={` text-black hover:text-red-300  focus:outline-none  ${router === "/important" ? "text-red-300" : ""
                  } focus:text-red-300`}
              >
                Important
              </button>
            </div>
          </Link>
          <Link href="/planned">
            <div className="flex gap-2 items-center">
              <Image
                src={"assets/images/consulting.svg"}
                width={20}
                height={20}
                alt="#"
              />
              <button
                type="button"
                className={` text-black hover:text-red-300  focus:outline-none  ${router === "/planned" ? "text-red-300" : ""
                  } focus:text-red-300`}
              >
                Planned
              </button>
            </div>
          </Link>
          <Link href="/complated">
            <div className="flex gap-2 items-center">
              <Image
                src={"assets/images/checked.svg"}
                width={20}
                height={20}
                alt="#"
              />
              <button
                type="button"
                className={` text-black hover:text-red-300  focus:outline-none  ${router === "/complated" ? "text-red-300" : ""
                  } focus:text-red-300`}
              >
                Complated
              </button>
            </div>
          </Link>
          <Link href="/assign-to-me">
            <div className="flex gap-2 items-center">
              <Image
                src={"assets/images/selection.svg"}
                width={20}
                height={20}
                alt="#"
              />
              <button
                type="button"
                className={` text-black hover:text-red-300  focus:outline-none  ${router === "/assign-to-me" ? "text-red-300" : ""
                  } focus:text-red-300`}
              >
                Assign to me
              </button>
            </div>
          </Link>
          <Link href="/stuff-to-do">
            <div className="flex gap-2 items-center">
              <Image
                src={"assets/images/delete-file.svg"}
                width={20}
                height={20}
                alt="#"
              />
              <button
                type="button"
                className={` text-black hover:text-red-300  focus:outline-none  ${router === "/stuff-to-do" ? "text-red-300" : ""
                  } focus:text-red-300`}
              >
                Stuff to do
              </button>
            </div>
          </Link> */}

        </div>
      </div>
    </>
  );
}
