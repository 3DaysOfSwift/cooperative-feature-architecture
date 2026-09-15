# Origin and extraction

CFA was developed by 3 Days of Swift Concurrency in the Trend iOS application.
This repository extracts the canonical architecture, development/migration skill,
dashboard skill and dashboard tool into an independent distribution.

The extraction retains the core architecture and migration passes. Changes include
CFA naming, configurable project identity, bundled dependencies, installation,
release validation and removal of historical reports. Trend is not a runtime or
installation dependency. Original application repositories remain independent.

The report tool’s visual direction was informed by Visual Explainer
(https://github.com/nicobailon/visual-explainer). As documented by the original
author, its source was not copied or vendored. No third-party runtime packages
are included. Node.js and Xcode are separate user-installed prerequisites.
