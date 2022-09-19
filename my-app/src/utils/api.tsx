const api = {
    hostname: 'https://api.github.com/repos',
    async getLabels(user: string, repo: string) {
      const response = await fetch(
        `${this.hostname}/${user}/${repo}/labels`
      );
      return await response.json();
    }
}


export default api;