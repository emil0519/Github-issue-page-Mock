const api = {
  hostname: "https://api.github.com/repos",
  async getLabels(user: string, repo: string) {
    const response = await fetch(`${this.hostname}/${user}/${repo}/labels`);
    if (response.status === 403) {
      alert(
        "API rate limit exceeded, please use another IP Address or try again later."
      );
      return;
    }

    return await response.json();
  },

  async createLabels(
    user: string,
    repo: string,
    name: string,
    description: string,
    color: string
  ) {
    const response = await fetch(`${this.hostname}/${user}/${repo}/labels`, {
      body: JSON.stringify({
        name: name,
        description: description,
        color: color,
      }),
      headers: new Headers({
        Accept: "application/vnd.github+json",
        Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
      }),
      method: "POST",
    });

    return await response.json();
  },
  async updateLabels(
    user: string,
    repo: string,
    originalName: string,
    newName: string,
    newDes: string,
    newCol: string
  ) {
    if (newCol.includes("#")) {
      const replaced = newCol.replace("#", "");

      const response = await fetch(
        `${this.hostname}/${user}/${repo}/labels/${originalName}`,
        {
          body: JSON.stringify({
            new_name: newName,
            description: newDes,
            color: replaced,
          }),
          headers: new Headers({
            Accept: "application/vnd.github+json",
            Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
          }),
          method: "POST",
        }
      );

      return await response.json();
    } else {
      const response = await fetch(
        `${this.hostname}/${user}/${repo}/labels/${originalName}`,
        {
          body: JSON.stringify({
            new_name: newName,
            description: newDes,
            color: newCol,
          }),
          headers: new Headers({
            Accept: "application/vnd.github+json",
            Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
          }),
          method: "POST",
        }
      );

      return await response.json();
    }
  },
  async deleteLabel(user: string, repo: string, deleteName: any) {
    const response = await fetch(
      `${this.hostname}/${user}/${repo}/labels/${deleteName}`,
      {
        headers: new Headers({
          Accept: "application/vnd.github+json",
          Authorization: `token ${process.env.REACT_APP_PASSWORD}`,
        }),
        method: "DELETE",
      }
    );

    return response;
  },
  async getIssues(user: string, repo: string) {
    const response = await fetch(`${this.hostname}/${user}/${repo}/issues`);
    if (response.status === 403) {
      alert(
        "API rate limit exceeded, please use another IP Address or try again later."
      );
    }
    return response.json();
  },
};

export default api;
