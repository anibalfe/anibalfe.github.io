import { Checkbox } from "@/components/ui/checkbox"
import { SearchSiteInfo } from "./search-sites-info"

interface SiteCategoryProps {
  title: string
  sites: Record<string, { name: string; domain: string; description: string; color: string }>
  selectedSites: Record<string, boolean>
  onSiteChange: (site: string) => void
}

export function SiteCategory({ title, sites, selectedSites, onSiteChange }: SiteCategoryProps) {
  return (
    <div className="space-y-2 mb-4">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        {Object.entries(sites).map(([key, site]) => (
          <div key={key} className={`flex items-center space-x-2 p-2 ${site.color} rounded-md`}>
            <Checkbox id={`${key}-checkbox`} checked={selectedSites[key]} onCheckedChange={() => onSiteChange(key)} />
            <div className="flex items-center">
              <label
                htmlFor={`${key}-checkbox`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {site.name}
              </label>
              <SearchSiteInfo site={key} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
