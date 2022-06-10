## Business Problem

FINOS hosts [FDC3](https://fdc3.finos.org/), which defines a standard for desktop interop. At the moment there is no way to demonstrate whether a particular implementation of FDC3 meets the current specification. 

The goal of this project is to automate these checks in order to demonstrate a project or products conformance with the FDC3 standard.
 
## Proposed Solution

This is currently a TypeScript / Mocha test suite with an optional React-based host.

## Tentative Roadmap

Currently this targets FDC3 v1.2 and the implementation is somewhat limited by what it is feasible to test from within a single application. The next steps are:

 - investigate whether a more thorough test is possible by hosting multiple test applications (allowing end-to-end testing of intents)
 - implement a test suite based on FDC3 2.0 (which has not been released yet)
 
## Current State

A working test suite targeting v1.2
 
## Existing Materials

https://github.com/ScottLogic/FDC3-conformance-framework

## Development Team
### Maintainers

 - Nico Pretorius, @nicopreto, Scott Logic
 - Colin Eberhardt, @colineberhardt, Scott Logic
 
### Confirmed contributors

Current contributors can be found here: https://github.com/ScottLogic/FDC3-conformance-framework/graphs/contributors

### Target Contributors

We anticipate active contribution from various FDC3 working group members

## Infrastructure needs
*Describe the FINOS infrastructure you will need for this project, in addition to a GitHub repository. The FINOS team will connect with you before setting up any of this infrastructure*
- [ ] Recurring meetings
- [ ] Mailing list
- [ ] A project on the [Legend Studio shared instance](https://community.finos.org/docs/platforms/legend-studio-shared)
- [ ] Other (please explain):

# What's next?
Upon submission of this project proposal, the FINOS team will get in touch with you to discuss next steps. 

-----

# Contribution process (v. 1.1, last updated on December 20, 2021)
Below is the list of tasks that FINOS Team and the contribution author go through in order to complete the FINOS contribution process.
**Please do not edit these contents at contribution time!**

## Kick-off meeting
- [ ] Set up kick-off meeting with project leads
- [ ] Run kick-off meeting
    - [ ] [FINOS overview](https://www.finos.org/hubfs/An%20Introduction%20to%20FINOS.pdf) (if necessary)
    - [ ] [FINOS Maintainers cheatsheet](https://community.finos.org/docs/finos-maintainers-cheatsheet/)
    - [ ] [FINOS Project/Standards Governance](https://community.finos.org/docs/governance/intro)
    - [ ] [FINOS Project Lifecycle](https://community.finos.org/docs/governance/Software-Projects/project-lifecycle)
    - [ ] Walk through the checklist, answer questsion and remove items that don't apply
    - [ ] Write and send contribution proposal announcement (optional - see below)

## FINOS Contrib POC
- [ ] Identify and Assign FINOS Project Coordinator
- [ ] Identify and Assign FINOS Strategic Advisor

## Proposal (Lead Maintainer)
- [ ] Lead maintainer to send out announcement to community@finos.org using this template:
    
    ```
    Dear FINOS Community, 
    
    We would like to propose a new FINOS project. Please review the proposal details at (_TODO: add link to the GitHub issue proposal_).
    
    If you're interested in participating, please :+1: the GitHub issue proposal and drop a comment with your name, org and email

   Thanks a lot,
   ```

## Identify project meta (Lead: FINOS Contrib POC, Support: FINOS Marketing)
- Project main coordinates
    - [ ] Project Name
    - [ ] Project Slug
    - [ ] Does the name have a registered trademark?
    - [ ] Request logo design (if needed)
- [ ] Category and sub-category (for [FINOS Landscape](https://landscape.finos.org/))
- [ ] Is there existing code? If so, is it public? If not, can you grant read access to user github.com/finos-admin ?
- [ ] Was the project ever released? If so, are releases public? And what's the latest released version?
- [ ] Team composition: lead maintainer and other maintainers
- [ ] Are meetings currently held for the project?
- [ ] Are meeting minutes, agenda and attendance tracked?
- [ ] Is Continuous Integration used? If so, which system is used?
- [ ] Is there an existing Documentation website? If not, would you like to have one?

## Maintainers, contributors and CLAs (Lead: FINOS Contrib POC, Support: FINOS infra)
- [ ] For each maintainer identified in the previous step, collect: the following info:
  - Fullname
  - GitHub username
  - Corporate email address
- [ ] Identify other existing contributors (assuming there's a contribution history (eg Git history)
- [ ] Check if maintainers and other contributors are all covered by FINOS CLA
- [ ] Engage with FINOS Legal team to figure out what’s needed to cover all maintainers and contributors with FINOS CLA
- [ ] Reach out to contributors and employers to coordinate CLA signatures

## Project Communication Channel(s)
- [ ] Ask maintainers which communications channels they'd like to use
- Asynchronous
  - [ ] GitHub Issues (_public_)
  - [ ] GitHub Discussions (_public_)
  - [ ] GitHub Team Discussions (_public_ and _private_ **FINOS CLAs Required**)
  - [ ] Google Groups
- Synchronous
  - [ ] FINOS Slack Channel (general _public Slack_ / leadership _private Slack_)
- [ ] Create the identified communication channels during infra set up
    - [ ] Create mailing-list on lists.finos.org (optional)
        - [ ] Enable Hubspot Sync for all project mailing lists created
        - [ ] Aggregate mailing lists to community@finos.org
        - [ ] Update marketing lists
          - Add new list to the included "Email List" part of the filter
          - Add new list to the excluded "Email" part of the filter
- [ ] Link communication channels linked front and center in the project README.md

## Code validation (only if code is contributed) (Lead: FINOS Infra)
- [ ] The codebase doesn’t have HIGH or CRITICAL CVEs across direct and transitive libraries
- [ ] The codebase doesn’t have any unfriendly licenses across direct and transitive libraries
- [ ] (optional - if a build system is provided) The build process runs successfully
- [ ] [finos-admin](http://github.com/finos-admin) is Admin of the GitHub repository to transfer
- [ ] The codebase doesn’t include any patent or copyright that conflicts with FINOS Governance and bylaws (to be validated with FINOS Legal team)
- [ ] Apply project blueprint contents - see [ODP docs](https://community.finos.org/docs/collaboration-infrastructure#finos-project-blueprint)
    - [ ] Ensure that the proper project governance is in the CONTRIBUTING.md file
- [ ] [All incubating criteria](https://community.finos.org/docs/governance/Software-Projects/stages/incubating) are checked and documented below

## Approval (Lead: FINOS Infra)
- [ ] Assign issue to Executive Director (@mindthegab) to trigger voting
- [ ] (optional) if additional socialization is required, the Executive Director may bring projects to the FINOS Governing Board
- [ ] FINOS accepts the contribution (and the contribution process can move forward)

## Code transfer (Lead: FINOS Infra)
- [ ] Backup (even with screenshot) GitHub permissions of the repository to transfer
- [ ] Check GitHub repository transfer requirements:
  - [ ] [finos-admin](http://github.com/finos-admin) has `Admin` to all repositories to transfer
  - [ ] [finos-admin](http://github.com/finos-admin) ia allowed to transfer repositories out of the org
  - [ ] if the repository is owned by a user (and not an org), the user must be able to transfer the repository to [finos-admin](http://github.com/finos-admin)
- [ ] Review FINOS [project blueprint contents](https://community.finos.org/docs/collaboration-infrastructure#finos-project-blueprint)
    - [ ] Project title/description in README
    - [ ] Project badge in README
    - [ ] License in README
    - [ ] Contributing in README
    - [ ] `CONTRIBUTING.md`
    - [ ] `LICENSE` (look for `{}` placeholders)
- [ ] Check protection settings and disable after transfer if necessary
- [ ] Transfer all code assets as GitHub repositories under github.com/finos
- [ ] Invite GitHub usernames to GitHub FINOS Org
- [ ] Create `<project-name>-maintainers` GitHub team and invite users
- [ ] Configure `finos-admins` (`Maintain` role) and `finos-staff` (`Triage` role) team permissions


## Infra setup (Lead: FINOS Infra)
- [ ] Enable EasyCLA
- [ ] Add project to metadata
- [ ] Add identities, orgs and affiliations to metadata (deprecated by EasyCLA)
- [ ] Add logo to FINOS landscape
    - [ ] Create `staging` branch on `finos/finos-landscape`
    - [ ] Merge `finos/metadata` changes on master (will udpdate `landscape.yml` in `finos/finos-landscape`)
    - [ ] Create PR from `staging` branch on `finos/finos-landscape`
    - [ ] Review Netlify preview
    - [ ] Merge PR
- [ ] Add project maintainers emails to [finos-project-maintainers@finos.org](https://groups.google.com/a/finos.org/g/finos-project-maintainers/members) list
- [ ] Add project maintainers GitHub usernames to the [project-maintainers Team](https://github.com/orgs/finos/teams/project-maintainers/members)
- [ ] Onboard project on LF systems ([SFDC](https://jira.linuxfoundation.org/browse/SS), Insights, EasyCLA, Groups.io)
- [ ] (best effort) Update release coordinates and code namespace to include `finos`
- [ ] Enable security vulnerabilities scanning
- [ ] (optional) Enable meeting attendance tracking
- [ ] (optional) Onboard into legend.finos.org/studio

## Announcement (Lead: FINOS Contrib POC)
- [ ] Lead maintainer works with FINOS marketing to send out announcement to announce@finos.org , checkout announcement template at the [Contribution page](https://community.finos.org/docs/governance/Software-Projects/contribution#step-5-contribution-announcements)
- [ ] Notify FINOS Contrib POC and FINOS marketing (@grizzwolf + finos-marketing internal Slack channel)
