
export interface DomainInfo {
  domainName: string;
  isAvailable: boolean;
  reason?: string;
}

export interface GeminiDomainResponse {
  primary: DomainInfo;
  suggestions: DomainInfo[];
}
