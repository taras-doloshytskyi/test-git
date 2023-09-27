import axios from "axios";
import { TOKEN, per_page } from "../constants";

export async function getRepositories(username: string, page?: number) {
  try {
    const res = await axios.get(
      `https://api.github.com/users/${
        username ? username : "taras-doloshytskyi"
      }/repos`,
      {
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      }
    );
    const response = await axios.get(
      `https://api.github.com/users/${
        username ? username : "taras-doloshytskyi"
      }/repos?q=react&page=${page}&per_page=${per_page}`,
      {
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      }
    );

    const repositories = response.data;
    return {
      repositories,
      total: Array.isArray(res.data) ? res.data.length : 0,
    };
  } catch (error) {
    return { repositories: error };
  }
}

export async function getSelectedRepository(owner: string, repo: string) {
  return axios
    .get(
      `https://api.github.com/repos/${
        owner ? owner : "taras-doloshytskyi"
      }/${repo}`
    )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return response.data;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching repository information:", error);
    });
}
