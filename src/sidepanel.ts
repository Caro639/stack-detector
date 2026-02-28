import Chart from "chart.js/auto";
import type { GitHubRepo, LanguageStats } from "./types";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

async function init() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  // Récupère le nom après github.com/ et ignore les pages de paramètres ou d'exploration
  if (tab?.url?.includes("github.com")) {
    const username = tab.url.split("/")[3];
    if (username && !["settings", "explore"].includes(username)) {
      fetchRepos(username);
    }
  }
}

async function fetchRepos(username: string) {
  const statusEl = document.getElementById("status")!;

  try {
    const headers: HeadersInit = GITHUB_TOKEN
      ? { Authorization: `token ${GITHUB_TOKEN}` }
      : {};

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      { headers },
    );

    if (!response.ok) {
      const err = (await response.json()) as { message: string };
      statusEl.textContent = `Erreur API GitHub : ${err.message}`;
      return;
    }

    const repos: GitHubRepo[] = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      statusEl.textContent = "Aucun dépôt trouvé pour cet utilisateur.";
      return;
    }

    statusEl.textContent = `${repos.length} dépôts analysés pour ${username}`;
    renderChart(repos);
  } catch (e) {
    statusEl.textContent = `Erreur réseau : ${e}`;
  }
}

function generateColors(count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.round((i * 360) / count);
    return `hsl(${hue}, 70%, 60%)`;
  });
}

function renderChart(repos: GitHubRepo[]) {
  const stats: LanguageStats = {};

  repos.forEach((repo) => {
    if (repo.language) {
      stats[repo.language] = (stats[repo.language] || 0) + 1;
    }
  });

  const labels = Object.keys(stats);
  const ctx = document.getElementById("techChart") as HTMLCanvasElement;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: Object.values(stats),
          backgroundColor: generateColors(labels.length),
        },
      ],
    },
  });
}

init();
