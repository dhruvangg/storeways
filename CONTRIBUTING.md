# Contributing to Storeways

First off, thank you for considering contributing to Storeways! It's people like you that make Storeways such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible.
* **Provide specific examples to demonstrate the steps**.
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** if possible.
* **Include your browser and OS information.**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps** or provide screenshots/mockups.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most Storeways users.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Setup

### Prerequisites

* Node.js (>= 14.0.0)
* npm or yarn

### Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/storeways.git
cd storeways
```

2. Install dependencies:
```bash
cd demo
npm install
```

3. Make your changes in the `demo/storeways.js` file

### Running Tests

```bash
cd demo
npm test
```

To run tests in watch mode:
```bash
npm run test:watch
```

To generate coverage report:
```bash
npm run test:coverage
```

### Building

```bash
cd demo
npm run build
```

This will:
1. Minify the source code
2. Output to `../dist/storeways.min.js`

### Project Structure

```
storeways/
├── demo/                   # Source code and development
│   ├── __tests__/         # Test files
│   ├── storeways.js       # Main source file
│   ├── package.json       # Package configuration
│   └── index.html         # Demo page
├── dist/                  # Built/minified files
│   ├── storeways.js       # Unminified build
│   └── storeways.min.js   # Minified build
└── docs/                  # Documentation site
```

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :memo: `:memo:` when writing docs
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies

### JavaScript Styleguide

* Use semicolons
* Use 2 spaces for indentation
* Prefer `const` and `let` over `var` (when updating to ES6+)
* Use descriptive variable names
* Comment complex logic
* Keep functions small and focused
* Follow existing code style

### Testing Styleguide

* Write descriptive test names
* Group related tests in `describe` blocks
* Use `beforeEach` and `afterEach` for setup and teardown
* Test both success and failure cases
* Mock external dependencies (Leaflet, Handlebars)
* Aim for high test coverage (>80%)

## Code Review Process

The core team looks at Pull Requests on a regular basis. After feedback has been given, we expect responses within two weeks. After two weeks, we may close the PR if it isn't showing any activity.

## Community

* Join discussions in GitHub Issues
* Share your store locator implementations
* Help others with their questions

## Recognition

Contributors will be recognized in the project README and release notes.

## Questions?

Feel free to open an issue with your question or contact the maintainers directly.

---

Thank you for contributing to Storeways! 🎉
