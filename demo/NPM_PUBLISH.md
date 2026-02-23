# Publishing Storeways to NPM

This guide will help you publish the Storeways package to npm.

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup) if you don't have one
2. **Node.js**: Ensure Node.js (>= 14.0.0) is installed
3. **npm CLI**: Should come with Node.js

## Pre-Publishing Checklist

- [ ] All tests pass: `npm test`
- [ ] Code coverage is acceptable: `npm run test:coverage`
- [ ] Build succeeds: `npm run build`
- [ ] README.md is up to date
- [ ] LICENSE file exists
- [ ] Version number is updated in package.json
- [ ] CHANGELOG is updated (if applicable)

## Step-by-Step Publishing Process

### 1. Login to npm

```bash
npm login
```

Enter your npm username, password, and email when prompted.

### 2. Verify Your Login

```bash
npm whoami
```

This should display your npm username.

### 3. Check Package Name Availability

```bash
npm search storeways
```

If the name is taken, you'll need to use a scoped package name like `@yourusername/storeways`.

To use a scoped package, update `package.json`:

```json
{
  "name": "@yourusername/storeways",
  ...
}
```

### 4. Test Your Package Locally

Before publishing, test the package locally:

```bash
# In the demo directory
npm pack
```

This creates a `.tgz` file. Install it in a test project:

```bash
npm install /path/to/storeways-1.0.0.tgz
```

### 5. Run Final Tests

```bash
npm test
npm run test:coverage
npm run build
```

Ensure everything passes.

### 6. Publish to npm

For first-time publishing:

```bash
npm publish
```

For scoped packages (if using @username/storeways):

```bash
npm publish --access public
```

### 7. Verify Publication

Visit your package page:
```
https://www.npmjs.com/package/storeways
```

Or for scoped packages:
```
https://www.npmjs.com/package/@yourusername/storeways
```

Test installation:
```bash
npm install storeways
# or
npm install @yourusername/storeways
```

## Version Management

### Semantic Versioning

Storeways follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.x.x): Breaking changes
- **MINOR** (x.1.x): New features (backward compatible)
- **PATCH** (x.x.1): Bug fixes (backward compatible)

### Updating Versions

Before publishing updates:

```bash
# For patch updates (bug fixes)
npm version patch

# For minor updates (new features)
npm version minor

# For major updates (breaking changes)
npm version major
```

This will:
1. Update version in package.json
2. Create a git commit
3. Create a git tag

Then publish:

```bash
npm publish
```

### Publishing Beta/Alpha Versions

For pre-release versions:

```bash
# Update to beta version
npm version prerelease --preid=beta

# Publish with beta tag
npm publish --tag beta
```

Users can install beta versions with:
```bash
npm install storeways@beta
```

## Post-Publishing

### 1. Update GitHub Repository

```bash
git push origin master
git push origin --tags
```

### 2. Create GitHub Release

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Select the version tag
4. Add release notes
5. Attach built files if needed

### 3. Update Documentation

- Update the main README.md with the new version
- Add changelog entry
- Update any version-specific documentation

## Common Issues and Solutions

### Issue: Package name already exists

**Solution**: Use a scoped package name `@yourusername/storeways`

### Issue: 403 Forbidden error

**Solution**: 
- Make sure you're logged in: `npm whoami`
- For scoped packages, use: `npm publish --access public`

### Issue: Version already published

**Solution**: Bump the version number:
```bash
npm version patch
npm publish
```

### Issue: Missing files in published package

**Solution**: Check your `.npmignore` file or add `files` array in package.json:
```json
{
  "files": [
    "storeways.js",
    "README.md",
    "LICENSE"
  ]
}
```

## Unpublishing (Use with Caution)

You can unpublish a version within 72 hours:

```bash
# Unpublish a specific version
npm unpublish storeways@1.0.0

# Unpublish entire package (not recommended)
npm unpublish storeways --force
```

⚠️ **Warning**: Unpublishing is discouraged and may be disabled after 72 hours. It's better to publish a new patch version with fixes.

## Automation with CI/CD

Consider setting up automated publishing with GitHub Actions:

1. Add npm token to GitHub Secrets
2. Create workflow file (already created in `.github/workflows/publish.yml`)
3. Publish automatically on new tags

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Packages Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## Support

If you encounter issues:
1. Check [npm status](https://status.npmjs.org/)
2. Review [npm documentation](https://docs.npmjs.com/)
3. Ask in npm community forums
4. Open an issue in the Storeways repository

---

Good luck with your first npm publish! 🚀
