import Chart from "chart.js/auto";
import type { GitHubRepo, LanguageStats } from "./types";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

async function init() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  if (tab?.url?.includes("github.com")) {
    const username = tab.url.split("/")[3]; // Récupère le nom après github.com/
    if (username && !["settings", "explore"].includes(username)) {
      fetchRepos(username);
    }
  }
}

async function fetchRepos(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    },
  );
  const repos: GitHubRepo[] = await response.json();
  renderChart(repos);
}

function renderChart(repos: GitHubRepo[]) {
  const stats: LanguageStats = {};

  repos.forEach((repo) => {
    if (repo.language) {
      stats[repo.language] = (stats[repo.language] || 0) + 1;
    }
  });

  const ctx = document.getElementById("techChart") as HTMLCanvasElement;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(stats),
      datasets: [
        {
          data: Object.values(stats),
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffce56",
            "#4bc0c0",
            "#9966ff",
          ],
        },
      ],
    },
  });
}

init();
