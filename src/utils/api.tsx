const api = {
  hostname: "https://api.github.com/repos",
  async getLabels(user: string, repo: string) {
    const response = await fetch(`${this.hostname}/${user}/${repo}/labels`);
    console.log(response);

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
        Authorization: `token ${process.env.REACT_APP_TOKEN}`,
        // hash table?
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
    console.log(newCol);

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
          Authorization: `token ${process.env.REACT_APP_TOKEN}`,
        }),
        method: "POST",
      }
    );
    console.log(response);

    return await response.json();
  },
  async deleteLabel(user: string, repo: string, deleteName: string) {
    console.log(deleteName);
    const response = await fetch(
      `${this.hostname}/${user}/${repo}/labels/${deleteName}`,
      {
        headers: new Headers({
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        }),
        method: "DELETE",
      }
    );
    // .then((data) => console.log(data));
    return;
  },
};

export default api;
