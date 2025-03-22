
# Contributing to TailGrid

First off, thank you for considering contributing to TailGrid! It's people like you that make TailGrid such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by the [TailGrid Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for TailGrid. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

**Before Submitting A Bug Report:**

* Check the documentation for tips on using the component correctly.
* Check if the issue has already been reported in the issues section.
* Determine which repository the problem should be reported in.

**How Do I Submit A (Good) Bug Report?**

Bugs are tracked as GitHub issues. Create an issue and provide the following information:

* Use a clear and descriptive title for the issue to identify the problem.
* Describe the exact steps which reproduce the problem in as many details as possible.
* Provide specific examples to demonstrate the steps.
* Describe the behavior you observed after following the steps and point out what exactly is the problem with that behavior.
* Explain which behavior you expected to see instead and why.
* Include screenshots or animated GIFs which show you following the described steps and clearly demonstrate the problem.
* If the problem is related to performance or memory, include a performance profile capture.
* If the problem wasn't triggered by a specific action, describe what you were doing before the problem happened.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for TailGrid, including completely new features and minor improvements to existing functionality.

**Before Submitting An Enhancement Suggestion:**

* Check if the enhancement has already been suggested.
* Determine which repository the enhancement should be suggested in.

**How Do I Submit A (Good) Enhancement Suggestion?**

Enhancement suggestions are tracked as GitHub issues. Create an issue and provide the following information:

* Use a clear and descriptive title for the issue to identify the suggestion.
* Provide a step-by-step description of the suggested enhancement in as many details as possible.
* Provide specific examples to demonstrate the steps or point out the part of TailGrid which the suggestion is related to.
* Describe the current behavior and explain which behavior you expected to see instead and why.
* Include screenshots or animated GIFs which help you demonstrate the steps or point out the part of TailGrid which the suggestion is related to.
* Explain why this enhancement would be useful to most TailGrid users.
* List some other libraries or applications where this enhancement exists.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the JavaScript and CSS styleguides
* Include adequate tests
* Document new code based on the Documentation Styleguide
* End all files with a newline

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies
    * 👕 `:shirt:` when removing linter warnings

### JavaScript Styleguide

All JavaScript code is linted with ESLint and formatted with Prettier.

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Inline exports with expressions whenever possible
  ```js
  // Use this:
  export const foo = 'bar';

  // Instead of:
  const foo = 'bar';
  export { foo };


- Place requires in the following order:

- Built-in Node Modules (such as `path`)
- Local Modules (using relative paths)



- Place class properties in the following order:

- Class methods and properties (methods starting with `static`)
- Instance methods and properties



- Use arrow functions over anonymous function expressions
- Use destructuring where appropriate


### Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown)
- Reference methods and classes in markdown with the custom `{}` notation:

- Reference classes with `{ClassName}`
- Reference instance methods with 