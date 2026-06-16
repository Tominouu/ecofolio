import simpleGit from 'simple-git';
import type { GitCommit, GitStatus } from '../core/types/metrics.js';

export class GitService {
  private git;

  constructor(root: string) {
    this.git = simpleGit(root);
  }

  async isRepo(): Promise<boolean> {
    try {
      await this.git.status();
      return true;
    } catch {
      return false;
    }
  }

  async init(): Promise<void> {
    await this.git.init();
    await this.commit('feat: initial portfolio');
  }

  async status(): Promise<GitStatus> {
    const status = await this.git.status();
    return {
      staged: status.staged,
      unstaged: status.modified,
      untracked: status.not_added,
      ahead: status.ahead,
      behind: status.behind,
    };
  }

  async commit(message: string): Promise<string> {
    await this.git.add('.');
    const result = await this.git.commit(message);
    return result.commit || '';
  }

  async log(limit: number = 10): Promise<GitCommit[]> {
    const log = await this.git.log({ maxCount: limit });
    return log.all.map((commit) => ({
      hash: commit.hash,
      message: commit.message,
      date: commit.date,
      author: commit.author_name,
      files: [],
    }));
  }

  async diff(hash?: string): Promise<string> {
    return hash ? this.git.diff([hash]) : this.git.diff();
  }

  async rollback(hash: string): Promise<void> {
    await this.git.reset(['--hard', hash]);
  }

  async branch(name: string): Promise<void> {
    await this.git.branch([name]);
  }

  async checkout(branch: string): Promise<void> {
    await this.git.checkout(branch);
  }

  async push(remote: string = 'origin', branch: string = 'main'): Promise<void> {
    await this.git.push(remote, branch);
  }

  async hasUncommitted(): Promise<boolean> {
    const status = await this.git.status();
    return status.files.length > 0;
  }
}
