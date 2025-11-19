import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CompanyComboboxProps {
  value?: string;
  onValueChange: (value: string) => void;
  companies: Array<{ companyName: string }>;
  placeholder?: string;
  disabled?: boolean;
}

export function CompanyCombobox({
  value,
  onValueChange,
  companies,
  placeholder = "Select company...",
  disabled = false,
}: CompanyComboboxProps) {
  const [open, setOpen] = useState(false);

  const uniqueCompanies = Array.from(
    new Set(companies.map(c => c.companyName).filter(Boolean))
  ).sort();

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
          data-testid="button-company-combobox"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value || placeholder}
          </span>
          <div className="flex items-center gap-1">
            {value && !disabled && (
              <X
                className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                onClick={handleClear}
                data-testid="button-clear-company"
              />
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search company..." data-testid="input-search-company" />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {uniqueCompanies.map((company) => (
                <CommandItem
                  key={company}
                  value={company}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  data-testid={`option-company-${company}`}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === company ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {company}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
