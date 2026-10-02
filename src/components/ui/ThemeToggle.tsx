import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useThemeStore, type Theme } from "@/store/theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options: { value: Theme; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const CurrentIcon = options.find((option) => option.value === theme)!.icon;

  return (
    <div className="theme-toggle">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              aria-label="Change theme"
              title="Change theme"
            >
              <CurrentIcon size={16} />
            </Button>
          }
        />
        <DropdownMenuContent side="top" align="end" className="w-40 select-none">
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value: unknown) => {
              if (value === "light" || value === "dark" || value === "system")
                setTheme(value);
            }}
          >
            {options.map(({ value, label, icon: Icon }) => (
              <DropdownMenuRadioItem key={value} value={value} closeOnClick>
                <Icon size={15} />
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
