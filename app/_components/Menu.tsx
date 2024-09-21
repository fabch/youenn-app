"use client"

import { Button } from "@/components/ui/button"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import Link from "next/link"

  export function Menu() {

    const { setTheme } = useTheme()

    return (
      <Menubar className="flex w-full justify-end">
        <Button variant="ghost" asChild>
          <Link href="/calendar">Calendrier</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/materials">Matériel</Link>
            
        </Button>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="system">
              <MenubarRadioItem value="light" onClick={() => setTheme("light")}>Light</MenubarRadioItem>
              <MenubarRadioItem value="dark" onClick={() => setTheme("dark")}>Dark</MenubarRadioItem>
              <MenubarRadioItem value="system" onClick={() => setTheme("system")}>System</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }
  