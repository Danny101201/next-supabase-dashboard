"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

const productComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Content Management Service",
    href: "/",
    description:
      "Our Content Management Service (CMS) is a software solution that simplifies web and mobile app content management, allowing for the easy generation of APIs.",
  },
  {
    title: "micro-service",
    href: "/",
    description:
      "We provide modularized software services for businesses, offering them a seamless integration experience. The solution incorporates a broad range of microservices to help keep the system robust, lean, and scalable.",
  },
  {
    title: "PayBnB",
    href: "/",
    description:
      "PayBnB is a consumer-facing payment service solution that simplifies purchase and exchange between suppliers and consumers. As its name suggests, PayBnB aims to create a community where shopping can be easy, decentralized, and barrier-free.",
  },
];

const expertiseComponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Experience Design",
    href: "/",
    description:
      "Our team of dedicated UI designers and UX researchers ensure that the design is not only aesthetically pleasing but also built on grounds of psychology and behavioral research.",
  },
  {
    title: "Mobile App",
    href: "/",
    description:
      "We provide mobile app development services to help online game companies streamline their transition from web browsers to native iOS and Android apps.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

const Navbar = () => {
  return (
    <div className="w-full flex align-middle justify-between py-3">
      <div className="logo flex align-middle gap-[16px]">
        <Avatar>
          <AvatarImage src="https://www.funpodium.net/img/logo/logo.svg" />
          <AvatarFallback>funpodium</AvatarFallback>
        </Avatar>
        <h1 className="leading-[40px] font-black">Funpodium</h1>
      </div>

      <NavigationMenu>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] list-none">
              {productComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Expertise</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] list-none">
              {expertiseComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/auth">
              <Button variant="outline">Login</Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
