export interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
}

export interface LanguageStats {
  [key: string]: number;
}
