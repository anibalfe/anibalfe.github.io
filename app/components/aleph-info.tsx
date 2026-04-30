import { Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export function AlephInfo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
          <Info className="h-4 w-4" />
          <span className="sr-only">Información sobre Aleph</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-medium">Aleph OCCRP</h3>
          <p className="text-sm text-muted-foreground">
            Aleph es una plataforma de investigación desarrollada por OCCRP (Organized Crime and Corruption Reporting
            Project) que contiene millones de documentos, registros públicos y datos relacionados con investigaciones de
            corrupción y crimen organizado a nivel mundial.
          </p>
          <p className="text-sm text-muted-foreground">
            Incluir Aleph en tus búsquedas te permite encontrar información en documentos filtrados, registros de
            empresas offshore y otras fuentes de investigación periodística.
          </p>
          <div className="pt-2">
            <a
              href="https://aleph.occrp.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Visitar Aleph OCCRP →
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
