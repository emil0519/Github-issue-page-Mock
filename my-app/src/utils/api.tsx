const api = {
    hostname: 'https://api.github.com/repos',
    async getLabels(user: string, repo: string) {
      const response = await fetch(
        `${this.hostname}/${user}/${repo}/labels`
      );
      return await response.json();
    },
    async createLabels(user: string, repo: string) {
        const response = await fetch(`${this.hostname}/${user}/${repo}/labels`, {
          body: JSON.stringify({
            "name": "abcd",
            "description": "Finished working",
            "color": "f29513"
        }),
          headers: new Headers({
            'Accept': 'application/vnd.github+json',
            'Authorization': 'token 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'
          }),
          method: 'POST',
        });
        return await response.json();
      },
      async updateLabels(user: string, repo: string, originalName: string, newName: string, newDes: string, newCol: string) {
        const response = await fetch(`${this.hostname}/${user}/${repo}/labels/${originalName}`, {
          body: JSON.stringify({
            "new_name": newName,
            "description": newDes,
            "color": newCol
        }),
          headers: new Headers({
            'Accept': 'application/vnd.github+json',
            'Authorization': 'token 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'
          }),
          method: 'POST',
        });
        return await response.json();
      },
      async deleteLabel(user: string, repo: string, deleteName: string) {
        const response = await fetch(`${this.hostname}/${user}/${repo}/labels/${deleteName}`, {
          headers: new Headers({
            'Accept': 'application/vnd.github+json',
            'Authorization': 'token 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'
          }),
          method: 'DELETE',
        });
        return await response.json();
      },
}


export default api;