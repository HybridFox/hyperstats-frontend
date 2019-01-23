import { environment } from '@environments/environment';
import { stripTrailingSlash } from '@helpers/url';

export class ApiConfigService {
  public baseUrl(url: string): string {
    const baseUrl = stripTrailingSlash(environment.apiBaseUrl);

    return `${baseUrl}${url}`;
  }
}
