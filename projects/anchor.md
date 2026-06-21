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

Anchor stores directory paths unique to each project allowing you to easily add
common directories to keymappings for quick fuzzy finding access. The core
functionality was inspired by Harpoon, an extremely popular productivity tool that
allows users to quickly access files.

# Features

- A built-in floating buffer editor that lets you view and update your pinned directories
on the fly. Entries are stored per-project in a .json file, so your anchor list stays
relevant to whatever you are working on.

- Integrated with all of the most popular fuzzy finders like **fzf-lua**, **telescope**, **mini.pick**, **snack.pickers**, and **oil.nvim**

- Intuitive commands that let you add/delete and quickly open the anchor list at the press of a button

- Configuration options that lets the user tune Anchor to their liking 
