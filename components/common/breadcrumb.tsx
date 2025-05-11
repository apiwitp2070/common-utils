"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";
import { capitalizeFirstLetter, convertStringSpace } from "@/utils/string";
import { Fragment, useMemo } from "react";
import Link from "next/link";

interface PageHeaderProps {
  currentPageTitle?: string;
}

export default function PageBreadcrumb({ currentPageTitle }: PageHeaderProps) {
  const pathname = usePathname();

  const breadcrumbItems = useMemo(() => {
    return pathname.split("/").map((path, index, arr) => {
      return {
        title:
          index > 0 ? capitalizeFirstLetter(convertStringSpace(path)) : "Home",
        href: index > 0 ? arr.slice(0, index + 1).join("/") : "/",
      };
    });
  }, [pathname]);

  const breadcrumbTitle = useMemo(
    () => currentPageTitle || breadcrumbItems.at(-1)?.title,
    [breadcrumbItems, currentPageTitle]
  );

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.slice(0, -1).map((item) => {
            return (
              <Fragment key={item.href + item.title}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          })}
          <BreadcrumbPage>{breadcrumbTitle}</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
