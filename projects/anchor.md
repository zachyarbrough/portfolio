---
title: Anchor.nvim 
date: 06-20-2026
description: A Neovim plugin for pinning and navigating project-specific directories with your fuzzy finder of choice
tags: [vim, plugin, terminal]
technology_used: [lua, nvim]
gallery_path: public/images/anchor/gallery/
source: https://github.com/zachyarbrough/anchor.nvim
preview: /images/anchor/anchor-preview.webp
related: []
featured: true
---

# Overview

Anchor is a Neovim plugin that lets you bookmark directories on a per-project basis and jump to them instantly. 
Think of it as a saved-shortcutes system for your file system. No more navigating the same deeply nested folders over and over.

# Features

- **Per-project bookmarks:** Saved directories are stored in a .json file scope to each project, so
shortcuts you set up for one codebase don't clutter another
- **Built-in floating window:** a popup lets you view and edit your bookmarked directories without leaving your workflow
- **Works with popular fuzzy finders:** Integrates with the most widely used Neovim search and navigation tools, 
so it slots int your existing setup rather than replacing it
- **Simple keyboard-driven commands:** Add or remove directories and pull up your bookmark list with a single keypress.
-  **Configurable:** Options that lets the user tune Anchor to their liking 
