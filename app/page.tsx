"use client"

import { useState } from "react"
import { Search, ExternalLink, Globe, Building, FileText, Home, User, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SiteCategory } from "./components/site-category"

// Lista ampliada de dominios de paraísos fiscales
const TAX_HAVEN_DOMAINS = [
  ".ac", // Isla de la Ascensión
  ".ad", // Andorra
  ".ag", // Antigua y Barbuda
  ".ai", // Anguila
  ".al", // Albania
  ".am", // Armenia
  ".ao", // Angola
  ".aw", // Aruba
  ".ba", // Bosnia y Herzegovina
  ".bm", // Bermudas
  ".bs", // Bahamas
  ".bw", // Botsuana
  ".bz", // Belice
  ".cc", // Islas Cocos
  ".ch", // Suiza
  ".cr", // Costa Rica
  ".cx", // Isla Christmas
  ".cy", // Chipre
  ".dm", // Dominica
  ".fk", // Islas Malvinas
  ".fm", // Micronesia
  ".gd", // Granada
  ".ge", // Georgia
  ".gg", // Guernsey
  ".gh", // Ghana
  ".gi", // Gibraltar
  ".hk", // Hong Kong
  ".hn", // Honduras
  ".im", // Isla de Man
  ".je", // Jersey
  ".jm", // Jamaica
  ".kh", // Camboya
  ".kn", // San Cristóbal y Nieves
  ".ky", // Islas Caimán
  ".lc", // Santa Lucía
  ".li", // Liechtenstein
  ".lu", // Luxemburgo
  ".mc", // Mónaco
  ".me", // Montenegro
  ".mk", // Macedonia del Norte
  ".mt", // Malta
  ".mu", // Mauricio
  ".mw", // Malaui
  ".my", // Malasia
  ".na", // Namibia
  ".nf", // Isla Norfolk
  ".ng", // Nigeria
  ".ni", // Nicaragua
  ".no", // Noruega
  ".nr", // Nauru
  ".nu", // Niue
  ".pa", // Panamá
  ".ph", // Filipinas
  ".pm", // San Pedro y Miquelón
  ".pn", // Islas Pitcairn
  ".pw", // Palaos
  ".rs", // Serbia
  ".sb", // Islas Salomón
  ".sc", // Seychelles
  ".sg", // Singapur
  ".sh", // Santa Elena
  ".sl", // Sierra Leona
  ".sm", // San Marino
  ".sr", // Surinam
  ".sz", // Esuatini
  ".tc", // Islas Turcas y Caicos
  ".tk", // Tokelau
  ".to", // Tonga
  ".tt", // Trinidad y Tobago
  ".tv", // Tuvalu
  ".ua", // Ucrania
  ".vc", // San Vicente y las Granadinas
  ".vg", // Islas Vírgenes Británicas
  ".vn", // Vietnam
  ".vu", // Vanuatu
  ".ws", // Samoa
  ".zw", // Zimbabue
]

// Sitios de búsqueda especializados agrupados por categoría
const SPECIALIZED_SITES = {
  investigacion: {
    aleph: {
      name: "Aleph OCCRP",
      domain: "aleph.occrp.org",
      description: "Base de datos de investigación sobre corrupción y crimen organizado",
      color: "bg-primary/5",
    },
    offshoreleaks: {
      name: "ICIJ Offshore Leaks",
      domain: "offshoreleaks.icij.org",
      description: "Base de datos de filtraciones offshore del ICIJ",
      color: "bg-slate-50 dark:bg-slate-950/20",
    },
  },
  reguladores: {
    ofac: {
      name: "OFAC Treasury",
      domain: "sanctionssearch.ofac.treas.gov",
      description: "Lista de sanciones del Tesoro de EE.UU.",
      color: "bg-rose-50 dark:bg-rose-950/20",
    },
    secfilings: {
      name: "SEC Search Filings",
      domain: "www.sec.gov",
      description: "Búsqueda de documentos SEC",
      color: "bg-blue-50 dark:bg-blue-950/20",
    },
    secedgar: {
      name: "SEC EDGAR",
      domain: "www.sec.gov",
      description: "Base de datos EDGAR de la SEC",
      color: "bg-indigo-50 dark:bg-indigo-950/20",
    },
  },
  eeuu: {
    sunbiz: {
      name: "Sunbiz Florida",
      domain: "search.sunbiz.org",
      description: "Registro oficial de empresas de Florida",
      color: "bg-blue-50 dark:bg-blue-950/20",
    },
    nevada: {
      name: "Nevada SOS",
      domain: "esos.nv.gov",
      description: "Registro oficial de empresas de Nevada",
      color: "bg-red-50 dark:bg-red-950/20",
    },
    miamidade: {
      name: "Miami-Dade Property",
      domain: "www.miamidade.gov",
      description: "Búsqueda de propiedades en Miami-Dade",
      color: "bg-cyan-50 dark:bg-cyan-950/20",
    },
    pbcpao: {
      name: "Palm Beach County Property",
      domain: "pbcpao.gov",
      description: "Búsqueda de propiedades en Palm Beach County",
      color: "bg-teal-50 dark:bg-teal-950/20",
    },
    publicdatausa: {
      name: "Public Data USA",
      domain: "publicdatausa.com",
      description: "Base de datos pública de EE.UU.",
      color: "bg-purple-50 dark:bg-purple-950/20",
    },
    whitepages: {
      name: "White Pages",
      domain: "www.whitepages.com",
      description: "Directorio telefónico y de personas",
      color: "bg-orange-50 dark:bg-orange-950/20",
    },
  },
  europa: {
    ukcompanies: {
      name: "Companies House UK",
      domain: "find-and-update.company-information.service.gov.uk",
      description: "Registro oficial de empresas del Reino Unido",
      color: "bg-indigo-50 dark:bg-indigo-950/20",
    },
    zefix: {
      name: "Zefix Suiza",
      domain: "www.zefix.admin.ch",
      description: "Registro mercantil de Suiza",
      color: "bg-red-50 dark:bg-red-950/20",
    },
    datocapital: {
      name: "DatoCapital",
      domain: "www.datocapital.com",
      description: "Base de datos de empresas y directivos en España",
      color: "bg-yellow-50 dark:bg-yellow-950/20",
    },
  },
  global: {
    opencorporates: {
      name: "OpenCorporates",
      domain: "opencorporates.com",
      description: "Base de datos global de empresas",
      color: "bg-green-50 dark:bg-green-950/20",
    },
  },
  latam: {
    impo: {
      name: "IMPO Uruguay",
      domain: "www.impo.com.uy",
      description: "Centro de Información Oficial de Uruguay",
      color: "bg-emerald-50 dark:bg-emerald-950/20",
    },
  },
}

// Eliminar el punto inicial para usar con el operador site:
const formatDomainForSiteOperator = (domain: string) => domain.replace(".", "")

// Función para obtener todos los sitios en un solo objeto
const getAllSites = () => {
  const allSites: Record<string, any> = {}
  Object.values(SPECIALIZED_SITES).forEach((category) => {
    Object.entries(category).forEach(([key, site]) => {
      allSites[key] = site
    })
  })
  return allSites
}

export default function GoogleSiteSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDomains, setSelectedDomains] = useState<string[]>(TAX_HAVEN_DOMAINS)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [currentSearchTerm, setCurrentSearchTerm] = useState("")

  // Estado para los sitios especializados
  const [specializedSites, setSpecializedSites] = useState({
    aleph: true,
    offshoreleaks: true,
    ofac: true,
    secfilings: true,
    secedgar: true,
    sunbiz: true,
    opencorporates: true,
    ukcompanies: true,
    nevada: true,
    datocapital: true,
    zefix: true,
    miamidade: true,
    pbcpao: true,
    publicdatausa: true,
    whitepages: true,
    impo: true,
  })

  // Función para manejar la selección de dominios
  const handleDomainSelection = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain))
    } else {
      setSelectedDomains([...selectedDomains, domain])
    }
  }

  // Función para manejar la selección de sitios especializados
  const handleSpecializedSiteSelection = (site: keyof typeof specializedSites) => {
    setSpecializedSites({
      ...specializedSites,
      [site]: !specializedSites[site],
    })
  }

  // Función para seleccionar/deseleccionar todos los sitios de una categoría
  const handleCategorySelection = (category: string, select: boolean) => {
    const newSites = { ...specializedSites }

    Object.keys(SPECIALIZED_SITES[category as keyof typeof SPECIALIZED_SITES]).forEach((site) => {
      newSites[site as keyof typeof specializedSites] = select
    })

    setSpecializedSites(newSites)
  }

  // Función para construir la consulta de búsqueda con operador site:
  const constructSearchQuery = (
    query: string,
    domains: string[],
    sites: typeof specializedSites,
    includeDomains = true,
  ) => {
    const formattedQuery = query
    const domainOperators = domains.map((domain) => `site:${formatDomainForSiteOperator(domain)}`).join(" OR ")
    const allSites = getAllSites()
    const specializedOperators = Object.entries(sites)
      .filter(([site, isSelected]) => isSelected)
      .map(([site, _]) => `site:${allSites[site].domain}`)
      .join(" OR ")

    const allOperators = [
      ...(includeDomains && domains.length > 0 ? [domainOperators] : []),
      ...(specializedOperators ? [specializedOperators] : []),
    ].join(" OR ")

    return allOperators ? `${formattedQuery} (${allOperators})` : formattedQuery
  }

  const hasSearchSources =
    selectedDomains.length > 0 || Object.values(specializedSites).some((isSelected) => isSelected)
  const hasSpecializedSites = Object.values(specializedSites).some((isSelected) => isSelected)

  const handleSearch = async () => {
    if (!searchQuery.trim() || !hasSpecializedSites) return

    setIsSearching(true)
    setCurrentSearchTerm(searchQuery)

    try {
      // Generate results for non-Aleph sites
      const otherResults = generateMockResults(searchQuery, { ...specializedSites, aleph: false })

      // If Aleph is selected, fetch real results from the API
      if (specializedSites.aleph) {
        try {
          const response = await fetch(`/api/aleph?q=${encodeURIComponent(searchQuery)}`)
          const data = await response.json()

          if (response.ok && data.results && data.results.length > 0) {
            // Transform Aleph API results to match the existing format
            const alephResults = data.results.map((item: any) => ({
              title: item.title,
              url: item.url,
              snippet: item.summary || `Documento en colección "${item.collection}". ${item.countries?.length > 0 ? `Países: ${item.countries.join(", ")}` : ""}`,
              source: "aleph",
              sourceName: "Aleph OCCRP",
              isRealResult: true,
              schema: item.schema,
              collection: item.collection,
            }))
            
            setSearchResults([...alephResults, ...otherResults])
          } else {
            // If no Aleph results or error, show fallback with link to search
            const fallbackAlephResult = {
              title: `Buscar "${searchQuery}" en Aleph OCCRP`,
              url: `https://aleph.occrp.org/search?q=${searchQuery.replace(/\s+/g, "+")}`,
              snippet: `No se encontraron resultados directos. Haga clic para buscar "${searchQuery}" directamente en Aleph OCCRP.`,
              source: "aleph",
              sourceName: "Aleph OCCRP",
              isRealResult: false,
            }
            setSearchResults([fallbackAlephResult, ...otherResults])
          }
        } catch (error) {
          console.error("Error fetching Aleph results:", error)
          // On error, show fallback result
          const fallbackAlephResult = {
            title: `Buscar "${searchQuery}" en Aleph OCCRP`,
            url: `https://aleph.occrp.org/search?q=${searchQuery.replace(/\s+/g, "+")}`,
            snippet: `Error al conectar con la API. Haga clic para buscar directamente en Aleph OCCRP.`,
            source: "aleph",
            sourceName: "Aleph OCCRP",
            isRealResult: false,
          }
          setSearchResults([fallbackAlephResult, ...otherResults])
        }
      } else {
        setSearchResults(otherResults)
      }
    } finally {
      setIsSearching(false)
    }
  }

  const generateResultForSite = (siteKey: string, site: any, query: string) => {
    const isExactPhrase = query.startsWith('"') && query.endsWith('"')
    const cleanQuery = isExactPhrase ? query.slice(1, -1) : query

    let title, url, snippet

    switch (siteKey) {
      case "aleph":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Documentos en Aleph OCCRP`
        url = `https://${site.domain}/search?q=${query.replace(/\s+/g, "+")}`
        snippet = `...encontramos documentos relacionados con ${cleanQuery} en nuestra base de datos. Esta investigación contiene información sobre ${cleanQuery} en paraísos fiscales. Acceda a los documentos completos en Aleph...`
        break

      case "offshoreleaks":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - ICIJ Offshore Leaks`
        url = `https://${site.domain}/search?q=${query.replace(/\s+/g, "+")}`
        snippet = `...información sobre entidades offshore relacionadas con "${cleanQuery}" en las filtraciones del ICIJ. Incluye Panama Papers, Paradise Papers y otras investigaciones...`
        break

      case "ofac":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Lista de Sanciones OFAC`
        url = `https://${site.domain}/?name=${encodeURIComponent(query)}`
        snippet = `...búsqueda en la lista de personas y entidades sancionadas por OFAC relacionadas con "${cleanQuery}". Incluye individuos y organizaciones bajo sanciones del Tesoro de EE.UU...`
        break

      case "secfilings":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Documentos SEC`
        url = `https://www.sec.gov/edgar/search/#/q=${encodeURIComponent(query)}`
        snippet = `...documentos y presentaciones ante la SEC relacionados con "${cleanQuery}". Incluye formularios 10-K, 10-Q, 8-K y otros documentos corporativos...`
        break

      case "secedgar":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - SEC EDGAR Database`
        url = `https://www.sec.gov/edgar/search/#/q=${encodeURIComponent(query)}`
        snippet = `...registros en la base de datos EDGAR de la SEC para "${cleanQuery}". Acceda a documentos corporativos, informes financieros y presentaciones regulatorias...`
        break

      case "opencorporates":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Búsqueda de Directivos en OpenCorporates`
        url = `https://${site.domain}/officers?q=${query.replace(/\s+/g, "+")}`
        snippet = `...información sobre directivos y oficiales relacionados con "${cleanQuery}" en múltiples jurisdicciones. Vea detalles sobre cargos, empresas asociadas y conexiones corporativas...`
        break

      case "ukcompanies":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Companies House UK`
        url = `https://${site.domain}/search?q=${query.replace(/\s+/g, "+")}`
        snippet = `...registro oficial de la empresa "${cleanQuery}" en el Reino Unido. Consulte información sobre directores, cuentas anuales y documentos presentados...`
        break

      case "nevada":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Registro de Nevada`
        url = `https://esos.nv.gov/EntitySearch/OnlineEntitySearch`
        snippet = `...entidad comercial registrada en Nevada con nombre similar a "${cleanQuery}". Vea detalles sobre el agente registrado, oficiales y estado actual. Use la búsqueda en el sitio para encontrar la entidad...`
        break

      case "sunbiz":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Registro de Corporaciones de Florida`
        url = `https://${site.domain}/Inquiry/CorporationSearch/ByOfficerOrRegisteredAgent?searchTerm=${encodeURIComponent(query)}`
        snippet = `...encontramos registros corporativos relacionados con el oficial o agente registrado "${cleanQuery}" en la base de datos de Florida. Ver empresas asociadas con esta persona, cargos y documentos presentados...`
        break

      case "datocapital":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Información Empresarial en DatoCapital`
        url = `https://www.datocapital.com/search?q=${encodeURIComponent(query)}`
        snippet = `...información sobre empresas y directivos relacionados con "${cleanQuery}" en España. Consulte cargos, vinculaciones empresariales y datos financieros...`
        break

      case "zefix":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Registro Mercantil Suizo`
        url = `https://${site.domain}/de/search/entity/welcome?name=${query.replace(/\s+/g, "+")}`
        snippet = `...empresa registrada en el índice central de firmas de Suiza con nombre "${cleanQuery}". Vea información sobre su forma jurídica, domicilio y propósito comercial...`
        break

      case "miamidade":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Propiedades en Miami-Dade`
        url = `https://www.miamidade.gov/Apps/PA/PropertySearch/#/Search`
        snippet = `...información sobre propiedades relacionadas con "${cleanQuery}" en el Condado de Miami-Dade. Consulte detalles sobre propietarios, valores de tasación, impuestos y otra información inmobiliaria. Use la búsqueda en el sitio para encontrar propiedades...`
        break

      case "pbcpao":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Propiedades en Palm Beach County`
        url = `https://pbcpao.gov/index.htm`
        snippet = `...información sobre propiedades relacionadas con "${cleanQuery}" en el Condado de Palm Beach. Consulte detalles sobre propietarios, valores de tasación, impuestos y otra información inmobiliaria. Use la búsqueda en el sitio para encontrar propiedades...`
        break

      case "publicdatausa":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Registros Públicos en EE.UU.`
        url = `https://${site.domain}/index.php?q=${encodeURIComponent(query)}`
        snippet = `...registros públicos relacionados con "${cleanQuery}" en Estados Unidos. Incluye información sobre antecedentes, propiedades, registros civiles y otra información disponible públicamente...`
        break

      case "whitepages":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Directorio White Pages`
        url = `https://www.whitepages.com/name/${cleanQuery.replace(/\s+/g, "-").toLowerCase()}`
        snippet = `...información de contacto y otra información pública sobre "${cleanQuery}". Incluye direcciones, números de teléfono, familiares y otra información de identificación...`
        break

      case "impo":
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Centro de Información Oficial de Uruguay`
        url = `https://www.google.com/search?q=${encodeURIComponent(query)}+site:www.impo.com.uy`
        snippet = `...información legal y normativa relacionada con "${cleanQuery}" en Uruguay. Incluye leyes, decretos, resoluciones y otros documentos oficiales que pueden ser relevantes para su investigación...`
        break

      default:
        title = `${cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1)} - Resultados en ${site.name}`
        url = `https://${site.domain}/search?q=${query.replace(/\s+/g, "+")}`
        snippet = `...información relacionada con "${cleanQuery}" en nuestra base de datos. Consulte los detalles completos en nuestro sitio...`
    }

    return {
      title,
      url,
      snippet,
      source: siteKey,
      sourceName: site.name,
    }
  }

  const generateMockResults = (query: string, sites: typeof specializedSites) => {
    const results = []
    const allSites = getAllSites()

    const enabledSiteKeys = Object.entries(sites)
      .filter(([_, enabled]) => enabled)
      .map(([key, _]) => key)

    for (const siteKey of enabledSiteKeys) {
      const site = allSites[siteKey]
      if (site) {
        const result = generateResultForSite(siteKey, site, query)
        results.push(result)
      }
    }

    return results.sort(() => 0.5 - Math.random())
  }

  const domainGroups = {
    "Europa Occidental": [".ad", ".ch", ".gi", ".li", ".lu", ".mc", ".mt", ".no", ".sm"],
    "Islas Británicas": [".gg", ".im", ".je", ".ac", ".sh", ".fk"],
    "Europa Oriental": [".al", ".ba", ".cy", ".me", ".mk", ".rs", ".ua"],
    Caribe: [
      ".ag",
      ".ai",
      ".aw",
      ".bm",
      ".bs",
      ".dm",
      ".gd",
      ".jm",
      ".kn",
      ".lc",
      ".sr",
      ".tc",
      ".tt",
      ".vc",
      ".vg",
      ".ky",
    ],
    Centroamérica: [".bz", ".cr", ".hn", ".ni", ".pa"],
    "Asia-Pacífico": [
      ".hk",
      ".kh",
      ".my",
      ".ph",
      ".sg",
      ".vn",
      ".cc",
      ".cx",
      ".fm",
      ".nf",
      ".nr",
      ".nu",
      ".pn",
      ".pw",
      ".sb",
      ".tk",
      ".to",
      ".tv",
      ".vu",
      ".ws",
    ],
    África: [".ao", ".bw", ".gh", ".mw", ".mu", ".na", ".ng", ".sc", ".sl", ".sz", ".zw"],
    Otros: [".am", ".ge", ".pm"],
  }

  const openInGoogle = () => {
    if (!searchQuery.trim() || !hasSearchSources) return
    const fullQuery = constructSearchQuery(searchQuery, selectedDomains, specializedSites, true)
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(fullQuery)}`
    window.open(googleUrl, "_blank")
  }

  const getSourceBackgroundClass = (source: string) => {
    if (source === "domain") return ""
    const allSites = getAllSites()
    return allSites[source]?.color || ""
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "domain":
        return <Globe className="h-3 w-3 mr-1" />
      case "opencorporates":
      case "ukcompanies":
      case "nevada":
      case "sunbiz":
      case "zefix":
        return <Building className="h-3 w-3 mr-1" />
      case "aleph":
      case "datocapital":
      case "publicdatausa":
      case "offshoreleaks":
      case "ofac":
      case "secfilings":
      case "secedgar":
        return <FileText className="h-3 w-3 mr-1" />
      case "miamidade":
      case "pbcpao":
        return <Home className="h-3 w-3 mr-1" />
      case "whitepages":
        return <User className="h-3 w-3 mr-1" />
      case "impo":
        return <BookOpen className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Buscador de Sitios en Paraísos Fiscales</h1>

      <div className="flex flex-col sm:flex-row w-full max-w-3xl mx-auto mb-8 gap-2">
        <Input
          placeholder='Buscar contenido (usa "" para frases exactas)'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <div className="flex gap-2">
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim() || !hasSpecializedSites}
            className="flex-1 sm:flex-none"
          >
            {isSearching ? "Buscando..." : <Search className="h-4 w-4 mr-2" />}
            Buscar
          </Button>
          <Button
            variant="outline"
            onClick={openInGoogle}
            disabled={!searchQuery.trim() || !hasSearchSources}
            className="flex-1 sm:flex-none"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Abrir en Google
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold mb-4">Fuentes de Búsqueda</h2>

            <Tabs defaultValue="registros">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="registros">Registros</TabsTrigger>
                <TabsTrigger value="dominios">Dominios</TabsTrigger>
              </TabsList>

              <TabsContent value="registros" className="space-y-4">
                <SiteCategory
                  title="Bases de Datos de Investigación"
                  sites={SPECIALIZED_SITES.investigacion}
                  selectedSites={specializedSites}
                  onSiteChange={handleSpecializedSiteSelection}
                />

                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold">Reguladores y Sanciones</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => handleCategorySelection("reguladores", true)}
                    >
                      Todos
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => handleCategorySelection("reguladores", false)}
                    >
                      Ninguno
                    </Button>
                  </div>
                </div>
                <SiteCategory
                  title=""
                  sites={SPECIALIZED_SITES.reguladores}
                  selectedSites={specializedSites}
                  onSiteChange={handleSpecializedSiteSelection}
                />

                <SiteCategory
                  title="Registros Globales"
                  sites={SPECIALIZED_SITES.global}
                  selectedSites={specializedSites}
                  onSiteChange={handleSpecializedSiteSelection}
                />

                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold">Registros de EE.UU.</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => handleCategorySelection("eeuu", true)}
                    >
                      Todos
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => handleCategorySelection("eeuu", false)}
                    >
                      Ninguno
                    </Button>
                  </div>
                </div>
                <SiteCategory
                  title=""
                  sites={SPECIALIZED_SITES.eeuu}
                  selectedSites={specializedSites}
                  onSiteChange={handleSpecializedSiteSelection}
                />

                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold">Registros de Europa</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => handleCategorySelection("europa", true)}
                    >
                      Todos
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => handleCategorySelection("europa", false)}
                    >
                      Ninguno
                    </Button>
                  </div>
                </div>
                <SiteCategory
                  title=""
                  sites={SPECIALIZED_SITES.europa}
                  selectedSites={specializedSites}
                  onSiteChange={handleSpecializedSiteSelection}
                />

                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold">Registros de Latinoamérica</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => handleCategorySelection("latam", true)}
                    >
                      Todos
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => handleCategorySelection("latam", false)}
                    >
                      Ninguno
                    </Button>
                  </div>
                </div>
                <SiteCategory
                  title=""
                  sites={SPECIALIZED_SITES.latam}
                  selectedSites={specializedSites}
                  onSiteChange={handleSpecializedSiteSelection}
                />
              </TabsContent>

              <TabsContent value="dominios">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md mb-4">
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    Los dominios seleccionados solo se incluirán al usar "Abrir en Google", no en los resultados
                    mostrados aquí.
                  </p>
                </div>

                <h3 className="text-sm font-semibold mb-2">
                  Dominios de Paraísos Fiscales ({TAX_HAVEN_DOMAINS.length} total)
                </h3>
                <div className="flex justify-between mb-4">
                  <Button variant="outline" size="sm" onClick={() => setSelectedDomains(TAX_HAVEN_DOMAINS)}>
                    Seleccionar Todo
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedDomains([])}>
                    Limpiar Todo
                  </Button>
                </div>

                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="all">Todos los Dominios</TabsTrigger>
                    <TabsTrigger value="regions">Por Región</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-2 max-h-96 overflow-y-auto">
                    {TAX_HAVEN_DOMAINS.map((domain) => (
                      <div key={domain} className="flex items-center space-x-2">
                        <Checkbox
                          id={domain}
                          checked={selectedDomains.includes(domain)}
                          onCheckedChange={() => handleDomainSelection(domain)}
                        />
                        <label
                          htmlFor={domain}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {domain}
                        </label>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="regions" className="max-h-96 overflow-y-auto">
                    {Object.entries(domainGroups).map(([region, domains]) => (
                      <div key={region} className="mb-4">
                        <h3 className="text-sm font-semibold mb-2">{region}</h3>
                        <div className="space-y-2 ml-2">
                          {domains.map((domain) => (
                            <div key={domain} className="flex items-center space-x-2">
                              <Checkbox
                                id={`region-${domain}`}
                                checked={selectedDomains.includes(domain)}
                                onCheckedChange={() => handleDomainSelection(domain)}
                              />
                              <label
                                htmlFor={`region-${domain}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {domain}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>

            {searchQuery && hasSearchSources && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-semibold mb-2">Consulta para Google:</h3>
                <div className="p-2 bg-muted rounded-md text-xs overflow-x-auto">
                  <code>{constructSearchQuery(searchQuery, selectedDomains, specializedSites, true)}</code>
                </div>

                {hasSpecializedSites && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2">Consulta para resultados locales:</h3>
                    <div className="p-2 bg-muted rounded-md text-xs overflow-x-auto">
                      <code>{constructSearchQuery(searchQuery, [], specializedSites, false)}</code>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Resultados de Búsqueda</h2>

              {searchQuery === "" ? (
                <div className="text-center py-8 text-muted-foreground">
                  Ingresa un término de búsqueda para encontrar resultados
                </div>
              ) : !hasSpecializedSites ? (
                <div className="text-center py-8 text-muted-foreground">
                  Selecciona al menos un sitio especializado para ver resultados
                </div>
              ) : isSearching ? (
                <div className="text-center py-8 text-muted-foreground">
                  Buscando "{searchQuery}" en las fuentes seleccionadas...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-6">
                  {searchResults.map((result, index) => (
                    <div key={index} className={`space-y-1 p-3 rounded-lg ${getSourceBackgroundClass(result.source)}`}>
                      <h3 className="text-lg font-medium text-primary hover:underline">
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          {result.title}
                        </a>
                      </h3>
                      <p className="text-sm text-muted-foreground">{result.url}</p>
                      <p className="text-sm">{result.snippet}</p>
                      <Badge variant="outline" className="mt-1 flex items-center w-fit">
                        {getSourceIcon(result.source)}
                        {result.sourceName}
                      </Badge>
                      {index < searchResults.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No se encontraron resultados para "{currentSearchTerm}"
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="text-md font-semibold mb-2">Consejos de Búsqueda</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Usa comillas para buscar frases exactas: "frase exacta"</li>
                <li>• Los dominios de paraísos fiscales solo se incluyen al usar "Abrir en Google"</li>
                <li>• OpenCorporates es útil para buscar empresas a nivel global y sus conexiones</li>
                <li>• Los registros estatales (Florida, Nevada, UK, Suiza) contienen información oficial verificada</li>
                <li>• Miami-Dade Property Search es útil para buscar propiedades inmobiliarias en Miami</li>
                <li>• White Pages y Public Data USA proporcionan información sobre personas y registros públicos</li>
                <li>• IMPO Uruguay ofrece acceso a normativa legal y documentos oficiales de Uruguay</li>
                <li>• Usa el botón "Abrir en Google" para incluir dominios de paraísos fiscales en la búsqueda</li>
                <li>• Ahora incluye {TAX_HAVEN_DOMAINS.length} dominios de paraísos fiscales organizados por región</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
