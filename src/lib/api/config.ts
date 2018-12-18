import { environment } from '@environments/environment';
import { stripTrailingSlash } from '@helpers/url';

export class ApiConfigService {
  public baseUrl(url: string, {
    version = 'v2',
  }: {
    version?: string;
  } = {}): string {
    const baseUrl = version.length ? `${environment.apiBaseUrl}${version}` : stripTrailingSlash(environment.apiBaseUrl);

    return `${baseUrl}${url}`;
  }
}
