import { computed } from '@ember/object';
import { alias, readOnly } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  features: service(),
  addon: alias('model.addon'),
  latestReview: alias('addon.latestReview'),
  sortedAddonVersions: computed('addon.versions', function() {
    return (this.get('addon.versions') || []).sortBy('released').reverse();
  }),
  latestVersion: readOnly('addon.latestAddonVersion'),
  isLatestReviewForLatestVersion: computed('latestReview.version.version', 'latestVersion.version', function() {
    return this.get('latestReview.version.version') === this.get('latestVersion.version');
  }),
  isTestResultForLatestVersion: computed('model.latestTestResult.version', 'latestVersion', function() {
    return this.get('model.latestTestResult.version.version') === this.get('latestVersion.version');
  }),
  hasGithubData: computed('addon.hasInvalidGithubRepo', 'addon.githubStats.firstCommitDate', function() {
    return !this.get('addon.hasInvalidGithubRepo') && this.get('addon.githubStats.firstCommitDate');
  })
});
