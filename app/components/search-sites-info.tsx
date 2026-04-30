import { Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface SearchSiteInfoProps {
  site: string
}

// Información detallada sobre cada sitio de búsqueda
const SITE_INFO = {
  aleph: {
    title: "Aleph OCCRP",
    description: [
      "Aleph es una plataforma de investigación desarrollada por OCCRP (Organized Crime and Corruption Reporting Project) que contiene millones de documentos, registros públicos y datos relacionados con investigaciones de corrupción y crimen organizado a nivel mundial.",
      "Incluir Aleph en tus búsquedas te permite encontrar información en documentos filtrados, registros de empresas offshore y otras fuentes de investigación periodística.",
    ],
    url: "https://aleph.occrp.org/",
    linkText: "Visitar Aleph OCCRP",
  },
  sunbiz: {
    title: "Sunbiz Florida",
    description: [
      "Sunbiz es el sitio oficial de la División de Corporaciones del Departamento de Estado de Florida. Permite buscar información sobre corporaciones, LLC, sociedades limitadas y marcas registradas en Florida.",
      "Incluir Sunbiz en tus búsquedas te permite encontrar información oficial sobre empresas registradas en Florida, sus oficiales, agentes registrados y otra información corporativa.",
    ],
    url: "https://search.sunbiz.org/Inquiry/CorporationSearch/ByOfficerOrRegisteredAgent",
    linkText: "Visitar Sunbiz Florida",
  },
  opencorporates: {
    title: "OpenCorporates",
    description: [
      "OpenCorporates es la mayor base de datos abierta de empresas del mundo, con información de más de 140 millones de empresas en más de 130 jurisdicciones.",
      "Proporciona acceso a datos corporativos oficiales de registros públicos de todo el mundo, facilitando la transparencia corporativa y la investigación de estructuras empresariales complejas.",
    ],
    url: "https://opencorporates.com/",
    linkText: "Visitar OpenCorporates",
  },
  ukcompanies: {
    title: "Companies House UK",
    description: [
      "El registro oficial de empresas del Reino Unido, que contiene información sobre todas las empresas registradas en Inglaterra, Gales, Escocia e Irlanda del Norte.",
      "Proporciona acceso gratuito a información sobre directores, accionistas, cuentas anuales y otra documentación corporativa.",
    ],
    url: "https://find-and-update.company-information.service.gov.uk/",
    linkText: "Visitar Companies House UK",
  },
  nevada: {
    title: "Nevada Secretary of State",
    description: [
      "El registro oficial de entidades comerciales del estado de Nevada, EE.UU., conocido por sus leyes favorables a las empresas y su privacidad.",
      "Permite buscar información sobre corporaciones, LLC y otras entidades registradas en Nevada, incluyendo agentes registrados y oficiales.",
    ],
    url: "https://esos.nv.gov/EntitySearch/OnlineEntitySearch",
    linkText: "Visitar Nevada SOS",
  },
  datocapital: {
    title: "DatoCapital",
    description: [
      "Base de datos de información empresarial que proporciona datos sobre empresas y directivos en España y otros países.",
      "Ofrece información sobre cargos directivos, vinculaciones empresariales, datos financieros y otra información corporativa relevante.",
    ],
    url: "https://www.datocapital.com/",
    linkText: "Visitar DatoCapital",
  },
  zefix: {
    title: "Zefix Suiza",
    description: [
      "El índice central de empresas de Suiza (Zefix) proporciona acceso a información del registro mercantil suizo.",
      "Permite buscar empresas registradas en Suiza, incluyendo información sobre su forma jurídica, domicilio y propósito comercial.",
    ],
    url: "https://www.zefix.admin.ch/de/search/entity/welcome",
    linkText: "Visitar Zefix",
  },
  miamidade: {
    title: "Miami-Dade Property Search",
    description: [
      "Búsqueda oficial de propiedades del Condado de Miami-Dade, Florida. Permite buscar información sobre propiedades inmobiliarias en el condado.",
      "Proporciona acceso a datos sobre propietarios, valores de tasación, impuestos, historial de ventas y otra información relacionada con bienes raíces.",
    ],
    url: "https://www.miamidade.gov/Apps/PA/PropertySearch/#/",
    linkText: "Visitar Miami-Dade Property Search",
  },
  publicdatausa: {
    title: "Public Data USA",
    description: [
      "Base de datos que recopila información pública de diversas fuentes en Estados Unidos.",
      "Permite buscar información sobre personas, antecedentes, propiedades, registros públicos y otra información disponible públicamente.",
    ],
    url: "https://publicdatausa.com/index.php",
    linkText: "Visitar Public Data USA",
  },
  whitepages: {
    title: "White Pages",
    description: [
      "Directorio telefónico y de personas en línea que proporciona información de contacto y otra información pública sobre individuos en Estados Unidos.",
      "Permite buscar personas por nombre, dirección, número de teléfono y otra información de identificación.",
    ],
    url: "https://www.whitepages.com/",
    linkText: "Visitar White Pages",
  },
  impo: {
    title: "IMPO Uruguay",
    description: [
      "Centro de Información Oficial de Uruguay que proporciona acceso a normativa legal, publicaciones oficiales y documentos públicos del país.",
      "La búsqueda se realiza a través de Google utilizando el operador site:www.impo.com.uy, ya que el sitio no tiene una URL de búsqueda directa que funcione correctamente.",
    ],
    url: "https://www.impo.com.uy/",
    linkText: "Visitar IMPO Uruguay",
  },
}

export function SearchSiteInfo({ site }: SearchSiteInfoProps) {
  const info = SITE_INFO[site as keyof typeof SITE_INFO]

  if (!info) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
          <Info className="h-4 w-4" />
          <span className="sr-only">Información sobre {info.title}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-medium">{info.title}</h3>
          {info.description.map((paragraph, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <div className="pt-2">
            <a
              href={info.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {info.linkText} →
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
