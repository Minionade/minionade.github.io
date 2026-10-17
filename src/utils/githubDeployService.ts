export interface DeployStatePayload {
  resumeData: any;
  blogPosts: any[];
  artworks: any[];
  savedAt: string;
}

export interface DeployResult {
  success: boolean;
  message: string;
  workflowRunUrl?: string;
  details?: string;
}

export const deployToGitHubPages = async (
  token: string,
  payload: DeployStatePayload,
  owner: string = 'minionade',
  repo: string = 'minionade.github.io'
): Promise<DeployResult> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  try {
    // 1. Check repository access
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!repoRes.ok) {
      if (repoRes.status === 404 || repoRes.status === 401 || repoRes.status === 403) {
        throw new Error(
          `Cannot write to ${owner}/${repo}. Please ensure your GitHub token has "repo" (or "contents:write" and "actions:write") permissions.`
        );
      }
      throw new Error(`GitHub API check failed with status ${repoRes.status}`);
    }

    const repoInfo = await repoRes.json();
    const defaultBranch = repoInfo.default_branch || 'main';

    // 2. Commit portfolio-state.json to repo root or src/data
    const filePath = 'src/data/portfolioState.json';
    let currentSha: string | undefined = undefined;

    try {
      const getFileRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${defaultBranch}`,
        { headers }
      );
      if (getFileRes.ok) {
        const fileData = await getFileRes.json();
        currentSha = fileData.sha;
      }
    } catch {
      // File might not exist yet, which is fine
    }

    // Base64 encode state
    const contentString = JSON.stringify(payload, null, 2);
    // Browser utf-8 safe base64
    const base64Content = btoa(unescape(encodeURIComponent(contentString)));

    const putBody: any = {
      message: `Deploy portfolio update: resume & content changes (${new Date().toISOString()})`,
      content: base64Content,
      branch: defaultBranch,
    };
    if (currentSha) {
      putBody.sha = currentSha;
    }

    const putRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(putBody),
      }
    );

    let commitSuccess = false;
    if (putRes.ok) {
      commitSuccess = true;
    } else {
      const putErr = await putRes.json().catch(() => ({}));
      console.warn('Direct commit failed:', putErr);
    }

    // 3. Trigger workflow dispatch on deploy.yml if available
    let dispatchSuccess = false;
    try {
      const dispatchRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/actions/workflows/deploy.yml/dispatches`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ ref: defaultBranch }),
        }
      );
      if (dispatchRes.ok || dispatchRes.status === 204) {
        dispatchSuccess = true;
      }
    } catch (e) {
      console.warn('Workflow dispatch note:', e);
    }

    if (commitSuccess || dispatchSuccess) {
      return {
        success: true,
        message: 'Changes saved and GitHub Pages deployment successfully triggered!',
        workflowRunUrl: `https://github.com/${owner}/${repo}/actions`,
        details: commitSuccess
          ? `Committed updated state to ${defaultBranch} branch. GitHub Pages will build and publish automatically.`
          : `Dispatched deploy.yml workflow on ${defaultBranch}.`,
      };
    } else {
      throw new Error(
        'Could not update repository. Ensure your GitHub Personal Access Token includes "repo" or "workflow" permissions.'
      );
    }
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Failed to deploy to GitHub Pages',
      details: 'Local changes have been preserved in your browser.',
    };
  }
};
